<!--
 * @Author: your name
 * @Date: 2021-05-08 10:04:05
 * @LastEditTime: 2021-05-08 15:00:52
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \menu-food\menu-book-admin\src\views\good-type\addGoodsType.vue
-->
<template>
  <div class="container">
    <div class="el-elem-field">
      <div class="el-breadcrumbs">
        <span>菜谱分类</span>
        <a class="el-bt" @click.prevent="showCategoryDialog()">
          <el-button type="primary" icon="el-icon-plus">一级分类</el-button>
        </a>
      </div>
    </div>
    <div class="el-elem-field">
      <el-container>
        <div class="el-elem-warp">
          <div class="custom-tree-container">
            <div class="block">
              <el-tree
                :data="data"
                node-key="id"
                :default-expand-all="false"
                :expand-on-click-node="true"
              >
                <span slot-scope="{ node }" class="custom-tree-node">
                  <span>{{ node.label }}</span>
                  <span>
                    <i class="el-icon-edit" @click.stop="showCategoryDialog('update',node)" />
                    <i class="el-icon-delete" @click.stop="deleteCurent" />
                    <i class="el-icon-sort-down" @click.stop="downCurent" />
                    <i class="el-icon-sort-up" @click.stop="upCurent" />
                    <el-button
                      type="primary"
                      icon="el-icon-plus"
                      @click.stop="showCategoryDialog('addChild',node)"
                    >添加分类</el-button>
                  </span>
                </span>
              </el-tree>
            </div>
          </div>
        </div>
      </el-container>
    </div>

    <el-dialog title="新增分类" :visible.sync="centerDialogVisible" width="30%" center>
      <el-card class="box-card">
        <el-form ref="category" :model="category" label-width="100px" :rules="rules">
          <el-form-item label="分类名称" prop="categoryName">
            <el-input v-model="category.categoryName" />
          </el-form-item>

          <el-form-item label="分类描述" prop="description">
            <el-input v-model="category.description" type="textarea" />
          </el-form-item>
        </el-form>
      </el-card>
      <span slot="footer" class="dialog-footer">
        <el-button @click="resetForm('category')">取 消</el-button>
        <el-button v-show="!isEdit" type="primary" @click="addCategory('category')">确 定</el-button>
        <el-button v-show="isEdit" type="primary" @click="updtateCategory('category')">修改</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { getCategory, addCategory, upDateCategory } from '@/api/menu.js'
// import ZypCard from '@/components/ZypCard/ZypCard.vue'
export default {
  data () {
    return {
      // 树结构数据
      data: [],
      category: {
        categoryName: '',
        description: '',
        pid: ""

      },
      rules: {
        categoryName: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]

      },
      // 对话框
      centerDialogVisible: false,
      isEdit: false
    }
  },
  created () {
    this.getTypeList()
  },
  // components: {
  //   // addGoodsType,
  //   ZypCard
  // },
  methods: {
    showCategoryDialog (dialogType, node) {
      this.centerDialogVisible = true
      if (dialogType === "addChild") {
        this.isEdit = false
        this.addChildCategory(node)
      } else if (dialogType === "update") {
        this.isEdit = true
        this.editCurent(node)
      } else {
        this.isEdit = false
      }

    },
    // 获取分类数据
    getTypeList () {
      this.listLoading = true
      getCategory().then(res => {
        let data = res.data
        let parentTree = this.toTreeData(data)
        this.data = parentTree
        console.log(parentTree)
      })
    },
    // 将有父子关系的数组转换成树形结构数据
    toTreeData (data, attr) {
      data.forEach(ele => {
        ele.label = ele.categoryName
        let pid = ele.pid
        if (pid === 0) {
          //是根元素的hua ,不做任何操作,如果是正常的for-i循环,可以直接continue.
        } else {
          //如果ele是子元素的话 ,把ele扔到他的父亲的child数组中.
          data.forEach(d => {
            if (d.id === pid) {
              let childArray = d.children
              if (!childArray) {
                childArray = []
              }
              childArray.push(ele)
              d.children = childArray
            }
          })
        }
      })
      //去除重复元素
      return data.filter(ele => ele.pid === 0)
    },
    editCurent (node) {
      const data = node.data
      let editDate = {
        categoryName: data.categoryName,
        description: '123',
        id: data.id

      }
      this.category = editDate
      this.centerDialogVisible = true
    },
    deleteCurent () {
      console.log('deleteCurent')
    },
    downCurent () {
      console.log('downCurent')
    },
    upCurent () {
      console.log('upCurent')
    },

    resetForm (formName) {
      this.$refs[formName].resetFields()
      this.centerDialogVisible = false
    },
    // 添加子分类获取pid
    addChildCategory (node) {
      this.category.pid = node.data.id
    },
    // 添加分类
    addCategory (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          addCategory(this.category).then(res => {
            this.$message({
              message: '添加分类成功',
              type: 'success'
            })
            this.getTypeList()
            this.centerDialogVisible = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    updtateCategory (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          upDateCategory(this.category).then(res => {
            this.resetForm('category')
            this.$message({
              message: '更新分类成功',
              type: 'success'
            })
            this.getTypeList()
            this.centerDialogVisible = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>
</script>
<style lang="scss" scoped>
.container {
  .el-elem-field {
    background: #fff;
    border: 0 none;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
    display: block;
    margin: 10px 20px 20px;
    padding: 0 10px;
    .el-breadcrumbs {
      border-bottom: 1px solid #ecf1f7;
      height: 50px;
      line-height: 50px;
      span {
        border-left: 4px solid #fc5721;
        height: 18px;
        line-height: 18px;
        padding-left: 10px;
      }
    }
  }
  .el-bt {
    float: right;
  }
  .el-container {
    padding: 10px 15px 35px;
  }
  .el-warp-list-box {
    margin-bottom: 30px;
    .el-warp-list {
      height: 48px;
      line-height: 46px;
      border-left: 3px solid #ff662f;
      background: #f3f3f3;
      padding: 0 5px;
      cursor: pointer;
      width: 100%;
    }
  }
  .el-elem-warp {
    width: 100%;
  }
  .el-warp-list-left {
    float: left;
    font-size: 16px;
    color: #666;
    margin-left: 20px;
  }
  .el-warp-list-right {
    float: right;
    i {
      margin-right: 20px;
    }
  }
  .custom-tree-node {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    i {
      margin-right: 20px;
    }
  }
  ::v-deep .el-tree .el-tree-node .el-tree-node__content {
    padding: 24px 0;
  }
  ::v-deep .el-tree > .el-tree-node > .el-tree-node__content {
    background: #f3f3f3;
    // margin: 10px 0;
  }
  ::v-deep .el-tree > .el-tree-node {
    margin: 10px 0;
  }
}
</style>
