<template>
  <div id="app">
    <header>
    <!-- router-link 定义点击后导航到哪个路径下 -->
      <router-link to="/login"></router-link>
      <!-- <router-link to="/home">home</router-link> -->
    </header>
    <!-- 对应的组件内容渲染到router-view中 -->
    <router-view></router-view>   
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<style scoped>

</style>
