(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-5d8e1f96"],{"10e1":function(t,e,r){"use strict";r.r(e);var n=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[r("el-dialog",{attrs:{visible:t.dialogFormVisible,"append-to-body":""},on:{"update:visible":function(e){t.dialogFormVisible=e},closed:function(e){t.formData={}}}},[r("el-form",{ref:"ruleForm",attrs:{model:t.formData,rules:t.rules,inline:!0,"label-width":"120px"}},[r("el-form-item",{attrs:{label:"名称",prop:"name"}},[r("el-input",{attrs:{type:"text",maxlength:"20",autocomplete:"off"},model:{value:t.formData.name,callback:function(e){t.$set(t.formData,"name",e)},expression:"formData.name"}})],1)],1),r("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[r("el-button",{on:{click:function(e){t.dialogFormVisible=!1}}},[t._v("取 消")]),r("el-button",{attrs:{type:"primary"},on:{click:function(e){return t.submit("ruleForm")}}},[t._v("确 定")])],1)],1),r("el-dialog",{attrs:{visible:t.dialogFormVisible2,"modal-append-to-body":!1},on:{"update:visible":function(e){t.dialogFormVisible2=e}}},[r("el-tree",{ref:"tree",attrs:{data:t.accessList,"show-checkbox":"","default-expand-all":"","node-key":"id","highlight-current":"",props:{children:"children",label:"name"}}}),r("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[r("el-button",{on:{click:function(e){t.dialogFormVisible2=!1}}},[t._v("取 消")]),r("el-button",{attrs:{type:"primary"},on:{click:t.submit2}},[t._v("确 定")])],1)],1),r("div",{staticClass:"top"},[r("el-form",{attrs:{inline:!0,model:t.searchForm,size:"small"}},[r("el-form-item",[r("el-input",{attrs:{placeholder:"输入角色查询",type:"text"},model:{value:t.searchForm.name,callback:function(e){t.$set(t.searchForm,"name",e)},expression:"searchForm.name"}})],1),r("el-form-item",[r("el-button",{attrs:{type:"primary"},on:{click:function(e){return t.fetch()}}},[t._v("查询")]),r("el-button",{attrs:{type:"primary"},on:{click:function(e){return t.reset()}}},[t._v("重置")])],1)],1),r("el-button",{attrs:{type:"primary",size:"small",round:""},on:{click:function(e){t.dialogFormVisible=!0}}},[t._v("新建")])],1),r("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticStyle:{width:"100%"},attrs:{data:t.tableData}},[r("el-table-column",{attrs:{prop:"id",label:"编号"}}),r("el-table-column",{attrs:{prop:"name",label:"角色"}}),r("el-table-column",{attrs:{label:"操作"},scopedSlots:t._u([{key:"default",fn:function(e){return[r("el-button",{attrs:{type:"text",size:"small"},on:{click:function(r){return t.handleEdit(e.row)}}},[t._v("编辑")]),-1!==t.$store.state.permission.indexOf(70506)?r("el-button",{attrs:{type:"text",size:"small"},on:{click:function(r){return t.handleAccess(e.row)}}},[t._v("权限\n        ")]):t._e(),r("el-button",{attrs:{type:"text",size:"small"},on:{click:function(r){return t.handleDelete(e.row)}}},[t._v("删除")])]}}])})],1),r("el-pagination",{attrs:{"current-page":t.pagination.current,layout:"total, prev, pager, next, jumper",total:t.pagination.total},on:{"current-change":t.fetch}})],1)},i=[],a=(r("8e6e"),r("ac6a"),r("456d"),r("bd86")),o=(r("7f7f"),r("a745")),c=r.n(o);function s(t){if(c()(t)){for(var e=0,r=new Array(t.length);e<t.length;e++)r[e]=t[e];return r}}var l=r("774e"),u=r.n(l),f=r("c8bb"),d=r.n(f);function p(t){if(d()(Object(t))||"[object Arguments]"===Object.prototype.toString.call(t))return u()(t)}function m(){throw new TypeError("Invalid attempt to spread non-iterable instance")}function b(t){return s(t)||p(t)||m()}function g(t,e){var r=Object.keys(t);return Object.getOwnPropertySymbols&&r.push.apply(r,Object.getOwnPropertySymbols(t)),e&&(r=r.filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})),r}function h(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?g(r,!0).forEach(function(e){Object(a["a"])(t,e,r[e])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):g(r).forEach(function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))})}return t}var v={name:"Role",data:function(){return{tableData:[],pagination:{},loading:!1,searchForm:{},dialogFormVisible:!1,formData:{},rules:{newBid:[{required:!0,message:"请输入内容",trigger:"blur"}],bidState:[{required:!0,message:"请输入内容",trigger:"blur"}],businessType:[{required:!0,message:"请输入内容",trigger:"blur"}],name:[{required:!0,message:"请输入内容",trigger:"blur"}],lengthOfMaturity:[{required:!0,message:"请输入内容",trigger:"blur"}],money:[{required:!0,message:"请输入内容",trigger:"blur"}]},dialogFormVisible2:!1,accessList:JSON.parse(sessionStorage.getItem("access")),selectAccess:{ids:[],id:null},mallList:[]}},methods:{reset:function(){this.searchForm={},this.fetch()},handleEdit:function(t){this.formData=JSON.parse(JSON.stringify(t)),this.dialogFormVisible=!0},handleAccess:function(t){var e=this;this.$ajax.post("/listRolePermissions.action",{roleId:t.id}).then(function(r){1===r.data.code&&(e.dialogFormVisible2=!0,e.$nextTick(function(){e.$refs.tree.setCheckedKeys(b(r.data.data)),e.selectAccess={id:t.id}}))})},submit:function(t){var e=this;this.$refs[t].validate(function(t){if(t)return e.$ajax.post(e.formData.id?"/updateRole.action":"/saveRole.action",{id:e.formData.id||"",name:e.formData.name}).then(function(t){1===t.data.code&&(e.dialogFormVisible=!1,e.$message.success(t.data.msg),e.fetch(e.pagination.current))}),!1})},submit2:function(){var t=this;this.$ajax.post("/updateOneRolePermission.action",{id:this.selectAccess.id,ids:this.$refs.tree.getCheckedKeys().join(",")}).then(function(e){1===e.data.code&&(t.dialogFormVisible2=!1,t.$message.success(e.data.msg))})},fetch:function(t){var e=this;this.loading=!0,this.$ajax.post("/listRole.action",h({limit:10,page:t||1},this.searchForm)).then(function(r){if(1===r.data.code){var n=h({},e.pagination);n.total=r.data.count,n.current=t,e.loading=!1,e.tableData=r.data.data,e.pagination=n}})},handleDelete:function(t){var e=this;this.$confirm("是否删除?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){e.$ajax.post("/deleteRoleById.action",{id:t.id}).then(function(t){1===t.data.code&&(e.$message.success(t.data.msg),e.fetch(e.pagination.current))})}).catch(function(){e.$message.info("已取消")})},getAllMall:function(){var t=this;this.$ajax.post("/listAgentShop.action",{page:1,limit:100}).then(function(e){1===e.data.code&&(t.mallList=e.data.data)})}},mounted:function(){this.fetch(),this.getAllMall()}},y=v,x=r("2877"),O=Object(x["a"])(y,n,i,!1,null,null,null);e["default"]=O.exports},"11e9":function(t,e,r){var n=r("52a7"),i=r("4630"),a=r("6821"),o=r("6a99"),c=r("69a8"),s=r("c69a"),l=Object.getOwnPropertyDescriptor;e.f=r("9e1e")?l:function(t,e){if(t=a(t),e=o(e,!0),s)try{return l(t,e)}catch(r){}if(c(t,e))return i(!n.f.call(t,e),t[e])}},"1af6":function(t,e,r){var n=r("63b6");n(n.S,"Array",{isArray:r("9003")})},"20fd":function(t,e,r){"use strict";var n=r("d9f6"),i=r("aebd");t.exports=function(t,e,r){e in t?n.f(t,e,i(0,r)):t[e]=r}},3702:function(t,e,r){var n=r("481b"),i=r("5168")("iterator"),a=Array.prototype;t.exports=function(t){return void 0!==t&&(n.Array===t||a[i]===t)}},"40c3":function(t,e,r){var n=r("6b4c"),i=r("5168")("toStringTag"),a="Arguments"==n(function(){return arguments}()),o=function(t,e){try{return t[e]}catch(r){}};t.exports=function(t){var e,r,c;return void 0===t?"Undefined":null===t?"Null":"string"==typeof(r=o(e=Object(t),i))?r:a?n(e):"Object"==(c=n(e))&&"function"==typeof e.callee?"Arguments":c}},"454f":function(t,e,r){r("46a7");var n=r("584a").Object;t.exports=function(t,e,r){return n.defineProperty(t,e,r)}},"456d":function(t,e,r){var n=r("4bf8"),i=r("0d58");r("5eda")("keys",function(){return function(t){return i(n(t))}})},"46a7":function(t,e,r){var n=r("63b6");n(n.S+n.F*!r("8e60"),"Object",{defineProperty:r("d9f6").f})},"4ee1":function(t,e,r){var n=r("5168")("iterator"),i=!1;try{var a=[7][n]();a["return"]=function(){i=!0},Array.from(a,function(){throw 2})}catch(o){}t.exports=function(t,e){if(!e&&!i)return!1;var r=!1;try{var a=[7],c=a[n]();c.next=function(){return{done:r=!0}},a[n]=function(){return c},t(a)}catch(o){}return r}},"549b":function(t,e,r){"use strict";var n=r("d864"),i=r("63b6"),a=r("241e"),o=r("b0dc"),c=r("3702"),s=r("b447"),l=r("20fd"),u=r("7cd6");i(i.S+i.F*!r("4ee1")(function(t){Array.from(t)}),"Array",{from:function(t){var e,r,i,f,d=a(t),p="function"==typeof this?this:Array,m=arguments.length,b=m>1?arguments[1]:void 0,g=void 0!==b,h=0,v=u(d);if(g&&(b=n(b,m>2?arguments[2]:void 0,2)),void 0==v||p==Array&&c(v))for(e=s(d.length),r=new p(e);e>h;h++)l(r,h,g?b(d[h],h):d[h]);else for(f=v.call(d),r=new p;!(i=f.next()).done;h++)l(r,h,g?o(f,b,[i.value,h],!0):i.value);return r.length=h,r}})},"54a1":function(t,e,r){r("6c1c"),r("1654"),t.exports=r("95d5")},"5eda":function(t,e,r){var n=r("5ca1"),i=r("8378"),a=r("79e5");t.exports=function(t,e){var r=(i.Object||{})[t]||Object[t],o={};o[t]=e(r),n(n.S+n.F*a(function(){r(1)}),"Object",o)}},"774e":function(t,e,r){t.exports=r("d2d5")},"7cd6":function(t,e,r){var n=r("40c3"),i=r("5168")("iterator"),a=r("481b");t.exports=r("584a").getIteratorMethod=function(t){if(void 0!=t)return t[i]||t["@@iterator"]||a[n(t)]}},"85f2":function(t,e,r){t.exports=r("454f")},"8e6e":function(t,e,r){var n=r("5ca1"),i=r("990b"),a=r("6821"),o=r("11e9"),c=r("f1ae");n(n.S,"Object",{getOwnPropertyDescriptors:function(t){var e,r,n=a(t),s=o.f,l=i(n),u={},f=0;while(l.length>f)r=s(n,e=l[f++]),void 0!==r&&c(u,e,r);return u}})},9093:function(t,e,r){var n=r("ce10"),i=r("e11e").concat("length","prototype");e.f=Object.getOwnPropertyNames||function(t){return n(t,i)}},"95d5":function(t,e,r){var n=r("40c3"),i=r("5168")("iterator"),a=r("481b");t.exports=r("584a").isIterable=function(t){var e=Object(t);return void 0!==e[i]||"@@iterator"in e||a.hasOwnProperty(n(e))}},"990b":function(t,e,r){var n=r("9093"),i=r("2621"),a=r("cb7c"),o=r("7726").Reflect;t.exports=o&&o.ownKeys||function(t){var e=n.f(a(t)),r=i.f;return r?e.concat(r(t)):e}},a745:function(t,e,r){t.exports=r("f410")},ac6a:function(t,e,r){for(var n=r("cadf"),i=r("0d58"),a=r("2aba"),o=r("7726"),c=r("32e9"),s=r("84f2"),l=r("2b4c"),u=l("iterator"),f=l("toStringTag"),d=s.Array,p={CSSRuleList:!0,CSSStyleDeclaration:!1,CSSValueList:!1,ClientRectList:!1,DOMRectList:!1,DOMStringList:!1,DOMTokenList:!0,DataTransferItemList:!1,FileList:!1,HTMLAllCollection:!1,HTMLCollection:!1,HTMLFormElement:!1,HTMLSelectElement:!1,MediaList:!0,MimeTypeArray:!1,NamedNodeMap:!1,NodeList:!0,PaintRequestList:!1,Plugin:!1,PluginArray:!1,SVGLengthList:!1,SVGNumberList:!1,SVGPathSegList:!1,SVGPointList:!1,SVGStringList:!1,SVGTransformList:!1,SourceBufferList:!1,StyleSheetList:!0,TextTrackCueList:!1,TextTrackList:!1,TouchList:!1},m=i(p),b=0;b<m.length;b++){var g,h=m[b],v=p[h],y=o[h],x=y&&y.prototype;if(x&&(x[u]||c(x,u,d),x[f]||c(x,f,h),s[h]=d,v))for(g in n)x[g]||a(x,g,n[g],!0)}},b0dc:function(t,e,r){var n=r("e4ae");t.exports=function(t,e,r,i){try{return i?e(n(r)[0],r[1]):e(r)}catch(o){var a=t["return"];throw void 0!==a&&n(a.call(t)),o}}},bd86:function(t,e,r){"use strict";r.d(e,"a",function(){return a});var n=r("85f2"),i=r.n(n);function a(t,e,r){return e in t?i()(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}},c8bb:function(t,e,r){t.exports=r("54a1")},d2d5:function(t,e,r){r("1654"),r("549b"),t.exports=r("584a").Array.from},f1ae:function(t,e,r){"use strict";var n=r("86cc"),i=r("4630");t.exports=function(t,e,r){e in t?n.f(t,e,i(0,r)):t[e]=r}},f410:function(t,e,r){r("1af6"),t.exports=r("584a").Array.isArray}}]);