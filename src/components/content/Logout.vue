<template>
  <el-button type="info" @click="logout">退出</el-button>
</template>

<script>
  export default {
    name: "Logout",
    methods:{
      logout(){
        window.sessionStorage.clear()
        this.$router.push({name:'login'})
      }
    }
  }
</script>

<style scoped>

</style>