<template>
  <div class="roles-page">
    <div class="roles-info">
      <!--   添加角色-->
      <el-row :gutter="10">
        <el-col :span="6">
          <el-button type="primary" @click="addDialogVisible=true">添加角色</el-button>
        </el-col>
      </el-row>
      <!--   角色展示区域-->
      <el-table :data="rolesLIst" style="width: 100%" border stripe>
        <el-table-column type="expand">
          <template slot-scope="props">

            <el-row v-for="item1 of props.row.children" :key="item1.id" class="item1 vcenter">
              <!-- 一级权限-->
              <el-col :span="5">
                <el-tag type="success">{{item1.authName}}</el-tag>
                <i class="el-icon-caret-right"></i>
              </el-col>
              <!-- 二级权限和三级权限-->
              <el-col :span="19">
                <el-row v-for="item2 in item1.children" :key="item2.id" class="item2 vcenter">
                  <!--   二级权限-->
                  <el-col :span='6'>
                    <el-tag>{{item2.authName}}</el-tag>
                    <i class="el-icon-caret-right"></i>
                  </el-col>
                  <!--三级权限-->
                  <el-col :span="18">
                    <el-tag closable @close="removeRight(props.row,item3.id)"
                            type="warning"
                            v-for="item3 in item2.children"
                            :key="item3.id">{{item3.authName}}
                    </el-tag>
                  </el-col>

                </el-row>
              </el-col>
            </el-row>

          </template>
        </el-table-column>
        <el-table-column type="index" width="50"/>
        <el-table-column prop="roleName" label="角色名称"/>
        <el-table-column prop="roleDesc" label="角色描述"/>
        <el-table-column label="操作" width="300px">
          <template slot-scope="scope">
            <el-button
              icon="el-icon-edit"
              type="primary"
              @click="handleEdit(scope.row.id)"
            >编辑
            </el-button>
            <el-button
              icon="el-icon-delete"
              type="danger"
              @click="handleDelete(scope.row.id)"
            >删除
            </el-button>

            <el-button
              icon="el-icon-setting"
              type="warning"
              @click="setRight(scope.row)"
            >设置权限
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!--   添加角色dialog-->
    <el-dialog
      title="添加角色"
      :visible.sync="addDialogVisible"
      width="30%"
      @close="closeDialog"
    >
      <roles-form ref="rolesForm" @submit="submit"/>
    </el-dialog>
    <!--   编辑角色dialog-->
    <el-dialog
      title="编辑角色"
      :visible.sync="editDialogVisible"
      width="30%"
      @close="closeDialog"
    >
      <roles-form ref="rolesForm" @submit="editSubmit"/>
    </el-dialog>
    <!--    设置权限dialog-->
    <el-dialog
      title="设置权限"
      :visible.sync="setRightDialogVisible"
      width="30%"
      @close="checkedKeys=[]"
    >
      <el-tree :data="rightsList"
               :props="{label:'authName',children:'children'}"
               node-key="id"
               show-checkbox
               :default-checked-keys="checkedKeys"
               ref="rightsTree"
      ></el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="setRightDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="assignRight(roleId)">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import RolesForm from "@/views/right/form/RolesForm";
  import {
    requestRolesList,
    addRoles,
    deleteRoles,
    queryRoleForm,
    editRole,
    deleteRight,
    requestRightsList,
    allowRights
  } from "@/network/rights";

  export default {
    name: "Roles",
    components: {RolesForm},
    data() {
      return {
        rolesLIst: [],
        addDialogVisible: false,
        editDialogVisible: false,
        setRightDialogVisible: false,
        rightsList: [],
        checkedKeys: [],
        roleId: ''

      }
    },
    created() {
      this.getRolesList()
    },
    methods: {
      getRolesList() {
        requestRolesList().then(data => {
          this.rolesLIst = data

        })
      },
      //确定添加角色
      submit(rolesForm) {
        addRoles(rolesForm).then(() => {
          this.getRolesList()
          this.addDialogVisible = false
          this.$refs.rolesForm.resetForm('rolesForm')
        }).catch(err => this.$message.error(err))
      },
      //编辑角色
      handleEdit(id) {
        this.editDialogVisible = true
        queryRoleForm(id).then(data => {
          this.$refs.rolesForm.setForm(data)
        })
      },
      //确定编辑角色
      editSubmit(rolesForm) {
        editRole(rolesForm.roleId, rolesForm).then(() => {
          this.getRolesList()
          this.editDialogVisible = false
          this.$refs.rolesForm.resetForm('rolesForm')

        }).catch(err => this.$message.error(err))
      },
      //删除角色
      handleDelete(id) {
        this.$confirm('确认删除该角色?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          //确定删除，调用删除接口
          deleteRoles(id).then(this.getRolesList).catch(err => this.$message.error(err))
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      //关闭dialog
      closeDialog() {
        this.$refs.rolesForm.resetForm('rolesForm')
      },
      //删除角色权限
      removeRight(role, id) {
        this.$confirm('确认删除该角色?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteRight(role.id, id).then(data => {
            role.children = data
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      //设置权限
      setRight(role) {
        requestRightsList('tree').then(data => {
          this.rightsList = data
          // console.log( this.rightsList)
        }).catch(err => {
          this.$message.error(err)
        })
        //获取当前角色已打勾的节点
        this.getDefaultKeys(this.checkedKeys, role)

        this.setRightDialogVisible = true
        this.roleId = role.id
      },
      //递归获取三级节点
      getDefaultKeys(arr, node) {
        if (!node.children) {
          return arr.push(node.id)
        }
        node.children.forEach(item => this.getDefaultKeys(arr, item))
      },
      //给角色分配权限
      assignRight(roleId) {
        const a = this.$refs.rightsTree.getHalfCheckedKeys()
        const b = this.$refs.rightsTree.getCheckedKeys()
        const rids = [...a, ...b].join(",")
        allowRights(roleId, rids).then(() => {
          this.$message.success('添加权限成功')
          this.getRolesList()
          this.setRightDialogVisible = false
        }).catch(err => {
          this.$message.error(err)
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  .roles-page {
    height: 100%;
    overflow: auto;
    display: flex;
    flex-direction: column;

    .roles-info {
      padding: 20px;
      flex: 1;
      height: 100%;
      border: 1px solid #ebeef5;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
      border-radius: 4px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
  }

  .item1 {
    border-bottom: 1px solid #eee;
    margin-bottom: 0;

    &:nth-child(1) {
      border-top: 1px solid #eee;
    }

    .el-tag {
      margin: 10px;
    }

  }

  .item2 {
    border-top: 1px solid #eee;
    margin-bottom: 0px;

    &:first-child {
      border-top: none;
    }

  }

  .vcenter {
    display: flex;
    align-items: center;
  }

</style>