<template>
  <div>
    <el-dialog :visible.sync="dialogFormVisible" @closed="formData={}" append-to-body>
      <el-table :data="tableData2" style="width: 100%">
        <el-table-column prop="productName" label="商品名称"></el-table-column>
        <el-table-column prop="productType" label="商品分类"></el-table-column>
        <el-table-column prop="salePrice" label="商品价格"></el-table-column>
        <el-table-column prop="productCount" label="商品数量"></el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
    <div class="top">
      <el-form :inline="true" :model="searchForm" size="small">
        <el-form-item v-if="($store.state.permission.indexOf(71001) !== -1)">
          <el-select v-model="searchForm.shopId">
            <el-option v-for="item of mallList" :key="item.shopId" :label="item.name" :value="item.id"
                       placeholder="选择店铺"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-input placeholder="输入订单号查询" type="text" v-model="searchForm.number"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="fetch()">查询</el-button>
          <el-button type="primary" @click="reset()">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table :data="tableData" style="width: 100%" v-loading="loading">
      <el-table-column prop="number" label="订单号"></el-table-column>
      <el-table-column prop="shopName" label="店铺名称"></el-table-column>
      <el-table-column prop="createTime" label="订单创建时间">
        <template slot-scope="scope">
          <span>{{formatDate(new Date(scope.row.createTime),'yyyy-MM-dd')}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="payMethod" label="交易方式">
        <template slot-scope="scope">
          <span>{{scope.row.payMethod===1?'现金':scope.row.payMethod===2?'POS机':scope.row.payMethod===3?'支付宝':scope.row.payMethod===4?'微信支付':''}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="payAdvance" label="订单应收金额"></el-table-column>
      <el-table-column prop="totalMoney" label="实付总金额"></el-table-column>
      <el-table-column prop="state" label="状态">
        <template slot-scope="scope">
          <span>{{scope.row.state===1?'出售':scope.row.state===2?'退货':''}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="remark" label="备注"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="handleEdit(scope.row)">查看</el-button>
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
  import {mixin} from "../../config/utils"

  export default {
    name: "Order",
    mixins: [mixin],
    data() {
      return {
        tableData: [],
        pagination: {},
        loading: false,
        searchForm: {},
        dialogFormVisible: false,
        tableData2: [],
        mallList: [],
      }
    },
    methods: {
      reset() {
        this.searchForm = {}
        this.fetch()
      },
      handleEdit(row) {
        this.$ajax.post('/listOrderProduct.action', {orderNumber: row.number, page: 1, limit: 20})
          .then((res) => {
            if (res.data.code === 1) {
              this.tableData2 = res.data.data
              this.dialogFormVisible = true
            }
          })
      },
      fetch(page) {
        this.loading = true
        this.$ajax.post('/listOrderByOption.action', {limit: 10, page: page || 1, ...this.searchForm})
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
      getAllMall() {
        if (this.$store.state.permission.indexOf(71001) !== -1) {
          this.$ajax.post('/listShopIdAndName.action', {page: 1, limit: 100})
            .then((res) => {
              if (res.data.code === 1) {
                this.mallList = res.data.data
              }
            })
        }
      },
    },
    mounted() {
      this.fetch()
      this.getAllMall()
    }
  }
</script>

<style scoped>

</style>
