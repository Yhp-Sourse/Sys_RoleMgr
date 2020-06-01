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
import usrMgr from "./components/usrmgr.vue";
import menuMgr from "./components/menuMgr.vue";
import Test from "./components/Test.vue";

//系统业务模块组件
import SecMonitor from "./components/Business/联网概况/SecMonitor.vue";
import ConnectAnalysis from "./components/Business/联网概况/ConnectAnalysis.vue";
import OnlineSurvey from "./components/Business/联网概况/OnlineSurvey.vue";

import TaskPlan from "./components/Business/日常任务/TaskPlan.vue";
import TaskPlanAudit from "./components/Business/日常任务/TaskPlanAudit.vue";
import TaskList from "./components/Business/日常任务/TaskList.vue";
import TaskAudit from "./components/Business/日常任务/TaskAudit.vue";
import TaskConfig from "./components/Business/日常任务/TaskConfig.vue";
import SceneInspectTaskYwUnitAudit from "./components/Business/日常任务/SceneInspectTaskYwUnitAudit.vue";
import ModifyProblemList from "./components/Business/日常任务/ModifyProblemList.vue";
import TaskCategory from "./components/Business/日常任务/TaskCategory.vue";

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
        children:[
            //系统业务模块路由
            {
                path: '/home/map', 
                name: '高德地图',
                component: map
            },
            //联网概况
            {
                // 当 /home/ConnectManagement/SecMonitor 匹配成功，
                // SecMonitor 会被渲染在 home <router-view> 中
                path:'/home/ConnectManagement/SecMonitor',
                name: '实时监控',
                component:SecMonitor
            },
            {
                path: '/home/ConnectManagement/ConnectAnalysis', 
                name: '数据获取率',
                component: ConnectAnalysis
            },
            {
                path: '/home/ConnectManagement/OnlineSurvey', 
                name: '在线概况',
                component: OnlineSurvey
            },
           //日常任务
            {
                path: '/home/YwManagement/TaskPlan', 
                name: '运维计划',
                component: TaskPlan
            },
            {
                path: '/home/YwManagement/TaskPlanAudit', 
                name: '运维计划审核',
                component: TaskPlanAudit
            },
            {
                path: '/home/YwManagement/TaskList', 
                name: '运维任务',
                component: TaskList
            },
            {
                path: '/home/YwManagement/TaskAudit', 
                name: '运维任务审核',
                component: TaskAudit
            },
            {
                path: '/home/YwManagement/TaskConfig', 
                name: '任务统计',
                component: TaskConfig
            },
            {
                path: '/home/SceneInspectTask/SceneInspectTaskYwUnitAudit', 
                name: '检查任务确认',
                component: SceneInspectTaskYwUnitAudit
            },
            {
                path: '/home/YwManagement/ModifyProblemList', 
                name: '运维问题整改',
                component: ModifyProblemList
            },
            {
                path: '/home/YwManagement/TaskCategory', 
                name: '任务类别配置',
                component: TaskCategory
            },
        ]
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
