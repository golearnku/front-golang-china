(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1eb13900"],{"7f7f":function(t,e,n){var o=n("86cc").f,r=Function.prototype,a=/^\s*function ([^ (]*)/,i="name";i in r||n("9e1e")&&o(r,i,{configurable:!0,get:function(){try{return(""+this).match(a)[1]}catch(t){return""}}})},ea9d:function(t,e,n){"use strict";n.r(e);var o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"oauth-redirect text-center p-5"},["auth.oauth_redirect"==t.$route.name?n("div",[t._v("Redirecting to "+t._s(t.$route.params.platform)+"...")]):n("div",[t._v("Fetching user info...")])])},r=[],a=(n("7f7f"),{name:"oauth",mounted:function(){var t=this,e=this.$route.params.platform;"auth.oauth_redirect"===this.$route.name?this.$http.get("oauth/redirect-url/"+e).then(function(t){window.location=t}):this.$http.get("oauth/callback/"+e).then(function(e){t.$store.dispatch("setToken",e.token),t.$store.dispatch("setUser",e.user),t.$store.dispatch("loadUser"),t.$message.success("欢迎回来~"),window.opener?(window.opener.location.reload(),window.close()):window.location.href="/"})}}),i=a,c=n("2877"),s=Object(c["a"])(i,o,r,!1,null,"46843aaf",null);e["default"]=s.exports}}]);
//# sourceMappingURL=chunk-1eb13900.36794bfa.js.map