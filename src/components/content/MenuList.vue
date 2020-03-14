<template>
  <el-aside :width="isCollapse?'64px':'200px'">
    <div class="toggle-button" @click="isCollapse=!isCollapse">||||</div>
    <el-menu
      active-text-color="#409EFF"
      background-color="#545c64"
      class="el-menu-vertical-demo"
      text-color="#fff"
      :collapse="isCollapse"
      :collapse-transition="false"
      router
      :default-active="activeMenu"
    >
      <el-submenu v-for="(submenu,index1) of menuList" :key="index1" :index="'/'+submenu.path">
        <template slot="title">
          <i :class="iconObj[submenu.id]"></i>
          <span>{{submenu.authName}}</span>
        </template>

        <el-menu-item v-for="(menuItem,index2) of submenu.children" :key="index2" :index="'/'+menuItem.path">
          <template>
            <i class="el-icon-menu"></i>
            <span>{{menuItem.authName}}</span>
          </template>
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </el-aside>

</template>

<script>
  export default {
    name: "MenuList",
    props: {
      menuList: {
        type: Array,
        default() {
          return []
        }
      },
    },
    data() {
      return {
        isCollapse: false,
        //一级菜单图标映射
        iconObj: {
          '125': 'iconfont icon-user',
          '103': 'iconfont icon-tijikongjian',
          '101': 'iconfont icon-shangpin',
          '102': 'iconfont icon-danju',
          '145': 'iconfont icon-baobiao'
        }
      }
    },
    computed: {
      activeMenu() {
        for (let menu of this.menuList) {
          for (let subMenu of menu.children) {
            for (let r of this.$route.matched) {
              if ('/' + subMenu.path === r.path) {
                return r.path
              }
            }
          }
        }
        return ""
      }


    }
  }
</script>

<style lang="less" scoped>
  .el-aside {
    background-color: #545c64;
  }

  .toggle-button {
    background-color: #4a5064;
    color: #fff;
    font-size: 12px;
    letter-spacing: 0.2em;
    text-align: center;
    line-height: 24px;
    cursor: pointer;
  }

  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;

    .iconfont {
      margin-right: 10px;
    }
  }
</style>