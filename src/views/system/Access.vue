<template>
  <div>
    <div class="top">
      <el-button type="primary" size="small" round @click="dialogFormVisible=true">新建</el-button>
    </div>
    <el-dialog :visible.sync="dialogFormVisible" @closed="formData={}" append-to-body>
      <el-form :model="formData" :rules="rules" ref="ruleForm" :inline="true" label-width="120px">
        <el-form-item label="权限id" prop="parentId">
          <el-input type="text" v-model="formData.id" maxlength="20" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="权限名称" prop="parent_name">
          <el-input type="text" v-model="formData.name" autocomplete="off" maxlength="11"></el-input>
        </el-form-item>
        <el-form-item v-if="!formData.update" label="权限类型" prop="state">
          <el-select v-model="formData.state">
            <el-option label="父权限" :value="1"></el-option>
            <el-option label="子权限" :value="2"></el-option>
          </el-select>
        </el-form-item>
        <template v-if="formData.state===2||formData.parentId">
          <el-form-item label="父权限id" prop="id">
            <el-input type="text" v-model="formData.parentId" autocomplete="off" maxlength="11"></el-input>
          </el-form-item>
          <el-form-item label="父权限名称" prop="name">
            <el-input type="text" v-model="formData.parent_name" autocomplete="off" maxlength="11"></el-input>
          </el-form-item>
          <el-form-item label="访问url" prop="url">
            <el-input type="text" v-model="formData.url" autocomplete="off" maxlength="11"></el-input>
          </el-form-item>
          <el-form-item label="映射地址" prop="percode">
            <el-input type="text" v-model="formData.percode" autocomplete="off" maxlength="11"></el-input>
          </el-form-item>
        </template>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit('ruleForm')">确 定</el-button>
      </div>
    </el-dialog>
    <el-table :data="tableData" style="width: 100%" v-loading="loading">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-table :data="props.row.permissions" style="width: 100%" size="mini" border>
            <el-table-column prop="id" label="编号"></el-table-column>
            <el-table-column prop="name" label="权限名称"></el-table-column>
            <el-table-column prop="url" label="访问URL"></el-table-column>
            <el-table-column prop="percode" label="映射地址"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="handleEdit(scope.row,props.row)">编辑</el-button>
                <el-button @click="handleDelete(scope.row)" type="text" size="small">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </el-table-column>
      <el-table-column prop="parentIds" label="编号"></el-table-column>
      <el-table-column prop="parent_names" label="权限名称"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button @click="handleDelete(scope.row)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- <el-pagination
       @current-change="fetch"
       :current-page="pagination.current"
       layout="total, prev, pager, next, jumper"
       :total="pagination.total">
     </el-pagination>-->
  </div>
</template>

<script>
  import {mixin} from "../../config/utils";

  export default {
    name: "Access",
    mixins: [mixin],
    data() {
      return {
        tableData: [],
        pagination: {},
        loading: false,
        dialogFormVisible: false,
        formData: {},
        rules: {
          /* phone: [{required: true, message: '请输入内容', trigger: 'blur'}],
           birthday: [{required: true, message: '请输入内容', trigger: 'blur'}],
           sex: [{required: true, message: '请输入内容', trigger: 'blur'}],
           name: [{required: true, message: '请输入内容', trigger: 'blur'}]*/
        },
      }
    },
    methods: {
      handleEdit(row, props) {
        console.log(row)
        console.log(props)
        this.dialogFormVisible = true
        this.formData = JSON.parse(JSON.stringify({
          id: row.id || row.parentIds || props.parentIds,
          name: row.name || row.parent_names || props.parent_names,
          parentId: props ? props.parentIds : '',
          parent_name: props ? props.parent_names : '',
          url: row.url || '',
          percode: row.percode || '',
          update: true//新增判断更新
        }))
      },
      submit(formName) {
        this.$refs[formName].validate((valid) => {
            if (valid) {
              this.$ajax.post(this.formData.update ? '/updatePermission.action' : '/savePermission.action', {
                ...this.formData
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
        this.$ajax.post('/getAllPermission.action', {limit: 10, page: page || 1, ...this.searchForm})
          .then((res) => {
            if (res.data.code === 1) {
              const pagination = {...this.pagination};
              pagination.total = res.data.count
              pagination.current = page;
              this.loading = false;
              this.tableData = res.data.permissionVo;
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
          this.$ajax.post('/delPerssionById.action', {permissionId: row.id || row.parentIds})
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
