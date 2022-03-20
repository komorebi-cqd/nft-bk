import Layout from '@/layout'

const orderRouter = {
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
};

export default orderRouter;