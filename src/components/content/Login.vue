<template>
  <div class="login-container">
    <div class="login">
      <!-- 头像-->
      <div class="avatar">
        <img src="../../assets/logo.png" alt="">
      </div>
      <!--表单-->
      <el-form ref="loginForm" :model="loginForm" class="login-form" :rules="rules">
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" prefix-icon="iconfont icon-user" placeholder="请输入用户名"
                    clearable></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" prefix-icon="iconfont icon-3702mima" placeholder="请输入密码"
                    show-password></el-input>
        </el-form-item>
        <el-form-item class="btns">
          <el-button type="primary" @click="login('loginForm')">登录</el-button>
          <el-button @click="resetForm()">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import {requestLogin} from "@/network/login"

  export default {
    name: "Login",
    data() {
      return {
        loginForm: {
          username: '',
          password: ''
        },
        rules: {
          username: [
            {required: true, message: '请输入用户名', trigger: 'blur'},
            {min: 3, max: 12, message: '长度在 3 到 12个字符', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            {min: 6, max: 24, message: '长度在 6 到 24个字符', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      login(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            requestLogin(this.loginForm.username, this.loginForm.password).then(res => {
              console.log(res)
              if (res.meta.status === 200) {
                // this.$message.success("登录成功")
                window.sessionStorage.setItem('token',res.data.token)
                this.$router.push('/home')
              } else {
                this.$message.error("用户或密码错误")
              }
            });
          } else {
            return false
          }
        });
      },
      resetForm() {
        this.$refs.loginForm.resetFields();
      }
    }

  }
</script>

<style lang="less" scoped>
  .login-container {
    background-color: #2b4b6b;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    .login {
      width: 450px;
      height: 300px;
      background-color: #fff;
      border-radius: 5px;

      .avatar {
        width: 130px;
        height: 130px;
        border-radius: 50%;
        border: 1px solid #eee;
        overflow: hidden;
        left: 50%;
        position: absolute;
        transform: translate(-50%, -50%);
        padding: 10px;
        box-shadow: 0 0 10px #ddd;
        background-color: #fff;

        img {
          width: 100%;
          border-radius: 50%;
          background-color: #cccccc;
        }
      }

      .login-form {
        transform: translateY(90px);
        box-sizing: border-box;
        padding: 20px;
      }

      .btns {
        display: flex;
        justify-content: flex-end;
      }
    }

  }
</style>