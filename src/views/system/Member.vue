<template>
  <div>
    <el-dialog :visible.sync="dialogFormVisible" @closed="formData={}" append-to-body>
      <el-form :model="formData" :rules="rules" ref="ruleForm" :inline="true" label-width="120px">
        <el-form-item label="姓名" prop="name">
          <el-input type="text" v-model="formData.name" maxlength="20" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input type="text" v-model="formData.phone" autocomplete="off" maxlength="11"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-select v-model="formData.sex">
            <el-option label="男" :value="1"></el-option>
            <el-option label="女" :value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="生日" prop="birthday">
          <el-date-picker v-model="formData.birthday" value-format="timestamp" type="date"
                          placeholder="选择生日"></el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit('ruleForm')">确 定</el-button>
      </div>
    </el-dialog>
    <!--<div class="top">
      <el-form :inline="true" :model="searchForm" size="small">
        <el-form-item>
          <el-input placeholder="请按会员号或手机号查询" type="number" v-model="searchForm.phone"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="fetch()">查询</el-button>
          <el-button type="primary" @click="reset()">重置</el-button>
        </el-form-item>
      </el-form>
      <el-button type="primary" size="small" round @click="dialogFormVisible=true">新建</el-button>
    </div>-->
    <el-table :data="tableData" style="width: 100%" v-loading="loading">
      <el-table-column prop="id" label="编号"></el-table-column>
      <el-table-column prop="number" label="会员卡号"></el-table-column>
      <el-table-column prop="name" label="会员姓名"></el-table-column>
      <el-table-column prop="phone" label="会员电话"></el-table-column>
      <el-table-column prop="level" label="等级"></el-table-column>
      <el-table-column prop="totalMoney" label="累计消费"></el-table-column>
      <el-table-column prop="state" label="状态">
        <template slot-scope="scope">
          <el-switch :disabled="!($store.state.permission.indexOf(70209) !== -1)" v-model="scope.row.state"
                     active-text="正常" inactive-text="冻结" :active-value="2"
                     :inactive-value="1" @change="stateChange(scope.row,$event)"></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button v-if="($store.state.permission.indexOf(70208) !== -1)" type="text" size="small"
                     @click="handleEdit(scope.row)">编辑
          </el-button>
          <el-button v-if="($store.state.permission.indexOf(70210) !== -1)" @click="handleDelete(scope.row)" type="text"
                     size="small">删除
          </el-button>
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
    name: "Member",
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
        searchForm: {},
        dialogFormVisible: false,
        formData: {},
        rules: {
          phone: [{required: true, message: '请输入内容', trigger: 'blur'},
            {validator: validPhone, trigger: 'blur'}],
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
              this.$ajax.post(this.formData.id ? '/updateMember.action' : '/saveMember.action', {
                id: this.formData.id || '',
                phone: this.formData.phone,
                name: this.formData.name,
                sex: this.formData.sex,
                birthday: this.formatDate(new Date(this.formData.birthday), 'yyyy/MM/dd')
              }).then((res) => {
                if (res.data.code === 1) {
                  this.dialogFormVisible = false
                  this.$message.success(res.data.msg);
                  this.fetch(this.pagination.current)
                }
              })
              return false;
            }
          }
        );
      },
      fetch(page) {
        this.loading = true
        this.$ajax.post('/listMemberByOption.action', {limit: 10, page: page || 1, ...this.searchForm})
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
          this.$ajax.post('/removeMember.action', {id: row.id})
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
