<template>
  <div class="">
    <div class="top">
      <el-form :inline="true" size="small">

        <el-form-item label="开始时间"  style="display: inline-block;margin-left:10px">
          <el-date-picker

                  value-format="yyyy-MM-dd HH:mm:ss"
                  v-model="seachsa.startTime"
                  type="datetime"
                  placeholder="选择日期时间" @blur="getList()">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="活动类型" :label-width="formLabelWidth" style="display: inline-block;margin-left:10px">
          <el-select v-model="seachsa.type" placeholder="请选择活动类型" class="formListinput" @change="getList()">
            <el-option label="满减活动" value=1></el-option>
            <el-option label="商品打折" value=2></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="活动状态" :label-width="formLabelWidth" style="display: inline-block;margin-left:10px">
          <el-select v-model="seachsa.state" placeholder="请选择活动类型" class="formListinput" @change="getList()">
            <el-option label="未开始" value=1></el-option>
            <el-option label="进行中" value=2></el-option>
            <el-option label="已结束" value=3></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <span class="add">
    <el-button type="text" @click="open(1)">添加满减活动</el-button>
    <el-button type="text" @click="open(2)">添加折扣活动</el-button></span>

    <el-dialog  :visible.sync="dialogFormVisible" :modal-append-to-body="modalAppend" @closed="closedBox" append-to-body fullscreen
               width="1800px">
      <el-form :model="form" class="flex">
        <el-form-item label="活动名称" :label-width="formLabelWidth" class="formList">
          <el-input v-model="form.name" autocomplete="off" class="formListinput"  :disabled="disableda"></el-input>
        </el-form-item>

<!--        <el-form-item label="活动类型" :label-width="formLabelWidth" class="formList">-->
<!--          <el-select v-model="form.type" placeholder="请选择活动类型" class="formListinput">-->
<!--            <el-option label="满减活动" value=1></el-option>-->
<!--            <el-option label="商品打折" value=2></el-option>-->
<!--          </el-select>-->
<!--        </el-form-item>-->

        <el-form-item label="活动级别" :label-width="formLabelWidth" class="formList">
          <el-select v-model="form.scope" placeholder="请选择活动级别" class="formListinput" :disabled="disableda">
            <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="折扣率" :label-width="formLabelWidth" class="formList formLista" v-if="shows">
          <el-input v-model="form.discount" autocomplete="off" class="formListinput" :disabled="disableda"></el-input>
        </el-form-item>
        <el-form-item label="活动时间" :label-width="formLabelWidth" class="formList formListb">
          <el-date-picker
                  :disabled="disableda"
                  v-model="form.Time"
                  type="datetimerange"
                  value-format="timestamp"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期" class="formListinput ">
          </el-date-picker>
        </el-form-item>
<!--        <el-form-item :label-width="formLabelWidth" class="formList formLista" v-if="!shows">-->
<!--          &lt;!&ndash;          v-model="showssa"&ndash;&gt;-->
<!--          <el-popover placement="right" width="700" trigger="click" v-model="showpopover">-->
<!--            -->
<!--          </el-popover>-->
<!--        </el-form-item>-->
      </el-form>

      <div class="treebox" v-if="treeShow">
        <h1 class="h1"><i></i> 商品分类</h1>
        <el-tree
                :check-strictly=tree
                highlight-current
                class="treess"
                ref="tree"
                :data="dataTree"
                show-checkbox
                node-key="id"
                default-expand-all
                :default-checked-keys=checkedKeysa
                :props="defaultProps">
        </el-tree>

        <!--        :default-expanded-keys="[2, 3]"-->
        <!--        :default-checked-keys="[5]"-->
        <el-button style="float: right;" size="medium"  type="primary" plain @click="updataGoods" v-if="tableId!=null">提交</el-button>
      </div>
      <div class="treebox" v-if="!treeShow">
        <h1 class="h1"><i
                style="display: inline-block;  width: 3px; background-color: #606266;  height: 20px; position: relative; top: 5px;right: 5px;"></i>
          已选商品
          <el-button style="float: right;" size="medium"  type="primary" plain @click="reviseGoods">修改</el-button>
        </h1>
        <div v-for="(item ,index) in DetailsList" style=" margin-bottom:35px; padding:0 20px">
          <p style="font-size:16px;margin-top:10px;    position: relative;"><span style="position: relative;z-index:5;background: #fff;display: inline-block;padding:0 10px">{{item.productTypeName}}</span> <i style="position: absolute;
    display: block; width: 100%; top:11px;  background-color: #e1e1e1;left:-20px;  height: 1px;"></i></p>
          <div style="margin-left:20px">
            <span v-for="(items ,index) in item.products" style="font-size:14px；display: inline-block; margin:0 8px;">{{items.name}}</span>
          </div>
        </div>
      </div>
      <div v-if="!shows"  style="">
        <h1 class="h1"><i   style="display: inline-block;margin-top:40px;  width: 3px; background-color: #606266;  height: 20px; position: relative; top: 5px;right: 5px;"></i>满减规则</h1>
        <el-form :model="dynamicValidateForm" ref="dynamicValidateForm" label-width="100px" class="demo-dynamic"  style="width:1200px;margin:0 auto">
          <div v-for="(domain, index) in dynamicValidateForm.domains" :key="domain.key" class="flex">
            <p class="flex" style="width:44%"><span style="float: left">满：</span>
              <el-input class="inputbox" v-model="domain.fullArray"></el-input>
            </p>
            <p class="flex" style="width:56%"><span style="float: left">减：</span>
              <el-input class="inputbox" v-model="domain.reduceArray"></el-input>
