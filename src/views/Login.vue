<template>
  <div class="bg">
    <div class="login">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名" prop="userName">
          <el-input v-model="ruleForm.userName"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pwd">
          <el-input v-model="ruleForm.pwd" show-password></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import {login} from '../api/index'
import md5 from 'js-md5'
export default {
  data(){
    return{
       ruleForm: {
          userName: '',
          pwd: ''
        },
        rules: {
          userName: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
          ],
          pwd: [
            { required: true, message: '请选择密码', trigger: 'change' }
          ],
        }
    }
  },
  methods:{
    submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let params = {
              userName:this.ruleForm.userName,
              pwd:md5(this.ruleForm.pwd)
            }
            login(params).then(({data})=>{
              if(data.ok === 1){
                this.$cookies.set('token', data.data)
                sessionStorage.setItem('token',data.data)
                this.$router.push('/')
              }
            })
          } else {
            return false;
          }
        });
      },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>

<style lang="less">
.bg {
  .login {
    width: 300px;
    margin: 200px auto;
  }
}
</style>