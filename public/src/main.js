import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import routeConfig from './routers'  // 引入router-config.js文件
import ElementUI from 'element-ui'
// 样式文件需要单独映入
import 'element-ui/lib/theme-default/index.css'
import App from './App.vue'

// 加载路由中间件
Vue.use(VueRouter)

// 后台交互中间件
Vue.use(VueResource)

// element UI
Vue.use(ElementUI)

//定义路由
const router = new VueRouter({
    routes: routeConfig
})

new Vue({
    router,
    el: '#app',
    render: h => h(App)
})