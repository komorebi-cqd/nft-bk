<template>
  <div class="admin-login-container">
      <Login :user='0'/>
  </div>
</template>

<script>
import Login from '../components/Login'

export default {
    name: 'adminLogin',
    components:{
        Login,
    }
}
</script>

<style scoped lang="scss">
.admin-login-container{
    width: 100%;
    height: 100%;
}
</style>