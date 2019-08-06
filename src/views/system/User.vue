<template>
  <div>
    <el-dialog :visible.sync="dialogFormVisible" @closed="formData={}" append-to-body>
      <el-form :model="formData" :rules="rules" ref="ruleForm" :inline="true" label-width="120px">
        <el-form-item label="姓名" prop="name">
          <el-input type="text" v-model="formData.name" maxlength="20" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input type="text" v-model="formData.phone" maxlength="11" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-select v-model="formData.sex">
            <el-option label="男" :value="1"></el-option>
            <el-option label="女" :value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="formData.agentType!==0" label="区域经理" prop="agentType">
          <el-select v-model="formData.agentType" @change="selectArea">
            <el-option label="省级" :value="1"></el-option>
            <el-option label="市级" :value="2"></el-option>
            <el-option label="区级" :value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="角色" prop="roleId" v-if="formData.agentType===0">
          <el-select v-model="formData.roleId">
            <el-option v-for="item of roles" :label="item.name" :value="item.id" :key="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="formData.agentType!==0" label="区域" prop="areaId">
          <el-cascader v-model="formData.area" :options="area" @change="selectArea"></el-cascader>
        </el-form-item>
        <el-form-item v-if="formData.agentType&&formData.area" label="店铺" prop="shopId">
          <el-select v-model="formData.shopId">
            <el-option v-for="item of selectMall" :key="item.id" :label="item.name" :value="item.id"
                       placeholder="选择店铺"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="生日" prop="birthday">
          <el-date-picker v-model="formData.birthday" placeholder="选择生日"></el-date-picker>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input type="text" v-model="formData.age" maxlength="2" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="入职日期" prop="entryTime">
          <el-date-picker v-model="formData.entryTime" placeholder="选择日期"></el-date-picker>
        </el-form-item>
        <el-form-item label="用户名" prop="username">
          <el-input type="text" v-model="formData.username" maxlength="20" autocomplete="off"
                    :disabled="Boolean(formData.id)"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="formData.password" maxlength="20" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="state">
          <el-select v-model="formData.state">
            <el-option label="锁定" :value="1"></el-option>
            <el-option label="解锁" :value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注" prop="remarks">
          <el-input type="textarea" v-model="formData.remarks" maxlength="20" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit('ruleForm')">确 定</el-button>
      </div>
    </el-dialog>
    <div class="top">
      <el-form :inline="true" :model="searchForm" size="small">
        <el-form-item v-if="($store.state.permission.indexOf(70407) !== -1)">
          <el-select v-model="searchForm.userType" @change="fetch()">
            <el-option label="本店用户" :value="4"></el-option>
            <el-option label="分店区域经理" :value="5"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <el-button v-if="($store.state.permission.indexOf(70407) !== -1)" type="primary" size="small" round @click="openDialog">新建区域经理</el-button>
      <el-button v-if="($store.state.permission.indexOf(70407) !== -1)" type="primary" size="small" round @click="openDialog(0)">新建普通用户</el-button>
    </div>
    <el-table :data="tableData" style="width: 100%" v-loading="loading">
      <el-table-column prop="id" label="编号"></el-table-column>
      <el-table-column prop="name" label="姓名"></el-table-column>
      <el-table-column prop="phone" label="电话"></el-table-column>
      <el-table-column prop="age" label="年龄"></el-table-column>
      <el-table-column prop="entryTime" label="入职日期">
        <template slot-scope="scope"><span>{{formatDate(new Date(scope.row.entryTime),'yyyy-MM-dd')}}</span></template>
      </el-table-column>
      <el-table-column prop="birthday" label="员工生日">
        <template slot-scope="scope"><span>{{formatDate(new Date(scope.row.birthday),'yyyy-MM-dd')}}</span></template>
      </el-table-column>
      <el-table-column prop="remarks" label="备注"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button @click="handleDelete(scope.row)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @current-change="fetch"
      :current-page="pagination.current"
      layout="total, prev, pager, next, jumper"
      :total="pagination.total">
    </el-pagination>
  </div>
</template>

