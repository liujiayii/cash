<template>
  <div>
    <div class="top">
      <el-form :inline="true" :model="searchForm" size="small">
        <el-form-item label="商品分类" style="display: inline-block;margin-left:10px">
          <el-input placeholder="商品分类" clearable v-model="searchForm.name" @blur="seachs()"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <span class="add" @click="add()">添加+</span>
    <el-table
            border
            :header-cell-style="tableHeaderColor"
            v-loading="loading"
            :data="tableData"
            style="width: 100%">
      <el-table-column
              prop="id"
              label="编号"
              width="400"
      >
      </el-table-column>
      <el-table-column
              prop="productTypeName"
              label="商品分类"
      >
      </el-table-column>
      <el-table-column label="操作" fixed="right" width="400">
        <template slot-scope="scope">
          <el-button
                  size="mini"
                  @click="handlePrint(scope.$index, scope.row)">打印条码
          </el-button>
          <el-button
                  size="mini"
                  @click="handleEdit(scope.$index, scope.row)">编辑
          </el-button>
          <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
            @current-change="seachs"
            :current-page="pagination.current"
            layout="total, prev, pager, next, jumper"
            :total="pagination.total">
    </el-pagination>
    <el-dialog title="商品分类" :visible.sync="dialogFormVisible" :modal-append-to-body="modalAppend" @closed="form={}">
      <el-form :model="form" class="demo-ruleForm flex">
        <el-form-item label="商品分类" :label-width="formLabelWidth" :rules="[ { required: true, message: '商品分类不能为空'}] "
                      class="formlist">
          <el-input v-model="form.classa" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addClass">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "GoodsSort",
    data() {
      return {
        edits:{id:"",cls:null},
        searchForm: {name: ""},
        loading: false,
        modalAppend: false,
        pagination: {},
        tableData: [],
        limit: 1,
        shopId: [],
        productTypeId: [],
        dialogFormVisible: false,
        form: { classa: '', },
        formLabelWidth: '120px',
      }
    },
    methods: {
      //打印
      //handlePrint(){ },
      //模糊查询
      seachs(num) {
        this.$ajax.post("dimOrSelectAllproducts.action", {
            productTypeName: this.searchForm.name ? this.searchForm.name : "",
            page:num || 1 ,
            limit: 10
          }
        ).then(res => {
          if (res.data.code === 1 && res.data.count != 0) {
            const pagination = {...this.pagination};
            pagination.total = res.data.count
            pagination.current = num;
            this.loading = false;
            this.tableData = res.data.productType
            this.pagination = pagination;
          } else {
            this.pagination.total = 0
            this.pagination.current = 1;
            this.tableData = []
          }

        })
      },
      //添加分类
      add(num){
        this.edits.cls=null
        this.dialogFormVisible = true
      },
      addClass(num) {
        this.$ajax.post(this.edits.cls==1?"createProductType.action":"addProductType.action", {
          id:this.edits.id,
          productTypeName: this.form.classa
        }
        ).then(res => {
          if (res.data.code === 1) {
            this.$message.success(res.data.msg);
            this.seachs(this.pagination.current)
            this.dialogFormVisible = false,
              this.form = {}
          }
        })
      },
      //修改
      handleEdit(index, row) {
        console.log(index, row);
        this.edits.id=row.id
        this.edits.cls=1
        this.$ajax.post("getProductType.action", {productTypeId:row.id}
        ).then(res => {
          this.dialogFormVisible = true
          this.form.classa=res.data.productType.productTypeName
        })
      },
      //删除
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
                this.seachs(this.pagination.current)
              }
            })
        }).catch(() => {
          this.$message.info('已取消');
        });
      },
      tableHeaderColor({row, column, rowIndex, columnIndex}) {
        if (rowIndex === 0) {
          return 'height: 50px!important;overflow: hidden; line-height: 28px;  border-bottom: 1px solid #ebeef5;background-color: #f5f7fa'
        }
      },
    },
    mounted() {
      this.seachs(1)
      //this.getClassList()
      //this.getShopList()
    }


  }
</script>

<style scoped>
  .add {
    float: right;
    margin: 0 15px 5px 0;
    cursor: pointer;
    position: relative;
    bottom: 10px;
    border-radius: 18px;
    height: 35px;
    linght-height: 40px;
    padding: 0 15px;
    font-size: 14px
  }

  .formlistbig {
    width: 100%
  }

  .el-tag + .el-tag {
    margin-left: 10px;
  }

  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }

  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }

  .formlist {
    width: 50%
  }
</style>
