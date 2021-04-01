import Main from '../components/component/router/cmp-main.vue';
import Blog from '../components/component/router/cmp-blog.vue';
import BlogDetail from '../components/component/router/cmp-blogdetail.vue'
import EditBlog from '../components/component/router/edit-blog.vue'
import EditEveryday from '../components/component/router/edit-everyday.vue'
import BlogTag from '../components/component/router/cmp-blogTag.vue'


export default [
    {
        path: '/',
        name: 'default',
        component: Main,
    },
    {
        path: '/blog',
        name: 'blog',
        component: Blog,
    },
    {
        path:'/blog/:id',
        name: 'blogDetail',
        component:BlogDetail
    },
    {
        path:'/blog/tag/:id',
        name: 'blogTag',
        component:BlogTag
    },
    {
        path: '/editBlog',
        name: 'editBlog',
        component: EditBlog,
    },
    {
        path: '/editEveryday',
        name: 'editEveryday',
        component: EditEveryday,
    },
]