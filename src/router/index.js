import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '总览', icon: 'dashboard' }
    }]
  },

  {
    path: '/user-info',
    component: Layout,
    redirect: '/user-info/user',
    name: 'User-Info',
    meta: { title: '用户', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'user',
        name: 'User',
        component: () => import('@/views/user/index'),
        meta: { title: '用户信息', icon: 'table' }
      },
      {
        path: 'agency',
        name: 'Agency',
        component: () => import('@/views/agency/index'),
        meta: { title: '机构账号', icon: 'tree' }
      },
      {
        path: 'add-agency',
        name: 'Add-Agency',
        hidden: true,
        component: () => import('@/views/agency/addAgency'),
        meta: { title: '添加机构', icon: 'tree' }
      },
      {
        path: 'edit-agency/:agencyId',
        name: 'Edit-Agency',
        hidden: true,
        component: () => import('@/views/agency/editAgency'),
        meta: { title: '编辑机构', icon: 'tree' }
      },
      {
        path: 'creators',
        name: 'Creators',
        component: () => import('@/views/creators/index'),
        meta: { title: '审核创作者', icon: 'tree' }
      }
    ]
  },

  {
    path: '/dynamic',
    component: Layout,
    redirect: '/dynamic/trends',
    name: 'Dynamic',
    meta: { title: '动态 NFT', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'trends',
        name: 'Trends',
        component: () => import('@/views/trends/index'),
        meta: { title: '动态', icon: 'form' }
      },
      {
        path: 'nft',
        name: 'Nft',
        redirect: '/dynamic/nft/nft-personal',
        component: () => import('@/views/nft/index'),
        meta: { title: 'NFT', icon: 'form' },
        children: [
          {
            path: 'nft-personal',
            component: () => import('@/views/nft/nft-personal'),
            name: 'Nft-Personal',
            meta: { title: '个人NFT' }
          },
          {
            path: 'personal-detail/:detailId',
            component: () => import('@/views/nft/personal-detail'),
            name: 'Personal-Detail',
            hidden: true,
            meta: { title: '个人NFT详情' }
          },
          {
            path: 'nft-agency',
            component: () => import('@/views/nft/nft-agency'),
            name: 'Nft-Agency',
            meta: { title: '机构NFT' }
          },
          {
            path: 'agency-detail/:detailId',
            component: () => import('@/views/nft/agency-detail'),
            name: 'Agency-Detail',
            hidden: true,
            meta: { title: '机构NFT详情' }
          },
        ]
      },
      {
        path: 'comment',
        name: 'Comment',
        component: () => import('@/views/comment/index'),
        redirect: '/dynamic/comment/comment-trends',
        meta: { title: '评论', icon: 'form' },
        children: [
          {
            path: 'comment-trends',
            component: () => import('@/views/comment/comment-trends'),
            name: 'Comment-Trends',
            meta: { title: '动态评论' }
          },
          {
            path: 'comment-nft',
            component: () => import('@/views/comment/comment-nft'),
            name: 'Comment-Nft',
            meta: { title: 'NFT评论' }
          }
        ]
      },
      {
        path: 'report',
        name: 'Report',
        redirect: '/dynamic/report/report-trends',
        component: () => import('@/views/report/index'),
        meta: { title: '举报', icon: 'form' },
        children: [
          {
            path: 'report-trends',
            component: () => import('@/views/report/report-trends'),
            name: 'Report-Trends',
            meta: { title: '动态举报' }
          },
          {
            path: 'report-nft',
            component: () => import('@/views/report/report-nft'),
            name: 'Report-Nft',
            meta: { title: 'NFT举报' }
          }
        ]
      }
    ]
  },
  {
    path: '/order',
    component: Layout,
    redirect: '/order/agency-order',
    name: 'Order',
    meta: { title: '订单', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'agency-order',
        name: 'Agency-Order',
        component: () => import('@/views/order/agency-order.vue'),
        meta: { title: '机构NFT', icon: 'table' }
      },
      {
        path: 'personal-order',
        name: 'Personal-Order',
        component: () => import('@/views/order/personal-order.vue'),
        meta: { title: '个人NFT', icon: 'tree' }
      }
    ]
  },
  {
    path: '/site',
    component: Layout,
    redirect: '/site/site-rule',
    name: 'Site',
    meta: { title: '设置', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'site-rule',
        name: 'Site-Rule',
        component: () => import('@/views/site/site-rule/index.vue'),
        meta: { title: '协议文本', icon: 'table' },
      },
      {
        path: 'add-site-rule',
        name: 'Add-Site-Rule',
        hidden: true,
        component: () => import('@/views/site/site-rule/add-rule.vue'),
        meta: { title: '添加协议', icon: 'table' },
      },
      {
        path: 'edit-site-rule',
        name: 'Edit-Site-Rule',
        hidden: true,
        component: () => import('@/views/site/site-rule/edit-rule.vue'),
        meta: { title: '编辑协议', icon: 'table' },
      },
      {
        path: 'site-constant',
        name: 'Site-Constant',
        component: () => import('@/views/site/site-constant/index.vue'),
        meta: { title: '常量设置', icon: 'table' }
      },
      {
        path: 'add-site-constant',
        name: 'Add-Site-Constant',
        hidden: true,
        component: () => import('@/views/site/site-constant/add-constant.vue'),
        meta: { title: '添加常量', icon: 'table' },
      },
      {
        path: 'edit-site-constant',
        name: 'Edit-Site-Constant', 
        hidden: true,
        component: () => import('@/views/site/site-constant/edit-constant.vue'),
        meta: { title: '编辑常量', icon: 'table' },
      },
      {
        path: 'site-pay',
        name: 'Site-Pay',
        component: () => import('@/views/site/site-pay/index.vue'),
        meta: { title: '支付设置', icon: 'table' }
      }
    ]
  },

  {
    path: '/release',
    component: Layout,
    redirect: '/release/release-agency-nft',
    name: 'Release',
    meta: { title: '发布', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'release-agency-nft',
        name: 'Release-Agency-Nft',
        component: () => import('@/views/release/agency-nft/index.vue'),
        meta: { title: '机构发布NFT', icon: 'table' }
      },
      {
        path: 'add-agency-nft',
        name: 'Add-Agency-Nft',
        hidden: true,
        component: () => import('@/views/release/agency-nft/add-agency-nft.vue'),
        meta: { title: '添加机构NFT', icon: 'table' }
      },
      {
        path: 'edit-agency-nft',
        hidden: true,
        name: 'Edit-Agency-Nft',
        component: () => import('@/views/release/agency-nft/edit-agency-nft.vue'),
        meta: { title: '编辑机构NFT', icon: 'table' }
      },
      {
        path: 'detail-agency-nft',
        hidden: true,
        name: 'Detail-Agency-Nft',
        component: () => import('@/views/release/agency-nft/detail-agency-nft.vue'),
        meta: { title: '查看机构NFT', icon: 'table' }
      },
      {
        path: 'release-personal-nft',
        name: 'Release-Personal-Nft',
        component: () => import('@/views/release/personal-nft/index.vue'),
        meta: { title: '个人发布NFT', icon: 'table' }
      }
      
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
