<template>
  <div>
    <el-form ref="userForm" :model="userForm" label-width="70px" :rules="rules">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="userForm.username" :disabled="id==null?false:true"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password" v-if="id==null">
        <el-input v-model="userForm.password"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email" ref="email">
        <el-input v-model="userForm.email"></el-input>
      </el-form-item>
      <el-form-item label="手机" prop="mobile" ref="mobile">
        <el-input v-model="userForm.mobile"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="resetForm">重置</el-button>
        <el-button type="primary" @click="submitForm">确定</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: "UserForm",
    props: {
      id: String
    },
    data() {
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
        userForm: {
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


    methods: {
      getForm() {
        return this.userForm
      },
      setForm(form) {
        this.userForm = {
          ...form
        }

      },
      submitForm() {
        this.$refs['userForm'].validate((valid) => {
          if (valid) {

            this.$emit('submit', this.userForm)
            // this.$refs['userForm'].resetFields();
          } else {
            return false;
          }
        });
      },
      resetForm() {
        if (this.id == null) {
          this.$refs.userForm.resetFields()
        } else {
          this.$refs.email.resetField()
          this.$refs.mobile.resetField()
        }
      }

    }
  }
</script>

<style scoped>

</style>