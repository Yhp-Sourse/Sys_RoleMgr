import Vue from 'vue'
import App from './App.vue'
import store from './store'

// 引入路由
import router from "./router.js"    // import router 的router 一定要小写， 不要写成Router, 否则报 can't match的报错

import axios from 'axios'
/*引入资源请求插件*/
// import VueResource from 'vue-resource'
//ElementUI
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
//引用elementui
Vue.use(ElementUI);

import Video from 'video.js'
import 'video.js/dist/video-js.css'

//ip地址加端口号
const baseURL = 'http://127.0.0.1:3001/api/'
 const loginurl = 'http://127.0.0.1:3001/'
Vue.prototype.api= baseURL;
Vue.prototype.loginapi= loginurl;

/*使用VueResource插件*/
// Vue.use(VueResource)

Vue.config.productionTip = false
//全局注册axios
Vue.prototype.$http = axios

// 添加请求拦截器，在请求头中加token
axios.interceptors.request.use(
  config => {
    if (localStorage.getItem('Authorization')) {
      // alert(localStorage.getItem('Authorization'));
      config.headers.Authorization = localStorage.getItem('Authorization');
    }
 
    return config;
  },
  error => {
    return Promise.reject(error);
});
//在 response 拦截器实现
axios.interceptors.response.use(
  res => {
    const status = res.data.status;
    //alert(status);
    if(status=='10010'){
      //this.$router.push('/login');
      window.location.href="http://localhost:8080";
    }
    return res;

  }, error => {
    return Promise.reject(error);
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
// new Vue({
//   el: '#app',
//   router,  // 注入到根实例中
//   render: h => h(App)
// })
