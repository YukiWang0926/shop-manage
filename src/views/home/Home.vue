<template>
  <el-container class="home-container">
    <!--      头部-->
    <el-header>
      <div>
        <img src="@/assets/img/heima.png" alt="">
        <span>电商管理系统</span>
      </div>
      <Logout></Logout>
    </el-header>
    <el-container style="overflow: auto">
      <!--侧边栏-->
      <menu-list :menuList="menuList"/>
      <!--主栏-->
      <el-main>
        <bread-crumb :menuList="menuList"></bread-crumb>
        <router-view/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  import Logout from "@/components/content/Logout";
  import MenuList from "@/components/content/MenuList";
  import BreadCrumb from "@/components/content/BreadCrumb";

  import {requestMenu} from "@/network/home";

  export default {
    name: "Home",
    components: {
      MenuList,
      Logout,
      BreadCrumb
    },

    data() {
      return {
        menuList: [],
      }
    },
    created() {
      this.getMenuList()
    },
    methods: {
      getMenuList() {
        requestMenu().then(data => {
          this.menuList = data
          // console.log(this.menuList)
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  .home-container {
    height: 100%;

    .el-header {
      background-color: #f5be6ccc;
      display: flex;
      justify-content: space-between;
      align-items: center;

      > div {
        display: flex;
        align-items: center;

        span {
          margin-left: 10px;
          color: #ffffff;
          font-size: 26px;
        }
      }
    }


  }

</style>