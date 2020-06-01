<template>
    <div class="Login">
        <el-form ref="loginForm" :model="loginForm" :rules="rules" label-width="80px" class="login-box">
        <!-- <h3 class="login-title">欢迎登录</h3> -->
        <div align="center">
            <el-image
            style="width: 60px; height: 60px;border-radius:50%;"
            src='/src/assets/register/profile.jpg'
            fit="contain"></el-image>
        </div>
        <el-form-item label="账号" prop="username">
            <!-- <i class="el-icon-user"></i> -->
            <el-input type="text" placeholder="请输入账号" v-model="loginForm.username"/>
        </el-form-item>
        <el-form-item label="密码" prop="password">
            <el-input type="password" placeholder="请输入密码" v-model="loginForm.password"/>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" v-on:click="login('loginForm')">登录</el-button>
        </el-form-item>
        </el-form>

        <el-dialog
        title="温馨提示"
        :visible.sync="dialogVisible"
        width="30%"
        >
        <span>请输入账号和密码</span>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
        </el-dialog>
    </div>
</template>

<script>
import { mapMutations } from 'vuex';
export default {
    name: 'Login',
    data () {
        return {
            loginForm: {
                username: '',
                password: ''
            },
            // 表单验证，需要在 el-form-item 元素中增加 prop 属性
            rules: {
                username: [
                    {required: true, message: '账号不可为空', trigger: 'blur'}
                ],
                password: [
                    {required: true, message: '密码不可为空', trigger: 'blur'}
                ]
            },

            // 对话框显示和隐藏
            dialogVisible: false
        }
    },
    mounted() {
  	    //this.getdata()
    },
    methods: {
        ...mapMutations(['changeLogin']),
        login (formName) {
            const qs = require('qs');
            let _this = this;

            // 为表单绑定验证功能
            this.$refs[formName].validate((valid) => {
            if (valid) {
                console.log('http://127.0.0.1:3001/userLogin');
                this.$http({
                    method: 'post',
                    url: 'http://127.0.0.1:3001/userLogin',
                    data: _this.loginForm
                }).then(res => {
                    if(res.data.Issuccess){//验证成功
                        _this.$message({
                                message: res.data.msg,
                                type: 'success'
                            });
                        _this.userToken = res.data.token;
                        //将用户token保存到vuex中
                        _this.changeLogin({ Authorization: _this.userToken });
                        _this.$router.push('/sys_usr');
                    }else{
                        alert(res.data.msg);
                    }
                   
                }).catch(error => {
                    _this.$message({
                                message: '未知原因，请检查网络是否连接！',
                                type: 'warning'
                            });
                    console.log(error);
                });
            } else {
                this.dialogVisible = true;
                return false;
            }

            });
            // if (this.loginForm.username === '' || this.loginForm.password === '') {
            //     alert('账号或密码不能为空');
            // } 
            // else {
                
            // }
        },
        getdata(){
            const qs = require('qs');
            var _this=this;
            this.$http.get(this.api+'userList')
            .then(function (response) {
                var data=qs.parse(response.data).data.recordset;
                _this.user =data;
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .finally(function () {
                // always executed
            });
        }
    }
}
</script>

<style scoped>
    
  .login-box {
    border: 1px solid #DCDFE6;
    width: 350px;
    margin: 180px auto;
    padding: 35px 35px 15px 35px;
    border-radius: 5px;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    box-shadow: 0 0 25px #909399;
  }

  .login-title {
    text-align: center;
    margin: 0 auto 40px auto;
    color: #303133;
   
  }
  .el-button--primary{
    margin-left: 60px !important;
  }
  
</style>