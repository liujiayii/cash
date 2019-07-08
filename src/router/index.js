import router from './router'
import NProgress from 'nprogress'
import {constantRouterComponents} from './router'
/* 格式化后端结构信息并递归生成层级路由表 */
const generator = (routerMap, parent) => {
  return routerMap.map(item => {
    const currentRouter = {
      // 路由地址 动态拼接生成如 /dashboard/workplace
      path: `/${parent && parent.name || ''}/${item.name}`,
      // 路由名称，建议唯一
      name: item.name || item.key || '',
      icon: item.icon || '',
      // 该路由对应页面的 组件
      component: constantRouterComponents[parent ? item.name : 'Layout'],
      // meta: 页面标题, 菜单图标, 页面权限(供指令权限用，可去掉)
      meta: {title: parent && parent.name || ''}
    }
    // 重定向
    item.redirect && (currentRouter.redirect = item.redirect)
    // 是否有子菜单，并递归处理
    if (item.children && item.children.length > 0) {
      // Recursion
      currentRouter.children = generator(item.children, currentRouter)
    }
    // 为了防止出现后端返回结果不规范，处理有可能出现拼接出两个 反斜杠
    currentRouter.path = currentRouter.path.replace('//', '/')
    return currentRouter
  })
}
const menuData = [
  {
    icon: "el-icon-s-home",
    name: "",
    children: [
      {name: "Home"}
    ]
  },
  {
    icon: "el-icon-s-custom",
    name: "System",
    children: [
      {name: "Mall"},
      {name: "Member"},
      {name: "Role"},
      {name: "User"}
    ]
  },
  {
    icon: "el-icon-shopping-bag-1",
    name: "Goods",
    children: [
      {name: "GoodsList"},
      {name: "GoodsSort"}
    ]
  },
  {
    icon: "el-icon-menu",
    name: "Stock",
    children: [
      {name: "StockList"},
      {name: "Purchase"},
      {name: "SelfApply"},
      {name: "OthersApply"}
    ]
  },
  {
    icon: "el-icon-coin",
    name: "Discount",
    children: [
      {name: "DiscountList"}
    ]
  },
  {
    icon: "el-icon-document",
    name: "Record",
    children: [
      {name: "Operation"},
      {name: "Daily"},
      {name: "Monthly"}
    ]
  },
  {
    icon: "el-icon-edit-outline",
    name: "Finance",
    children: [
      {name: "Order"}
    ]
  }
]
/* 路由守卫 */
let reAddRoutes = true
router.beforeEach((to, form, next) => {
  NProgress.start()
  if ((to.path !== '/404') && (to.path !== '/login')) {
    window.sessionStorage.setItem('path', to.path)
    window.sessionStorage.setItem('query', JSON.stringify(to.query))
  }
  if (!window.sessionStorage.getItem('userName') && to.path !== '/login') {
    return next({path: '/login'})
  } else if (reAddRoutes) {
    const menu = JSON.parse(window.sessionStorage.getItem('menu')) || []
    reAddRoutes = false
    console.log([...menuData])
    console.log(generator([...menuData]))
    router.addRoutes(generator([...menuData]))
    next({path: window.sessionStorage.getItem('path'), query: JSON.parse(window.sessionStorage.getItem('query'))})
  } else {
    next()
  }
})
router.afterEach(() => {
  NProgress.done()
})

export {router, generator,menuData}
