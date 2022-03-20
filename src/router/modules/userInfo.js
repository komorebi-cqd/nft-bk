import Layout from '@/layout'

const userInfoRouter = {
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
  };

export default userInfoRouter;