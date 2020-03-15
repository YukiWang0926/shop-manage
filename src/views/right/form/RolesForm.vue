<template>
  <div>
    <el-form ref="rolesForm" :model="rolesForm" label-width="80px" :rules="rolesFormRules">
      <el-form-item label="角色名称" prop="roleName">
        <el-input v-model="rolesForm.roleName" ></el-input>
      </el-form-item>
      <el-form-item label="角色描述" prop="roleDesc">
        <el-input v-model="rolesForm.roleDesc"></el-input>
      </el-form-item>


      <el-form-item>
        <el-button @click="resetForm('rolesForm')">重置</el-button>
        <el-button type="primary" @click="submitForm('rolesForm')">确定</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: "RolesForm",
    data() {
      return {
        rolesForm: {
          roleName:"",
          roleDesc:""
        },
        rolesFormRules:{
          roleName: [
            {required: true, message: '请输入角色名称', trigger: 'blur'},
            {min: 2, max: 10, message: '长度在 2 到 10个字符', trigger: 'blur'}
          ],
        }
      }
    },
    methods:{

      setForm(form) {
        this.rolesForm = {
          ...form
        }
      },
      //确定表单
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$emit('submit', this.rolesForm)
            // this.$refs['userForm'].resetFields();
          } else {
            return false;
          }
        });
      },
      //重置表单
      resetForm(formName){
        this.$refs[formName].resetFields()
      }
    }
  }
</script>

<style scoped>

</style>