<template>
  <div>
    <div class="el-elem-field">
      <div class="el-breadcrumbs">
        <span>课程分类</span>
        <router-link class="el-bt" :to="'addInformation'">
          <el-button type="primary" icon="el-icon-plus">添加</el-button>
        </router-link>
      </div>

      <div class="el-field-box">
        <el-form label-width="80px" :model="formLabelAlign">
          <el-row :gutter="0">
            <el-col :span="6">
              <el-form-item label="ID">
                <el-input v-model="formLabelAlign.name" />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="标题">
                <el-input v-model="formLabelAlign.name" />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </div>

    <div class="el-elem-field">
      <el-container>
        <div class="el-elem-warp">
          <el-table :data="articleLists" border style="width: 100%">
            <el-table-column fixed prop="id" label="ID" width="180" />
            <el-table-column prop="title" label="标题" />
            <el-table-column prop="type" label="分类" width="120" />
            <el-table-column prop="createTime" label="创建时间" width="240" />
            <el-table-column prop="hit" label="点击量" width="120">></el-table-column>
            <el-table-column prop="answer" label="评论数" width="120" />
            <el-table-column fixed="right" label="操作" width="100">
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="handleClick(scope.row)">查看</el-button>
                <el-button type="text" size="small" @click="bj">编辑</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-container>
      <div class="block pages">
        <el-pagination
          :background="true"
          :current-page="currentPage4"
          :page-sizes="[100, 200, 300, 400]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
  </div>
</template>
<script>
// import { articleList } from "@/api/arctcle";
export default {
  data () {
    return {
      labelPosition: 'right',
      formLabelAlign: {
        name: '',
        region: '',
        type: '',
        data1: '',
        data2: ''
      },
      articleLists: [],
      currentPage4: 4
    }
  },
  created () {
    // this.articleList()
  },
  methods: {
    // articleList() {
    //   return new Promise(async (resolve, reject) => {
    //     try {
    //       const response = await articleList()
    //       const data = response.data
    //       console.log(data)
    //       this.articleLists = data
    //       resolve();
    //     } catch (error) {
    //       reject(error)
    //     }
    //   })
    // },
    handleClick (row) {
      console.log(row)
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    }
  }
}
</script>
<style lang="scss" scoped>
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

.el-field-box {
  padding: 20px 0;
}
.el-container-box {
  padding: 40px 20px;
}
</style>
