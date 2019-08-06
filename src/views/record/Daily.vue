<template>
  <div>
    <el-form :inline="true" :model="searchForm">
      <el-form-item v-if="($store.state.permission.indexOf(71001) !== -1)">
        <el-select v-model="searchForm.shopId">
          <el-option v-for="item of mallList" :key="item.shopId" :label="item.name" :value="item.id"
                     placeholder="选择店铺"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="日期">
        <el-date-picker v-model="searchForm.createTime" value-format="timestamp" placeholder="选择日期"></el-date-picker>
      </el-form-item>
      <el-form-item label="交易方式">
        <el-select v-model="searchForm.payMethod" placeholder="交易方式">
          <el-option label="现金" value="1"></el-option>
          <el-option label="POS机" value="2"></el-option>
          <el-option label="支付宝" value="3"></el-option>
          <el-option label="微信支付" value="4"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getMoney">查询</el-button>
      </el-form-item>
    </el-form>
    <div style="display: flex">
      <el-card header="总销售金额" style="width: 200px" shadow="hover">
        <div class="">{{money.sumOrderMoney}}元</div>
      </el-card>
      <el-card header="订单总量" style="width: 200px;margin-left: 10px" shadow="hover">
        <div>{{money.sumOrder}}件</div>
      </el-card>
    </div>
    <el-card style="height: 500px;width: 30%;margin-top: 10px" shadow="hover" header="当日销售商品销量占比图">
      <div id="c1"></div>
    </el-card>
  </div>
</template>

<script>
  import G2 from '@antv/g2'
  import {mixin} from "../../config/utils";

  export default {
    name: "Daily",
    mixins: [mixin],
    data() {
      return {
        searchForm: {createTime: new Date().getTime()},
        topList: [],
        money: [],
        mallList: [],
      }
    },
    methods: {
      getPie() {
        this.$ajax.post('/getPercentageOfProductType.action',)
          .then((res) => {
            if (res.data.code === 1) {
              let data = res.data.listOrder
              let max = 0;
              data.forEach(obj => {
                if (obj.count > max) {
                  max = obj.count;
                }
              })
              G2.Shape.registerShape('interval', 'sliceShape', {
                draw: function draw(cfg, container) {
                  let points = cfg.points;
                  let origin = cfg.origin._origin;
                  let percent = origin.count / max;
                  let xWidth = points[2].x - points[1].x;
                  let width = xWidth * percent;
                  let path = [];
                  path.push(['M', points[0].x, points[0].y]);
                  path.push(['L', points[1].x, points[1].y]);
                  path.push(['L', points[0].x + width, points[2].y]);
                  path.push(['L', points[0].x + width, points[3].y]);
                  path.push('Z');
                  path = this.parsePath(path);
                  return container.addShape('path', {
                    attrs: {
                      fill: cfg.color,
                      path: path
                    }
                  });
                }
              });
              let chart = new G2.Chart({
                container: 'c1',
                height: 500,
                forceFit: true
              });
              chart.source(data);
              chart.coord('theta', {
                radius: 0.8
              });
              chart.intervalStack().position('count').color('productType').shape('sliceShape').label('productType', {
                offset: -20
              });
              chart.render();
            }
          })
      },
      getMoney() {
        this.$ajax.post('/getOrderAndSumOrderMoney.action', {
          ...this.searchForm,
          createTime: this.formatDate(new Date(this.searchForm.createTime), 'yyyy-MM-dd hh:mm:ss.S')
        }).then((res) => {
          if (res.data.code === 1) {
            this.money = res.data.data
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
      this.getPie()
      this.getAllMall()
      this.getMoney()
    }
  }
</script>

<style scoped>

</style>
