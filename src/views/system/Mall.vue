<template>
  <div>
    <el-dialog :visible.sync="dialogFormVisible" @closed="formData={}" append-to-body>
      <el-form :model="formData" :rules="rules" ref="ruleForm" :inline="true" label-width="120px">
        <el-form-item label="店铺名称" prop="name">
          <el-input type="text" v-model="formData.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="店铺类型" prop="type">
          <el-select v-model="formData.type">
            <el-option label="总店" :value="1"></el-option>
            <el-option label="分店" :value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="省id" prop="provid">
          <el-input type="text" v-model="formData.provid" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="市id" prop="cityid">
          <el-input type="text" v-model="formData.cityid" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="区id" prop="areaid">
          <el-input type="text" v-model="formData.areaid" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="详细地址" prop="addr">
          <el-input type="text" v-model="formData.addr" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="phone">
          <el-input type="text" v-model="formData.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="开业时间" prop="createTime">
          <el-date-picker v-model="formData.createTime" type="date" placeholder="选择日期"></el-date-picker>
        </el-form-item>
        <el-form-item label="店铺状态：" prop="state">
          <el-select v-model="formData.state">
            <el-option label="营业中" :value="1"></el-option>
            <el-option label="未营业" :value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注" prop="remarks">
          <el-input type="text" v-model="formData.remarks" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit('ruleForm')">确 定</el-button>
      </div>
    </el-dialog>
    <div class="top">
      <el-form :inline="true" :model="searchForm" size="small">
        <el-form-item>
          <el-input placeholder="输入店铺名称查询" type="text" v-model="searchForm.name"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="fetch()">查询</el-button>
          <el-button type="primary" @click="reset()">重置</el-button>
        </el-form-item>
      </el-form>
      <el-button type="primary" size="small" round @click="dialogFormVisible=true">新建</el-button>
    </div>
    <el-table :data="tableData" style="width: 100%" v-loading="loading">
      <el-table-column prop="id" label="编号"></el-table-column>
      <el-table-column prop="name" label="分店名称"></el-table-column>
      <el-table-column prop="phone" label="联系电话"></el-table-column>
      <el-table-column prop="type" label="类型">
        <template slot-scope="scope"><span>{{scope.row.type===1?'总店':'分店'}}</span></template>
      </el-table-column>
      <el-table-column prop="provice" label="地区"></el-table-column>
      <el-table-column prop="addr" label="地址"></el-table-column>
      <el-table-column prop="createTime" label="开业时间">
        <template slot-scope="scope"><span>{{formatDate(new Date(scope.row.createTime),'yyyy-MM-dd')}}</span></template>
      </el-table-column>
      <el-table-column prop="remarks" label="备注"></el-table-column>
      <el-table-column prop="state" label="状态">
        <template slot-scope="scope"><span>{{scope.row.type===1?'营业中':'未营业'}}</span></template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button @click="handleDelete(scope.row)" type="text" size="small">删除</el-button>
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
    name: "Mall",
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
      }
    },
    methods: {
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
            this.formData.createTime = this.formatDate(this.formData.createTime, 'yyyy-MM-dd')
            this.$ajax.post(this.formData.id ? '/showUpdateShop.action' : '/insertShop.action', this.formData)
              .then((res) => {
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
        this.$ajax.post('/listAllShopVo.action', {limit: 10, page: page || 1, ...this.searchForm})
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
      handleDelete(row) {
        this.$confirm('是否删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$ajax.post('/deleteShop.action', {id: row.id})
            .then((res) => {
              if (res.data.code === 1) {
                this.$message.success(res.data.msg);
                this.fetch(this.pagination.current)
              }
            })
        }).catch(() => {
          this.$message.info('已取消');
        });
      }
    },
    mounted() {
      this.fetch()
    }
  }
</script>

<style scoped>

</style>
