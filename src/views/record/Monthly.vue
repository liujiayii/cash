<template>
  <div style="display: flex">
    <el-card style="height: 500px;width: 30%" shadow="hover" header="当月销售商品销量占比图">
      <div id="c1"></div>
    </el-card>
    <el-card style="height: 500px;width: 30%" shadow="hover" header="当月商品销量前十">
      <el-timeline>
        <el-timeline-item v-for="(item, index) in topList" :key="index" :timestamp="item.name">{{item.count}}
        </el-timeline-item>
        <el-timeline-item v-for="(item, index) in topList" :key="index" :timestamp="item.name">{{item.count}}
        </el-timeline-item>
      </el-timeline>
    </el-card>
  </div>
</template>

<script>
  import G2 from '@antv/g2';

  export default {
    name: "Monthly",
    data() {
      return {
        topList: []
      }
    },
    methods: {
      getPie() {
        this.$ajax.post('/getPercentageOfProductTypeByMonth.action',)
          .then((res) => {
            if (res.data.code === 1) {
              let data = [...res.data.listOrder, ...res.data.listOrder]
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