<!--              <el-button @click="upDomain(domain)" v-show="updataDomain">修改</el-button>-->
              <el-button @click.prevent="removeDomain(domain)">删除</el-button>
            </p>
          </div>
          <!--            <el-form-item>-->
          <p style="width:100%;color: #999"><span>*</span>添加活动前请校验满减规则是否符合标准</p>
          <el-button type="primary" @click="submitForm('dynamicValidateForm')">校验</el-button>
          <el-button @click="addDomain">新增优惠</el-button>
          <el-button @click="insertDomain" v-show="updataDomain">提交</el-button>
          <!--              <el-button @click="resetForm('dynamicValidateForm')">重置</el-button>-->
          <!--            </el-form-item>-->
        </el-form>
        <!--        <el-button slot="reference" class="btnmj" @click="this.showpopover=true">满减规则</el-button>-->
      </div>
      <div slot="footer" class="dialog-footer" v-show="!updataDomain">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addDiscount()">确 定</el-button>
      </div>
    </el-dialog>
    <el-table
            border
            :data="tableList"
            style="width: 100%">
      <el-table-column
              prop="id"
              label="编号"
      >
      </el-table-column>
      <el-table-column
              prop="name"
              label="活动名称"
      >
      </el-table-column>
      <el-table-column
              prop="startTime"
              label="开始时间"
      >
        <template slot-scope="scope"><span>{{formatDate(new Date(scope.row.startTime),'yyyy-MM-dd')}}</span></template>
      </el-table-column>
      <el-table-column
              prop="endTime"
              label="结束时间"
      >
        <template slot-scope="scope"><span>{{formatDate(new Date(scope.row.endTime),'yyyy-MM-dd')}}</span></template>
      </el-table-column>
      <el-table-column
              prop="state"
              label="修改状态"
      >

        <template slot-scope="scope">
          <el-button v-if="scope.row.state==1" type="success" size="mini" round @click="starts(scope.row.id)">开始活动
          </el-button>
          <el-button v-if="scope.row.state==2" type="danger" size="mini" round @click="ends(scope.row.id)">结束活动
          </el-button>
          <span v-if="scope.row.state==3">活动已结束</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="400">
        <template slot-scope="scope">
          <el-button
                  size="mini"
                  @click="handleEdit(scope.$index, scope.row)">编辑
          </el-button>
          <el-button
                  size="mini"
                  @click="handleDetails(scope.$index, scope.row)">详情
          </el-button>
