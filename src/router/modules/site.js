import Layout from '@/layout';

const siteRouter = {
    path: '/site',
    component: Layout,
    redirect: '/site/site-rule',
    name: 'Site',
    meta: { title: '设置', icon: 'el-icon-s-help',roles: ['admin'] },
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
};


export default siteRouter;