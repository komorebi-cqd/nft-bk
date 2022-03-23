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
            meta: { title: '机构订单NFT', icon: 'table',roles: ['agency'] }
        },
        {
            path: 'personal-order',
            name: 'Personal-Order',
            component: () => import('@/views/order/personal-order.vue'),
            meta: { title: '个人订单NFT', icon: 'tree',roles: ['admin'] }
        }
    ]
};

export default orderRouter;