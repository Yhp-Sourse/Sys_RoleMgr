import Vue from "vue";
import VueRouter from "vue-router";
//全局注册VueRouter
Vue.prototype.$router = VueRouter

// 引入组件
import login from "./components/login.vue";
import home from "./components/home.vue";
import map from "./components/Map.vue";
// import layout from "./components/Layout.vue";
import index from "./components/index.vue";
import sys_usr from "./components/sys_usr.vue";
import video from "./components/video.vue";
import videoIndex from "./components/video/index.vue";

//系统业务模块组件
import usrMgr from "./components/usrmgr.vue";
import menuMgr from "./components/menuMgr.vue";
import Test from "./components/Test.vue";



// 要告诉 vue 使用 vueRouter
Vue.use(VueRouter);

const routes = [
    {
        path: '/', 
        redirect: '/login' 
    },
    {
        path:"/login",
        name: '登录',
        component: login
    },
    {
        path:"/map",
        name: '登录',
        component: map
    },
    {
        path: "/home",
        name: '首页',
        component: home,
        children:[]
    },
    {
        path: '/map', 
        name: '高德地图',
        component: map
    },
    {
        path: '/video', 
        name: '相机',
        component: video
    },
    {
        path: '/video/index', 
        name: '短视频',
        component: videoIndex
    },
    {
        path: '/index', 
        name: '首页',
        component: index
    },
    {
        path: '/Test', 
        name: 'Test',
        component: usrMgr
    },
    {
        path: '/UserMgr/UserMgrList', 
        name: '用户管理',
        redirect: '/sys_usr/UserMgr/UserMgrList',
        component: usrMgr
    },
    {
        path: '/SysManage/AdminMenuList', 
        name: '菜单管理',
        redirect: '/sys_usr/SysManage/AdminMenuList',
        component: menuMgr
    },
    {
        path: '/sys_usr', 
        name: '系统管理',
        component: sys_usr,
        children:[
            //用户管理
            {
                // 当 /sys_usr/UserMgr/UserMgrList 匹配成功，
                // 组件 会被渲染在  <router-view> 中
                path: '/sys_usr/UserMgr/UserMgrList', 
                name: '用户管理',
                component: usrMgr
            },//用户管理
            {
                path: '/sys_usr/SysManage/AdminMenuList',
                name: '菜单管理',
                component: menuMgr
            }
            
        ]
    }
]

var router =  new VueRouter({
    routes
})


// 导航守卫
// 使用 router.beforeEach 注册一个全局前置守卫，判断用户是否登陆
router.beforeEach((to, from, next) => {
    if (to.path === '/login') {
      next();
    } else {

      let token = localStorage.getItem('Authorization');
      if (token === 'null' || token === ''|| token === null) {
           //token到期或者不存在
           next('/login');
      } else {

            next();
      }
    }
});
export default router;
