<template>
  <div class="agency-login-container">
      <Login :user='1'/>
  </div>
</template>

<script>
import Login from '../components/Login'

export default {
    name: 'agencyLogin',
    components:{
        Login,
    }
}
</script>

<style scoped lang="scss">
.agency-login-container{
    width: 100%;
    height: 100%;
}
</style>