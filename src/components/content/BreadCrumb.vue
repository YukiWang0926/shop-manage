<template>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <template v-for="item of breadcrumbs">
      <el-breadcrumb-item v-if="item.path" :key="item.title" :to="{ path: item.path }">
        {{ item.title }}
      </el-breadcrumb-item>
      <el-breadcrumb-item v-else :key="item.title">
        {{ item.title }}
      </el-breadcrumb-item>
    </template>
  </el-breadcrumb>
</template>

<script>
  export default {
    name: "BreadCrumb",
    props: {
      menuList: {
        type: Array,
        default() {
          return []
        }
      },
    },
    computed: {
      breadcrumbs() {
        for (let menu of this.menuList) {
          for (let subMenu of menu.children) {
            for (let r of this.$route.matched) {
              if ('/' + subMenu.path === r.path) {
                return [{title: "首页", path: "/home"}, {title: menu.authName}, {title: subMenu.authName}]
              }
            }
          }
        }
        return []
      }
    }
  }
</script>

<style scoped>

</style>