<template>
  <div>
    <el-dialog :visible.sync="dialogFormVisible" @closed="formData={}" append-to-body>
      <el-form :model="formData" :rules="rules" ref="ruleForm" :inline="true" label-width="120px">
        <el-form-item label="名称" prop="name">
          <el-input type="text" v-model="formData.name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit('ruleForm')">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="dialogFormVisible2" :modal-append-to-body="false">
      <div v-for="item of accessList" :key="item.parentIds">
        <el-divider content-position="left">
          <el-checkbox-group v-model="selectAccess.ids">
            <el-checkbox :label="item.parentIds">{{item.parent_names}}</el-checkbox>
          </el-checkbox-group>
        </el-divider>
        <el-checkbox-group v-model="selectAccess.ids">
          <el-checkbox v-for="item_c of item.permissions" :key="item_c.id" :label="item_c.id">
            {{item_c.name}}
          </el-checkbox>
        </el-checkbox-group>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="submit2">确 定</el-button>
      </div>
    </el-dialog>
    <div class="top">
      <el-form :inline="true" :model="searchForm" size="small">
        <el-form-item>
          <el-input placeholder="输入角色查询" type="text" v-model="searchForm.name"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input placeholder="输入店铺查询" type="text" v-model="searchForm.shopId"></el-input>
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
      <el-table-column prop="name" label="角色"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="handleEdit(scope.row)" type="text" size="small">编辑</el-button>
          <el-button @click="handleAccess(scope.row)" type="text" size="small">权限</el-button>
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
  export default {
    name: "Role",
    data() {
      return {
        tableData: [],
        pagination: {},
        loading: false,
        searchForm: {},
        dialogFormVisible: false,
        formData: {},
        rules: {
          newBid: [{required: true, message: '请输入内容', trigger: 'blur'}],
          bidState: [{required: true, message: '请输入内容', trigger: 'blur'}],
          businessType: [{required: true, message: '请输入内容', trigger: 'blur'}],
          name: [{required: true, message: '请输入内容', trigger: 'blur'}],
          lengthOfMaturity: [{required: true, message: '请输入内容', trigger: 'blur'}],
          money: [{required: true, message: '请输入内容', trigger: 'blur'}]
        },
        dialogFormVisible2: false,
        accessList: JSON.parse(sessionStorage.getItem('access')),
        selectAccess: {ids: [], id: null}
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
      handleAccess(row) {
        this.$ajax.post('/listRolePermissions.action', {roleId: row.id})
          .then((res) => {
            if (res.data.code === 1) {
              this.selectAccess = {ids: res.data.data, id: row.id}
              this.dialogFormVisible2 = true
            }
          })
      },
      submit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$ajax.post(this.formData.id ? '/updateRole.action' : '/saveRole.action', {
              id: this.formData.id || '', name: this.formData.name,
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
      submit2() {
        this.$ajax.post('/updateOneRolePermission.action', {
          id: this.selectAccess.id, ids: this.selectAccess.ids.join(','),
        }).then((res) => {
          if (res.data.code === 1) {
            this.dialogFormVisible2 = false
            this.$message.success(res.data.msg)
          }
        })
      },
      fetch(page) {
        this.loading = true
        this.$ajax.post('/listRole.action', {limit: 10, page: page || 1, ...this.searchForm})
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
      handleDelete(row) {
        this.$confirm('是否删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$ajax.post('/deleteRoleById.action', {id: row.id})
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
