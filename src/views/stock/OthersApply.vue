<template>
  <div>
    <el-dialog :visible.sync="dialogFormVisible" @closed="formData={}" append-to-body fullscreen>
      <el-form :model="formData" :rules="rules" ref="ruleForm" :inline="true" label-width="120px">
        <el-form-item label="送货日期">
          <el-input type="text" v-model="formData.deliveryDate" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="货流类型" prop="goodstrafficState">
          <el-select v-model="formData.goodstrafficState">
            <el-option label="采购" :value="1"></el-option>
            <el-option label="调拨" :value="2"></el-option>
          </el-select>
        </el-form-item>
        <template v-if="formData.goodstrafficState===2">
          <el-form-item label="发起调拨店铺ID">
            <el-input type="text" v-model="formData.shipmentsShopId" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="送货店铺ID">
            <el-input type="text" v-model="formData.receivingShopId" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="运输状态">
            <el-select v-model="formData.transportationState">
              <el-option label="未审批" :value="1"></el-option>
              <el-option label="备货中" :value="2"></el-option>
              <el-option label="已入库" :value="3"></el-option>
              <el-option label="已拒绝" :value="4"></el-option>
              <el-option label="已入库" :value="5"></el-option>
            </el-select>
          </el-form-item>
        </template>
        <el-form-item label="备注">
          <el-input type="text" v-model="formData.remark" autocomplete="off"></el-input>
        </el-form-item>
        <div v-for="item of goodsList" :key="item.productTypeId">
          <el-divider content-position="left">{{item.productTypeName}}</el-divider>
          <el-form-item v-for="item_c of item.product" :label="item_c.name" :key="item_c.id">
            <el-input type="text" v-model="goodsCount[item_c.id]" autocomplete="off"></el-input>
          </el-form-item>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit('ruleForm')">确 定</el-button>
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
    </div>
    <el-table :data="tableData" style="width: 100%" v-loading="loading">
      <el-table-column prop="id" label="物流表ID"></el-table-column>
      <el-table-column prop="receivingShopName" label="申请调拨店名称"></el-table-column>
      <el-table-column prop="totalMoney" label="总金额"></el-table-column>
      <el-table-column prop="serialNumber" label="流水号"></el-table-column>
      <el-table-column prop="deliveryDate" label="送货日期"></el-table-column>
      <el-table-column prop="remark" label="备注"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="handleEdit(scope.row)">编辑</el-button>
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
    name: "OthersApply",
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
          phone: [{required: true, message: '请输入内容', trigger: 'blur'}],
          birthday: [{required: true, message: '请输入内容', trigger: 'blur'}],
          sex: [{required: true, message: '请输入内容', trigger: 'blur'}],
          name: [{required: true, message: '请输入内容', trigger: 'blur'}]
        },
        goodsList: [],
        goodsCount: {}
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
        this.formData = JSON.parse(JSON.stringify(row))
        this.dialogFormVisible = true
      },
      submit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$ajax.post(this.formData.id ? '' : '/addprocurement.action', {
              id: this.formData.id,
              inventoryWarning: this.formData.inventoryWarning,
              quantity: this.formData.quantity
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
        this.$ajax.post('/listReceivingShopName.action', {limit: 10, page: page || 1, ...this.searchForm})
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
      }
    },
    mounted() {
      this.getAllGoods()
      this.fetch()
    }
  }
</script>

<style scoped>

</style>
