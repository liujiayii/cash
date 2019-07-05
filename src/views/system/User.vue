<template>
  <div>
    <el-dialog :visible.sync="dialogFormVisible" @closed="formData={}" append-to-body>
      <el-form :model="formData" :rules="rules" ref="ruleForm" :inline="true" label-width="120px">
        <el-form-item label="姓名" prop="name">
          <el-input type="text" v-model="formData.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input type="text" v-model="formData.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-select v-model="formData.sex">
            <el-option label="男" :value="1"></el-option>
            <el-option label="女" :value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="区域经理" prop="agent_type">
          <el-select v-model="formData.agent_type">
            <el-option label="不是经理" :value="0"></el-option>
            <el-option label="省级" :value="1"></el-option>
            <el-option label="市级" :value="2"></el-option>
            <el-option label="区级" :value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="角色" prop="roleId">
          <el-input type="text" v-model="formData.roleId" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="区域ID" prop="areaId">
          <el-input type="text" v-model="formData.areaId" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="店铺ID" prop="shopId">
          <el-input type="text" v-model="formData.shopId" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="生日" prop="birthday">
          <el-date-picker v-model="formData.birthday" placeholder="选择生日"></el-date-picker>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input type="text" v-model="formData.age" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户名" prop="username">
          <el-input type="text" v-model="formData.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="text" v-model="formData.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="state">
          <el-select v-model="formData.sex">
            <el-option label="锁定" :value="1"></el-option>
            <el-option label="解锁" :value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注" prop="remarks">
          <el-input type="textarea" v-model="formData.remarks" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit('ruleForm')">确 定</el-button>
      </div>
    </el-dialog>
    <div class="top">
      <el-form :inline="true" :model="searchForm" size="small">
        <el-form-item>
          <el-input placeholder="请按分店查询" type="text" v-model="searchForm.shopID"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="fetch()">查询</el-button>
          <el-button type="primary" @click="reset()">重置</el-button>
        </el-form-item>
      </el-form>
      <el-button type="primary" size="small" round @click="dialogFormVisible=true">新建</el-button>
    </div>
    <el-table :data="tableData" style="width: 100%" v-loading="loading">
      <el-table-column prop="id" label="编号"></el-table-column>
      <el-table-column prop="name" label="姓名"></el-table-column>
      <el-table-column prop="phone" label="电话"></el-table-column>
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
  import {mixin} from "../../config/utils";

  export default {
    name: "User",
    mixins: [mixin],
    data() {
      return {
        tableData: [],
        pagination: {},
        loading: false,
        searchForm: {},
        dialogFormVisible: false,
        formData: {},
        rules: {
          phone: [{required: true, message: '请输入内容', trigger: 'blur'}],
          birthday: [{required: true, message: '请输入内容', trigger: 'blur'}],
          sex: [{required: true, message: '请输入内容', trigger: 'blur'}],
          name: [{required: true, message: '请输入内容', trigger: 'blur'}]
        },
      }
    },
    methods: {
      reset() {
        this.searchForm = {}
        this.fetch()
      },
      handleEdit(row) {
        this.formData = JSON.parse(JSON.stringify(row))
        this.dialogFormVisible = true
      },
      submit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.formData.birthday = this.formatDate(new Date(this.formData.birthday), 'yyyy/MM/dd')
            delete this.formData.entryTime
            this.$ajax.post(this.formData.id ? '/updateUser.action' : '/saveUser.action', this.formData)
              .then((res) => {
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
      }
    },
    mounted() {
      this.fetch()
    }
  }
</script>

<style scoped>

</style>
