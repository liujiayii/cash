<template>
  <div>
    <el-dialog :visible.sync="dialogFormVisible" @closed="closeForm" append-to-body>
      <el-form :model="formData" :rules="rules" ref="ruleForm" :inline="true" label-width="120px">
        <el-form-item label="店铺名称" prop="name">
          <el-input type="text" v-model="formData.name" maxlength="20" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="地区" prop="area">
          <el-cascader :disabled="Boolean(formData.id)" v-model="formData.area" :options="area"></el-cascader>
        </el-form-item>
        <el-form-item label="详细地址" prop="addr">
          <el-input type="text" v-model="formData.addr" maxlength="20" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="phone">
          <el-input type="text" v-model="formData.phone" maxlength="20" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="开业时间" prop="createTime">
          <el-date-picker v-model="formData.createTime" value-format="timestamp" type="date"
                          placeholder="选择日期"></el-date-picker>
        </el-form-item>
        <el-form-item label="店铺状态" prop="state">
          <el-select v-model="formData.state">
            <el-option label="营业中" :value="1"></el-option>
            <el-option label="未营业" :value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注" prop="remarks">
          <el-input type="textarea" v-model="formData.remarks" maxlength="20" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户账号" prop="username">
          <el-input type="text" v-model="formData.username" maxlength="20" autocomplete="off"
                    :disabled="Boolean(formData.id)"></el-input>
        </el-form-item>
        <el-form-item label="用户密码" prop="password">
          <el-input type="password" v-model="formData.password" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="用户姓名" prop="uname">
          <el-input type="text" v-model="formData.uname" maxlength="20" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户联系电话" prop="uphone">
          <el-input type="text" v-model="formData.uphone" maxlength="20" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户性别" prop="sex">
          <el-select v-model="formData.sex">
            <el-option label="男" :value="1"></el-option>
            <el-option label="女" :value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户年龄" prop="age">
          <el-input type="text" v-model="formData.age" maxlength="20" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户入职日期" prop="entryTime">
          <el-date-picker v-model="formData.entryTime" value-format="timestamp" type="date"
                          placeholder="选择日期"></el-date-picker>
        </el-form-item>
        <el-form-item label="用户生日" prop="birthday">
          <el-date-picker v-model="formData.birthday" value-format="timestamp" type="date"
                          placeholder="选择日期"></el-date-picker>
        </el-form-item>
        <el-form-item label="用户备注" prop="uremarks">
          <el-input type="textarea" v-model="formData.uremarks" maxlength="20" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <el-tree
        :data="accessList"
        show-checkbox
        default-expand-all
        node-key="id"
        ref="tree"
        highlight-current
        :props="{ children: 'children', label: 'name'}">
      </el-tree>
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
      <el-button v-if="($store.state.permission.indexOf(101) !== -1)" type="primary" size="small" round
                 @click="dialogFormVisible=true">新建
      </el-button>
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
        <template slot-scope="scope"><span>{{formatDate(new Date(scope.row.createTime.time),'yyyy-MM-dd')}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="remarks" label="备注"></el-table-column>
      <el-table-column prop="state" label="状态">
        <template slot-scope="scope"><span>{{scope.row.state===1?'营业中':'未营业'}}</span></template>
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
  import {mixin, area} from "../../config/utils";

  export default {
    name: "Mall",
    mixins: [mixin],
    data() {
      let validPhone = (rule, value, callback) => {
        const valid = /^[1][3,4,5,6,7,8,9][0-9]{9}$/
        if (!valid.test(value)) {
          callback(new Error('请输入正确的手机号'));
        } else {
          callback();
        }
      }
      let validUser = (rule, value, callback) => {
        const valid = /^[a-zA-Z0-9_-]{6,12}$/
        if (!valid.test(value)) {
          callback(new Error('请输入6到12位正确的用户名'));
        } else {
          callback();
        }
      }
      return {
        tableData: [],
        area,
        pagination: {},
        loading: false,
        searchForm: {},
        dialogFormVisible: false,
        formData: {},
        rules: {
          phone: [{required: true, message: '请输入内容', trigger: 'blur'},
            {validator: validPhone, trigger: 'blur'}],
          birthday: [{required: true, message: '请输入内容', trigger: 'blur'}],
          sex: [{required: true, message: '请输入内容', trigger: 'blur'}],
          name: [{required: true, message: '请输入内容', trigger: 'blur'}],
          type: [{required: true, message: '请输入内容', trigger: 'blur'}],
          area: [{required: true, message: '请输入内容', trigger: 'blur'}],
          addr: [{required: true, message: '请输入内容', trigger: 'blur'}],
          createTime: [{required: true, message: '请输入内容', trigger: 'blur'}],
          state: [{required: true, message: '请输入内容', trigger: 'blur'}],
          username: [{required: true, message: '请输入内容', trigger: 'blur'},
            {validator: validUser, trigger: 'blur'}],
          uname: [{required: true, message: '请输入内容', trigger: 'blur'}],
          uphone: [{required: true, message: '请输入内容', trigger: 'blur'},
            {validator: validPhone, trigger: 'blur'}],
          age: [{required: true, message: '请输入内容', trigger: 'blur'}],
          entryTime: [{required: true, message: '请输入内容', trigger: 'blur'}]
        },
        accessList: JSON.parse(sessionStorage.getItem('access'))
      }
    },
    methods: {
      reset() {
        this.searchForm = {}
        this.fetch()
      },
      closeForm() {
        this.formData = {}
        this.$refs.tree.setCheckedKeys([]);
      },
      handleEdit(row) {
        this.$ajax.post('/showUpdateShop.action', {shopId: row.id})
          .then((res) => {
            if (res.data.code === 1) {
              this.dialogFormVisible = true
              this.$nextTick(() => {
                let cacheArr = []
                for (let i = 0; i < res.data.PermissionVolist.length; i++) {
                  cacheArr.push(res.data.PermissionVolist[i].id)
                }
                this.$refs.tree.setCheckedKeys([...cacheArr]);
                this.formData = JSON.parse(JSON.stringify(
                  {
                    ...row,
                    createTime: row.createTime.time,
                    area: [row.provid + '', row.cityid + '', row.areaid + ''],
                    uId: res.data.userVo2.id,
                    username: res.data.userVo2.username,
                    uname: res.data.userVo2.name,
                    uphone: res.data.userVo2.phone,
                    sex: res.data.userVo2.sex,
                    age: res.data.userVo2.age,
                    entryTime: (new Date('2019-07-19 11:47:18')).getTime(),
                    birthday: (new Date(res.data.userVo2.birthday)).getTime(),
                    uremarks: res.data.userVo2.remarks,
                    password: res.data.userVo2.password,
                  }))
              })
            }
          })
      },
      submit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log(this.$refs.tree.getCheckedKeys())
            this.$ajax.post(this.formData.id ? '/updateShop.action' : '/insertShop.action', {
              ...this.formData,
              createTime: this.formatDate(new Date(this.formData.createTime), 'yyyy-MM-dd hh:mm:ss.S'),
              entryTime: this.formatDate(new Date(this.formData.entryTime), 'yyyy-MM-dd hh:mm:ss.S'),
              birthday: this.formatDate(new Date(this.formData.birthday), 'yyyy-MM-dd hh:mm:ss.S'),
              provid: this.formData.area[0],
              cityid: this.formData.area[1],
              areaid: this.formData.area[2],
              type: 2,
              ids: this.$refs.tree.getCheckedKeys().join(',')
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
        this.$ajax.post('/listByShopNameVo.action', {limit: 10, page: page || 1, ...this.searchForm})
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
      },
    },
    mounted() {
      this.fetch()
    }
  }
</script>

<style scoped>

</style>
