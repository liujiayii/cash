<template>
  <div>
    <div class="top">
      <el-form :inline="true" :model="searchForm" size="small">
        <el-form-item label="商品名称">
          <el-input placeholder="商品名称" clearable v-model="searchForm.phone" @blur="seachs()"></el-input>
        </el-form-item>
        <el-form-item label="店铺">
          <el-select v-model="searchForm.shop" placeholder="请选择店铺" clearable @change="seachs()">
            <el-option v-for="item in shopId" :key="item.value" :label="item.label"
                       :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品种类">
          <el-select v-model="searchForm.productTypeId" placeholder="请选择商品种类" @change="seachs()" clearable>
            <el-option v-for="item in productTypeId" :key="item.value" :label="item.label"
                       :value="item.value"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <span class="add" @click="addGoods">添加+</span>
    <el-table v-loading="loading" :data="tableData" style="width: 100%">
      <el-table-column prop="name" label="商品名称" width="160"></el-table-column>
      <el-table-column prop="barCode" label="商品条码" width="160"></el-table-column>
      <el-table-column prop="image" label="商品图片" width="160">
        <template slot-scope="scope">
          <img :src="scope.row.image" alt="" class="imgs">
        </template>
      </el-table-column>
      <el-table-column prop="pleased" label="进货价" width="160"></el-table-column>
      <el-table-column prop="salePrice" label="销售价" width="160"></el-table-column>
      <el-table-column prop="memberPrice" label="会员价" width="160"></el-table-column>
      <el-table-column prop="specification" label="规格" width="160"></el-table-column>
      <el-table-column prop="color" label="颜色" width="160"></el-table-column>
      <el-table-column prop="state" label="是否上架" width="200">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.state==1?true:false" @change="changState(scope.$index, scope.row)"
                     class="switchs" active-text="已上架" inactive-text="未上架"></el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="productType" label="商品种类" width="160"></el-table-column>
      <el-table-column label="操作" fixed="right" width="250">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
          <el-button size="mini" @click="handlePrint(scope.$index, scope.row)">打印条码</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination @current-change="seachs" :current-page="pagination.current" layout="total, prev, pager, next, jumper"
                   :total="pagination.total"></el-pagination>
    <el-dialog title="添加商品" :visible.sync="dialogFormVisible" :modal-append-to-body="modalAppend" @closed="closeds">
      <el-form :model="form" :inline="true" :label-width="formLabelWidth">
        <el-form-item label="商品名称" :rules="[ { required: true, message: '商品名称不能为空'}] ">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="商品条码">
          <el-input v-model="form.barCode" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="商品进货价" :rules="[ { required: true, message: '商品进货价不能为空'}] ">
          <el-input v-model="form.pleased" autocomplete="off" type="number"></el-input>
        </el-form-item>
        <el-form-item label="商品销售价" :rules="[ { required: true, message: '商品销售价不能为空'}] ">
          <el-input v-model="form.salePrice" autocomplete="off" type="number"></el-input>
        </el-form-item>
        <el-form-item label="商品会员价" :rules="[ { required: true, message: '商品会员价不能为空'}] ">
          <el-input v-model="form.memberPrice" autocomplete="off" type="number"></el-input>
        </el-form-item>

        <el-form-item label="商品状态" :rules="[ { required: true, message: '商品状态不能为空'}] ">
          <el-switch
            v-model="form.state"
            active-text="已上架"
            inactive-text="未上架"
            @change="status()">
          </el-switch>
        </el-form-item>
        <el-form-item label="商品分类" :rules="[ { required: true, message: '商品分类不能为空'}] ">
          <el-select v-model="form.productTypeId" placeholder="请选择商品分类">
            <el-option v-for="item in productTypeId" :key="item.value" :label="item.label"
                       :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品库存" :rules="[ { required: true, message: '商品库存不能为空'}] " v-if="quantityShow">
          <el-input v-model="form.quantity" autocomplete="off" type="number"></el-input>
        </el-form-item>
        <el-form-item label="库存预警数量" :rules="[ { required: true, message: '商品库存不能为空'}] " v-if="quantityShow">
          <el-input v-model="form.inventoryWarning" autocomplete="off" type="number"></el-input>
        </el-form-item>
        <el-form-item label="商品规格" :rules="[ { required: true, message: '商品规格不能为空'}] ">
          <el-input v-model="form.specification" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="商品颜色" :rules="[ { required: true, message: '商品颜色不能为空'}] ">
          <el-input v-model="form.color" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="商品图片" :rules="[ { required: true, message: '商品图片不能为空'}] ">
          <el-upload
            action="/upload.action"
            :file-list="fileList"
            list-type="picture-card"
            :on-success="handlesuccess"
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
        <el-button type="primary" @click="addCommodity">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="打印条码" :visible.sync="showImg" :modal-append-to-body="modalAppend">
      <div class="prinbox">
        <img src="" alt="" id="imgewm">
        <el-button type="primary" plain @click="doPrint">打印</el-button>
        <!--    <span>打印份数：</span> <el-input v-model="Print" autocomplete="off"></el-input>-->
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "GoodsList",
    data() {
      return {
        Printbox: false,
        Print: 1,
        showImg: false,
        quantityShow: true,
        searchForm: {phone: "", shop: "", productTypeId: ""},
        loading: false,
        pagination: {},
        tableData: [],
        shopId: [],
        productTypeId: [],
        dialogImageUrl: '',
        dialogVisible: false,
        modalAppend: false,
        dialogFormVisible: false,
        form: {
          name: '',
          barCode: '',
          pleased: '',
          salePrice: '',
          memberPrice: '',
          specification: '',
          color: '',
          state: false,
          productTypeId: '',
          quantity: '',
          inventoryWarning: ''
        },
        imgArr: [],
        formLabelWidth: '120px',
        fileList: [],
      }
    },
    methods: {
      changState(index, row) {
        this.$ajax.post("updateProductState.action", {
            id: row.id,
            state: row.state == 1 ? 2 : 1
          }
        ).then(res => {
          this.seachs(this.pagination.current)
        })
      },
      closeds() {
        this.form = {}
        this.fileList = []
      },
      doPrint() {
        this.$print(document.getElementById('imgewm')) // 使用
      },
      addGoods() {
        this.dialogFormVisible = true
        this.fileList = []
      },
      //打印
      handlePrint(index, row) {
        this.showImg = true
        this.$nextTick(() => {
          document.getElementById('imgewm').src = "/missionCreateCodeImage.action?number=" + row.barCode;
          console.log(document.getElementById('imgewm').src)
        })
        // this.$ajax.post("missionCreateCodeImage.action", {
        //   number:row.barCode
        //   }
        // ).then(res => {
        //
        // })
      },
      //模糊查询
      seachs(num) {
        this.$ajax.post("getProductByCondition.action", {
            productName: this.searchForm.phone ? this.searchForm.phone : "",
            shopId: this.searchForm.shop ? this.searchForm.shop : "",
            productTypeId: this.searchForm.productTypeId ? this.searchForm.productTypeId : "",
            page: num || 1,
            limit: 10
          }
        ).then(res => {
          if (res.data.code === 1 && res.data.count != 0) {
            const pagination = {...this.pagination};
            pagination.total = res.data.count
            pagination.current = num;
            this.loading = false;
            this.tableData = res.data.listProduct
            this.pagination = pagination;
          } else {
            this.pagination.total = 0
            this.pagination.current = 1;
            this.tableData = []
          }
        })
      },
      //得到所有店铺
      getShopLists() {
        this.$ajax.post("listShopIdAndName.action", {}
        ).then(res => {
          for (let i = 0; i < res.data.data.length; i++) {
            let jsonsa = {}
            jsonsa.value = res.data.data[i].id
            jsonsa.label = res.data.data[i].name
            this.shopId.push(jsonsa)
          }
        })
      },
      // getList(num){
      //   this.loading = true
      //   this.$ajax.post("getProductByCondition.action", {
      //     page:1||num,
      //     limit:10
      //     }
      //   ).then(res => {
      //     if (res.data.code === 1) {
      //       const pagination = {...this.pagination};
      //       pagination.total = res.data.count
      //       pagination.current = num;
      //       this.loading = false;
      //       this.tableData=res.data.listProduct
      //       this.pagination = pagination;
      //     }
      //
      //   })
      // },
      //商品分类
      getClassList() {
        this.$ajax.post("listProductType.action", {}
        ).then(res => {
          for (let i = 0; i < res.data.listProductType.length; i++) {
            let jsons = {}
            jsons.value = res.data.listProductType[i].id
            jsons.label = res.data.listProductType[i].productTypeName
            this.productTypeId.push(jsons)
          }
        })
      },
      status(typ) {
      },
      //添加商品
      addCommodity() {
        console.log(this.fileList)
        if (this.form.state) {
          this.form.state = 1
        } else {
          this.form.state = 2
        }
        if (this.form.name == "" || this.form.pleased == "" || this.form.salePrice == "" || this.form.memberPrice == "" || this.form.specification == "" || this.form.color == "" || this.form.state == "" || this.form.productTypeId == "" || this.form.quantity == "" || this.form.inventoryWarning == "") {
          this.$message({
            message: "请将信息补充完整后在提交。",
            type: 'warning'
          });
          return false
        }
        this.quantityShow = true
        this.form.productType = ""
        this.form.shopId = ""
        this.form.canUse = ""
        this.$ajax.post(this.form.id ? "createProduct.action" : "addProduct.action", this.form
        ).then(res => {
          if (res.data.code === 1) {
            this.$message.success(res.data.msg);
            this.dialogFormVisible = false
            this.form = {}
            this.seachs(this.pagination.current)
          } else {
            this.$message.warning(res.data.msg);
          }
        })
      },
      //图片上传
      handlesuccess(file, fileList) {
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
      handleEdit(index, row) {
        console.log(index, row);
        this.quantityShow = false;
        this.$ajax.post("getProduct.action", {productId: row.id}
        ).then(res => {
          this.dialogFormVisible = true;
          this.form = res.data.product;
          if (res.data.product.state === 1) {
            this.form.state = true
          } else if (res.data.product.state === 2) {
            this.form.state = false
          }
          let cacheFile = [];
          if (res.data.product.image !== '' && res.data.product.image !== 'null' && res.data.product.image !== null) cacheFile.push({
            name: 0,
            url: res.data.product.image
          });
          this.fileList = cacheFile
        })
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
                this.seachs(this.pagination.current)
              }
            })
        }).catch(() => {
          this.$message.info('已取消');
        });
      }
    },
    mounted() {
      this.seachs(1);
      this.getClassList();
      this.getShopLists()
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
    line-height: 40px;
    padding: 0 15px;
    font-size: 14px
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
</style>
