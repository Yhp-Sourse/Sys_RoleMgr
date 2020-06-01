<template>
    <div id="v_home">
        <Menu @parentFn="childTreeFn"></Menu>
        <Tasbs ref="tab"></Tasbs>
    </div>
</template>

<script>
import Menu from './Menu.vue'
import Tasbs from './Tabs.vue'

export default {
    name: 'v_home',
    data () {
        return {
            activeIndex: '1',
        };
    },
    mounted(){
        //this.init();
    },
    methods:{
        init(){
            let _this = this;
            this.$http({
                    method: 'get',
                    url: _this.api+'userList'
                }).then(res => {
                    
                   
                }).catch(error => {
                   
                });
        },
        //这个是父组件的方法，名字随便定义
        childTreeFn({param}){
            // console.log('参数',param)
            //因为要调用的是别名为ref=tab的子组件中定义的addTab方法，所以就这么写
            this.$refs.tab.addTab({param});
        }

        
    },
    components:{
        Menu,Tasbs
    }

}
</script>

<style scoped>

</style>