<template>
  <div class="users-page">
    <!--    卡片-->
    <div class="user-info">
      <!--  搜索和添加添加用户-->
      <el-row :gutter="20">
        <!--       搜索-->
        <el-col :span="12">
          <el-input placeholder="请输入内容" v-model="query" clearable @clear="getUsers">
            <el-button slot="append" icon="el-icon-search" @click="getUsers"></el-button>
          </el-input>
        </el-col>
        <!--       添加用户-->
        <el-col :span="6">
          <el-button type="primary" @click="dialogVisible = true">添加用户</el-button>
        </el-col>
      </el-row>
      <!--  展示用户信息table-->
      <el-table
        :data="userList"
        height="auto"
        stripe
        border
        style="flex:1"
        :default-sort="{prop: 'create_time', order: 'descending'}">
        <el-table-column type="index" :index="calIndex"/>
        <el-table-column prop="username" label="姓名"/>
        <el-table-column prop="email" label="邮箱"/>
        <el-table-column prop="mobile" label="电话"/>
        <el-table-column prop="role_name" label="角色"/>
        <el-table-column label="状态" width="80px">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.mg_state" @change="usersStateChange(scope.row)">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200px">
          <template slot-scope="scope">
            <el-button
              icon="el-icon-edit"
              type="primary"
              @click="handleEdit(scope.row.id)"></el-button>

            <el-button
              icon="el-icon-delete"
              type="danger"
              @click="handleDelete(scope.row.id)"></el-button>

            <el-tooltip effect="dark" content="设置权限" placement="top" :enterable="false">
              <el-button
                icon="el-icon-setting"
                type="warning"
                @click="setRole(scope.row)"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column
          sortable
          prop="create_time"
          label="创建时间">
          <template #default="{row}">
            {{row.create_time|formatTime}}
          </template>
        </el-table-column>
      </el-table>

      <!--      分页-->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pagenum"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>

    <!--    添加用户dialog-->
    <el-dialog
      title="添加用户"
      :visible.sync="dialogVisible"
      width="40%"
      @close="closeDialog"
    >
      <user-form ref="userForm" @submit="submit"></user-form>
    </el-dialog>

    <!--编辑用户dialog-->
    <el-dialog
      title="编辑用户"
      :visible.sync="editDialogVisible"
      width="40%"
      @close="closeDialog"
    >
      <user-form ref="userForm" @submit="editSubmit" id="编辑用户"></user-form>
    </el-dialog>

    <!--    设置权限dialog-->
    <el-dialog
      title="分配角色"
      :visible.sync="setRoleDialogVisible"
      width="30%"
      @close="closeRoleDialog"
    >
      <div>
        <p>当前用户:{{userInfo.username}}</p>
        <p>当前角色:{{userInfo.role_name}}</p>
        <p>分配新角色:
          <el-select v-model="selectedRoleId" placeholder="请选择角色">
            <el-option
              v-for="item in roleNameList"
              :key="item.id"
              :label="item.roleName"
              :value="item.id">
            </el-option>
          </el-select>
        </p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="setRoleDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveRoleInfo(selectedRoleId)">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
  import UserForm from "@/views/users/form/UserForm";

  import userApi from "@/network/users"
  import {requestRolesList} from '@/network/rights'


  export default {
    components: {
      UserForm,
    },
    name: "Users",
    data() {
      return {
        userList: [],
        total: null,
        query: '',
        pagenum: 1,
        pagesize: 10,
        dialogVisible: false,
        editDialogVisible: false,
        setRoleDialogVisible: false,
        userInfo: {},
        roleNameList: [],
        selectedRoleId: ''
      }
    },
    computed: {
      calIndex() {
        return (this.pagenum - 1) * this.pagesize + 1
      }
    },
    created() {
      this.getUsers()

    },
    methods: {
      //获取用户列表
      getUsers() {
        return userApi.requestUsers(this.query, this.pagenum, this.pagesize).then(data => {
          this.userList = data.users
          this.total = data.total
        })
      },
      //改变用户状态
      usersStateChange(userInfo) {
        // console.log(userInfo)
        userApi.changeUsersStatus(userInfo.id, userInfo.mg_state).then(
          this.$message.success('更新状态成功')
        ).catch(err=>{
          this.$message.error(err)
        })
      },
      //编辑用户,查询用户信息
      handleEdit(id) {
        this.editDialogVisible = true
        userApi.queryUserForm(id).then(data => {
          this.$refs.userForm.setForm(data)
        })
      },
      //删除用户
      handleDelete(id) {
        this.$confirm('确认删除该用户?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          //确定删除，调用删除接口
          userApi.deleteUser(id).then(this.getUsers).catch(err => this.$message.error(err))
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      //设置用户
      handleSetting(index, row) {
        console.log(index, row);
      },
      handleSizeChange(val) {
        this.pagesize = val
        this.getUsers()
      },
      handleCurrentChange(val) {
        this.pagenum = val
        this.getUsers()
      },
      // 关闭对话框
      closeDialog() {
        this.$refs.userForm.resetForm()
      },
      //添加用户提交表单
      submit(userForm) {
        userApi.addPostUser(userForm).then(() => {
          this.$refs.userForm.resetForm()
          this.getUsers()
          this.dialogVisible = false
        }).catch((err) => {
          this.$message.error({
            message: err,
            showClose: true,
            duration: 1000
          })
        })
      },
      //上传编辑表单
      editSubmit(userForm) {
        userApi.putEditUserForm(userForm.id, userForm).then(() => {
          this.getUsers()
          this.editDialogVisible = false
          this.$message.success('修改用户成功')

        })
      },
      //分配角色
      setRole(userInfo) {
        this.userInfo = userInfo
        //请求角色列表
        requestRolesList().then(data => {
          this.roleNameList = data
        }).catch(err => {
          this.$message.error(err)
        })
        this.setRoleDialogVisible = true
      },
      //保存分配的用户角色
      saveRoleInfo(rid) {
        if (!this.selectedRoleId) {
          return this.$message.error('请选择分配角色')
        }
        userApi.AssignUserRole(this.userInfo.id, rid).then(() => {
          this.getUsers()
        })
        this.setRoleDialogVisible = false
      },
      //监听关闭权限对话框
      closeRoleDialog() {
        this.selectedRoleId = ''
        this.userInfo = []
      }
    },
  }
</script>

<style lang="less" scoped>

  .users-page {
    height: 100%;
    overflow: auto;
    display: flex;
    flex-direction: column;

    .user-info {
      padding: 20px;
      flex: 1;
      height: 100%;
      border: 1px solid #ebeef5;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
      border-radius: 4px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      background-color: #fff;
    }
  }


</style>