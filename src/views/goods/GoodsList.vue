<template>
  <div>
    <div class="top">
      <el-form :inline="true" :model="searchForm" size="small">
        <el-form-item label="商品名称">
          <el-input placeholder="商品名称" clearable v-model="searchForm.phone" @blur="fetch()"></el-input>
        </el-form-item>
        <el-form-item label="商品种类">
          <el-select v-model="searchForm.productTypeId" placeholder="请选择商品种类" @change="fetch()" clearable>
            <el-option v-for="item in productTypeId" :key="item.value" :label="item.label"
                       :value="item.value"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <el-button type="primary" size="small" round @click="addGoods">添加+</el-button>
    <el-table v-loading="loading" :data="tableData" style="width: 100%">
      <el-table-column prop="name" label="商品名称"></el-table-column>
      <el-table-column prop="barCode" label="商品条码"></el-table-column>
      <el-table-column prop="image" label="商品图片">
        <template slot-scope="scope">
          <img :src="scope.row.image" alt="">
        </template>
      </el-table-column>
      <el-table-column prop="pleased" label="进货价"></el-table-column>
      <el-table-column prop="salePrice" label="销售价"></el-table-column>
      <el-table-column prop="memberPrice" label="会员价"></el-table-column>
      <el-table-column prop="specification" label="规格"></el-table-column>
      <el-table-column prop="color" label="颜色"></el-table-column>
      <el-table-column prop="state" label="是否上架">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.state" @change="changState(scope.row)" active-text="上架"
                     inactive-text="下架" :active-value="1" :inactive-value="2"></el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="productType" label="商品种类"></el-table-column>
      <el-table-column label="操作" fixed="right" width="250">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
          <el-button size="mini" @click="handlePrint(scope.row)">打印条码</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination @current-change="fetch" :current-page="pagination.current" layout="total, prev, pager, next, jumper"
                   :total="pagination.total"></el-pagination>
    <el-dialog title="商品" :visible.sync="dialogFormVisible" :modal-append-to-body="false" @closed="closed">
      <el-form :model="form" ref="ruleForm" :inline="true" label-width="120px">
        <el-form-item label="商品名称" prop="name" :rules="[{required: true, message: '商品名称不能为空', trigger: 'blur'}]">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="商品条码" prop="barCode">
          <el-input v-model="form.barCode" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="商品进货价" prop="pleased" :rules="[{ required: true, message: '商品进货价不能为空', trigger: 'blur'}]">
          <el-input v-model="form.pleased" autocomplete="off" type="number">
            <span slot="suffix">元</span>
          </el-input>
        </el-form-item>
        <el-form-item label="商品销售价" prop="salePrice"
                      :rules="[ { required: true, message: '商品销售价不能为空', trigger: 'blur'}] ">
          <el-input v-model="form.salePrice" autocomplete="off" type="number"><span slot="suffix">元</span></el-input>
        </el-form-item>
        <el-form-item label="商品会员价" prop="memberPrice"
                      :rules="[ { required: true, message: '商品会员价不能为空', trigger: 'blur'}] ">
          <el-input v-model="form.memberPrice" autocomplete="off" type="number"><span slot="suffix">元</span></el-input>
        </el-form-item>
        <el-form-item label="商品状态" prop="state" :rules="[ { required: true, message: '商品状态不能为空', trigger: 'blur'}] ">
          <el-select v-model="form.state" placeholder="请选择">
            <el-option label="上架" :value="1"></el-option>
            <el-option label="下架" :value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品分类" prop="productTypeId"
                      :rules="[ { required: true, message: '商品分类不能为空', trigger: 'blur'}] ">
          <el-select v-model="form.productTypeId" placeholder="请选择商品分类">
            <el-option v-for="item in productTypeId" :key="item.value" :label="item.label"
                       :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品库存" prop="quantity" :rules="[ { required: true, message: '商品库存不能为空', trigger: 'blur'}] "
                      v-if="!form.id">
          <el-input v-model="form.quantity" autocomplete="off" type="number"></el-input>
        </el-form-item>
        <el-form-item label="库存预警数量" prop="inventoryWarning"
                      :rules="[ { required: true, message: '商品库存不能为空', trigger: 'blur'}] " v-if="!form.id">
          <el-input v-model="form.inventoryWarning" autocomplete="off" type="number"></el-input>
        </el-form-item>
        <el-form-item label="商品规格" prop="specification"
                      :rules="[ { required: true, message: '商品规格不能为空', trigger: 'blur'}] ">
          <el-input v-model="form.specification" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="商品颜色" prop="color" :rules="[ { required: true, message: '商品颜色不能为空', trigger: 'blur'}] ">
          <el-input v-model="form.color" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="商品图片">
          <el-upload
            action="/upload.action"
            :file-list="fileList"
            list-type="picture-card"
            :on-success="handleSuccess"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :limit="1"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addCommodity('ruleForm')">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="打印条码" :visible.sync="showImg" :modal-append-to-body="false">
      <div class="paintbox">
        <img src="" alt="" id="imaged">
        <el-button type="primary" plain @click="doPrint">打印</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "GoodsList",
    data() {
      return {
        showImg: false,
        searchForm: {},
        loading: false,
        pagination: {},
        tableData: [],
        shopId: [],
        productTypeId: [],
        dialogImageUrl: '',
        dialogVisible: false,
        dialogFormVisible: false,
        form: {},
        imgArr: [],
        fileList: [],
      }
    },
    methods: {
      changState(row) {
        this.$ajax.post("updateProductState.action", {
          id: row.id,
          state: row.state === 2 ? 2 : 1
        }).then(res => {
          if (res.data.code === 1) {
            this.$message.success(res.data.msg)
          }
        })
      },
      closed() {
        this.form = {}
        this.fileList = []
      },
      doPrint() {
        this.$print(document.getElementById('imaged')) // 使用
      },
      addGoods() {
        this.dialogFormVisible = true
        this.fileList = []
      },
      handlePrint(row) {
        this.showImg = true
        this.$nextTick(() => {
          document.getElementById('imaged').src = "/missionCreateCodeImage.action?number=" + row.barCode;
        })
      },
      fetch(page) {
        this.$ajax.post("getProductByCondition.action", {
          ...this.searchForm,
          page: page || 1,
          limit: 10
        }).then(res => {
          if (res.data.code === 1) {
            const pagination = {...this.pagination};
            pagination.total = res.data.count
            pagination.current = page;
            this.loading = false;
            this.tableData = res.data.listProduct
            this.pagination = pagination;
          }
        })
      },
      //得到所有店铺
      getShopLists() {
        if (this.$store.state.permission.indexOf(71001) !== -1) {
          this.$ajax.post("listShopIdAndName.action")
            .then(res => {
              if (res.data.code === 1) {
                for (let i = 0; i < res.data.data.length; i++) {
                  this.shopId.push({value: res.data.data[i].id, label: res.data.data[i].name})
                }
              }
            })
        }
      },
      //商品分类
      getClassList() {
        this.$ajax.post("listProductType.action")
          .then(res => {
            for (let i = 0; i < res.data.listProductType.length; i++) {
              this.productTypeId.push({
                value: res.data.listProductType[i].id,
                label: res.data.listProductType[i].productTypeName
              })
            }
          })
      },
      //添加商品
      addCommodity(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.form.productType = ''
            this.form.shopId = ''
            this.form.canUse = ''
            this.$ajax.post(this.form.id ? "createProduct.action" : "addProduct.action", this.form)
              .then(res => {
                if (res.data.code === 1) {
                  this.$message.success(res.data.msg);
                  this.dialogFormVisible = false
                  this.seachs(this.pagination.current)
                }
              })
          }
        });
      },
      //图片上传
      handleSuccess(file, fileList) {
        console.log(file)
        this.form.image = file.data
        console.log(this.form.image)
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      //修改
      handleEdit(row) {
        this.dialogFormVisible = true;
        this.form = JSON.parse(JSON.stringify(row));
        this.fileList = row.image ? [{name: '图片', url: row.image}] : []
      },
      handleDelete(row) {
        this.$confirm('是否删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$ajax.post('/delProduct.action', {productId: row.id})
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
      this.fetch();
      this.getClassList();
      this.getShopLists()
    }
  }
</script>

<style scoped>
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
</style>
