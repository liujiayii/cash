<template>
  <div>
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
    </div>
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
    <el-table :data="tableData" style="width: 100%" v-loading="loading">
      <el-table-column prop="id" label="物流表ID"></el-table-column>
      <el-table-column prop="receivingShopName" label="送货店名称"></el-table-column>
      <el-table-column prop="totalMoney" label="总金额"></el-table-column>
      <el-table-column prop="serialNumber" label="流水号"></el-table-column>
      <el-table-column prop="deliveryDate" label="送货日期"></el-table-column>
      <el-table-column prop="remark" label="备注"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="handleEdit(scope.row)">查看</el-button>
          <el-button v-if="scope.row.transportation_state===3" type="text" size="small" @click="handleClick(scope.row)">
            入库
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
  import {mixin} from "../../config/utils"

  export default {
    name: "SelfApply",
    mixins: [mixin],
    data() {
      return {
        tableData: [],
        pagination: {},
        loading: false,
        searchForm: {},
        dialogFormVisible2: false,
        tableData2: []
      }
    },
    methods: {
      selectTime(e) {
        this.searchForm.startdate = this.formatDate(e[0], 'yyyy-MM-dd')
        this.searchForm.enddate = this.formatDate(e[1], 'yyyy-MM-dd')
      },
      reset() {
        this.searchForm = {}
        this.fetch()
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
      handleClick(row) {
        this.$confirm('是否入库?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$ajax.post('/updateQuantity.action', {id: row.id, judge: 2})
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
      fetch(page) {
        this.loading = true
        this.$ajax.post('/listShipmentsShopName.action', {limit: 10, page: page || 1, ...this.searchForm})
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
    },
    mounted() {
      this.fetch()
    }
  }
</script>

<style scoped>

</style>
