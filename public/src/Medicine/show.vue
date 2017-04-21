<template>
<div>
    <el-form :inline="true" :model="searcher" class="demo-form-inline">
        <el-form-item>
            <el-input v-model="searcher.anamnesis" placeholder="病例号"></el-input>
        </el-form-item>
        <el-form-item>
            <el-input v-model="searcher.username" placeholder="病人名称"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="doSearch">查询</el-button>
        </el-form-item>
    </el-form>

    <el-table :data="tableData" 
        border
        highlight-current-row
        @current-change="handleCurrentChange" style="width: 100%" height="500">
    <el-table-column
        fixed
        prop="when"
        label="日期"
        width="150">
        <template scope="scope">
            <el-icon name="time"></el-icon>
            <span style="margin-left: 10px">{{ scope.row.when | dateFilter }}</span>
      </template>
    </el-table-column>
    
    <el-table-column
        prop="anumber"
        label="病例单号"
        width="200">
    </el-table-column>
    
    <el-table-column
        prop="uname"
        label="姓名"
        width="120">
    </el-table-column>

    <el-table-column
        prop="age"
        label="年龄"
        width="80">
    </el-table-column>

    <el-table-column
        prop="sex"
        label="性别"
        width="80">
    </el-table-column>

    <el-table-column
        prop="utype"
        label="病史"
        width="120">
    </el-table-column>

    <el-table-column
        prop="cc"
        label="主诉"
        width="300">
    </el-table-column>

    <el-table-column
        prop="diagnosis"
        label="诊断"
        width="300">
    </el-table-column>

    <el-table-column
        prop="recipes"
        label="处方"
        width="300">
    </el-table-column>

    <el-table-column
        prop="satisfaction"
        label="诊疗满意情况"
        width="150">
    </el-table-column>

    <el-table-column
        fixed="right"
        label="操作"
        width="120">
        <template scope="scope">
            <el-button @click.native.prevent="listRow(scope.$index, tableData)" type="text" size="small">查看</el-button>
            <el-button @click.native.prevent="deleteRow(scope.$index, tableData)" type="text" size="small">移除</el-button>
        </template>
    </el-table-column>
  </el-table>
  <div class="block" style="float:right">
    <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentPageChange"
        :current-page="page"
        :page-sizes="[10, 20, 30, 40]"
        :page-size= "limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
    </el-pagination>
  </div>
  </div>
</template>

<script>
  export default {
    methods: {
        doSearch() {
            console.log('submit!');
            this.handleRequestData({});
        },
        deleteRow(index, rows) {
            rows.splice(index, 1);
        },
        listRow(index, rows) {
            this.$msgbox({
                title: '消息',
                message: rows[index],
                showCancelButton: true,
                confirmButtonText: '确定',
                cancelButtonText: '关闭',
            }).then(action => {
                this.$message({
                    type: 'info',
                    message: 'action: ' + action
                });
            });
        },
        handleCurrentChange(val) {
            this.currentRow = val;
        },
        handleSizeChange(val) {
            this.limit = val;
            this.handleRequestData({});
        },
        handleCurrentPageChange(val) {
            this.page = val;
            this.handleRequestData({});
        },
        handleRequestData(params) {
            this.$http.get('http://localhost:3000/api/anamnesis', {params:{'page': this.page, 'limit':this.limit}}).then((response)=>{
                this.tableData = response.body.data
            }, (response)=>{
                console.log(response);
            });
        }
    },
    filters: {  
        dateFilter: function (date) {  
            return new Date(date).toLocaleString();
        }
    },
    data() {
    return {
        searcher:{
            anamnesis: '',
            username: '',
        },
        page: 1,
        limit: 20, // 每页数量
        total: 500,
        tableData: []
    }
    },
    mounted(){
        this.$http.get('http://localhost:3000/api/anamnesis').then((response)=>{
            this.tableData = response.body.data
        }, (response)=>{
            console.log(response);
        })
    }
  }
</script>