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
    // 路由情况一：不存在 meta && 不存在 children  直接 return；例如404 401 login路由
    if (isNull(item.meta) && isNull(item.children)) return
    // 路由情况二：不存在 meta，但存在 children，则迭代其children；例如 / 路由 ，它的children有/profile /404 /401
    if (isNull(item.meta) && !isNull(item.children)) {
      result.push(...generateMenus(item.children))
      return
    }

    // 路由情况三：本身路由存在meta，可能还有children
    const route = {
      name: item.name,
      path: item.path,
      meta: item.meta,
      children: []
    }

    // 情况一：icon 与 title 必须全部存在，直接加入result；例如 /user
    if (route.meta.icon && route.meta.title) {
      result.push(route)
    }

    // 情况二：当前item还存在 children，则进入迭代到children；例如/user/manger
    if (item.children) {
      route.children.push(...generateMenus(item.children))
    }
  })
  return result
}

const flattenRouters = (routes) => {
  const result = []
  routes.forEach((item) => {
    if (!isNull(item.children)) {
      result.push(...flattenRouters(item.children))
      return
    }
    const route = {
      name: item.name,
      path: item.path,
      meta: item.meta
    }

    result.push(route)
  })
  return result
}

export { filterRouters, generateMenus, flattenRouters }
