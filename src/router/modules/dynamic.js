import Layout from '@/layout'

const dynamicRouter = {
    path: '/dynamic',
    component: Layout,
    redirect: '/dynamic/trends',
    name: 'Dynamic',
    meta: { title: '动态 NFT', icon: 'el-icon-s-help',roles: ['admin'] },
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
  };

  export default dynamicRouter;