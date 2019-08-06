<template>
  <div>
    <div style="display: flex;">
      <el-card style="flex: 5" shadow="hover">
        <div slot="header" class="clearfix">
          <span>库存预警页面</span>
        </div>
        <el-table :data="tableData2" style="width: 100%" size="mini">
          <el-table-column prop="productTypeName" label="商品分类"></el-table-column>
          <el-table-column prop="productName" label="商品名称"></el-table-column>
          <el-table-column prop="barCode" label="商品编码"></el-table-column>
          <el-table-column prop="quantity" label="库存数量"></el-table-column>
          <el-table-column prop="inventoryWarning" label="预警下限"></el-table-column>
        </el-table>
      </el-card>
      <el-card style="flex: 3;margin-left: 10px" shadow="hover">
        <div slot="header" class="clearfix">
          <span>会员生日提醒</span>
        </div>
        <el-table :data="tableData" style="width: 100%" size="mini">
          <el-table-column prop="name" label="姓名"></el-table-column>
          <el-table-column prop="phone" label="电话"></el-table-column>
          <el-table-column prop="birthday" label="生日">
            <template slot-scope="scope">
              <span>{{formatDate(new Date(scope.row.birthday.time),'yyyy-MM-dd')}}</span>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </div>
    <div style="display: flex;margin-top: 10px">
      <el-card style="flex: 1" shadow="hover">
        <div slot="header" class="clearfix">
          <span>本店调拨申请</span>
        </div>
        <el-table :data="tableData3" style="width: 100%" size="mini">
          <el-table-column prop="shipmentsShopName" label="申请店铺"></el-table-column>
          <el-table-column prop="shipmentsShopName" label="商品编码"></el-table-column>
          <el-table-column prop="shipmentsShopName" label="商品名称"></el-table-column>
          <el-table-column prop="shipmentsShopName" label="商品数量"></el-table-column>
        </el-table>
      </el-card>
      <el-card style="flex: 1;margin-left: 10px" shadow="hover">
        <div slot="header" class="clearfix">
          <span>他店调拨申请</span>
        </div>
        <el-table :data="tableData4" style="width: 100%" size="mini">
          <el-table-column prop="receivingShopName" label="被申请店铺"></el-table-column>
          <el-table-column prop="receivingShopName" label="商品编码"></el-table-column>
          <el-table-column prop="receivingShopName" label="商品名称"></el-table-column>
          <el-table-column prop="receivingShopName" label="预警数量"></el-table-column>
        </el-table>
      </el-card>
    </div>
  </div>
</template>

<script>
  import {mixin} from "../../config/utils"

  export default {
    name: "Home",
    mixins: [mixin],
    data() {
      return {
        tableData: [],
        tableData2: [],
        tableData3: [],
        tableData4: [],
      }
    },
    methods: {
      fetch() {
        this.$ajax.post('/listBirthday.action', {limit: 10, page: 1})
          .then((res) => {
            if (res.data.code === 1) {
              this.tableData = res.data.data
            }
          })
      },
      fetch2() {
        this.$ajax.post('/getInventoryByShopId.action', {limit: 10, page: 1})
          .then((res) => {
            if (res.data.code === 1) {
              this.tableData2 = res.data.data
            }
          })
      },
      fetch3() {
        this.$ajax.post('/listReceivingShopName.action', {limit: 10, page: 1, transportationState: 1})
          .then((res) => {
            if (res.data.code === 1) {
              this.tableData3 = res.data.data
            }
          })
      },
      fetch4() {
        if (this.$store.state.permission.indexOf(20102) !== -1) {
          this.$ajax.post('/listShipmentsShopName.action', {limit: 10, page: 1, transportationState: 1})
            .then((res) => {
              if (res.data.code === 1) {
                this.tableData4 = res.data.data
              }
            })
        }
      },
    },
    mounted() {
      this.fetch()
      this.fetch2()
      this.fetch3()
      this.fetch4()
    }
  }
</script>

<style lang="scss" scoped>
</style>
