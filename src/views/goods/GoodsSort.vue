<template>
  <div>
    <div class="top">
      <el-form :inline="true" :model="searchForm" size="small">
        <el-form-item label="商品分类">
          <el-input placeholder="请输入商品分类" clearable v-model="searchForm.productTypeName"></el-input>
        </el-form-item>
        <el-button type="primary" size="small" @click="fetch()">搜索</el-button>
      </el-form>
      <el-button type="primary" size="small" round @click="dialogFormVisible = true">添加</el-button>
    </div>
    <el-table
      v-loading="loading"
      :data="tableData"
      style="width: 100%">
      <el-table-column prop="id" label="编号"></el-table-column>
      <el-table-column prop="productTypeName" label="商品分类"></el-table-column>
      <el-table-column label="操作" fixed="right">
        <template slot-scope="scope">
          <!--<el-button size="mini" @click="handlePrint(scope.$index, scope.row)">打印条码</el-button>-->
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @current-change="fetch"
      :current-page="pagination.current"
      layout="total, prev, pager, next, jumper"
      :total="pagination.total">
    </el-pagination>
    <el-dialog title="商品分类" :visible.sync="dialogFormVisible" :modal-append-to-body="false" @closed="form={}">
      <el-form :model="form" :label-width="'120px'" ref="form">
        <el-form-item label="商品分类" :rules="[ { required: true, message: '商品分类不能为空'}]" prop="productTypeName">
          <el-input v-model="form.productTypeName" autocomplete="off" maxlength="10"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addClass('form')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "GoodsSort",
    data() {
      return {
        searchForm: {},
        loading: false,
        pagination: {},
        tableData: [],
        dialogFormVisible: false,
        form: {},
      }
    },
    methods: {
      fetch(page) {
        this.$ajax.post("/dimOrSelectAllproducts.action", {
            ...this.searchForm,
            page: page || 1,
            limit: 10
          }
        ).then(res => {
          if (res.data.code === 1) {
            const pagination = {...this.pagination};
            pagination.total = res.data.count
            pagination.current = page;
            this.loading = false;
            this.tableData = res.data.productType
            this.pagination = pagination;
          }
        })
      },
      addClass(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$ajax.post(this.form.id ? "createProductType.action" : "addProductType.action", {
              id: this.form.id || '',
              productTypeName: this.form.productTypeName
            }).then(res => {
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
      handleEdit(index, row) {
        this.dialogFormVisible = true
        this.form = JSON.parse(JSON.stringify(row))
      },
      handleDelete(row) {
        this.$confirm('是否删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$ajax.post('/delProductType.action', {productTypeId: row.id})
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
    },
    mounted() {
      this.fetch()
    }
  }
</script>

<style scoped>

</style>
