import vue from 'vue' //引入vue
import vuex from 'vuex' //引入vuex

//使用vuex
vue.use(vuex);
//创建vuex实例
const store=new vuex.Store({
    state: {
        // 存储token
        Authorization: localStorage.getItem('Authorization') ? localStorage.getItem('Authorization') : ''
      },
      actions: {
        checkToken (context) {
          context.commit('increment')
        }
      },
      mutations: {
        // 修改token，并将token存入localStorage
        changeLogin (state, user) {
          state.Authorization = user.Authorization;
          localStorage.setItem('Authorization', user.Authorization);
        }
      }
});

export default store //导出store