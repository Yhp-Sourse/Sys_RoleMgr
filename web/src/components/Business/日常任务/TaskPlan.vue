<template>
    <div id="v_TaskPlan">
        <template>
            <el-table
                :data="tableData"
                height="500"
                border
                style="width: 100%">
                    <el-table-column
                        prop="PlanNo"
                        label="计划单号"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="City"
                        label="城市"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="SStationName"
                        label="站点名称">
                    </el-table-column>
            </el-table>
        </template>
    </div>
</template>
<script>
export default {
    name: 'v_TaskPlan',
    data () {
        return {
			tableData:[]
        };
    },
    mounted(){
        this.init();
    },
    methods:{
        init(){
            const qs = require('qs');
            var _this=this;
            this.$http.get('http://localhost/ywAPI/api/TaskPlan/TaskPlanAudit_FindByPage',{
                params:{
                    page:1,
                    rows:20,
                }
            })
            .then(function (response) {
                    // handle success
                console.log(eval(response.data));
                _this.tableData=eval(response.data);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .finally(function () {
                // always executed
            });
        },
        
    },
    components:{
        
    }
}
</script>
<style scoped>

</style>
