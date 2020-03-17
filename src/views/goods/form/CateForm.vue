<template>
  <div>
    <el-form ref="cateForm" :model="cateForm" label-width="80px" :rules="cateFormRules">
      <el-form-item label="分类名称" prop="cat_name">
        <el-input v-model="cateForm.cat_name"></el-input>
      </el-form-item>

      <el-form-item label="父级分类" prop="roleDesc">
        <el-cascader
          v-model="innerSelectedKeys"
          :options="parentCateList"
          expandTrigger='hover'
          :props="cascaderProps"
          @change="parentCateChange"
          popper-class="cate-form"
          clearable
          size="mini"
          change-on-select/>
      </el-form-item>

      <el-form-item>
        <el-button @click="resetForm('cateForm')">重置</el-button>
        <el-button type="primary" @click="submitForm('cateForm')">确定</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

  export default {
    name: "CateForm",
    props: {
      parentCateList: {
        type: Array,
        default() {
          return []
        }
      },
      selectedKeys:{
        type: Array,
        default() {
          return []
        }
      }
    },
    data() {
      return {
        cateForm: {
          cat_name: "",
          cat_pid: 0,
          cat_level: 0
        },

        //指定级联选择器的配置对象
        cascaderProps: {
          value: 'cat_id',
          label: 'cat_name',
          children: 'children'
        },
        cateFormRules: {
          cat_name: [
            {required: true, message: '请输入分类名称', trigger: 'blur'},
            {min: 2, max: 10, message: '长度在 2 到 10个字符', trigger: 'blur'}
          ],
        }
      }
    },
    computed:{
      innerSelectedKeys:{
        get(){
          return this.selectedKeys
        },
        set(val){
          this.$emit('update:selectedKeys',val)
        }

      }
    },
    methods: {
      setForm(form) {
        this.cateForm = {
          ...form
        }
      },
      //确定表单
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$emit('submit', this.cateForm)

            console.log(this.cateForm)
          } else {
            return false;
          }
        });
      },
      //重置表单
      resetForm(formName) {
        this.$refs[formName].resetFields()
        this.$emit('update:selectedKeys',[])
      },
      //改变父级分类
      parentCateChange() {
        console.log(this.parentCateList)
        console.log(this.selectedKeys)
        //判断几级
        if (this.selectedKeys.length > 0) {
          this.cateForm.cat_pid = this.selectedKeys[this.selectedKeys.length - 1]
          this.cateForm.cat_level = this.selectedKeys.length
        } else {
          this.cateForm.cat_pid = 0
          this.cateForm.cat_level = 0
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .el-cascader {
    width: 100%;
  }



</style>

<style lang="less">
  .cate-form /deep/ .el-cascader-panel {
    height: 250px;
    overflow: auto;
  }
</style>