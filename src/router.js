import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Location from "./views/Location.vue";
import Marker from "./views/Marker.vue";
import Search from "./views/Search.vue";
import Drag from "./views/Drag.vue";
import Complete from "./views/Complete.vue";
import Transfer from "./views/Transfer.vue";
import BezierCurve from "./views/BezierCurve.vue";
import MacLehose from "./views/MacLehose.vue";

Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/location', //路径
            name: 'Location', //名称
            component: Location //组件
        },
        {
            path: '/marker', //路径
            name: 'Marker', //名称
            component: Marker //组件
        },
        {
            path: '/search', //路径
            name: 'Search', //名称
            component: Search //组件
        },
        {
            path: '/drag', //路径
            name: 'Drag', //名称
            component: Drag //组件
        },
        {
            path: '/complete', //路径
            name: 'Complete', //名称
            component: Complete //组件
        },
        {
            path: '/transfer', //路径
            name: 'Transfer', //名称
            component: Transfer //组件
        },
        {
            path: '/bezierCurve', //路径
            name: 'BezierCurve', //名称
            component: BezierCurve //组件
        },
        {
            path: '/mlh', //路径
            name: 'MacLehose', //名称
            component: MacLehose //组件
        },
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/about',
            name: 'about',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
        }
    ]
})
