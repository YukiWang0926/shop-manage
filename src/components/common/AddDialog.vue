<template>
  <el-dialog
    v-bind="$attrs"
    :visible.sync="dialogVisible"
  >
    <!--      添加用户表单-->
    <el-form ref="addForm" :model="addForm" label-width="70px" :rules="rules">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="addForm.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="addForm.password"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="addForm.email"></el-input>
      </el-form-item>
      <el-form-item label="手机" prop="mobile">
        <el-input v-model="addForm.mobile"></el-input>
      </el-form-item>
    </el-form>
    <!--      确定和取消-->
    <span slot="footer" class="dialog-footer">
      <el-button>取 消</el-button>
      <el-button type="primary" @click="addUser">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>

  import {addPostUser} from "@/network/users";

  export default {
    name: "AddDialog",
    props: {
      visible: Boolean
    },
    data() {
      //验证邮箱
      let checkEmail = (rule, value, callback) => {
        const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/
        if (regEmail.test(value)) {
          return callback()
        }
        callback(new Error('请输入合法的邮箱'))
      }
      //验证手机号
      let checkMobile = (rule, value, callback) => {
        const regMobile = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/
        if (regMobile.test(value)) {
          return callback()
        }
        callback(new Error('请输入正确的手机号'))
      }
      return {
        addForm: {
          username: '',
          password: '',
          email: '',
          mobile: ''
        },
        rules: {
          username: [
            {required: true, message: '请输入用户名', trigger: 'blur'},
            {min: 3, max: 10, message: '长度在 3 到 10个字符', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            {min: 6, max: 24, message: '长度在 6 到 24个字符', trigger: 'blur'}
          ],
          email: [
            {required: true, message: '请输入邮箱', trigger: 'blur'},
            {validator: checkEmail, trigger: 'blur'}
          ],
          mobile: [
            {required: true, message: '请输入手机', trigger: 'blur'},
            {validator: checkMobile, trigger: 'blur'}
          ],
        }
      }
    },
    computed: {
      dialogVisible: {
        get() {
          return this.visible
        },
        set(val) {
          this.$emit("update:visible", val)
        }
      }
    },
    methods: {

    },
    created() {
      console.log(this.$attrs);
    }
  }
</script>

<style scoped>

</style>