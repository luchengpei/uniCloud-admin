(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-system-role-add"],{"1ea6":function(e,t,a){"use strict";a.d(t,"b",(function(){return i})),a.d(t,"c",(function(){return r})),a.d(t,"a",(function(){return n}));var n={uniForms:a("5a53").default,uniFormsItem:a("3a37").default,uniEasyinput:a("4754").default,uniDataCheckbox:a("260c").default},i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-uni-view",{staticClass:"uni-container"},[a("uni-forms",{ref:"form",attrs:{rules:e.rules,validateTrigger:"bind"},on:{submit:function(t){arguments[0]=t=e.$handleEvent(t),e.submit.apply(void 0,arguments)}},model:{value:e.formData,callback:function(t){e.formData=t},expression:"formData"}},[a("uni-forms-item",{attrs:{name:"role_id",label:"角色Id",required:!0}},[a("uni-easyinput",{attrs:{clearable:!1,placeholder:"请输入角色Id"},model:{value:e.formData.role_id,callback:function(t){e.$set(e.formData,"role_id",t)},expression:"formData.role_id"}})],1),a("uni-forms-item",{attrs:{name:"role_name",label:"角色名",required:!0}},[a("uni-easyinput",{attrs:{clearable:!1,placeholder:"请输入角色名"},model:{value:e.formData.role_name,callback:function(t){e.$set(e.formData,"role_name",t)},expression:"formData.role_name"}})],1),a("uni-forms-item",{attrs:{name:"permission",label:"权限列表"}},[a("uni-data-checkbox",{attrs:{multiple:!0,collection:"uni-id-permissions",field:"permission_name as text, permission_id as value"},model:{value:e.formData.permission,callback:function(t){e.$set(e.formData,"permission",t)},expression:"formData.permission"}})],1),a("uni-forms-item",{attrs:{name:"comment",label:"备注"}},[a("uni-easyinput",{attrs:{type:"textarea",clearable:!1,placeholder:"请输入备注"},model:{value:e.formData.comment,callback:function(t){e.$set(e.formData,"comment",t)},expression:"formData.comment"}})],1),a("v-uni-view",{staticClass:"uni-button-group"},[a("v-uni-button",{staticClass:"uni-button",staticStyle:{width:"100px"},attrs:{type:"primary"},on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.submitForm.apply(void 0,arguments)}}},[e._v("提交")]),a("v-uni-navigator",{staticStyle:{"margin-left":"15px"},attrs:{"open-type":"navigateBack"}},[a("v-uni-button",{staticClass:"uni-button",staticStyle:{width:"100px"}},[e._v("返回")])],1)],1)],1)],1)},r=[]},"2c75":function(e,t,a){"use strict";(function(e){var n=a("4ea4");a("caad"),a("d81d"),a("d3b7"),a("2532"),Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i=n(a("5530")),r=n(a("78f7")),o=e.database(),s=(o.command,"uni-id-roles");function l(e){var t={};for(var a in r.default)e.includes(a)&&(t[a]=r.default[a]);return t}var u={data:function(){return{formData:{role_id:"",role_name:"",permission:[],comment:""},rules:(0,i.default)({},l(["role_id","role_name","comment"])),permissions:[]}},onLoad:function(){this.loadPermissions()},methods:{submitForm:function(){this.$refs.form.submit()},submit:function(e){var t=this,a=e.detail,n=a.value,i=a.errors;i||(uni.showLoading({title:"提交中...",mask:!0}),o.collection(s).add(n).then((function(e){uni.showToast({title:"新增成功"}),t.getOpenerEventChannel().emit("refreshData"),setTimeout((function(){return uni.navigateBack()}),500)})).catch((function(e){uni.showModal({content:e.message||"请求服务失败",showCancel:!1})})).finally((function(){uni.hideLoading()})))},loadPermissions:function(){var e=this;o.collection("uni-id-permissions").limit(500).get().then((function(t){e.permissions=t.result.data.map((function(e){return{value:e.permission_id,text:e.permission_name}}))})).catch((function(e){uni.showModal({title:"提示",content:e.message,showCancel:!1})}))}}};t.default=u}).call(this,a("a9ff")["default"])},"78f7":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n={role_id:{rules:[{required:!0,errorMessage:"{label}必填"},{format:"string"}],label:"角色Id"},role_name:{rules:[{required:!0,errorMessage:"{label}必填"},{format:"string"}],label:"角色名"},permission:{rules:[{format:"array"}],label:"权限"},comment:{rules:[{format:"string"}],label:"备注"}};t.default=n},"9bff":function(e,t,a){"use strict";a.r(t);var n=a("2c75"),i=a.n(n);for(var r in n)"default"!==r&&function(e){a.d(t,e,(function(){return n[e]}))}(r);t["default"]=i.a},"9f94":function(e,t,a){"use strict";a.r(t);var n=a("1ea6"),i=a("9bff");for(var r in i)"default"!==r&&function(e){a.d(t,e,(function(){return i[e]}))}(r);var o,s=a("f0c5"),l=Object(s["a"])(i["default"],n["b"],n["c"],!1,null,null,null,!1,n["a"],o);t["default"]=l.exports}}]);