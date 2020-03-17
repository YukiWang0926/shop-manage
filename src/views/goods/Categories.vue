<template>
  <div class="category-page">
    <div class="category-info">
      <!--      添加分类-->
      <el-row>
        <el-col :span="6">
          <el-button type="primary" @click="addCategory">添加分类</el-button>
        </el-col>
      </el-row>

      <!--      展示商品分类table-->
      <el-table :data="categoriesListWithIndex"
                row-key="cat_id"
                :tree-props="{children: 'children'}"
                style="width: 100%"
                border
      >
        <el-table-column prop="index" width="80px">
        </el-table-column>

        <el-table-column prop="cat_name" label="分类名称">
        </el-table-column>

        <el-table-column label="是否有效">
          <template slot-scope="scope">
            <i class="el-icon-success" v-if="scope.row.cat_deleted=== false" style="color: #a4da89;font-size: 18px"/>
            <i class="el-icon-error" v-else style="color:red;font-size: 18px"/>
          </template>
        </el-table-column>

        <el-table-column prop="cat_level" label="排序">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.cat_level===0">一级</el-tag>
            <el-tag type="success" v-else-if="scope.row.cat_level===1">二级</el-tag>
            <el-tag type="warning" v-else>三级</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="{row}">
            <el-button
              icon="el-icon-edit"
              type="primary"
              @click="editCategory(row)"
            ></el-button>
            <el-button
              icon="el-icon-delete"
              type="danger"
              @click="removeCategory(row)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--分页-->
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
    <!--    添加分类的dialog-->
    <el-dialog
      append-to-body
      :title="title"
      :visible.sync="addCateDialogVisible"
      width="30%"
      @close="closeAddDialog"
    >
      <cate-form ref="cateForm" :parentCateList="parentCateList" @submit="submitAddCate"
                 :selectedKeys.sync="selectedKeys"></cate-form>
    </el-dialog>
  </div>
</template>

<script>
  import CateForm from "@/views/goods/form/CateForm";
  import {getCategories, AddCategories, deleteCategories, queryCateById, editCategories} from "@/network/goods"

  export default {

    name: "Categories",
    components: {
      CateForm
    },
    data() {
      return {
        categoriesList: [],
        type: [],
        pagenum: 1,
        pagesize: 10,
        total: null,
        addCateDialogVisible: false,
        parentCateList: [],
        title: '',
        selectedKeys: []
      }
    },
    computed: {
      categoriesListWithIndex() {
        let i = this.pagesize * (this.pagenum - 1) + 1;
        return this.categoriesList.map(row => {
          return {
            ...row,
            index: i++
          }
        })
      }
    },
    created() {
      this.getCategoriesMethod()
    },
    methods: {
      //监听添加分类按钮
      addCategory() {
        this.title = '添加分类'
        this.getParentCateList()
        this.addCateDialogVisible = true
      },
      //获取分类列表
      getCategoriesMethod() {
        getCategories(this.type, this.pagenum, this.pagesize).then(data => {
            this.categoriesList = data.result
            this.total = data.total
          }
        ).catch(
          err => {
            this.$message.error(err)
          }
        )
      },
      handleSizeChange(val) {
        this.pagesize = val
        this.getCategoriesMethod()
      },
      handleCurrentChange(val) {
        this.pagenum = val
        this.getCategoriesMethod()
      },
      //关闭添加分类dialog
      closeAddDialog() {
        this.$refs.cateForm.resetForm('cateForm')
        this.addCateDialogVisible = false
      },
      //提交添加或者编辑分类
      submitAddCate(cateForm) {
        console.log(cateForm)
        //添加分类的提交
        if (!cateForm.cat_id) {
          AddCategories(cateForm).then(() => {
            this.getCategoriesMethod()
          })
        } else {
          //编辑分类的提交
          editCategories(cateForm.cat_id, cateForm.cat_name).then(() => {
              this.getCategoriesMethod()
            }
          )
        }

        this.addCateDialogVisible = false
      },
      //删除分类
      removeCategory(cate) {
        console.log(cate)
        if (cate.children) {
          this.$message.warning('有子分支，无法删除')
        } else {
          this.$confirm('确认删除该分类?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            //确认删除
            deleteCategories(cate.cat_id).then((data) => {
              console.log(data)
            })
          })
        }
      },
      //监听编辑页面
      async editCategory(row) {

        this.title = '编辑分类'
        this.addCateDialogVisible = true
        await this.getParentCateList()

        queryCateById(row.cat_id).then(data => {
          this.$refs.cateForm.setForm(data)
          //原父级分类
          if (data.cat_level === 0) {
            this.selectedKeys = []
          } else if (data.cat_level === 1) {
            this.selectedKeys = [data.cat_pid]
          } else {
            console.log(this.parentCateList)
            for (const item of this.parentCateList) {
              if (item.children) {
                for (const children of item.children) {
                  if (children.cat_id === data.cat_pid) {
                    this.selectedKeys = [children.cat_pid, children.cat_id]
                    console.log(this.selectedKeys)
                  }
                }
              }
            }
          }
        })
      },
      //获取父级分类列表
      getParentCateList() {
        return getCategories(2).then(data => {
          this.parentCateList = data
        })
      }

    }
  }
</script>

<style lang="less" scoped>
  .category-page {
    height: 100%;
    overflow: auto;
    display: flex;
    flex-direction: column;
    background-color: #fff;

    .category-info {
      padding: 20px;
      flex: 1;
      height: 100%;
      border: 1px solid #ebeef5;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
      border-radius: 4px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      overflow: auto;
    }
  }
</style>