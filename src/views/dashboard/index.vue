<template>
  <div class="dashboard-container">
    <div class="user-info">
      <div class="title">用户数据</div>
      <div class="content">
        注册用户数  {{registerUser}}
      </div>
      <div class="content">
        实名用户数 {{realName}}
      </div>
    </div>
    <div class="user-info">
      <div class="title">发布内容</div>
      <div class="content">
        发布内容  {{release}}
      </div>
      <div class="content">
        铸造NFT  {{mode}}
      </div>
    </div>
  </div>
</template>

<script>

import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  data(){
    return{
      registerUser: 0,
      realName: 0,
      release: 0,
      mode: 0

    }
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  }
}
</script>

<style lang="scss" scoped>
.dashboard-container {
  margin: 30px;
}
.user-info{
    .title{
      font-size: 24px;
      font-weight: bold;
      margin: 20px 0;
    }
    .content{
      display: inline-block;
      margin-right: 10px;
    }
  }
</style>
