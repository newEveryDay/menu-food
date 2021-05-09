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
        <span>课程分类</span>
        <a href class="el-bt">
          <el-button type="primary" icon="el-icon-plus">一级分类</el-button>
        </a>
      </div>
    </div>
    <div class="el-elem-field">
      <el-container>
        <div class="el-elem-warp">
          <!-- <ul>
            <li class="el-warp-list-box">
              <div class="el-warp-list">
                <div class="el-warp-list-left">IT</div>
                <div class="el-warp-list-right">
                  <i class="el-icon-edit"></i>
                  <i class="el-icon-delete"></i>
                  <i class="el-icon-sort-down"></i>
                  <i class="el-icon-sort-up"></i>
                </div>
              </div>
            </li>
            <li class="el-warp-list-box">
              <div class="el-warp-list">
                <div class="el-warp-list-left">热门</div>
                <div class="el-warp-list-right">
                  <i class="el-icon-edit"></i>
                  <i class="el-icon-delete"></i>
                  <i class="el-icon-sort-down"></i>
                  <i class="el-icon-sort-up"></i>
                </div>
              </div>
            </li>
          </ul>-->

          <div class="custom-tree-container">
            <!-- <div class="block">
              <p>使用 render-content</p>
              <el-tree
                :data="data"
                show-checkbox
                node-key="id"
                default-expand-all
                :expand-on-click-node="false"
                :render-content="renderContent"
              ></el-tree>
            </div>-->
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
                    <i class="el-icon-edit" @click.stop="editCurent" />
                    <i class="el-icon-delete" @click.stop="deleteCurent" />
                    <i class="el-icon-sort-down" @click.stop="downCurent" />
                    <i class="el-icon-sort-up" @click.stop="upCurent" />
                    <el-button type="primary" icon="el-icon-plus" @click.stop="addChild">一级分类</el-button>
                    <!-- <el-button type="text" size="mini" @click="() => append(data)">Append</el-button>
                    <el-button type="text" size="mini" @click="() => remove(node, data)">Delete</el-button>-->
                  </span>
                </span>
              </el-tree>
            </div>
          </div>
        </div>
      </el-container>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    const data = [{
      id: 1,
      label: '一级 1',
      children: [{
        id: 4,
        label: '二级 1-1',
        children: [{
          id: 9,
          label: '三级 1-1-1'
        }, {
          id: 10,
          label: '三级 1-1-2'
        }]
      }]
    }, {
      id: 2,
      label: '一级 2',
      children: [{
        id: 5,
        label: '二级 2-1'
      }, {
        id: 6,
        label: '二级 2-2'
      }]
    }, {
      id: 3,
      label: '一级 3',
      children: [{
        id: 7,
        label: '二级 3-1'
      }, {
        id: 8,
        label: '二级 3-2'
      }]
    }]
    return {
      data: JSON.parse(JSON.stringify(data)),
      data: JSON.parse(JSON.stringify(data))
    }
  },

  methods: {
    append (data) {
      const newChild = { id: id++, label: 'testtest', children: [] }
      if (!data.children) {
        this.$set(data, 'children', [])
      }
      data.children.push(newChild)
    },

    remove (node, data) {
      const parent = node.parent
      const children = parent.data.children || parent.data
      const index = children.findIndex(d => d.id === data.id)
      children.splice(index, 1)
    },

    renderContent (h, { node, data, store }) {
      return (
        <span class='custom-tree-node'>
          <span>{node.label}</span>
          <span>
            <el-button size='mini' type='text' on-click={() => this.append(data)}>Append</el-button>
            <el-button size='mini' type='text' on-click={() => this.remove(node, data)}>Delete</el-button>
          </span>
        </span>)
    },
    editCurent() {
      console.log('editCurent')
    },
    deleteCurent() {
      console.log('deleteCurent')
    },
    downCurent() {
      console.log('downCurent')
    },
    upCurent() {
      console.log('upCurent')
    },
    addChild() {
      console.log('addChild')
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
