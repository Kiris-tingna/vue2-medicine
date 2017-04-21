<template>
    <div id="app">
        <!-- 头部导航 -->
        <header class="header">
        <el-row>
            <el-col :span="24">
                <el-menu theme="dark" default-active="1" class="el-menu-demo" mode="horizontal" @select="handleSelect">
                    <el-menu-item index="1">高级插件</el-menu-item>
                    <el-menu-item index="2">在线商城</el-menu-item>
                    <el-menu-item index="3">客户管理</el-menu-item>
                    <el-menu-item index="4">系统设置</el-menu-item>
                    <el-menu-item index="5">活动发布</el-menu-item>
                </el-menu>
            </el-col>
        </el-row>
        </header>

        <main>
        <!-- 左侧导航 -->
        <el-row class="tac">
            <el-col :span="4">
            <el-menu default-active="/adminManger" class="el-menu-vertical-demo tac-menu" 
                :router="true" 
                @select="handleSelect" 
                @open="handleOpen" 
                @close="handleClose">

                <el-menu-item index="#"><i class="el-icon-menu"></i>后台首页</el-menu-item>

                <el-submenu index="/userManger">
                    <template slot="title">用户管理</template>
                    <el-menu-item index="21">用户管理选项1</el-menu-item>
                </el-submenu>

                <el-submenu index="/medicineManger/show">
                    <template slot="title">病例管理</template>
                    <el-menu-item index="/medicineManger/show"><i class="el-icon-menu"></i>病例列表</el-menu-item>
                    <el-menu-item index="/medicineManger/add"><i class="el-icon-menu"></i>增加病例</el-menu-item>
                </el-submenu>
                
                <el-menu-item index="/asd2"><i class="el-icon-setting"></i>导航三</el-menu-item>
            </el-menu>
            </el-col>

            <!-- 右侧主内容区 -->
            <el-col :span="20">
                <!-- 视图 -->
                <router-view class="view"></router-view>
            </el-col>

        </el-row>
        </main>

    </div>
</template>

<script>
export default {
    methods: {
        handleSelect(key, keyPath) {
            console.log(key, keyPath);
        },
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        }
    }
}
</script>

<style>
body {
    padding: 0;
    margin: 0;
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
}
button, input, select, textarea {
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
    color: inherit;
}
.tac {
    height: 660px;
}
.tac-menu {
    height: 660px;
}
.view {
    padding: 25px 10px;
}
</style>