<!--          <el-button-->
<!--                  size="mini"-->
<!--                  type="danger"-->
<!--                  @click="handleDelete(scope.row)">删除-->
<!--          </el-button>-->
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
            @current-change="getList"
            :current-page="pagination.current"
            layout="total, prev, pager, next, jumper"
            :total="pagination.total">
    </el-pagination>
    <el-dialog title="活动修改" :visible.sync="dialogUpdata" @closed="Updata={}" :modal-append-to-body="modalAppend">
      <el-form :model="Updata">
        <el-form-item label="活动名称" :label-width="formLabelWidth">
          <el-input v-model="Updata.name" autocomplete="off" style="width:280px"></el-input>
        </el-form-item>
                <el-form-item label="活动类型" :label-width="formLabelWidth">
                  <el-select v-model="Updata.type" placeholder="请选择活动类型" :disabled="true">
                    <el-option
                            v-for="item in optionsType"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>

        <el-form-item label="活动级别" :label-width="formLabelWidth">
          <el-select v-model="Updata.scope" placeholder="请选择活动级别" :disabled="true">
            <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="折扣率" :label-width="formLabelWidth" class="formList formLista" v-if="shows">
          <el-input v-model="Updata.discount" autocomplete="off" style="width:280px"></el-input>
        </el-form-item>
        <el-form-item label="活动时间" :label-width="formLabelWidth" class="formList formListb">
          <el-date-picker
                  style="width:380px"
                  v-model="Updata.Time"
                  type="datetimerange"
                  value-format="timestamp"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="Updatas">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {mixin, area} from "../../config/utils";

  export default {
    name: "DiscountList",
    mixins: [mixin],
    data() {
      return {
        tableRow:{},
        showpopover:false,
      optionsType: [
        {
          label: "满减活动",
          value: 1
        },
        {
          label: "商品打折",
          value: 2
        }
      ],
        options: [
          {
            label: "通用级别",
            value: 1
          },
          {
            label: "分类级别",
            value: 2
          },
          {
            label: "商品级别",
            value: 3
          }
        ],
        disableda:false,
        updataDomain: false,
        tableId: null,
        checkedKeysa: [],
        checkedKeysaa: [],
        DetailsList: [],
        treeShow: true,
        pagination: {},
        updataId: null,
        dialogUpdata: false,
        Updata: {
          name: '',
          discount: "",
          Time: [],
          scope:'',
          type:""
        },
        tableList: [],
        tree: true,
        seachsa: {
          startTime: "",
          state: "",
          type: ""
        },
        shows: false,
        dataTree: [],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        dynamicValidateForm: {
          domains: [{
            fullArray: '',
            reduceArray: ''
          }],
        },
        modalAppend: false,
        dialogFormVisible: false,
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        formLabelWidth: '68px',
        fullArray: [],
        reduceArray: [],
        regulations: [],
        activityIds: []
      }
    },
    methods: {
      updataGoods(){
        this.$ajax.post("updateProductBySpecialOffersId.action", {id: this.tableId,ids:this.$refs.tree.getCheckedKeys()}
        ).then(res => {
          this.$message({
            type: 'success',
            message: res.data.message
          });
          this.dialogFormVisible=false
        })
      },
      closedBox() {
        // this.checkedKeysa=[]
        this.checkedKeysa = []
        this.checkedKeysaa = []
        if( this.$refs.tree!=undefined){
          this.$refs.tree.setCheckedKeys([])
        }
        // if (this.treeShow != false) {
        //   this.$refs.tree.setCheckedKeys([])
        // }
        // this.$refs.tree.setCheckedKeys([])
        this.form = {}
        this.dynamicValidateForm = {domains: [{fullArray: '', reduceArray: ''}]}

      },
      reviseGoods() {

        this.$ajax.post("selectPtAndPBySpecialOffersId.action", {id: this.tableId}
        ).then(res => {
          this.dataTree = []
          for (let i = 0; i < res.data.productList.length; i++) {
            let treeJson = {}
            treeJson.id = res.data.productList[i].id
            treeJson.label = res.data.productList[i].productTypeName
            treeJson.children = []
            for (let j = 0; j < res.data.productList[i].products.length; j++) {
              let jsonTrees = {}
              jsonTrees.id = res.data.productList[i].products[j].id
              jsonTrees.label = res.data.productList[i].products[j].name
              treeJson.children.push(jsonTrees)
            }
            this.dataTree.push(treeJson)
          }
          console.log(this.dataTree)
          this.treeShow = true
          this.checkedKeysa = this.checkedKeysaa
          // this.dialogFormVisible = true
          // if (row.type == 1) {this.shows = false } else { this.shows = true }
        })
      },
      handleDetails(index, row) {
        // return false
        this.disableda=true
        this.form.Time=[]
         this.form.name=row.name
         this.form.type=row.type
         this.form.Time.push(row.startTime)
         this.form.Time.push(row.endTime)
         this.form.scope=row.scope
         this.form.discount=row.discount

        this.updataDomain = true
        this.tableId = row.id
        this.tableRow=row
        if (row.type == 1) {
          this.shows = false
        } else {
          this.shows = true
        }
        this.$ajax.post("selectActivityInfoById.action", {id: row.id, state: row.state, type: row.type}
        ).then(res => {
          this.checkedKeysaa = []
          for (let j = 0; j < res.data.productList.length; j++) {
            for (let s = 0; s < res.data.productList[j].products.length; s++) {
              this.checkedKeysaa.push(res.data.productList[j].products[s].id)
            }
          }
          this.dynamicValidateForm.domains = []
          if (res.data.regulationList) {
            for (let s = 0; s < res.data.regulationList.length; s++) {
              let jsons = {}
              jsons.fullArray = res.data.regulationList[s].money
              jsons.reduceArray = res.data.regulationList[s].reduceMoney
              jsons.id = res.data.regulationList[s].id
              jsons.key = res.data.regulationList[s].id
              this.dynamicValidateForm.domains.push(jsons)
            }
          }
          this.DetailsList = []
          this.DetailsList = res.data.productList
          this.treeShow = false
          this.dialogFormVisible = true

        })
      },
      starts(ids) {
        this.$ajax.post("beginSpecialOffersById.action", {id: ids}
        ).then(res => {
          this.getList(this.pagination.current)
        })
      },
      ends(ids) {
        this.$confirm('此操作将结束活动, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$ajax.post("endSpecialOffersById.action", {id: ids}
          ).then(res => {
            this.getList(this.pagination.current)
            this.$message({
              type: 'success',
              message: '结束活动成功!'
            });
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消结束'
          });
        });

      },
      Updatas() {
        if (Date.parse(new Date()) > this.Updata.Time[0]) {
          this.$message({
            message: '活动开始时间不能比当前时间早',
            type: 'warning'
          });
        } else {
          this.$ajax.post("updateActivityById.action", {
              id: this.updataId,
              name: this.Updata.name,
              discount: this.Updata.discount,
              startTime: this.formatDate(new Date(this.Updata.Time[0]), 'yyyy-MM-dd hh:mm:ss'),
              endTime: this.formatDate(new Date(this.Updata.Time[1]), 'yyyy-MM-dd hh:mm:ss')
            }
          ).then(res => {
            this.dialogUpdata = false
          })
        }
      },
      handleEdit(index, row) {
        this.shows = row.type == 1 ? false : true
        this.updataId = row.id
        this.Updata.Time = []
        if (Date.parse(new Date()) < row.startTime && row.state == 1) {
          this.Updata.name = row.name
          this.Updata.discount = row.discount
          this.Updata.type = row.type
          this.Updata.scope = row.scope
          this.Updata.Time.push(row.startTime)
          this.Updata.Time.push(row.endTime)

          this.dialogUpdata = true
        } else {
          this.$message({
            message: '只有未开始的活动可以修改',
            type: 'warning'
          });
        }


      },
      open(num) {
        this.disableda=false
        this.updataDomain = false
        this.treeShow = true
        this.tableId = null
        if (num == 1) {
          this.shows = false
        } else {
          this.shows = true
        }
        this.dialogFormVisible = true

      },
      submitForm(formName) {

        this.$refs[formName].validate((valid) => {
          // console.log(this.dynamicValidateForm)
          if (valid) {
            this.fullArray = []
            this.reduceArray = []
            for (let i = 0; i < this.dynamicValidateForm.domains.length; i++) {
              this.fullArray.push(this.dynamicValidateForm.domains[i].fullArray)
              this.reduceArray.push(this.dynamicValidateForm.domains[i].reduceArray)
            }
            this.$ajax.post("checkFullReduce.action", {
                fullArray: this.fullArray,
                reduceArray: this.reduceArray
              }
            ).then(res => {
              if (res.data.code == 1) {
                this.$message({
                  message: res.data.message,
                  type: 'success'
                });
                this.showpopover=false
              } else {
                this.$message({
                  message: res.data.message,
                  type: 'warning'
                });
              }
            })

          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      // resetForm(formName) {
      //   this.$refs[formName].resetFields();
      // },
      upDomain(item){
        console.log(item)
      },
      removeDomain(item) {
        var index = this.dynamicValidateForm.domains.indexOf(item)
        this.$confirm('确定删除满减?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if (index !== -1) {
            console.log(item)
            if (item.id) {
              this.$ajax.post("deleteRegulationById.action", {id: item.id}
              ).then(res => {
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                });
                this.showpopover=true
              })
            }
            this.dynamicValidateForm.domains.splice(index, 1)
          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
          this.showpopover=true
        });

      },
      addDomain() {
        this.dynamicValidateForm.domains.push({
          fullArray: '',
          reduceArray: '',
          key: Date.now()
        });
      },
      insertDomain() {
        for (let i = 0; i < this.dynamicValidateForm.domains.length; i++) {
          if(this.dynamicValidateForm.domains[i].fullArray==""){
            this.$message({
              type: 'warning',
              message:"新增满减不能为空",
              duration: 1000
            });
            break
          }
          if (!this.dynamicValidateForm.domains[i].id && this.dynamicValidateForm.domains[i].fullArray!="") {
            this.$ajax.post("insertOneRegulation.action", {
              specialOffersId: this.tableId,
                money: this.dynamicValidateForm.domains[i].fullArray,
                reduceMoney: this.dynamicValidateForm.domains[i].reduceArray
              }
            ).then(res => {
              this.$message({
                type: 'success',
                message: res.data.message,
                duration: 1000
              });
              this.showpopover=false
              this.dialogFormVisible=false
            })
          }
        }

      },
      //添加活动前查询商品分类和商品信息
      getOrder() {
        this.$ajax.post("listProductAndTypeBefore.action", {}
        ).then(res => {
          for (let i = 0; i < res.data.data.length; i++) {
            let treeJson = {}
            treeJson.id = res.data.data[i].id
            treeJson.label = res.data.data[i].productTypeName
            treeJson.children = []
            for (let j = 0; j < res.data.data[i].products.length; j++) {
              let jsonTrees = {}
              jsonTrees.id = res.data.data[i].products[j].id
              jsonTrees.label = res.data.data[i].products[j].name
              treeJson.children.push(jsonTrees)
            }
            this.dataTree.push(treeJson)
          }
        })

      },
      addDiscount() {
       //alert()
        if(this.form.name==""||this.form.Time[0]==""||this.form.Time[1]==""||this.form.scope==""){

          this.$message({
            type: 'warning',
            message: '请将信息补充完整后在提交',
            duration: 1000
          });
          return false
        }
        if(!this.$refs.tree.getCheckedKeys().length>0){
          this.$message({
            type: 'warning',
            message: '商品不能为空',
            duration: 1000
          });
          return false
        }
        if (this.shows == false) {
          // alert(1)
          this.form.type=1
          this.regulations = []
          for (let j = 0; j < this.dynamicValidateForm.domains.length; j++) {
            let jsn = {}
            jsn.money = this.dynamicValidateForm.domains[j].fullArray
            jsn.reduceMoney = this.dynamicValidateForm.domains[j].reduceArray
            this.regulations.push(jsn)
          }
          let productIdArray = this.$refs.tree.getCheckedKeys()
          this.$ajax.post("checkAddActivityProduct.action", {productIdArray: productIdArray}
          ).then(res => {
            let activityIds = ""
            if (res.data.code == 1) {
             // alert(99)
              this.$ajax.post("insertActivity.action", {
                  jsonstr: JSON.stringify({
                    name: this.form.name,
                    type: this.form.type,
                    startTime: this.form.Time[0],
                    endTime: this.form.Time[1],
                    scope: this.form.scope,
                    ids: this.$refs.tree.getCheckedKeys(),
                  }),
                  myRegulations: JSON.stringify(this.regulations),
                }
              ).then(res => {
                this.$message({
                  type: 'success',
                  message: '添加活动成功!',
                  duration: 1000
                });
                //this.dataTree = []
                this.dialogFormVisible = false
                this.getList()
              })
            } else {
              this.$confirm('参加活动的商品重复, 是否取消之前的活动?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
               // alert(1)
                this.activityIds = []
                for (let i = 0; i < res.data.data.length; i++) {
                  this.activityIds.push(res.data.data[i].id)
                }
               // alert(this.$refs.tree.getCheckedKeys())
                this.$ajax.post("insertActivity.action", {
                    jsonstr: JSON.stringify({
                      name: this.form.name,
                      type: this.form.type,
                      startTime: this.form.Time[0],
                      endTime: this.form.Time[1],
                      scope: this.form.scope,
                      ids: this.$refs.tree.getCheckedKeys(),
                      activityIds: this.activityIds
                    }),
                    myRegulations: JSON.stringify(this.regulations),
                  }
                ).then(res => {
                  this.$message({
                    type: 'success',
                    message: '添加活动成功!',
                    duration: 1000
                  });
                  //this.dataTree = []
                  this.dialogFormVisible = false
                  this.getList()
                })
              }).catch(() => {
                this.$message({
                  type: 'info',
                  message: '取消失败',
                  duration: 1000
                });
              });
            }
          })
          // this.dialogFormVisible = false
        } else
          {
          this.form.type=2
          let productIdArray = this.$refs.tree.getCheckedKeys()
          this.$ajax.post("checkAddActivityProduct.action", {productIdArray: productIdArray}
          ).then(res => {
            let activityIds = ""
            if (res.data.code == 1) {
              this.$ajax.post("insertActivity.action", {
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
                this.$message({
                  type: 'success',
                  message: '添加活动成功!',
                  duration: 1000
                });
                //this.dataTree = []

                this.dialogFormVisible = false
                this.getList()
              })
            } else {
              this.$confirm('参加活动的商品重复, 是否取消之前的活动?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                this.activityIds = []
                for (let i = 0; i < res.data.data.length; i++) {
                  this.activityIds.push(res.data.data[i].id)
                }
                this.$ajax.post("insertActivity.action", {
                    jsonstr: JSON.stringify({
                      name: this.form.name,
                      type: this.form.type,
                      startTime: this.form.Time[0],
                      endTime: this.form.Time[1],
                      scope: this.form.scope,
                      ids: this.$refs.tree.getCheckedKeys(),
                      activityIds: this.activityIds,
                      discount: this.form.discount
                    }),
                  }
                ).then(res => {
                  this.$message({
                    type: 'success',
                    message: '添加活动成功!',
                    duration: 1000
                  });
                  //this.dataTree = []
                  this.dialogFormVisible = false
                  this.getList()
                })
              }).catch(() => {
                this.$message({
                  type: 'info',
                  message: '取消失败',
                  duration: 1000
                });
              });
            }
          })
        }
      },
      getList(num) {
        // +".0"
        this.$ajax.post("listActivity.action", {
            page: num || 1,
            limit: 10,
            timeStr: this.seachsa.startTime,
            state: this.seachsa.state == "" ? 0 : this.seachsa.state,
            type: this.seachsa.type == "" ? 0 : this.seachsa.type
          }
        ).then(res => {
            this.tableList = []
            const pagination = {...this.pagination};
            pagination.total = res.data.count
            pagination.current = num;
            this.pagination = pagination;
            this.tableList = res.data.data
          }
        )
      }
    },
    mounted() {
      this.getOrder()
      this.getList()
    }

  }
