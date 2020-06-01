<template>
    <div id="v_menu">{{navData}}
        <el-menu :default-active="currentRoute"
                 :default-openeds="opens"
				 :unique-opened="isunique"
				 router
                 class="el-menu-vertical-demo"
				 @select="handleSelect"
                 :collapse="isCollapse">
            <!-- 有子菜单 -->
            <template  v-for="(first,f_index) in navData">
                <el-submenu 
                    :index="first.Id"
                    :key="`menu0_${f_index}`"
                    v-if="first.treeChildren.length>0">
                        <template slot="title"
                                v-if="first.tree_menuName">
                            <i class="el-icon-menu"></i>
                            <span slot="title">{{first.tree_menuName}}</span>
                        </template>
                        <el-menu-item-group v-for="(second,s_index) in first.treeChildren"
                                        :key="s_index">
                        <!-- <span slot="title"
                              v-if="second.tree_menuName">{{second.tree_menuName}}</span> -->
							<el-menu-item 
								:index="second.tree_LinkPage"
								:key="s_index">{{second.tree_menuName}}
							</el-menu-item>
                        </el-menu-item-group>
                </el-submenu>
                <!-- 没有子菜单 -->
                <el-menu-item :index="first.tree_LinkPage"
                              :key="`menu0_${f_index}`"
                              v-if="first.treeChildren.length==0">
                    <i class="el-icon-menu"></i>
                    <span slot="title">{{first.tree_menuName}}</span>
                </el-menu-item>
            </template>
        </el-menu>
    </div>
</template>

<script>
var TestCom;            
export default {
    name: 'v_menu',
    data () {
        return {
			isCollapse: false,
			isunique: true,
            currentRoute: "",
            opens: [],
            navData: [],
        };
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
            var _this=this;
            this.$http({
                    method: 'get',
                    url: _this.api+'getAllMenu',
                })
            .then(function (res) {
                    // handle success
                console.log(eval(res.data.result));
                _this.navData=res.data.result.recordset;
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .finally(function () {
                // always executed
            });
        },
        // handleSelect(key, keyPath) {
        //     console.log(key, keyPath);
        //     this.$emit('handleSelect');
        // },
        handleSelect(key, keyPath) {//子组件的方法名，随便取
            //  console.log(this.$route);//路由信息
			//因为要调用的是事件为parentFn，后面跟上参数
            this.$emit('parentFn',{param:this.$route.name});
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
    width: 15%;
}
</style>