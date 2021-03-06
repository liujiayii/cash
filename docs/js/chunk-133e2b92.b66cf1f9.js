(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-133e2b92"],{"11e9":function(e,t,r){var a=r("52a7"),o=r("4630"),i=r("6821"),n=r("6a99"),l=r("69a8"),s=r("c69a"),c=Object.getOwnPropertyDescriptor;t.f=r("9e1e")?c:function(e,t){if(e=i(e),t=n(t,!0),s)try{return c(e,t)}catch(r){}if(l(e,t))return o(!a.f.call(e,t),e[t])}},"384b":function(e,t,r){"use strict";r.r(t);var a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("div",{staticClass:"top"},[r("el-form",{attrs:{inline:!0,model:e.searchForm,size:"small"}},[r("el-form-item",{attrs:{label:"商品名称"}},[r("el-input",{attrs:{placeholder:"商品名称",clearable:""},on:{blur:function(t){return e.fetch()}},model:{value:e.searchForm.phone,callback:function(t){e.$set(e.searchForm,"phone",t)},expression:"searchForm.phone"}})],1),r("el-form-item",{attrs:{label:"商品种类"}},[r("el-select",{attrs:{placeholder:"请选择商品种类",clearable:""},on:{change:function(t){return e.fetch()}},model:{value:e.searchForm.productTypeId,callback:function(t){e.$set(e.searchForm,"productTypeId",t)},expression:"searchForm.productTypeId"}},e._l(e.productTypeId,function(e){return r("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}),1)],1)],1)],1),r("el-button",{attrs:{type:"primary",size:"small",round:""},on:{click:e.addGoods}},[e._v("添加+")]),r("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],staticStyle:{width:"100%"},attrs:{data:e.tableData}},[r("el-table-column",{attrs:{prop:"name",label:"商品名称"}}),r("el-table-column",{attrs:{prop:"barCode",label:"商品条码"}}),r("el-table-column",{attrs:{prop:"image",label:"商品图片"},scopedSlots:e._u([{key:"default",fn:function(e){return[r("img",{attrs:{src:e.row.image,alt:""}})]}}])}),r("el-table-column",{attrs:{prop:"pleased",label:"进货价"}}),r("el-table-column",{attrs:{prop:"salePrice",label:"销售价"}}),r("el-table-column",{attrs:{prop:"memberPrice",label:"会员价"}}),r("el-table-column",{attrs:{prop:"specification",label:"规格"}}),r("el-table-column",{attrs:{prop:"color",label:"颜色"}}),r("el-table-column",{attrs:{prop:"state",label:"是否上架"},scopedSlots:e._u([{key:"default",fn:function(t){return[r("el-switch",{attrs:{"active-text":"上架","inactive-text":"下架","active-value":1,"inactive-value":2},on:{change:function(r){return e.changState(t.row)}},model:{value:t.row.state,callback:function(r){e.$set(t.row,"state",r)},expression:"scope.row.state"}})]}}])}),r("el-table-column",{attrs:{prop:"productType",label:"商品种类"}}),r("el-table-column",{attrs:{label:"操作",fixed:"right",width:"250"},scopedSlots:e._u([{key:"default",fn:function(t){return[r("el-button",{attrs:{size:"mini"},on:{click:function(r){return e.handleEdit(t.row)}}},[e._v("编辑")]),r("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(r){return e.handleDelete(t.row)}}},[e._v("删除")]),r("el-button",{attrs:{size:"mini"},on:{click:function(r){return e.handlePrint(t.row)}}},[e._v("打印条码")])]}}])})],1),r("el-pagination",{attrs:{"current-page":e.pagination.current,layout:"total, prev, pager, next, jumper",total:e.pagination.total},on:{"current-change":e.fetch}}),r("el-dialog",{attrs:{title:"商品",visible:e.dialogFormVisible,"modal-append-to-body":!1},on:{"update:visible":function(t){e.dialogFormVisible=t},closed:e.closed}},[r("el-form",{ref:"ruleForm",attrs:{model:e.form,inline:!0,"label-width":"120px"}},[r("el-form-item",{attrs:{label:"商品名称",prop:"name",rules:[{required:!0,message:"商品名称不能为空",trigger:"blur"}]}},[r("el-input",{attrs:{autocomplete:"off"},model:{value:e.form.name,callback:function(t){e.$set(e.form,"name",t)},expression:"form.name"}})],1),r("el-form-item",{attrs:{label:"商品条码",prop:"barCode"}},[r("el-input",{attrs:{autocomplete:"off"},model:{value:e.form.barCode,callback:function(t){e.$set(e.form,"barCode",t)},expression:"form.barCode"}})],1),r("el-form-item",{attrs:{label:"商品进货价",prop:"pleased",rules:[{required:!0,message:"商品进货价不能为空",trigger:"blur"}]}},[r("el-input",{attrs:{autocomplete:"off",type:"number"},model:{value:e.form.pleased,callback:function(t){e.$set(e.form,"pleased",t)},expression:"form.pleased"}},[r("span",{attrs:{slot:"suffix"},slot:"suffix"},[e._v("元")])])],1),r("el-form-item",{attrs:{label:"商品销售价",prop:"salePrice",rules:[{required:!0,message:"商品销售价不能为空",trigger:"blur"}]}},[r("el-input",{attrs:{autocomplete:"off",type:"number"},model:{value:e.form.salePrice,callback:function(t){e.$set(e.form,"salePrice",t)},expression:"form.salePrice"}},[r("span",{attrs:{slot:"suffix"},slot:"suffix"},[e._v("元")])])],1),r("el-form-item",{attrs:{label:"商品会员价",prop:"memberPrice",rules:[{required:!0,message:"商品会员价不能为空",trigger:"blur"}]}},[r("el-input",{attrs:{autocomplete:"off",type:"number"},model:{value:e.form.memberPrice,callback:function(t){e.$set(e.form,"memberPrice",t)},expression:"form.memberPrice"}},[r("span",{attrs:{slot:"suffix"},slot:"suffix"},[e._v("元")])])],1),r("el-form-item",{attrs:{label:"商品状态",prop:"state",rules:[{required:!0,message:"商品状态不能为空",trigger:"blur"}]}},[r("el-select",{attrs:{placeholder:"请选择"},model:{value:e.form.state,callback:function(t){e.$set(e.form,"state",t)},expression:"form.state"}},[r("el-option",{attrs:{label:"上架",value:1}}),r("el-option",{attrs:{label:"下架",value:2}})],1)],1),r("el-form-item",{attrs:{label:"商品分类",prop:"productTypeId",rules:[{required:!0,message:"商品分类不能为空",trigger:"blur"}]}},[r("el-select",{attrs:{placeholder:"请选择商品分类"},model:{value:e.form.productTypeId,callback:function(t){e.$set(e.form,"productTypeId",t)},expression:"form.productTypeId"}},e._l(e.productTypeId,function(e){return r("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}),1)],1),e.form.id?e._e():r("el-form-item",{attrs:{label:"商品库存",prop:"quantity",rules:[{required:!0,message:"商品库存不能为空",trigger:"blur"}]}},[r("el-input",{attrs:{autocomplete:"off",type:"number"},model:{value:e.form.quantity,callback:function(t){e.$set(e.form,"quantity",t)},expression:"form.quantity"}})],1),e.form.id?e._e():r("el-form-item",{attrs:{label:"库存预警数量",prop:"inventoryWarning",rules:[{required:!0,message:"商品库存不能为空",trigger:"blur"}]}},[r("el-input",{attrs:{autocomplete:"off",type:"number"},model:{value:e.form.inventoryWarning,callback:function(t){e.$set(e.form,"inventoryWarning",t)},expression:"form.inventoryWarning"}})],1),r("el-form-item",{attrs:{label:"商品规格",prop:"specification",rules:[{required:!0,message:"商品规格不能为空",trigger:"blur"}]}},[r("el-input",{attrs:{autocomplete:"off"},model:{value:e.form.specification,callback:function(t){e.$set(e.form,"specification",t)},expression:"form.specification"}})],1),r("el-form-item",{attrs:{label:"商品颜色",prop:"color",rules:[{required:!0,message:"商品颜色不能为空",trigger:"blur"}]}},[r("el-input",{attrs:{autocomplete:"off"},model:{value:e.form.color,callback:function(t){e.$set(e.form,"color",t)},expression:"form.color"}})],1),r("el-form-item",{attrs:{label:"商品图片"}},[r("el-upload",{attrs:{action:"/upload.action","file-list":e.fileList,"list-type":"picture-card","on-success":e.handleSuccess,"on-preview":e.handlePictureCardPreview,"on-remove":e.handleRemove,limit:1}},[r("i",{staticClass:"el-icon-plus"})]),r("el-dialog",{attrs:{visible:e.dialogVisible},on:{"update:visible":function(t){e.dialogVisible=t}}},[r("img",{attrs:{width:"100%",src:e.dialogImageUrl,alt:""}})])],1)],1),r("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[r("el-button",{on:{click:function(t){e.dialogFormVisible=!1}}},[e._v("取 消")]),r("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.addCommodity("ruleForm")}}},[e._v("确 定")])],1)],1),r("el-dialog",{attrs:{title:"打印条码",visible:e.showImg,"modal-append-to-body":!1},on:{"update:visible":function(t){e.showImg=t}}},[r("div",{staticClass:"paintbox"},[r("img",{attrs:{src:"",alt:"",id:"imaged"}}),r("el-button",{attrs:{type:"primary",plain:""},on:{click:e.doPrint}},[e._v("打印")])],1)])],1)},o=[],i=(r("8e6e"),r("ac6a"),r("456d"),r("7f7f"),r("bd86"));function n(e,t){var r=Object.keys(e);return Object.getOwnPropertySymbols&&r.push.apply(r,Object.getOwnPropertySymbols(e)),t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),r}function l(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?n(r,!0).forEach(function(t){Object(i["a"])(e,t,r[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):n(r).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))})}return e}var s={name:"GoodsList",data:function(){return{showImg:!1,searchForm:{},loading:!1,pagination:{},tableData:[],shopId:[],productTypeId:[],dialogImageUrl:"",dialogVisible:!1,dialogFormVisible:!1,form:{},imgArr:[],fileList:[]}},methods:{changState:function(e){var t=this;this.$ajax.post("updateProductState.action",{id:e.id,state:2===e.state?2:1}).then(function(e){1===e.data.code&&t.$message.success(e.data.msg)})},closed:function(){this.form={},this.fileList=[]},doPrint:function(){this.$print(document.getElementById("imaged"))},addGoods:function(){this.dialogFormVisible=!0,this.fileList=[]},handlePrint:function(e){this.showImg=!0,this.$nextTick(function(){document.getElementById("imaged").src="/missionCreateCodeImage.action?number="+e.barCode})},fetch:function(e){var t=this;this.$ajax.post("getProductByCondition.action",l({},this.searchForm,{page:e||1,limit:10})).then(function(r){if(1===r.data.code){var a=l({},t.pagination);a.total=r.data.count,a.current=e,t.loading=!1,t.tableData=r.data.listProduct,t.pagination=a}})},getShopLists:function(){var e=this;-1!==this.$store.state.permission.indexOf(71001)&&this.$ajax.post("listShopIdAndName.action").then(function(t){if(1===t.data.code)for(var r=0;r<t.data.data.length;r++)e.shopId.push({value:t.data.data[r].id,label:t.data.data[r].name})})},getClassList:function(){var e=this;this.$ajax.post("listProductType.action").then(function(t){for(var r=0;r<t.data.listProductType.length;r++)e.productTypeId.push({value:t.data.listProductType[r].id,label:t.data.listProductType[r].productTypeName})})},addCommodity:function(e){var t=this;this.$refs[e].validate(function(e){e&&(t.form.productType="",t.form.shopId="",t.form.canUse="",t.$ajax.post(t.form.id?"createProduct.action":"addProduct.action",t.form).then(function(e){1===e.data.code&&(t.$message.success(e.data.msg),t.dialogFormVisible=!1,t.seachs(t.pagination.current))}))})},handleSuccess:function(e,t){console.log(e),this.form.image=e.data,console.log(this.form.image)},handleRemove:function(e,t){console.log(e,t)},handlePictureCardPreview:function(e){this.dialogImageUrl=e.url,this.dialogVisible=!0},handleEdit:function(e){this.dialogFormVisible=!0,this.form=JSON.parse(JSON.stringify(e)),this.fileList=e.image?[{name:"图片",url:e.image}]:[]},handleDelete:function(e){var t=this;this.$confirm("是否删除?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){t.$ajax.post("/delProduct.action",{productId:e.id}).then(function(e){1===e.data.code&&(t.$message.success(e.data.msg),t.fetch(t.pagination.current))})}).catch(function(){t.$message.info("已取消")})}},mounted:function(){this.fetch(),this.getClassList(),this.getShopLists()}},c=s,u=(r("baf2"),r("2877")),f=Object(u["a"])(c,a,o,!1,null,"806016fa",null);t["default"]=f.exports},"454f":function(e,t,r){r("46a7");var a=r("584a").Object;e.exports=function(e,t,r){return a.defineProperty(e,t,r)}},"456d":function(e,t,r){var a=r("4bf8"),o=r("0d58");r("5eda")("keys",function(){return function(e){return o(a(e))}})},"46a7":function(e,t,r){var a=r("63b6");a(a.S+a.F*!r("8e60"),"Object",{defineProperty:r("d9f6").f})},"5eda":function(e,t,r){var a=r("5ca1"),o=r("8378"),i=r("79e5");e.exports=function(e,t){var r=(o.Object||{})[e]||Object[e],n={};n[e]=t(r),a(a.S+a.F*i(function(){r(1)}),"Object",n)}},"85f2":function(e,t,r){e.exports=r("454f")},"8e6e":function(e,t,r){var a=r("5ca1"),o=r("990b"),i=r("6821"),n=r("11e9"),l=r("f1ae");a(a.S,"Object",{getOwnPropertyDescriptors:function(e){var t,r,a=i(e),s=n.f,c=o(a),u={},f=0;while(c.length>f)r=s(a,t=c[f++]),void 0!==r&&l(u,t,r);return u}})},9093:function(e,t,r){var a=r("ce10"),o=r("e11e").concat("length","prototype");t.f=Object.getOwnPropertyNames||function(e){return a(e,o)}},"990b":function(e,t,r){var a=r("9093"),o=r("2621"),i=r("cb7c"),n=r("7726").Reflect;e.exports=n&&n.ownKeys||function(e){var t=a.f(i(e)),r=o.f;return r?t.concat(r(e)):t}},ac6a:function(e,t,r){for(var a=r("cadf"),o=r("0d58"),i=r("2aba"),n=r("7726"),l=r("32e9"),s=r("84f2"),c=r("2b4c"),u=c("iterator"),f=c("toStringTag"),d=s.Array,m={CSSRuleList:!0,CSSStyleDeclaration:!1,CSSValueList:!1,ClientRectList:!1,DOMRectList:!1,DOMStringList:!1,DOMTokenList:!0,DataTransferItemList:!1,FileList:!1,HTMLAllCollection:!1,HTMLCollection:!1,HTMLFormElement:!1,HTMLSelectElement:!1,MediaList:!0,MimeTypeArray:!1,NamedNodeMap:!1,NodeList:!0,PaintRequestList:!1,Plugin:!1,PluginArray:!1,SVGLengthList:!1,SVGNumberList:!1,SVGPathSegList:!1,SVGPointList:!1,SVGStringList:!1,SVGTransformList:!1,SourceBufferList:!1,StyleSheetList:!0,TextTrackCueList:!1,TextTrackList:!1,TouchList:!1},p=o(m),b=0;b<p.length;b++){var g,h=p[b],v=m[h],y=n[h],P=y&&y.prototype;if(P&&(P[u]||l(P,u,d),P[f]||l(P,f,h),s[h]=d,v))for(g in a)P[g]||i(P,g,a[g],!0)}},baf2:function(e,t,r){"use strict";var a=r("bfcc"),o=r.n(a);o.a},bd86:function(e,t,r){"use strict";r.d(t,"a",function(){return i});var a=r("85f2"),o=r.n(a);function i(e,t,r){return t in e?o()(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}},bfcc:function(e,t,r){},f1ae:function(e,t,r){"use strict";var a=r("86cc"),o=r("4630");e.exports=function(e,t,r){t in e?a.f(e,t,o(0,r)):e[t]=r}}}]);