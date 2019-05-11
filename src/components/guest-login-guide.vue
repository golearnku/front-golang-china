<template>
  <div class="box guest-login-guide text-center" v-if="!isLogged">
    <div class="text-18 p-2">加入Golang China<br>高品质的 Golang 开发者社区</div>
    <router-link class="btn btn-block btn-primary" :to="{ name: 'auth.register' }">注册</router-link>
    <router-link class="btn btn-block btn-outline-primary" :to="{ name: 'auth.login' }">登录</router-link>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'guest-login-guide',
  computed: {
    ...mapGetters(['isLogged'])
  }
}
</script>

<style scoped>
.guest-login-guide {
  background: url("/banners/technology.jpg");
  background-size: 160%;
  background-position: center;
}
</style>
