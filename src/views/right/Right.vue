<template>
  <div class="rights-pages">
    <el-table
      :data="rightsList"
      style="width: 100%"
      border
      stripe
      height="auto"
    >
      <el-table-column
        type="index">
      </el-table-column>
      <el-table-column
        prop="authName"
        label="权限名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="path"
        label="路径">
      </el-table-column>
      <el-table-column
        prop="level"
        label="权限等级">
        <template slot-scope="scope">
          <el-tag type="success" v-if="scope.row.level==='0'">一级</el-tag>
          <el-tag type="error" v-else-if="scope.row.level==='1'">二级</el-tag>
          <el-tag type="warning" v-else>三级</el-tag>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import {requestRightsList} from "@/network/rights";

  export default {
    name: "Right.vue",
    data() {
      return {
        rightsList: []
      }
    },
    created() {
      this.getRightList()
    },
    methods: {
      getRightList() {
        requestRightsList('list').then(data => {
          this.rightsList = data
        }).catch(err => {
          this.$message.error(err)
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  .rights-pages {
    display: flex;
    flex: 1;
    height: 100%;
    overflow: auto;
    border: 1px solid #ebeef5;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
    border-radius: 4px;

  }
</style>