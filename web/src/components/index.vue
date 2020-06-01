<template>
    <div class="v_layout">
        <el-container>
            <el-main>
                <div class="app" v-for="(item,index) in menuArr" :key="index">
                    <div><el-image
                        style="width: 60px; height: 60px;border-radius:50%;"
                        :src=item.MenuIcon
                        fit="contain"></el-image></div>
                    <div>{{item.MenuName}}</div>
                </div>
                
            </el-main>
            <el-footer>
                <div align="left">
                    <el-image
                    style="width: 40px; height: 40px;border-radius:50%;"
                    src='/src/assets/register/winBtn.jpg'
                    fit="contain"></el-image>
                </div>
            </el-footer>
        </el-container>

    </div>
</template>

<script>
export default {
  name: 'v_layout',
  data() {
    return {
      menuArr:[]
    }
  },
   mounted() {
  	    this.initMenu()
    },
    methods: {
        initMenu(){
            let _this = this;

            this.$http({
                method: 'post',
                url: _this.api+'getAllMenu',
                data: {}
            }).then(res => {

                _this.menuArr=res.data.result.recordset
               
            }).catch(error => {
                alert('未知原因，请检查网络是否连接！');
                console.log(error);
            });       

        }
    }
}
</script>

<style scoped>
 .el-header, .el-footer {
    background-color: #3a8ee682;
    color: #333;
    text-align: center;
    line-height: 40px;
  }
  .el-footer {
      background-color: #3a8ee682;
      width: 100%;
      height: 40px !important;
      position: fixed;
      bottom: 2px;
  }

  /* .app{
      float: left;
  } */
</style>