<script>
  import {mixin, area} from "../../config/utils";

  export default {
    name: "User",
    mixins: [mixin],
    data() {
      let validPhone = (rule, value, callback) => {
        const valid = /^[1][3,4,5,6,7,8,9][0-9]{9}$/
        if (!valid.test(value)) {
          callback(new Error('请输入正确的手机号'));
        } else {
          callback();
        }
      }
      return {
        tableData: [],
        pagination: {},
        loading: false,
        area,
        searchForm: {userType: 4},
        dialogFormVisible: false,
        formData: {},
        rules: {
          phone: [{required: true, message: '请输入内容', trigger: 'blur'},
            {validator: validPhone, trigger: 'blur'}],
          birthday: [{required: true, message: '请输入内容', trigger: 'blur'}],
          sex: [{required: true, message: '请输入内容', trigger: 'blur'}],
          name: [{required: true, message: '请输入内容', trigger: 'blur'}],
          agentType: [{required: true, message: '请输入内容', trigger: 'blur'}],
          roleId: [{required: true, message: '请输入内容', trigger: 'blur'}],
          shopId: [{required: true, message: '请输入内容', trigger: 'blur'}],
          age: [{required: true, message: '请输入内容', trigger: 'blur'}],
          entryTime: [{required: true, message: '请输入内容', trigger: 'blur'}],
          username: [{required: true, message: '请输入内容', trigger: 'blur'}],
          state: [{required: true, message: '请输入内容', trigger: 'blur'}]
        },
        roles: [],
        mallList: [],
        selectMall: []
      }
    },
    methods: {
      selectArea() {
        if (this.formData.area && this.formData.agentType) {
          this.$ajax.post('/listShopIdAndNameForManager.action', {
            agentType: this.formData.agentType,
            userProvinceId: this.formData.area[0],
            userCityId: this.formData.agentType > 1 ? this.formData.area[1] : '',
            areaId: this.formData.agentType > 2 ? this.formData.area[2] : ''
          }).then((res) => {
            if (res.data.code === 1) {
              this.selectMall = res.data.data
            }
          })
        }
      },
      reset() {
        this.searchForm = {}
        this.fetch()
      },
      openDialog(agentType) {
        if (agentType === 0) {
          this.formData = {agentType}
        }
        this.dialogFormVisible = true
      },
      handleEdit(row) {
        let area = [row.userProvinceId + '', row.userCityId + '', row.areaId + '']
        this.formData = {...JSON.parse(JSON.stringify(row)), area}
        this.dialogFormVisible = true
      },
      submit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$ajax.post(this.formData.id ? '/updateUser.action' : '/saveUser.action', {
              ...this.formData,
              areaId: this.formData.area[2],
              userCityId: this.formData.area[1],
              userProvinceId: this.formData.area[0],
              entryTime: this.formatDate(new Date(this.formData.entryTime), 'yyyy-MM-dd hh:mm:ss'),
              birthday: this.formatDate(new Date(this.formData.birthday), 'yyyy-MM-dd hh:mm:ss')
            }).then((res) => {
              if (res.data.code === 1) {
                this.dialogFormVisible = false
                this.$message.success(res.data.msg);
                this.fetch(this.pagination.current)
              }
            })
            return false;
          }
        });
      },
      fetch(page) {
        this.loading = true
        this.$ajax.post('/userListVo.action', {limit: 10, page: page || 1, ...this.searchForm})
          .then((res) => {
            if (res.data.code === 1) {
              const pagination = {...this.pagination};
              pagination.total = res.data.count
              pagination.current = page;
              this.loading = false;
              this.tableData = res.data.data;
              this.pagination = pagination;
            }
          })
      },
      stateChange(row, state) {
        this.$ajax.post('/updateMemberState.action', {id: row.id, state})
          .then((res) => {
            if (res.data.code === 1) {
              this.$message.success(res.data.msg);
            }
          })
      },
      handleDelete(row) {
        this.$confirm('是否删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$ajax.post('/removeUser.action', {id: row.id})
            .then((res) => {
              if (res.data.code === 1) {
                this.$message.success(res.data.msg);
                this.fetch(this.pagination.current)
              }
            })
        }).catch(() => {
          this.$message.info('已取消');
        });
      },
      getRole() {
        this.$ajax.post('/listRole.action', {page: 1, limit: 20})
          .then((res) => {
            if (res.data.code === 1) {
              this.roles = res.data.data
            }
          })
      },
      getAllMall() {
        this.$ajax.post('/listAgentShop.action', {page: 1, limit: 100})
          .then((res) => {
            if (res.data.code === 1) {
              this.mallList = res.data.data
            }
          })
      },
    },
    mounted() {
      this.fetch()
      this.getRole()
      this.getAllMall()
    }
  }
</script>

<style scoped>

</style>
