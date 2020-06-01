<template>
    <div id="v_usrMgr">
      <template>
        <el-row>
          <el-button size="small" icon="el-icon-plus" @click="dialogVisible = !dialogVisible">新 增</el-button>
          <el-button size="small" icon="el-icon-delete">删 除</el-button>
          <el-button size="small" icon="el-icon-notebook-2">导 出</el-button>
        </el-row>
      </template> 
      <br/>
      
      <template>
        <el-table
          :data="tableData"
          stripe
          border
          v-loading="loading"
          :height="curHeight"
          highlight-current-row
          size="small"
          style="width: 100%">
          <el-table-column type="selection" width="40">
          </el-table-column>
          <el-table-column 
          label="序号" 
          align="center" 
          width="70">
            <template scope="scope">
                <span>{{scope.$index+1}} </span>
            </template>
          </el-table-column>
          <el-table-column
            prop="Name"
            align="center"
            label="登录账户"
            width="180">
          </el-table-column>
          <el-table-column
            prop="RealName"
            align="center"
            label="真实姓名"
            width="180">
          </el-table-column>
          <el-table-column
            align="left"
            prop="Description"
            label="用户描述"
          >
          </el-table-column>
          <el-table-column align="center" label="操作" width="210">
            <template slot="header" slot-scope="scope" >
              <el-input v-model="queryForm.keyword"
                          size="mini"
                          @change="getUserList()"
                          placeholder="输入关键字搜索" />
                          <div v-if=false>{{scope}}</div>
            </template>
            <template slot-scope="scope" class="operation">
                <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"><i class="el-icon-edit"></i></el-button>
                <el-button size="mini" @click="handleDelete(scope.$index, scope.row)"><i class="el-icon-delete"></i></el-button>
            </template>
            </el-table-column>
        </el-table>
      </template>
    
      <template>
         <div class="pagination ">
            <el-pagination @size-change="handleSizeChange"
                           @current-change="handleCurrentChange"
                           :current-page="pages.currentPage"
                           :page-sizes="[10, 20, 50, 100]"
                           :page-size="pages.pageSize"
                           layout="total, sizes, prev, pager, next, jumper"
                           :total="pages.total"
                           background>
            </el-pagination>
        </div>
      </template>

      <template>
        <el-dialog title="用户信息" :visible.sync="dialogVisible" :before-close="handleClose" center>
          <el-form ref="form" :model="form" :rules="rules" label-width="100px">
            <el-col :xs="24" :sm="12" :md="12" :lg="12">
                <el-form-item label="登录账号：" prop="Name">
                    <el-input v-model="form.Name" placeholder="请输入账号" clearable></el-input>
                </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="12">
                <el-form-item label="登录密码：" prop="Password">
                    <el-input placeholder="请输入密码" v-model="form.Password" show-password></el-input>
                </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="12">
                <el-form-item label="用户姓名：" prop="RealName">
                    <el-input v-model="form.RealName" placeholder="请输入用户姓名" clearable></el-input>
                </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="12">
                <el-form-item label="角色选择：" prop="GroupID">
                    <template>
                        <el-select v-model="form.GroupID" placeholder="请选择角色">
                            <el-option v-for="item in GroupSelectList"
                                       :key="item.Id"
                                       :label="item.Name"
                                       :value="item.Id">
                            </el-option>
                        </el-select>
                    </template>
                </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="12">
                <el-form-item label="站点选择：" prop="Station">
                    <el-cascader v-model="form.Station"
                                 :options="menuOptions"
                                 :props="menuProps"
                                 size="medium"
                                 placeholder="请选择站点">
                    </el-cascader>
                </el-form-item>
            </el-col>

            <el-col :xs="24" :sm="12" :md="12" :lg="12">
                <el-form-item label="联系电话：" prop="Phone">
                    <el-input v-model="form.Phone" placeholder="请输入联系电话" clearable></el-input>
                </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="12">
                <el-form-item label="运维单位：" prop="UnitId">
                    <el-input v-model="form.UnitId" placeholder="请选择运维单位"></el-input>
                </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="12">
                <el-form-item label="排序序号：" prop="SortOrder">
                    <el-input v-model="form.SortOrder" placeholder="请输入排序序号" clearable></el-input>
                </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="12">
                <el-form-item label="是否勾选：" prop="IsRun">
                    <el-checkbox border v-model="form.IsRun">isRun</el-checkbox>
                    <el-checkbox border v-model="form.IsAdmin">isAdmin</el-checkbox>
                </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="12">
                <el-form-item label="用户描述：" prop="Description">
                    <el-input type="textarea"
                              :rows="2"
                              placeholder="请输入少于500字"
                              v-model="form.Description">
                    </el-input>
                </el-form-item>
            </el-col>
            </el-form>

          <div slot="footer" class="dialog-footer">
            <el-button @click="onSubmite('form')">提 交</el-button>
            <el-button type="primary">重 置</el-button>
          </div>
          </el-dialog>
      </template>  
    </div>    
</template>

