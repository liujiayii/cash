<template>
  <div>
    <el-dialog :visible.sync="dialogFormVisible" @closed="closeForm" append-to-body fullscreen>
      <el-form :model="formData" :rules="rules" ref="ruleForm" :inline="true" label-width="120px">
        <el-form-item label="送货日期" prop="deliveryDate">
          <el-date-picker v-model="formData.deliveryDate" type="date" placeholder="选择日期"></el-date-picker>
        </el-form-item>
        <el-form-item label="备注">
          <el-input type="text" v-model="formData.remark" autocomplete="off"></el-input>
        </el-form-item>
        <div v-for="item of goodsList" :key="item.productTypeId" class="num">
          <el-divider content-position="left">{{item.productTypeName}}</el-divider>
          <el-form-item v-for="item_c of item.product" :label="item_c.name" :key="item_c.id">
            <el-input-number v-model="goodsCount[item_c.id]" controls-position="right" :min="0"></el-input-number>
          </el-form-item>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit('ruleForm')">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="dialogFormVisible2" append-to-body>
      <el-table :data="tableData2" style="width: 100%">
        <el-table-column prop="id" label="货流商品表id"></el-table-column>
        <el-table-column prop="quantity" label="数量"></el-table-column>
        <el-table-column prop="money" label="金额"></el-table-column>
        <el-table-column prop="productName" label="商品名称"></el-table-column>
        <el-table-column prop="productTypeName" label="商品分类名称"></el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogFormVisible2 = false">确 定</el-button>
      </div>
    </el-dialog>
    <div class="top">
      <el-form :inline="true" :model="searchForm" size="small">
        <el-form-item>
          <el-date-picker v-model="searchForm.date" type="daterange" range-separator="至" start-placeholder="开始日期"
                          end-placeholder="结束日期" @change="selectTime"></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="fetch()">查询</el-button>
          <el-button type="primary" @click="reset()">重置</el-button>
        </el-form-item>
      </el-form>
      <el-button type="primary" size="small" round @click="dialogFormVisible=true">新建</el-button>
    </div>
    <el-table :data="tableData" style="width: 100%" v-loading="loading">
      <el-table-column prop="serialNumber" label="订单号"></el-table-column>
      <el-table-column prop="name" label="店铺名"></el-table-column>
      <el-table-column prop="totalMoney" label="总金额"></el-table-column>
      <el-table-column prop="orderDate" label="订单日期"></el-table-column>
      <el-table-column prop="deliveryDate" label="送货日期"></el-table-column>
      <el-table-column prop="transportationState" label="状态">
        <template slot-scope="scope">
          <span>{{scope.row.transportationState===1?'未审批':scope.row.transportationState===2?'备货中':scope.row.transportationState===3?'已出库':scope.row.transportationState===4?'已拒绝':scope.row.transportationState===5?'已入库':'已取消'}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="remark" label="备注"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="handleEdit(scope.row)">查看</el-button>
          <el-button v-if="scope.row.transportationState<6" type="text" size="small" @click="handleDelete(scope.row)">
            取消
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
    name: "Purchase",
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
          birthday: [{required: true, message: '请输入内容', trigger: 'blur'}],
          deliveryDate: [{required: true, message: '请输入内容', trigger: 'blur'}],
          name: [{required: true, message: '请输入内容', trigger: 'blur'}]
        },
        goodsList: [],
        goodsCount: {},
        dialogFormVisible2: false,
        tableData2: []
      }
    },
    methods: {
      closeForm() {
        this.formData = {}
        this.goodsCount = {}
      },
      selectTime(e) {
        this.searchForm.startdate = this.formatDate(e[0], 'yyyy-MM-dd')
        this.searchForm.enddate = this.formatDate(e[1], 'yyyy-MM-dd')
      },
      reset() {
        this.searchForm = {}
        this.fetch()
      },
      handleDelete(row) {
        this.$confirm('是否取消?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$ajax.post('/listGoodstrafficOrdersProduct.action', {id: row.id})
            .then((res) => {
              if (res.data.code === 1) {
                this.$ajax.post('/updateSubscribeForPurchasing.action', {
                  id: row.id,
                  transportationState: 6,
                  g: JSON.stringify(res.data.data)
                }).then((res) => {
                  if (res.data.code === 1) {
                    this.$message.success(res.data.msg)
                    this.fetch(this.pagination.current)
                  }
                })
              }
            })
        }).catch(() => {
          this.$message.info('已取消');
        });
      },
      handleEdit(row) {
        this.$ajax.post('/listGoodstrafficOrdersProduct.action', {id: row.id})
          .then((res) => {
            if (res.data.code === 1) {
              this.tableData2 = res.data.data
              this.dialogFormVisible2 = true
            }
          })
      },
      submit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let cacheArr = []
            for (let i in this.goodsCount) {
              if (this.goodsCount[i] > 0) {
                cacheArr.push({
                  productId: i,
                  quantity: this.goodsCount[i]
                })
              }
            }
            this.$ajax.post(this.formData.id ? '' : '/addprocurement.action', {
              ...this.formData,
              goodstrafficState: 1,
              deliveryDate: this.formatDate(this.formData.deliveryDate, 'yyyy-MM-dd hh:mm:ss'),
              time: this.formatDate(this.formData.deliveryDate, 'yyyy-MM-dd hh:mm:ss'),
              g: JSON.stringify(cacheArr)
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
        this.$ajax.post('/listProcurement.action', {limit: 10, page: page || 1, ...this.searchForm})
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
      getAllGoods() {
        this.$ajax.post('/listProductAndProductType.action')
          .then((res) => {
            if (res.data.code === 1) {
              this.goodsList = res.data.data
            }
          })
      },
    },
    mounted() {
      this.fetch()
      this.getAllGoods()
    }
  }
</script>

<style lang="scss" scoped>

</style>
