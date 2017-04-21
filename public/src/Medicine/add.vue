<template>
<el-form :model="dynamicValidateForm" ref="dynamicValidateForm" :rules="rules" label-width="100px" class="demo-dynamic">
    <!-- 名称 -->
    <el-form-item label="病人名称" prop="uname">
        <el-input v-model="dynamicValidateForm.uname"></el-input>
    </el-form-item>

    <!-- 性别 -->
    <el-form-item label="性别" prop="sex">
        <el-select v-model="dynamicValidateForm.sex" placeholder="请选择性别">
            <el-option label="男" value="男"></el-option>
            <el-option label="女" value="女"></el-option>
        </el-select>
    </el-form-item>

    <!-- 年龄 -->
    <el-form-item label="年龄" prop="age">
        <el-input type="age" v-model.number="dynamicValidateForm.age"></el-input>
    </el-form-item>

    <!-- 看病时间 -->
    <el-form-item label="看病时间" required>
        <el-col :span="11">
            <el-form-item prop="utime">
                <el-date-picker type="date" placeholder="选择日期" v-model="dynamicValidateForm.utime" style="width: 100%;"></el-date-picker>
            </el-form-item>
        </el-col>
        <el-col class="line" :span="2">-</el-col>
        <el-col :span="11">
            <el-form-item prop="utime2">
                <el-time-picker type="fixed-time" placeholder="选择时间" v-model="dynamicValidateForm.utime2" style="width: 100%;"></el-time-picker>
            </el-form-item>
        </el-col>
    </el-form-item>
    <!-- 主诉 -->
    <el-form-item label="主诉" prop="cc">
        <el-input type="textarea" v-model="dynamicValidateForm.cc"></el-input>
    </el-form-item>

    <!-- 诊断 -->
    <el-form-item label="诊断" prop="diagnosis">
        <el-input type="textarea" v-model="dynamicValidateForm.diagnosis"></el-input>
    </el-form-item>

    <!-- 多选框 -->
    <el-form-item label="病史" prop="utype">
        <el-checkbox-group v-model="dynamicValidateForm.utype">
            <el-checkbox label="既往史" name="utype"></el-checkbox>
            <el-checkbox label="个人史" name="utype"></el-checkbox>
            <el-checkbox label="现病史" name="utype"></el-checkbox>
            <el-checkbox label="家族史" name="utype"></el-checkbox>
        </el-checkbox-group>
    </el-form-item>

    <!-- on/off -->
    <el-form-item label="诊疗反馈" prop="satisfaction">
        <el-switch on-text="满意" off-text="不满意" v-model="dynamicValidateForm.satisfaction"></el-switch>
    </el-form-item>
    <!-- 处方 -->
    <el-form-item 
        v-for="(recipe, index) in dynamicValidateForm. recipes"
        :label="'处方' + index"
        :key="recipe.key"
        :prop="'recipes.' + index + '.value'"
        :rules="{
            required: true, message: '处方不能为空', trigger: 'blur'
        }"
    >
        <el-input v-model="recipe.value"></el-input><el-button @click.prevent="removeRecipe(recipe)">删除</el-button>
    </el-form-item>

    <el-form-item>
        <el-button type="primary" @click="submitForm('dynamicValidateForm')">提交</el-button>
        <el-button @click="addRecipe">新增一个处方</el-button>
        <el-button @click="resetForm('dynamicValidateForm')">重置</el-button>
    </el-form-item>
</el-form>
</template>

<script>
export default {
    data() {
    return {
        dynamicValidateForm: {
            uname: '',
            cc: '',
            age: '',
            utime: '',
            utime2: '',
            utype: [],
            satisfaction: true,
            sex: '',
            recipes: [{
                value: ''
            }],
            diagnosis: ''
        },
        rules: {
            uname: [{required: true, message: '病人名称不能为空', trigger: 'blur'}],
            sex: [{required: true, message: '病人性别不能为空', trigger: 'blur'}],
            age: [ 
                {required: true, message: '年龄不能为空'},
                {type: 'number', message: '年龄必须为数字值'}
            ],
            utime: [{type: 'date', required: true, message: '请选择日期', trigger: 'change' }],
            utime2: [{type: 'date', required: true, message: '请选择时间', trigger: 'change' }],
            diagnosis: [{required: true, message: '请输入诊断', trigger: 'blur' }]
        }
    };
    },

    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.handlePost(this.dynamicValidateForm);
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        removeRecipe(item) {
            var index = this.dynamicValidateForm.recipes.indexOf(item);
            if (index !== -1) {
                this.dynamicValidateForm.recipes.splice(index, 1)
            }
        },
        addRecipe() {
            this.dynamicValidateForm.recipes.push({
                value: '',
                key: Date.now()
            });
        },
        handlePost(params) {
            this.$http.post('http://localhost:3000/api/anamnesis', params).then((response)=>{
                console.log(response);
            }, (response)=>{
                console.log(response);
            })
        }
    }
  }
</script>

<style>
.demo-dynamic {
    width: 600px;
}
.el-scrollbar__wrap{
    margin-bottom: 0 !important;
    margin-right: 0 !important;
}
.demo-dynamic .el-checkbox{
    float: left;
    width: 200px;
    margin: 0;
    padding: 0;
}
.demo-dynamic .el-checkbox:first-child{
    margin-left: 15px;
}
.demo-dynamic .line{
    text-align: center;
}
.demo-dynamic .el-input {
    margin-right: 10px;
    width: 400px;
    vertical-align: top;
}
.demo-dynamic .el-select .el-input{
    width: 150px;
}
</style>