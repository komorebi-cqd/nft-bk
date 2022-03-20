import Layout from '@/layout'

const releaseRouter = {
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
  };

export default releaseRouter;