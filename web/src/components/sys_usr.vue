<template>
  <div class="sys">
  	<el-container>
      <el-header>通用权限管理系统</el-header>
      <el-container>
        <el-aside width="200px">
          <Menu @parentFn="appendToTabs"></Menu>
        </el-aside>
        <el-main>
          <Tabs ref="tab"></Tabs>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
 
<script>
import Menu from './Menu.vue'
import Tabs from './Tabs.vue'

export default {
  name: 'sys',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      user:[]
    }
  },
  mounted() {
    //this.getdata();
     this.getTreeSStationList();//将站点数数据缓存到localstorage本地，下次直接从localstorage本地获取。
  },
  components:{
    Menu,Tabs
  },
  methods: {
    //兄弟组件之间的通讯有一个方法是通过父组件进行交互，那么解决的思路就是子组件调用父组件的方法，然后父组件调用另一个子组件的方法，这样就实现了兄弟组件的交互功能。
    //这个是父组件的方法，名字随便定义
    appendToTabs({param}){
        //console.log('参数',param)
        //因为要调用的是别名为ref=tab的子组件中定义的addTab方法，所以就这么写
        this.$refs.tab.addTab({param});//父组件调用tab子组件的addTab方法。
    },
    getTreeSStationList() {
      var Enumerable = require('linq');
      const self = this;
      this.$http({
          method: 'post',
          url: self.api+'getTreeSStationList'
      })
      .then(function (res) {
        var data=res.data.result.recordset;
        var shengArr=Enumerable.from(data).where("p=>p.sstationType=='STPCenter'").toArray();//省
        var shiArr=Enumerable.from(data).where("p=>p.sstationType=='STCenter'").toArray();//市
        shiArr.forEach(shi => {
          shi.child=Enumerable.from(data).where("p=>p.sstationType=='ST06' && p.Status==1 && p.IsPJD==1 && p.AreaCode=="+shi.ZoneCode).toArray();//市下级的站点
        });
        shengArr.forEach(sheng => {
          sheng.child=shiArr;
        });
        localStorage.setItem('treeData_localcache', JSON.stringify(shengArr)); //缓存到本地

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
.sys{
  height: 100%;
}

.el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  
  .el-aside {
     background-color: #D3DCE6;
    color: #333; 
    /* text-align: center; */
    /* line-height: 200px; */
    height: 100%;
  }
  
  /* .el-main { */
    /* background-color: #E9EEF3; */
    /* color: #333; */
    /* text-align: center; */
    /* line-height: 160px; */
  /* } */
  
  body > .el-container {
    margin-bottom: 40px;
    height: 100%;
  }
  
 
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    /* line-height: 260px; */
    height: 100%;
  }
  
  .el-container:nth-child(7) .el-aside {
    /* line-height: 320px; */
    height: 100%;
  }

  .el-container.is-vertical {
    height: 100%;
}
</style>
