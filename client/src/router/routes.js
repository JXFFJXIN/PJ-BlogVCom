import Main from '../components/component/router/cmp-main.vue';
import Blog from '../components/component/router/cmp-blog.vue';
import BlogDetail from '../components/component/router/cmp-blogdetail.vue'
import LeaveMsg from '../components/component/router/cmp-leaveMsg.vue'
import About from '../components/component/router/cmp-about.vue'
import EditBlog from '../components/component/router/edit-blog.vue'
import EditEveryday from '../components/component/router/edit-everyday.vue'
import MapView from '../components/component/router/cmp-map.vue'


export default [
    {
        path: '/',
        name: 'default',
        component: Main,
    },
    {
        path: '/map',
        name: 'map',
        component: MapView,
    },
    {
        path: '/blog',
        name: 'blog',
        component: Blog,
        children: [{
            path: '/:id',
            name: 'blogDetail',
            component: BlogDetail
        }]
    },
    {
        path: '/about',
        name: 'about',
        component: About
    },
    {
        path: '/leaveMsg',
        name: 'leaveMsg',
        component: LeaveMsg,
    },
    {
        path: '/editBlog',
        name: 'editBlog',
        component: EditBlog,
    },
    {
        path: '/editEveryday',
        name: 'editEveyday',
        component: EditEveryday,
    },
]