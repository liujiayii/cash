(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-e42aa69a"],{"454f":function(e,t,a){a("46a7");var i=a("584a").Object;e.exports=function(e,t,a){return i.defineProperty(e,t,a)}},"456d":function(e,t,a){var i=a("4bf8"),o=a("0d58");a("5eda")("keys",function(){return function(e){return o(i(e))}})},"46a7":function(e,t,a){var i=a("63b6");i(i.S+i.F*!a("8e60"),"Object",{defineProperty:a("d9f6").f})},"5eda":function(e,t,a){var i=a("5ca1"),o=a("8378"),n=a("79e5");e.exports=function(e,t){var a=(o.Object||{})[e]||Object[e],r={};r[e]=t(a),i(i.S+i.F*n(function(){a(1)}),"Object",r)}},"6d14":function(e,t,a){"use strict";a.r(t);var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("div",{staticClass:"top"},[a("el-form",{attrs:{inline:!0,size:"small"}},[a("el-form-item",{attrs:{label:"开始时间"}},[a("el-date-picker",{attrs:{"value-format":"yyyy-MM-dd HH:mm:ss",type:"datetime",placeholder:"选择日期时间"},model:{value:e.searchForm.timeStr,callback:function(t){e.$set(e.searchForm,"timeStr",t)},expression:"searchForm.timeStr"}})],1),a("el-form-item",{attrs:{label:"活动类型"}},[a("el-select",{attrs:{placeholder:"请选择活动类型"},model:{value:e.searchForm.type,callback:function(t){e.$set(e.searchForm,"type",t)},expression:"searchForm.type"}},[a("el-option",{attrs:{label:"满减活动",value:"1"}}),a("el-option",{attrs:{label:"商品打折",value:"2"}})],1)],1),a("el-form-item",{attrs:{label:"活动状态"}},[a("el-select",{attrs:{placeholder:"请选择活动类型"},model:{value:e.searchForm.state,callback:function(t){e.$set(e.searchForm,"state",t)},expression:"searchForm.state"}},[a("el-option",{attrs:{label:"未开始",value:"1"}}),a("el-option",{attrs:{label:"进行中",value:"2"}}),a("el-option",{attrs:{label:"已结束",value:"3"}})],1)],1),a("el-form-item",[a("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.fetch()}}},[e._v("查询")]),a("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.reset()}}},[e._v("重置")])],1)],1),a("el-button",{attrs:{type:"primary",round:"",size:"small"},on:{click:function(t){return e.open(1)}}},[e._v("添加满减活动")]),a("el-button",{attrs:{type:"primary",round:"",size:"small"},on:{click:function(t){return e.open(2)}}},[e._v("添加折扣活动")])],1),a("el-dialog",{attrs:{visible:e.dialogFormVisible,"modal-append-to-body":!1,"append-to-body":"",fullscreen:""},on:{"update:visible":function(t){e.dialogFormVisible=t},closed:e.closedBox}},[a("el-form",{attrs:{model:e.form,inline:!0,"label-width":"68px"}},[a("el-form-item",{attrs:{label:"活动名称"}},[a("el-input",{attrs:{autocomplete:"off",disabled:Boolean(e.form.id)},model:{value:e.form.name,callback:function(t){e.$set(e.form,"name",t)},expression:"form.name"}})],1),2===e.form.type?a("el-form-item",{staticClass:"num",attrs:{label:"折扣率"}},[a("el-input-number",{attrs:{precision:2,step:.1,min:.1,max:1,"controls-position":"right",disabled:Boolean(e.form.id)},model:{value:e.form.discount,callback:function(t){e.$set(e.form,"discount",t)},expression:"form.discount"}})],1):e._e(),a("el-form-item",{attrs:{label:"活动时间"}},[a("el-date-picker",{staticStyle:{width:"400px"},attrs:{disabled:Boolean(e.form.id),type:"datetimerange","value-format":"timestamp","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期"},model:{value:e.form.Time,callback:function(t){e.$set(e.form,"Time",t)},expression:"form.Time"}})],1)],1),a("div",[a("div",{staticClass:"h1"},[a("i"),e._v("商品分类")]),a("el-tree",{ref:"tree",attrs:{"highlight-current":"",data:e.dataTree,"show-checkbox":"","node-key":"id","default-expand-all":"",props:{children:"children",label:"label"}}}),e.form.id?a("el-button",{attrs:{size:"medium",type:"primary",plain:"",disabled:e.form.state>1},on:{click:e.updateGoods}},[e._v("提交\n      ")]):e._e()],1),1===e.form.type?a("div",[a("div",{staticClass:"h1"},[a("i"),e._v("满减规则")]),a("el-form",{ref:"dynamicValidateForm",attrs:{model:e.dynamicValidateForm,inline:!0,size:"small"}},[e._l(e.dynamicValidateForm.domains,function(t,i){return a("div",{key:t.key},[a("el-form-item",{attrs:{label:"满：",prop:"domains."+i+".money",rules:{required:!0,message:"不能为空",trigger:"blur"}}},[a("el-input",{attrs:{readonly:e.form.state>1},model:{value:t.money,callback:function(a){e.$set(t,"money",a)},expression:"domain.money"}})],1),a("el-form-item",{attrs:{label:"减：",prop:"domains."+i+".reduceMoney",rules:{required:!0,message:"不能为空",trigger:"blur"}}},[a("el-input",{attrs:{readonly:e.form.state>1},model:{value:t.reduceMoney,callback:function(a){e.$set(t,"reduceMoney",a)},expression:"domain.reduceMoney"}})],1),a("el-button",{attrs:{type:"danger",size:"small",disabled:e.form.state>1},on:{click:function(a){return a.preventDefault(),e.removeDomain(t)}}},[e._v("删除\n          ")])],1)}),a("el-button",{attrs:{disabled:e.form.state>1},on:{click:e.addDomain}},[e._v("新增优惠")]),a("el-button",{directives:[{name:"show",rawName:"v-show",value:e.form.id,expression:"form.id"}],attrs:{disabled:e.form.state>1},on:{click:function(t){return e.insertDomain("dynamicValidateForm")}}},[e._v("提交\n        ")])],2)],1):e._e(),a("div",{directives:[{name:"show",rawName:"v-show",value:!e.form.id,expression:"!form.id"}],staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.dialogFormVisible=!1}}},[e._v("取 消")]),a("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.addDiscount()}}},[e._v("确 定")])],1)],1),a("el-table",{staticStyle:{width:"100%"},attrs:{data:e.tableList}},[a("el-table-column",{attrs:{prop:"id",label:"编号"}}),a("el-table-column",{attrs:{prop:"name",label:"活动名称"}}),a("el-table-column",{attrs:{prop:"startTime",label:"开始时间"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(e.formatDate(new Date(t.row.startTime),"yyyy-MM-dd")))])]}}])}),a("el-table-column",{attrs:{prop:"endTime",label:"结束时间"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(e.formatDate(new Date(t.row.endTime),"yyyy-MM-dd")))])]}}])}),a("el-table-column",{attrs:{prop:"state",label:"修改状态"},scopedSlots:e._u([{key:"default",fn:function(t){return[1===t.row.state?a("el-button",{attrs:{type:"success",size:"mini",round:""},on:{click:function(a){return e.changeState(t.row)}}},[e._v("开始活动\n        ")]):e._e(),2===t.row.state?a("el-button",{attrs:{type:"danger",size:"mini",round:""},on:{click:function(a){return e.changeState(t.row)}}},[e._v("结束活动\n        ")]):e._e(),3===t.row.state?a("el-button",{attrs:{type:"info",size:"mini",round:""}},[e._v("活动已结束")]):e._e()]}}])}),a("el-table-column",{attrs:{label:"操作"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{type:"text",size:"mini"},on:{click:function(a){return e.handleEdit(t.row)}}},[e._v("编辑")]),a("el-button",{attrs:{type:"text",size:"mini"},on:{click:function(a){return e.handleDetails(t.row)}}},[e._v("详情")])]}}])})],1),a("el-pagination",{attrs:{"current-page":e.pagination.current,layout:"total, prev, pager, next, jumper",total:e.pagination.total},on:{"current-change":e.fetch}}),a("el-dialog",{attrs:{title:"活动修改",visible:e.dialogUpdate,"modal-append-to-body":!1},on:{"update:visible":function(t){e.dialogUpdate=t},closed:function(t){e.formUpdate={}}}},[a("el-form",{attrs:{model:e.formUpdate,inline:!0,"label-width":"100px"}},[a("el-form-item",{attrs:{label:"活动名称"}},[a("el-input",{attrs:{autocomplete:"off"},model:{value:e.formUpdate.name,callback:function(t){e.$set(e.formUpdate,"name",t)},expression:"formUpdate.name"}})],1),a("el-form-item",{attrs:{label:"活动类型"}},[a("el-select",{attrs:{placeholder:"请选择活动类型",disabled:""},model:{value:e.formUpdate.type,callback:function(t){e.$set(e.formUpdate,"type",t)},expression:"formUpdate.type"}},[a("el-option",{attrs:{label:"满减活动",value:1}}),a("el-option",{attrs:{label:"商品打折",value:2}})],1)],1),a("el-form-item",{attrs:{label:"活动级别"}},[a("el-select",{attrs:{placeholder:"请选择活动级别",disabled:""},model:{value:e.formUpdate.scope,callback:function(t){e.$set(e.formUpdate,"scope",t)},expression:"formUpdate.scope"}},[a("el-option",{attrs:{label:"通用级别",value:1}}),a("el-option",{attrs:{label:"分类级别",value:2}}),a("el-option",{attrs:{label:"商品级别",value:3}})],1)],1),2===e.formUpdate.type?a("el-form-item",{staticClass:"num",attrs:{label:"折扣率"}},[a("el-input-number",{attrs:{precision:2,step:.1,min:.1,max:1,"controls-position":"right"},model:{value:e.formUpdate.discount,callback:function(t){e.$set(e.formUpdate,"discount",t)},expression:"formUpdate.discount"}})],1):e._e(),a("el-form-item",{attrs:{label:"活动时间"}},[a("el-date-picker",{staticStyle:{width:"380px"},attrs:{type:"datetimerange","value-format":"timestamp","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期"},model:{value:e.formUpdate.Time,callback:function(t){e.$set(e.formUpdate,"Time",t)},expression:"formUpdate.Time"}})],1)],1),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.dialogUpdate=!1}}},[e._v("取 消")]),a("el-button",{attrs:{type:"primary"},on:{click:e.submit}},[e._v("确 定")])],1)],1)],1)},o=[],n=(a("8e6e"),a("ac6a"),a("456d"),a("7f7f"),a("bd86")),r=a("f4e6");function s(e,t){var a=Object.keys(e);return Object.getOwnPropertySymbols&&a.push.apply(a,Object.getOwnPropertySymbols(e)),t&&(a=a.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),a}function c(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?s(a,!0).forEach(function(t){Object(n["a"])(e,t,a[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):s(a).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))})}return e}var l={name:"DiscountList",mixins:[r["b"]],data:function(){return{pagination:{},dialogUpdate:!1,formUpdate:{},tableList:[],searchForm:{},dataTree:[],dynamicValidateForm:{domains:[{money:"",reduceMoney:""}]},dialogFormVisible:!1,form:{}}},methods:{reset:function(){this.searchForm={},this.fetch()},updateGoods:function(){var e=this;this.$ajax.post("/checkUpdateActivityProduct.action",{activityId:this.form.id,productIdArray:this.$refs.tree.getCheckedKeys()}).then(function(t){1===t.data.code&&e.$ajax.post("/updateProductBySpecialOffersId.action",{id:e.form.id,ids:e.$refs.tree.getCheckedKeys()}).then(function(t){1===t.data.code&&(e.$message.success(t.data.msg),e.dialogFormVisible=!1)})})},closedBox:function(){this.$refs.tree.setCheckedKeys([]),this.form={},this.dynamicValidateForm={domains:[{money:"",reduceMoney:""}]}},handleDetails:function(e){var t=this;this.form=c({},e,{Time:[e.startTime,e.endTime]}),this.$ajax.post("/selectActivityInfoById.action",{id:e.id,state:e.state,type:e.type}).then(function(e){if(1===e.data.code){t.dialogFormVisible=!0;for(var a=[],i=0;i<e.data.productList.length;i++)for(var o=0;o<e.data.productList[i].products.length;o++)a.push(e.data.productList[i].products[o].id);t.$nextTick(function(){t.$refs.tree.setCheckedKeys([].concat(a)),t.dynamicValidateForm.domains=e.data.regulationList||[]})}})},changeState:function(e){var t=this;this.$confirm("此操作将".concat(1===e.state?"开始":"结束","活动, 是否继续?"),"提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){t.$ajax.post(1===e.state?"/beginSpecialOffersById.action":"/endSpecialOffersById.action",{id:e.id}).then(function(e){1===e.data.code&&(t.fetch(t.pagination.current),t.$message.success(e.data.message))})}).catch(function(){t.$message.info("已取消")})},submit:function(){var e=this;(new Date).getTime()>this.formUpdate.Time[1]?this.$message.warning("活动时间不正确"):this.$ajax.post("/updateActivityById.action",{id:this.formUpdate.id,name:this.formUpdate.name,discount:this.formUpdate.discount||"",startTime:this.formatDate(new Date(this.formUpdate.Time[0]),"yyyy-MM-dd hh:mm:ss"),endTime:this.formatDate(new Date(this.formUpdate.Time[1]),"yyyy-MM-dd hh:mm:ss")}).then(function(t){1===t.data.code&&(e.$message.success(t.data.msg),e.dialogUpdate=!1,e.fetch(e.pagination.current))})},handleEdit:function(e){(new Date).getTime()<e.endTime&&1===e.state?(this.formUpdate=c({},e,{Time:[e.startTime,e.endTime]}),this.dialogUpdate=!0):this.$message.warning("只有未开始的活动可以修改")},open:function(e){this.form={type:e},this.dialogFormVisible=!0},removeDomain:function(e){var t=this;this.$confirm("确定删除满减?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){e.id&&t.$ajax.post("deleteRegulationById.action",{id:e.id}).then(function(e){1===e.data.code&&t.$message.success(e.data.msg)}),t.dynamicValidateForm.domains.splice(t.dynamicValidateForm.domains.indexOf(e),1)}).catch(function(){t.$message.info("已取消")})},addDomain:function(){this.dynamicValidateForm.domains.push({money:"",reduceMoney:"",key:Date.now()})},insertDomain:function(e){var t=this;this.$refs[e].validate(function(e){if(!e)return console.log("error submit!!"),!1;for(var a=[],i=[],o=0;o<t.dynamicValidateForm.domains.length;o++)a.push(t.dynamicValidateForm.domains[o].money),i.push(t.dynamicValidateForm.domains[o].reduceMoney);t.$ajax.post("/checkFullReduce.action",{fullArray:a,reduceArray:i}).then(function(e){if(1===e.data.code)for(var a=0;a<t.dynamicValidateForm.domains.length;a++)t.$ajax.post(t.dynamicValidateForm.domains[a].id?"/updateOneRegulation.action":"/insertOneRegulation.action",{specialOffersId:t.form.id,id:t.dynamicValidateForm.domains[a].id||"",money:t.dynamicValidateForm.domains[a].money,reduceMoney:t.dynamicValidateForm.domains[a].reduceMoney}).then(function(e){1===e.data.code&&(t.$message.success(e.data.msg),t.dialogFormVisible=!1)})})})},getOrder:function(){var e=this;this.$ajax.post("/listProductAndTypeBefore.action").then(function(t){if(1===t.data.code){var a=function e(t){return t.map(function(t){var a={id:t.id,label:t.name||t.productTypeName};return t.products&&t.products.length>0&&(a.children=e(t.products,a)),a})};e.dataTree=a(t.data.data)}})},addDiscount:function(){var e=this;if(1===this.form.type){for(var t=[],a=[],i=0;i<this.dynamicValidateForm.domains.length;i++)t.push(this.dynamicValidateForm.domains[i].money),a.push(this.dynamicValidateForm.domains[i].reduceMoney);this.$ajax.post("/checkFullReduce.action",{fullArray:t,reduceArray:a}).then(function(t){if(1===t.data.code){if(!e.form.name||!e.form.Time||e.$refs.tree.getCheckedKeys().length<1)return e.$message.warning("请将信息补充完整后在提交"),!1;for(var a=[],i=0;i<e.dynamicValidateForm.domains.length;i++)a.push({money:e.dynamicValidateForm.domains[i].money,reduceMoney:e.dynamicValidateForm.domains[i].reduceMoney});e.$ajax.post("/checkAddActivityProduct.action",{productIdArray:e.$refs.tree.getCheckedKeys()}).then(function(t){1===t.data.code?e.$ajax.post("/insertActivity.action",{jsonstr:JSON.stringify(c({},e.form,{scope:3,startTime:e.form.Time[0],endTime:e.form.Time[1],ids:e.$refs.tree.getCheckedKeys(),Time:""})),myRegulations:JSON.stringify(a)}).then(function(t){1===t.data.code&&(e.$message.success(t.data.msg),e.dialogFormVisible=!1,e.fetch())}):e.$confirm(t.data.msg,"提示",{confirmButtonText:"确定添加",cancelButtonText:"取消",type:"warning"}).then(function(){var i=[];if(t.data.data)for(var o=0;o<t.data.data.length;o++)i.push(t.data.data[o].id);e.$ajax.post("/insertActivity.action",{jsonstr:JSON.stringify(c({},e.form,{scope:3,startTime:e.form.Time[0],endTime:e.form.Time[1],ids:e.$refs.tree.getCheckedKeys(),Time:"",activityIds:i})),myRegulations:JSON.stringify(a)}).then(function(t){1===t.data.code&&(e.$message.success(t.data.msg),e.dialogFormVisible=!1,e.fetch())})}).catch(function(){e.$message.info("取消")})})}})}else if(2===this.form.type){if(!this.form.name||!this.form.Time||this.$refs.tree.getCheckedKeys().length<1)return this.$message.warning("请将信息补充完整后在提交"),!1;this.$ajax.post("/checkAddActivityProduct.action",{productIdArray:this.$refs.tree.getCheckedKeys()}).then(function(t){1===t.data.code?e.$ajax.post("/insertActivity.action",{jsonstr:JSON.stringify(c({},e.form,{scope:3,startTime:e.form.Time[0],endTime:e.form.Time[1],ids:e.$refs.tree.getCheckedKeys(),Time:""}))}).then(function(t){1===t.data.code&&(e.$message.success(t.data.msg),e.dialogFormVisible=!1,e.fetch())}):e.$confirm(t.data.msg,"提示",{confirmButtonText:"确定添加",cancelButtonText:"取消",type:"warning"}).then(function(){var a=[];if(t.data.data)for(var i=0;i<t.data.data.length;i++)a.push(t.data.data[i].id);e.$ajax.post("/insertActivity.action",{jsonstr:JSON.stringify(c({},e.form,{scope:3,startTime:e.form.Time[0],endTime:e.form.Time[1],ids:e.$refs.tree.getCheckedKeys(),Time:"",activityIds:a}))}).then(function(t){1===t.data.code&&(e.$message.success(t.data.msg),e.dialogFormVisible=!1,e.fetch())})}).catch(function(){e.$message.info("取消")})})}},fetch:function(e){var t=this;this.$ajax.post("/listActivity.action",c({page:e||1,limit:10},this.searchForm)).then(function(a){if(1===a.data.code){var i=c({},t.pagination);i.total=a.data.count,i.current=e,t.pagination=i,t.tableList=a.data.data}})}},mounted:function(){this.getOrder(),this.fetch()}},d=l,m=(a("74d4"),a("2877")),u=Object(m["a"])(d,i,o,!1,null,"ffaae3d4",null);t["default"]=u.exports},"74d4":function(e,t,a){"use strict";var i=a("c9a5"),o=a.n(i);o.a},"85f2":function(e,t,a){e.exports=a("454f")},"8e6e":function(e,t,a){var i=a("5ca1"),o=a("990b"),n=a("6821"),r=a("11e9"),s=a("f1ae");i(i.S,"Object",{getOwnPropertyDescriptors:function(e){var t,a,i=n(e),c=r.f,l=o(i),d={},m=0;while(l.length>m)a=c(i,t=l[m++]),void 0!==a&&s(d,t,a);return d}})},"990b":function(e,t,a){var i=a("9093"),o=a("2621"),n=a("cb7c"),r=a("7726").Reflect;e.exports=r&&r.ownKeys||function(e){var t=i.f(n(e)),a=o.f;return a?t.concat(a(e)):t}},ac6a:function(e,t,a){for(var i=a("cadf"),o=a("0d58"),n=a("2aba"),r=a("7726"),s=a("32e9"),c=a("84f2"),l=a("2b4c"),d=l("iterator"),m=l("toStringTag"),u=c.Array,f={CSSRuleList:!0,CSSStyleDeclaration:!1,CSSValueList:!1,ClientRectList:!1,DOMRectList:!1,DOMStringList:!1,DOMTokenList:!0,DataTransferItemList:!1,FileList:!1,HTMLAllCollection:!1,HTMLCollection:!1,HTMLFormElement:!1,HTMLSelectElement:!1,MediaList:!0,MimeTypeArray:!1,NamedNodeMap:!1,NodeList:!0,PaintRequestList:!1,Plugin:!1,PluginArray:!1,SVGLengthList:!1,SVGNumberList:!1,SVGPathSegList:!1,SVGPointList:!1,SVGStringList:!1,SVGTransformList:!1,SourceBufferList:!1,StyleSheetList:!0,TextTrackCueList:!1,TextTrackList:!1,TouchList:!1},p=o(f),y=0;y<p.length;y++){var h,b=p[y],g=f[b],v=r[b],T=v&&v.prototype;if(T&&(T[d]||s(T,d,u),T[m]||s(T,m,b),c[b]=u,g))for(h in i)T[h]||n(T,h,i[h],!0)}},bd86:function(e,t,a){"use strict";a.d(t,"a",function(){return n});var i=a("85f2"),o=a.n(i);function n(e,t,a){return t in e?o()(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}},c9a5:function(e,t,a){},f1ae:function(e,t,a){"use strict";var i=a("86cc"),o=a("4630");e.exports=function(e,t,a){t in e?i.f(e,t,o(0,a)):e[t]=a}}}]);