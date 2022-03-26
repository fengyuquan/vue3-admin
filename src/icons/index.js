import SvgIcon from '@/components/SvgIcon'

// 导入所有的svg图标
// https://webpack.docschina.org/guides/dependency-management/#requirecontext
const svgRequire = require.context('./svg', false, /\.svg$/)
svgRequire.keys().forEach((iconPath) => svgRequire(iconPath))

// 完成 SvgIcon 全局注册
export default (app) => {
  app.component('svg-icon', SvgIcon)
}
