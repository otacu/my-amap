import Vue from "vue";
import App from "./App.vue";
import router from "./router.js";
import VueAMap from "vue-amap";
import axios from "axios";

Vue.prototype.axios = axios;

Vue.config.productionTip = false

Vue.use(VueAMap)
// 初始化vue-amap
VueAMap.initAMapApiLoader({
    // 高德的key
    key: 'a447c2c8e127a20885970e9a115daaee',
    // 插件集合
    plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor', 'Geolocation','AMap.Transfer'],
    // 高德 sdk 版本，默认为 1.4.4
    v: '1.4.4'
})

new Vue({
    render: h => h(App),
    router
}).$mount('#app')

