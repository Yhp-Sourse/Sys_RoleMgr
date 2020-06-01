<template>
    <div id="login">
        <div id="main">
        <div class="login_title">
            <div align="center"><img class="login-title-img" src="../assets/register/logo_title2.png" /></div>
            <form action="" method="post" class="login_form">
                <div class="login_form_user">
                    <span class="icon_userImage"></span>
                    <div class="Yline"></div>
                    <input type="text" placeholder="请输入账号/用户名" class="login_input_user" v-model='User.Name' id="usr_id" />
                </div>
                <div class="login_form_pwd">
                    <span class="icon_pwdImage"></span>
                    <div class="Yline"></div>
                    <input type="password" placeholder="请输入密码" class="login_input_pwd" v-model='User.Password' id="usr_pwd"/>
                </div>
                <div class="login_form_num">
                    <input type="text" placeholder="请输入验证码" v-model="User.ValidateCode" class="login_input_imgCode" id="imgCode" />
                    <img :src="NumSrc" id="showimg" class="showimg" alt="单击可刷新" @click="ClickRemoveChangeCode()"/>
                </div>
                <div class="login_form_submit"  @click="Login()" id="usr_login">
                    <a class="btn_login_word">登&nbsp;录</a>
                </div>
            </form>
        </div>

    </div>
    </div>
</template>

<script>
export default {
    name: 'login',
    data () {
        return {
            msg: '我是login组件',
            NumSrc:'',
            ImgCliIndex:'0',
            User:{
                Name:'admin',
                Password:'rate@1601',
                ValidateCode:'',
            }
        }
    },
    mounted (){
        this.initNunber();
    },
    methods: {
        initNunber(){
            var _this=this;
            const axios = require('axios');
            const qs = require('qs');
            
            this.NumSrc='http://localhost/ywAPI/api/Login/GetImage'
        },
        ClickRemoveChangeCode(){
           //do something
           //    var code = $("#showimg").attr("src");
           //     $("#showimg").attr("src", code + "1");
           this.NumSrc='http://localhost/ywAPI/api/Login/GetImage?Id='+this.ImgCliIndex;
           this.ImgCliIndex++;
        },
        Login(){
            const qs = require('qs');
            var _this=this;
            
            var data = qs.stringify({Name:this.User.Name,Password:this.User.Password,ImgCode:this.User.ValidateCode});
            this.$http.post('http://localhost/ywAPI/api/Login/LoginUser',data)
            .then(function (response) {
                    // handle success
                console.log(response);
                if (response.data == 'OK') {
                     window.location.href = "http://localhost:8080/#/home";
                }else{
                    _this.ClickRemoveChangeCode();
                    return false;
                }

               
                
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .finally(function () {
                // always executed
            });

        }
    },
    components:{


    }
}
</script>

<style scoped>
body {
            font-family: "微软雅黑";
            font-size: 16px;
            width: 100%;
            height: 100%;
            background: url(../assets/register/bg.png) no-repeat;
            background-size: cover;
        }

        input:-webkit-autofill, textarea:-webkit-autofill, select:-webkit-autofill {
            -webkit-text-fill-color: #868686 !important;
            -webkit-box-shadow: 0 0 0px 1000px transparent inset !important;
            background-color: transparent;
            background-image: none;
            transition: background-color 50000s ease-in-out 0s; /*背景色透明 生效时长 过渡效果 启用时延迟的时间;*/
        }

        input {
            background-color: transparent;
        }

        #main {
            background: url(../assets/register/Suspended.png) no-repeat;
            background-size: 100% 100%;
            position: absolute;
            width: 580px;
            height: 430px;
            left: 50%;
            top: 60%;
            margin-left: -300px;
            margin-top: -200px;
            opacity: 0.8;
            /*border: 1px solid #00F;*/
        }

            #main > div.login_title {
                display: inline-block;
                width: 580px;
                margin: 80px auto;
            }

        .login_form {
            width: 100%;
            margin: 30px auto;
        }

        .login_form_user, .login_form_pwd {
            background: url(../assets/register/input.png) no-repeat;
            background-size: 360px 50px;
            width: 360px;
            height: 50px;
            margin: 10px auto;
            position: relative;
        }

        .icon_userImage {
            display: inline-block;
            width: 20px;
            height: 50px;
            background: url(../assets/register/user.png) no-repeat;
            position: absolute;
            top: 50%;
            margin-left: 20px;
            margin-top: -8px;
        }

        .icon_pwdImage {
            display: inline-block;
            width: 20px;
            height: 50px;
            background: url(../assets/register/pwd.png) no-repeat;
            position: absolute;
            top: 50%;
            margin-left: 20px;
            margin-top: -8px;
        }

        .Yline {
            width: -1px;
            height: 17px;
            border: 1px solid #ccc;
            display: inline-block;
            position: absolute;
            top: 50%;
            margin-left: 50px;
            margin-top: -8px;
        }

        .login_input_user, .login_input_pwd {
            border: none;
            width: 280px;
            height: 40px;
            line-height: 50px;
            display: inline-block;
            position: absolute;
            /*top: 50%;*/
            margin-left: 70px;
            margin-top: 5px;
            background-color: #fff !important;
        }

        .login_form_submit {
            background: url(../assets/register/btn_login.png) no-repeat;
            background-size: 360px 50px;
            width: 360px;
            height: 50px;
            margin: 30px auto;
            position: relative;
        }

            .login_form_submit:hover, .login_form_user:hover, .login_form_pwd:hover {
                cursor: pointer;
                opacity: 0.6;
            }

        .btn_login_word {
            display: block;
            width: 50px;
            height: 50px;
            text-align: center;
            line-height: 50px;
            color: #fff;
            margin: 0 auto;
        }

        .login-title-img {
            width:400px;
        }

            .btn_login_word:hover {
                color: #fff;
            }
        .login_input_imgCode {
            border: 1px solid #ccc;
            width: 100px;
            height: 30px;
            line-height: 50px;
            display: inline-block;
            position: absolute;
            left: 100px;
            /*top: 50%;*/
            margin-left: 70px;
            margin-top: 5px;
            background-color: #fff !important;
        } 
        #showimg {
            margin-left: 300px;
        }
        /*css注释：为了方便截图，对CSS代码进行换行*/
</style>