<script>
  export default {
    name: 'v_usrMgr',
    data() {
      return {
        styleObject: {},
        curHeight:0,//当前所需屏幕高度
        msg:"我是用户管理组件",
        tableData: [],
        pages: {
          pageSize: 10,
          currentPage: 1,
          total: 0
        },
        queryForm:{
          keyword:''
        },
        loading: true,
        dialogVisible:false,
        form: {
          Id: 0,
          Name: '',
          Password: '',
          RealName: '',
          Station: '',
          UnitId: '',
          GroupID: '',
          Phone: '',
          SortOrder: 999,
          IsRun: true,
          IsAdmin: false,
          Description: ''
        },
        rules: {
          Name: [{ required: true, message: '请输入账号', trigger: 'blur' }],
          Password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
          RealName: [{ required: true, message: '请输入用户姓名', trigger: 'blur' }],
          Station: [{ required: true, message: '请选择站点', trigger: 'blur' }],
          UnitId: [{ required: false, message: '请选择运维单位', trigger: 'blur' }],
          GroupID: [{ required: true, message: '请选择角色', trigger: 'blur' }],
          Phone: [{ required: false, message: '请输入联系电话', trigger: 'blur' }],
          SortOrder: [{ required: false, message: '请输入排序序号', trigger: 'blur' }],
          IsRun: [{ required: false, message: '请勾选', trigger: 'blur' }],
          IsAdmin: [{ required: false, message: '请勾选', trigger: 'blur' }],
          Description: [{ required: false, message: '请输入', trigger: 'blur' }]
        },
        GroupSelectList: [],//角色数据源
        menuOptions: [],//菜单数据源
        menuProps: {
            value: "sstation",
            children: 'child',
            label: 'sstationName',
            expandTrigger: "hover",
            checkStrictly: true,//单选选择任意一级选项
            emitPath: false//在选中节点改变时，是否返回由该节点所在的各级菜单的值所组成的数组，若设置 false，则只返回该节点的值
        }
        
      }
    },
    beforeMount(height) {
        var h = document.documentElement.clientHeight || document.body.clientHeight;
        this.curHeight =h - 250+'px'; //减去页面上固定高度height
        this.styleObject={
             height:this.curHeight
        }
    },
    mounted(){
      this.getUserList();
      this.getGroupSelectList();
      this.getLoaclstorageTreeSStationList();
      var Enumerable = require('linq');
      // var a = Enumerable.from(['Javascript', 'Java', 'C#', 'php', 'HTML5']).orderBy().toArray();
      // var c = Enumerable.from(['Javascript', 'Java', 'C#', 'php', 'HTML5']).where("e=>e.startsWith('J')").toArray();
      // var d= Enumerable.from(['Javascript', 'Java', 'C#', 'php', 'HTML5']).skip(1).take(2);
       
    },
    methods: {
        getUserList() {
          const qs = require('qs');
          var Enumerable = require('linq');
          var _this=this;
          _this.loading = true;
          this.$http({
              method: 'post',
              url: _this.api+'getUserList',
              data: _this.queryForm
          })
          .then(function (res) {
              // console.log(eval(res.data.result));
              _this.tableData=res.data.result.recordset;
              _this.pages.total = res.data.result.recordset.length;
              _this.tableData=Enumerable.from(_this.tableData).skip((_this.pages.currentPage-1)*_this.pages.pageSize).take(_this.pages.pageSize).orderBy("x=>x.SortOrder").toArray();
              _this.loading = false;
          })
          .catch(function (error) {
              // handle error
              console.log(error);
          })
          .finally(function () {
              // always executed
          });
        },
        handleSizeChange(val) {
          this.pages.pageSize = val;
          this.getUserList();
        },
        handleCurrentChange(val) {
          this.pages.currentPage = val;
          this.getUserList();
        },
        handleClose(done) {
          const self = this;
          this.$confirm('确认关闭?')
          .then(function () {
              done();
              self.getUserList();
          })
          .catch(function () {

          });
        },
        getGroupSelectList() {
          const self = this;
          this.$http({
              method: 'post',
              url: self.api+'getGroupSelectList'
          })
          .then(function (res) {
            console.log(eval(res.data.result));
            self.GroupSelectList = res.data.result.recordset;
          })
          .catch(function (error) {
              // handle error
              console.log(error);
          })
          .finally(function () {
              // always executed
          });  
        },
        getLoaclstorageTreeSStationList(){
          var treeData_localcache = localStorage.getItem("treeData_localcache"); //获取指定key本地存储的值
          this.menuOptions =JSON.parse(treeData_localcache);
        },
        onSubmite(){
          //提交表单
          var self = this;
          this.$http({
              method: 'post',
              url: self.api+'usrSubmit',
              data: self.form
          })
          .then(function (res) {
            self.dialogVisible=!self.dialogVisible;
            self.getUserList();
            self.$message({
              message: "操作成功！",
              type: "success"  //warning,success,info,error
            });
          })
          .catch(function (error) {
              // handle error
              console.log(error);
          })
          .finally(function () {
              // always executed
          }); 
        },
        handleEdit(index, row) {
          var self = this;
          self.form.Id=row.Id;
          this.$http({
              method: 'post',
              url: self.api+'getUsrInfoById',
              data: self.form
          })
          .then(function (res) {
            self.form=res.data.result.recordset[0];
            self.dialogVisible=!self.dialogVisible;
          })
        },
        handleDelete(index, row) {
          var self = this;
          self.form.Id=row.Id;
          this.$confirm('确认删除？')
              .then( ()=> {
                this.$http({
                  method: 'post',
                  url: self.api+'delUsrInfoById',
                  data: self.form
                })
                .then( (res)=> {
                  self.$message({
                    message: "操作成功！",
                    type: "success"  //warning,success,info,error
                  });
                  self.getUserList();
                })
          })
          .catch(function () {

          });
        },

    }
      

  }
</script>
<style scoped>
 .el-cascader {
        width: 100% !important;
    }

    .el-select {
        width: 100%;
    }
</style>