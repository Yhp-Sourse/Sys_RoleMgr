<template>
    <div id="v_Tabs">
        <el-tabs v-model="editableTabsValue"  type="card"  @tab-remove="removeTab">
          <el-tab-pane
              v-for="(item) in editableTabs"
              :key="item.name"
              :label="item.title"
              :name="item.name"
              :closable="item.close"
          >
              <!-- 首页高德地图组件 -->
              <!-- <Map style="border-radius: 1px;margin: -15px 10px 0px 10px;" ></Map> -->
              <component :is="item.component"></component>
              
              <!-- 二级路由 显示home路由下的子路由视图 如果路由名称和当前页面的名称不对应则不显示。-->
              <router-view v-if="$route.name==item.title"></router-view>
          </el-tab-pane>
        </el-tabs>
    </div>
    
</template>
<script>
  import Test from './Test.vue'

  export default {
    name: 'v_Tabs',
    data() {
      return {
        editableTabsValue: '1',
        editableTabs: [{
          title: '首页',
          name: '1',
          content: '',
          component:Test,
        }],
        tabIndex: 1
      }
    },
    mounted(){
      console.log(this.$route);//路由信息
    },
    methods: {
      addTab(targetName) {
        // console.log(targetName);
        var exist = false;
        for (var i = 0; i < this.editableTabs.length; i++) {
          if (targetName.param === this.editableTabs[i].title) {
            exist = true;
            // this.editableTabsValue=i;
            this.editableTabsValue=this.editableTabs[i].name;
            return;
          }
        }
        let newTabName = ++this.tabIndex + '';
        this.editableTabs.push({
          title: targetName.param,
          name: newTabName,
          content: targetName.param,
          editable:'',
          close:'closable'
        });
        this.editableTabsValue = newTabName;
      },
      removeTab(targetName) {
        let tabs = this.editableTabs;
        let activeName = this.editableTabsValue;
        if (activeName === targetName) {
          tabs.forEach((tab, index) => {
            if (tab.name === targetName) {
              let nextTab = tabs[index + 1] || tabs[index - 1];
              if (nextTab) {
                activeName = nextTab.name;
              }
            }
          });
        }
        
        this.editableTabsValue = activeName;
        this.editableTabs = tabs.filter(tab => tab.name !== targetName);
      }
    },
    components:{
        Map
    }

  }
</script>
<style scoped>
/* #v_Tabs[data-v-bdda1ea4] {
    width: 84% !important;
    float: right;
    position: absolute;
    top: 0px;
    right: 0px;
} */
 /* .el-tabs--card>.el-tabs__header .el-tabs__item .el-icon-close:nth-child(1) span{
     display: none !important;
} */
.el-tabs__item .el-icon-close:before {
    -webkit-transform: scale(.9);
    transform: scale(.9);
    display: none !important;
}
/* .el-tabs__item.is-closable {
    display: none !important;
} */
</style>