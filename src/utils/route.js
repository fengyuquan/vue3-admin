/**
 * 返回所有子路由
 */
const getChildrenRoutes = (routes) => {
  const result = []
  routes.forEach((route) => {
    if (route?.children?.length) {
      result.push(...route.children)
    }
  })
  return result
}

/**
 * 处理脱离层级的路由：某个一级路由为其他子路由，则剔除该一级路由，保留路由层级
 * @param {*} routes router.getRoutes()
 */
const filterRouters = (routes) => {
  const childrenRoutes = getChildrenRoutes(routes)
  return routes.filter((route) => {
    // 如果在子路由数组中，找到了当前正在遍历的路由，则剔除它
    return !childrenRoutes.find((childrenRoute) => {
      return childrenRoute.path === route.path
    })
  })
}

/**
 * 判断数据是否为空值
 */
const isNull = (data) => {
  if (!data) return true
  if (JSON.stringify(data) === '{}') return true
  return JSON.stringify(data) === '[]'
}

/**
 * 根据 routes 数据，返回对应 menu 规则数组
 */
const generateMenus = (routes) => {
  const result = []
  routes.forEach((item) => {
    // 不存在 meta && 不存在 children  直接 return
    if (isNull(item.meta) && isNull(item.children)) return
    // 不存在 meta，但存在 children，则迭代其children
    if (isNull(item.meta) && !isNull(item.children)) {
      result.push(...generateMenus(item.children))
      return
    }

    // 读取 path 作为跳转路径
    const routePath = item.path
    // 路由分离之后，存在同名父路由的情况，需要单独处理
    let route = result.find((item) => item.path === routePath)
    if (!route) {
      route = {
        ...item,
        path: routePath,
        children: []
      }

      // icon 与 title 必须全部存在
      if (route.meta.icon && route.meta.title) {
        // meta 存在生成 route 对象，放入 arr
        result.push(route)
      }
    }

    // 存在 children 进入迭代到children
    if (item.children) {
      route.children.push(...generateMenus(item.children, route.path))
    }
  })
  return result
}

export { filterRouters, generateMenus }
