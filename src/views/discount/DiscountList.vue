<template>
  <div>
    <div class="top">
      <el-form :inline="true" size="small">
        <el-form-item label="开始时间">
          <el-date-picker
            value-format="yyyy-MM-dd HH:mm:ss"
            v-model="searchForm.timeStr"
            type="datetime"
            placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="活动类型">
          <el-select v-model="searchForm.type" placeholder="请选择活动类型">
            <el-option label="满减活动" value=1></el-option>
            <el-option label="商品打折" value=2></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="活动状态">
          <el-select v-model="searchForm.state" placeholder="请选择活动类型">
            <el-option label="未开始" value=1></el-option>
            <el-option label="进行中" value=2></el-option>
            <el-option label="已结束" value=3></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="fetch()">查询</el-button>
          <el-button type="primary" @click="reset()">重置</el-button>
        </el-form-item>
      </el-form>
      <el-button type="primary" round size="small" @click="open(1)">添加满减活动</el-button>
      <el-button type="primary" round size="small" @click="open(2)">添加折扣活动</el-button>
    </div>
    <el-dialog :visible.sync="dialogFormVisible" :modal-append-to-body="false" @closed="closedBox" append-to-body
               fullscreen>
      <el-form :model="form" :inline="true" label-width="68px">
        <el-form-item label="活动名称">
          <el-input v-model="form.name" autocomplete="off" :disabled="Boolean(form.id)"></el-input>
        </el-form-item>
        <el-form-item label="活动级别">
          <el-select v-model="form.scope" placeholder="请选择活动级别" :disabled="Boolean(form.id)">
            <el-option label="通用级别" :value="1"></el-option>
            <el-option label="分类级别" :value="2"></el-option>
            <el-option label="商品级别" :value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="折扣率" v-if="form.type===2" class="num">
          <el-input-number v-model="form.discount" :precision="2" :step="0.1" :min="0.1"
                           :max="1" controls-position="right" :disabled="Boolean(form.id)"></el-input-number>
        </el-form-item>
        <el-form-item label="活动时间">
          <el-date-picker style="width: 400px" :disabled="Boolean(form.id)" v-model="form.Time" type="datetimerange"
                          value-format="timestamp"
                          range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
        </el-form-item>
      </el-form>
      <div>
        <div class="h1"><i></i>商品分类</div>
        <el-tree highlight-current ref="tree" :data="dataTree" show-checkbox node-key="id"
                 default-expand-all :props="{children: 'children',label: 'label'}"></el-tree>
        <el-button size="medium" type="primary" plain @click="updateGoods" v-if="form.id">提交</el-button>
      </div>
      <div v-if="form.type===1">
        <div class="h1"><i></i>满减规则</div>
        <el-form :model="dynamicValidateForm" ref="dynamicValidateForm" :inline="true" size="small">
          <div v-for="(domain,index) of dynamicValidateForm.domains" :key="domain.key">
            <el-form-item label="满：" :prop="'domains.' + index + '.money'"
                          :rules="{ required: true, message: '不能为空', trigger: 'blur'}">
              <el-input v-model="domain.money"></el-input>
            </el-form-item>
            <el-form-item label="减：" :prop="'domains.' + index + '.reduceMoney'"
                          :rules="{ required: true, message: '不能为空', trigger: 'blur'}">
              <el-input v-model="domain.reduceMoney"></el-input>
            </el-form-item>
            <el-button type="danger" @click.prevent="removeDomain(domain)" size="small">删除</el-button>
          </div>
          <el-button type="primary" @click="submitForm('dynamicValidateForm')">校验</el-button>
          <el-button @click="addDomain">新增优惠</el-button>
          <el-button @click="insertDomain('dynamicValidateForm')" v-show="form.id">提交</el-button>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer" v-show="!form.id">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addDiscount()">确 定</el-button>
      </div>
    </el-dialog>
    <el-table :data="tableList" style="width: 100%">
      <el-table-column prop="id" label="编号"></el-table-column>
      <el-table-column prop="name" label="活动名称"></el-table-column>
      <el-table-column prop="startTime" label="开始时间">
        <template slot-scope="scope"><span>{{formatDate(new Date(scope.row.startTime),'yyyy-MM-dd')}}</span></template>
      </el-table-column>
      <el-table-column prop="endTime" label="结束时间">
        <template slot-scope="scope"><span>{{formatDate(new Date(scope.row.endTime),'yyyy-MM-dd')}}</span></template>
      </el-table-column>
      <el-table-column prop="state" label="修改状态">
        <template slot-scope="scope">
          <el-button v-if="scope.row.state===1" type="success" size="mini" round @click="changeState(scope.row)">开始活动
          </el-button>
          <el-button v-if="scope.row.state===2" type="danger" size="mini" round @click="changeState(scope.row)">结束活动
          </el-button>
          <el-button v-if="scope.row.state===3" type="info" size="mini" round>活动已结束</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="mini" @click="handleDetails(scope.row)">详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @current-change="fetch"
      :current-page="pagination.current"
      layout="total, prev, pager, next, jumper"
      :total="pagination.total">
    </el-pagination>
    <el-dialog title="活动修改" :visible.sync="dialogUpdate" @closed="formUpdate={}" :modal-append-to-body="false">
      <el-form :model="formUpdate" :inline="true" label-width="100px">
        <el-form-item label="活动名称">
          <el-input v-model="formUpdate.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="活动类型">
          <el-select v-model="formUpdate.type" placeholder="请选择活动类型" disabled>
            <el-option label="满减活动" :value="1"></el-option>
            <el-option label="商品打折" :value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="活动级别">
          <el-select v-model="formUpdate.scope" placeholder="请选择活动级别" disabled>
            <el-option label="通用级别" :value="1"></el-option>
            <el-option label="分类级别" :value="2"></el-option>
            <el-option label="商品级别" :value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="折扣率" v-if="formUpdate.type===2" class="num">
          <el-input-number v-model="formUpdate.discount" :precision="2" :step="0.1" :min="0.1"
                           :max="1" controls-position="right"></el-input-number>
        </el-form-item>
        <el-form-item label="活动时间">
          <el-date-picker style="width:380px" v-model="formUpdate.Time" type="datetimerange" value-format="timestamp"
                          range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogUpdate = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {mixin} from "../../config/utils";

  export default {
    name: "DiscountList",
    mixins: [mixin],
    data() {
      return {
        pagination: {},
        dialogUpdate: false,
        formUpdate: {},
        tableList: [],
        searchForm: {},
        dataTree: [],
        dynamicValidateForm: {
          domains: [{
            money: '',
            reduceMoney: ''
          }],
        },
        dialogFormVisible: false,
        form: {}
      }
    },
    methods: {
      reset() {
        this.searchForm = {}
        this.fetch()
      },
      updateGoods() {
        this.$ajax.post("/updateProductBySpecialOffersId.action", {
          id: this.form.id,
          ids: this.$refs.tree.getCheckedKeys()
        }).then(res => {
          if (res.data.code === 1) {
            this.$message.success(res.data.msg);
            this.dialogFormVisible = false
          }
        })
      },
      closedBox() {
        this.$refs.tree.setCheckedKeys([])
        this.form = {}
        this.dynamicValidateForm = {domains: [{money: '', reduceMoney: ''}]}
      },
      handleDetails(row) {
        this.form = {...row, Time: [row.startTime, row.endTime]}
        this.$ajax.post("/selectActivityInfoById.action", {id: row.id, state: row.state, type: row.type})
          .then(res => {
            if (res.data.code === 1) {
              this.dialogFormVisible = true
              let cacheArr = []
              for (let j = 0; j < res.data.productList.length; j++) {
                for (let s = 0; s < res.data.productList[j].products.length; s++) {
                  cacheArr.push(res.data.productList[j].products[s].id)
                }
              }
              this.$nextTick(() => {
                this.$refs.tree.setCheckedKeys([...cacheArr]);
                this.dynamicValidateForm.domains = res.data.regulationList || []
              })
            }
          })
      },
      changeState(row) {
        this.$confirm(`此操作将${row.state === 1 ? '开始' : '结束'}活动, 是否继续?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$ajax.post(row.state === 1 ? '/beginSpecialOffersById.action' : '/endSpecialOffersById.action', {id: row.id}
          ).then(res => {
            if (res.data.code === 1) {
              this.fetch(this.pagination.current)
              this.$message.success(res.data.message)
            }
          })
        }).catch(() => {
          this.$message.info('已取消')
        });
      },
      submit() {
        if (new Date().getTime() > this.formUpdate.Time[1]) {
          this.$message.warning('活动时间不正确');
        } else {
          this.$ajax.post("/updateActivityById.action", {
              id: this.formUpdate.id,
              name: this.formUpdate.name,
              discount: this.formUpdate.discount,
              startTime: this.formatDate(new Date(this.formUpdate.Time[0]), 'yyyy-MM-dd hh:mm:ss'),
              endTime: this.formatDate(new Date(this.formUpdate.Time[1]), 'yyyy-MM-dd hh:mm:ss')
            }
          ).then(res => {
            if (res.data.code === 1) {
              this.$message.success(res.data.msg);
              this.dialogUpdate = false
              this.fetch(this.pagination.current)
            }
          })
        }
      },
      handleEdit(row) {
        if (new Date().getTime() < row.endTime && row.state === 1) {
          this.formUpdate = {...row, Time: [row.startTime, row.endTime]}
          this.dialogUpdate = true
        } else {
          this.$message.warning('只有未开始的活动可以修改');
        }
      },
      open(type) {
        this.form = {type};
        this.dialogFormVisible = true
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let fullArray = []
            let reduceArray = []
            for (let i = 0; i < this.dynamicValidateForm.domains.length; i++) {
              fullArray.push(this.dynamicValidateForm.domains[i].money)
              reduceArray.push(this.dynamicValidateForm.domains[i].reduceMoney)
            }
            this.$ajax.post("/checkFullReduce.action", {
              fullArray: fullArray,
              reduceArray: reduceArray
            }).then(res => {
              if (res.data.code === 1) {
                this.$message.success(res.data.msg)
              }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      removeDomain(item) {
        this.$confirm('确定删除满减?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if (item.id) {
            this.$ajax.post("deleteRegulationById.action", {id: item.id}
            ).then(res => {
              if (res.data.code === 1) {
                this.$message.success(res.data.msg)
              }
            })
          }
          this.dynamicValidateForm.domains.splice(this.dynamicValidateForm.domains.indexOf(item), 1)
        }).catch(() => {
          this.$message.info('已取消')
        });
      },
      addDomain() {
        this.dynamicValidateForm.domains.push({money: '', reduceMoney: '', key: Date.now()});
      },
      insertDomain(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            for (let i = 0; i < this.dynamicValidateForm.domains.length; i++) {
              this.$ajax.post(this.dynamicValidateForm.domains[i].id ? '/updateOneRegulation.action' : '/insertOneRegulation.action', {
                specialOffersId: this.form.id,
                id: this.dynamicValidateForm.domains[i].id || '',
                money: this.dynamicValidateForm.domains[i].money,
                reduceMoney: this.dynamicValidateForm.domains[i].reduceMoney
              }).then(res => {
                if (res.data.code === 1) {
                  this.$message.success(res.data.msg);
                  this.dialogFormVisible = false
                }
              })
            }
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      getOrder() {//添加活动前查询商品分类和商品信息
        this.$ajax.post("/listProductAndTypeBefore.action",)
          .then(res => {
            if (res.data.code === 1) {
              const generator = list => {
                return list.map(item => {
                  const current = {
                    id: item.id,
                    label: item.name || item.productTypeName,
                  }
                  if (item.products && item.products.length > 0) {
                    current.children = generator(item.products, current)
                  }
                  return current
                })
              }
              this.dataTree = generator(res.data.data)
            }
          })
      },
      addDiscount() {
        if (this.form.name === "" || this.form.Time[0] === "" || this.form.Time[1] === "" || this.form.scope === "") {
          this.$message.warning('请将信息补充完整后在提交');
          return false
        }
        if (!this.$refs.tree.getCheckedKeys().length > 0) {
          this.$message.warning('商品不能为空');
          return false
        }
        if (this.form.type === 1) {
          let regulations = []
          for (let j = 0; j < this.dynamicValidateForm.domains.length; j++) {
            let jsn = {}
            jsn.money = this.dynamicValidateForm.domains[j].money
            jsn.reduceMoney = this.dynamicValidateForm.domains[j].reduceMoney
            regulations.push(jsn)
          }
          let productIdArray = this.$refs.tree.getCheckedKeys()
          this.$ajax.post("/checkAddActivityProduct.action", {productIdArray: productIdArray}
          ).then(res => {
            if (res.data.code === 1) {
              this.$ajax.post("/insertActivity.action", {
                  jsonstr: JSON.stringify({
                    name: this.form.name,
                    type: this.form.type,
                    startTime: this.form.Time[0],
                    endTime: this.form.Time[1],
                    scope: this.form.scope,
                    ids: this.$refs.tree.getCheckedKeys(),
                  }),
                  myRegulations: JSON.stringify(regulations),
                }
              ).then(res => {
                if (res.data.code === 1) {
                  this.$message.success(res.data.msg);
                  this.dialogFormVisible = false
                  this.fetch()
                }
              })
            } else {
              this.$confirm('参加活动的商品重复, 是否取消之前的活动?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                let activityIds = []
                for (let i = 0; i < res.data.data.length; i++) {
                  activityIds.push(res.data.data[i].id)
                }
                this.$ajax.post("/insertActivity.action", {
                    jsonstr: JSON.stringify({
                      name: this.form.name,
                      type: this.form.type,
                      startTime: this.form.Time[0],
                      endTime: this.form.Time[1],
                      scope: this.form.scope,
                      ids: this.$refs.tree.getCheckedKeys(),
                      activityIds: activityIds
                    }),
                    myRegulations: JSON.stringify(regulations),
                  }
                ).then(res => {
                  if (res.data.code === 1) {
                    this.$message.success(res.data.msg);
                    this.dialogFormVisible = false
                    this.fetch()
                  }
                })
              }).catch(() => {
                this.$message.info('取消失败');
              });
            }
          })
        } else {
          let productIdArray = this.$refs.tree.getCheckedKeys()
          this.$ajax.post("/checkAddActivityProduct.action", {productIdArray: productIdArray})
            .then(res => {
              if (res.data.code === 1) {
                this.$ajax.post("/insertActivity.action", {
                    jsonstr: JSON.stringify({
                      type: this.form.type,
                      name: this.form.name,
                      startTime: this.form.Time[0],
                      endTime: this.form.Time[1],
                      scope: this.form.scope,
                      ids: this.$refs.tree.getCheckedKeys(),
                      discount: this.form.discount
                    }),
                  }
                ).then(res => {
                  if (res.data.code === 1) {
                    this.$message.success(res.data.msg);
                    this.dialogFormVisible = false
                    this.fetch()
                  }
                })
              } else {
                this.$confirm('参加活动的商品重复, 是否取消之前的活动?', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                }).then(() => {
                  let activityIds = []
                  for (let i = 0; i < res.data.data.length; i++) {
                    activityIds.push(res.data.data[i].id)
                  }
                  this.$ajax.post("/insertActivity.action", {
                      jsonstr: JSON.stringify({
                        name: this.form.name,
                        type: this.form.type,
                        startTime: this.form.Time[0],
                        endTime: this.form.Time[1],
                        scope: this.form.scope,
                        ids: this.$refs.tree.getCheckedKeys(),
                        activityIds: activityIds,
                        discount: this.form.discount
                      }),
                    }
                  ).then(res => {
                    if (res.data.code === 1) {
                      this.$message.success(res.data.msg);
                      this.dialogFormVisible = false
                      this.fetch()
                    }
                  })
                }).catch(() => {
                  this.$message.info('取消失败');
                });
              }
            })
        }
      },
      fetch(page) {
        this.$ajax.post("/listActivity.action", {
          page: page || 1,
          limit: 10,
          ...this.searchForm
        }).then(res => {
            if (res.data.code === 1) {
              const pagination = {...this.pagination};
              pagination.total = res.data.count
              pagination.current = page;
              this.pagination = pagination;
              this.tableList = res.data.data
            }
          }
        )
      }
    },
    mounted() {
      this.getOrder()
      this.fetch()
    }
  }
</script>

<style lang="scss" scoped>
  .h1 {
    font-size: 18px;
    font-weight: bolder;
    padding: 20px;

    i {
      display: inline-block;
      width: 4px;
      background-color: #606266;
      height: 20px;
      position: relative;
      top: 4px;
      right: 4px;
    }
  }
</style>