</script>

<style scoped>
  .add {
    float: right;
    margin: 0 15px 5px 0;
    cursor: pointer;
    position: relative;
    bottom: 10px;
    border-radius: 18px;
    height: 35px;
    linght-height: 40px;
    padding: 0 15px;
    font-size: 14px
  }

  .flex {
    justify-content: flex-start
  }

  .DiscountList >>> .el-form-item__content {
    display: flex;
    display: -webkit-flex;
    justify-content: space-between;
    flex-wrap: wrap
  }

  .inputbox {
    width: 280px
  }

  .el-form .el-input__inner, .el-form .el-textarea__inner {
    width: 180px
  }

  .inputbox >>> .el-form .el-input__inner, .el-form .el-textarea__inner {
    width: 100%
  }

  .formList {
    width: calc(100% / 6)
  }

  .formListb .formListinput {
    width: 360px !important
  }

  .formListinput >>> .el-input__inner {
    width: 180px !important
  }

  /*.formLista{width:60px}*/
  .treess >>> .el-tree-node .el-tree-node .el-tree-node__content {
    margin-top: 10px !important;
  }

  .treess >>> .el-tree-node .el-tree-node .el-tree-node__label {
    font-size: 14px !important;
    color: #999 !important;
  }

  .treess >>> .el-tree-node .el-tree-node {
    display: inline-block !important;
    width: 10%;
  }

  .treess >>> .el-tree-node {
    display: block !important;
    margin-bottom: 25px !important;
  }
  .treess >>> .el-tree-node .el-tree-node{
    margin-bottom: 10px !important;
  }
  .treess >>> .el-tree-node .el-checkbox {
    display: none !important;
  }

  .treess >>> .el-tree-node .el-tree-node .el-checkbox {
    display: inline-block !important;
  }

  .treess >>> .el-tree-node .el-tree-node__label {
    font-size: 16px !important;
    margin-bottom: 5px !important;
  }

  .btnmj {
    margin-left: 80px
  }

  /*.treebox{margin-top:20px}*/
  .h1 {
    font-size: 18px;
    margin: 10px 0 20px 0
  }

  .h1 i {
    display: inline-block;
    width: 3px;
    background-color: #606266;
    height: 20px;
    position: relative;
    top: 5px;
  }
  .treess >>> .el-tree-node.is-expanded>.el-tree-node__children{
    display: flex!important;display:-webkit-flex!important;justify-content:flex-start!important;flex-wrap: wrap!important
  }
</style>
