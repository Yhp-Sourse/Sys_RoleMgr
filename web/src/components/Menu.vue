<template>
       <div id="v_menu" :style="styleObject">
           <el-scrollbar>
                <el-row>
                    <el-col v-if="true" :span="24" style="height:100%">
                        <el-menu
                        router
                        :default-active="this.$router.path"
                        @select="handleSelect"
                        @open="handleOpen"
                        @close="handleClose"
                        >
                            <el-submenu  v-for="(first) in menuData" :index="first.Id" :key="first.Id">
                                <template slot="title" >
                                    <i :class="first.ClassName"></i>
                                    <span>{{first.MenuName}}</span>
                                </template>
                                <el-menu-item-group>
                                    <el-menu-item v-for="(second) in first.Chirld" :index="second.Link" :key="second.Id">{{second.MenuName}}</el-menu-item>
                                </el-menu-item-group>
                            </el-submenu>
                        </el-menu>
                    </el-col>
                </el-row>
            </el-scrollbar>
        </div>
</template>

<script>
var TestCom;            
export default {
    name: 'v_menu',
    data () {
        return {
            styleObject: {},
            curHeight:0,//当前所需屏幕高度
			isCollapse: false,
			isunique: true,
            currentRoute: "",
            opens: [],
            menuData: [],
            first:[],
            second:[]
        };
    },
    beforeMount(height) {
        var h = document.documentElement.clientHeight || document.body.clientHeight;
        this.curHeight =h - 60; //减去页面上固定高度height
        this.styleObject={
             height:this.curHeight+'px'
        }
    },
    mounted(){
        this.init();
        // this.currentRoute = this.$route.path;
        // console.log("当前路由路径"+this.currentRoute);
        // this.opens = [];
        // this.opens[0] = this.currentRoute.substring(
        //     this.currentRoute.indexOf("/"),
        //     this.currentRoute.lastIndexOf("/")
        // );
        // console.log(this.opens);
    },
    methods:{
        init(){
            const qs = require('qs');
            // var linq=require('linqjs');
            var _this=this;
            this.$http({
                    method: 'post',
                    url: _this.api+'getAllMenu',
                })
            .then(function (res) {
                // handle success
                //console.log(eval(res.data.result));
                var arr=res.data.result.recordset;
                arr.forEach(i => {
                    if(i.PId==0){
                        //_this.first.push(i);
                        _this.first.push({
                            Id:i.Id+"",//转成字符串格式
                            MenuName:i.MenuName,
                            Link:i.Link,
                            PId:i.PId,
                            Level:i.Level,
                            Location:i.Location,
                            ClassName:i.ClassName,
                            Chirld:[]
                        });
                    }else{
                        //_this.second.push(i);
                        _this.second.push({
                            Id:i.Id+"",//转成字符串格式
                            MenuName:i.MenuName,
                            Link:i.Link,
                            PId:i.PId,
                            Level:i.Level,
                            Location:i.Location,
                            ClassName:i.ClassName,
                            Chirld:[]
                        });
                    }
                });
                
                for(var i=0;i<_this.first.length;i++){
                    for(var j=0;j<_this.second.length;j++){
                        if(_this.second[j].PId==_this.first[i].Id){
                            _this.first[i].Chirld.push(_this.second[j]);
                        }
                    } 
                } 
                // console.log(_this.first);
                _this.menuData=_this.first;
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .finally(function () {
                // always executed
            });
        },
        handleSelect(key, keyPath) {//子组件的方法名，随便取
            // console.log(this.$route);//当前路由信息
			// 因为要调用的是事件为parentFn，后面跟上参数
            // this.$emit('parentFn',{param:this.$route.name});
            // console.log(this.$router.options.routes);//全局所有路由
            this.$router.options.routes.forEach(item => {//遍历全局所有路由。并找到当前路由信息并跳转该路由。
                if(item.path==key){
                    this.$emit('parentFn',{param:item.name});
                    return;
                }
            });
            // if(this.$route.path.indexOf(key)>-1){
            //     this.$emit('parentFn',{param:this.$route.name});
            // }
        },
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        }
    },
    components:{
        
    }

}
</script>

<style scoped>
#v_menu{
    
}
.el-scrollbar__view {
    height: 100%;
}
.el-scrollbar__wrap{
  overflow: hidden;
}
#v_menu::-webkit-scrollbar { /*滚动条整体样式*/
    width: 1px; /*高宽分别对应横竖滚动条的尺寸*/
    height: 1px;
}
.el-submenu .el-menu-item {
    text-align: center;
}        
</style>