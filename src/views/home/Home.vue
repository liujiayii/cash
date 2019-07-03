<template>
  <div style="display: flex">
    <el-card class="box-card" shadow="hover">
      <el-calendar v-model="value"></el-calendar>
    </el-card>
    <el-card class="box-card" shadow="hover">
      <span>科技改变世界，</span>
      <el-divider><i class="el-icon-mobile-phone"></i></el-divider>
      <span>云阙改变未来。</span>
      <el-divider content-position="right">云阙让你的生活变得简单</el-divider>
      <el-timeline>
        <el-timeline-item v-for="item of msg" :key="item.id" :timestamp="formatDate(new Date(item.time),'yyyy/MM/dd')"
                          placement="top">
          <el-card shadow="hover">
            <h4>{{item.content}}</h4>
            <p>{{item.userName+' 提交于 '+formatDate(new Date(item.time),'yyyy/MM/dd hh:mm:ss')}}</p>
          </el-card>
        </el-timeline-item>
      </el-timeline>
      <el-pagination
        @current-change="fetch"
        :current-page="pagination.current"
        :page-size="3"
        layout="total, prev, pager, next, jumper"
        :total="pagination.total">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
  export default {
    name: "home",
    data() {
      return {
        value: new Date(),
        msg: [],
        pagination: {}
      }
    },
    methods: {
      fetch(page) {
        this.loading = true
        this.$ajax.post('/selectMessageNotification', {limit: 3, page: page || 1})
          .then((res) => {
            if (res.data.code === 1) {
              const pagination = {...this.pagination};
              pagination.total = res.data.count
              pagination.current = page;
              this.msg = res.data.data;
              this.pagination = pagination;
            }
          })
      },
      formatDate(date, fmt) {
        let o = {
          'M+': date.getMonth() + 1, // 月份
          'd+': date.getDate(), // 日
          'h+': date.getHours(), // 小时
          'm+': date.getMinutes(), // 分
          's+': date.getSeconds(), // 秒
          'S': date.getMilliseconds() // 毫秒
        }
        if (/(y+)/.test(fmt)) {
          fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
        }
        for (let k in o) {
          if (new RegExp('(' + k + ')').test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
          }
        }
        return fmt
      }
    },
    mounted() {
      //this.fetch()
    }
  }
</script>

<style lang="scss" scoped>


  .box-card {
    width: 50%;
    margin: 20px;
  }
</style>
