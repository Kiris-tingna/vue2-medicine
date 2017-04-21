// 引入组件
import user_show from './User/show.vue'
import medicine_add from './Medicine/add.vue'
import medicine_show from './Medicine/show.vue'

export default [
    // 配置路由
    // user 列表
    {path:'/userManger', component:user_show},
    // medicine 列表
    {path:'/medicineManger/show', component:medicine_show},
    // medicine 添加
    {path:'/medicineManger/add', component:medicine_add}
]