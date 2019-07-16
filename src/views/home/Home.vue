<template>
  <div>
    <el-card shadow="hover">
      <div slot="header" class="clearfix">
        <span>会员生日提醒</span>
      </div>
      <el-table :data="tableData" style="width: 100%" size="mini">
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="phone" label="电话"></el-table-column>
        <el-table-column prop="time" label="生日">
          <template slot-scope="scope">
            <span>{{scope.row.time.slice(0,10)}}</span>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
  export default {
    name: "home",
    data() {
      return {
        tableData: [],
      }
    },
    methods: {
      fetch(page) {
        this.loading = true
        this.$ajax.post('/listBirthday.action', {limit: 10, page: page || 1})
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

<style lang="scss" scoped>
</style>
