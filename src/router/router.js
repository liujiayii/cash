import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '@/views/login/Login'
import Layout from '@/views/layout/Layout'

Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  }, {
    path: '',
    component: Layout,
    children: [
      {
        component: () => import('@/views/exception/404'),
        name: "404",
        path: "/404",
      }, {
        component: () => import('@/views/exception/403'),
        name: "403",
        path: "/403",
      }, {
        component: () => import('@/views/exception/500'),
        name: "500",
        path: "/500",
      }
    ]
  }, {
    path: '*',
    redirect: '/404'
  }]

// 前端路由表
const constantRouterComponents = {
  Layout,// 基础页面 layout 必须引入
  // 你需要动态引入的页面组件
  Home: () => import('@/views/home/Home'),
  /*优惠管理*/
  DiscountList: () => import('@/views/discount/DiscountList'),
  /*财务*/
  Order: () => import('@/views/finance/Order'),
  /*商品*/
  GoodsList: () => import('@/views/goods/GoodsList'),
  GoodsSort: () => import('@/views/goods/GoodsSort'),
  /*记录*/
  Operation: () => import('@/views/record/Operation'),
  Daily: () => import('@/views/record/Daily'),
  Monthly: () => import('@/views/record/Monthly'),
  /*库存*/
  StockList: () => import('@/views/stock/StockList'),
  Purchase: () => import('@/views/stock/Purchase'),
  SelfApply: () => import('@/views/stock/SelfApply'),
  OthersApply: () => import('@/views/stock/OthersApply'),
  /*设置*/
  Mall: () => import('@/views/system/Mall'),
  Member: () => import('@/views/system/Member'),
  Role: () => import('@/views/system/Role'),
  User: () => import('@/views/system/User'),
}

export {constantRouterComponents}

export default new VueRouter({
  routes
})
