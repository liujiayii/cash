<template>
  <div>
    <el-form :inline="true" :model="searchForm">
      <el-form-item label="日期">
        <el-date-picker v-model="searchForm.createTime" value-format="timestamp" type="month"
                        placeholder="选择月份"></el-date-picker>
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
        <div>{{money.sumOrderMoney}}</div>
      </el-card>
      <el-card header="订单总量" style="width: 200px;margin-left: 10px" shadow="hover">
        <div>{{money.sumOrder}}</div>
      </el-card>
      <el-card shadow="hover" header="当月商品销量前十">
        <ul>
          <li v-for="(item,index) of topList" :key="index">
            <div style="width: 200px">
              <span>NO.{{index+1}}:{{item.name}}</span>
            </div>
          </li>
        </ul>
      </el-card>
    </div>
    <div>
      <el-card style="height: 500px;width: 30%" shadow="hover" header="当月销售商品销量占比图">
        <div id="c1"></div>
      </el-card>
    </div>
  </div>
</template>

<script>
  import G2 from '@antv/g2';

  export default {
    name: "Monthly",
    data() {
      return {
        searchForm: {},
        topList: [],
        money: []
      }
    },
    methods: {
      getPie() {
        this.$ajax.post('/getPercentageOfProductTypeByMonth.action',)
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
      getTop() {
        this.$ajax.post('/getTopTenProduct.action',)
          .then((res) => {
            if (res.data.code === 1) {
              this.topList = res.data.listProduct
            }
          })
      },
      getMoney() {
        this.$ajax.post('/getOrderAndSumOrderMoney.action', {...this.searchForm})
          .then((res) => {
            if (res.data.code === 1) {
              this.money = res.data.data
            }
          })
      }
    },
    mounted() {
      this.getPie()
      this.getTop()
    }
  }
</script>

<style scoped>

</style>
