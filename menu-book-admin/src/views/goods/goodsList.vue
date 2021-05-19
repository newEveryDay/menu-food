<template>
  <div>
    <div class="el-elem-field">
      <div class="el-breadcrumbs">
        <span>课程分类</span>
        <router-link class="el-bt" :to="'addInformation'">
          <el-button type="primary" icon="el-icon-plus">添加</el-button>
          <el-button type="primary" icon="el-icon" @click.prevent="search">搜索</el-button>
        </router-link>
      </div>

      <div class="el-field-box">
        <el-form label-width="80px" :model="formLabelAlign">
          <el-row :gutter="0">
            <!-- <el-col :span="6">
              <el-form-item label="ID">
                <el-input v-model="formLabelAlign.name" />
              </el-form-item>
            </el-col>-->
            <el-col :span="6">
              <el-form-item label="标题">
                <el-input v-model="formLabelAlign.title" />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </div>

    <div class="el-elem-field">
      <el-container>
        <div class="el-elem-warp">
          <el-table :data="menuList" border style="width: 100%">
            <el-table-column fixed prop="id" label="ID" width="180" />
            <el-table-column prop="menuName" label="菜谱名称" />
            <el-table-column prop="create_time" label="创建时间" :formatter="dateFormat" width="240" />
            <el-table-column prop="hit" label="评分" width="200">
              <template slot-scope="scope">
                <el-rate v-model="scope.row.difficulty" disabled show-score text-color="#ff9900"></el-rate>
              </template>
            </el-table-column>
            <el-table-column prop="description" label="描述" width="120" />
            <el-table-column fixed="right" label="操作" width="100">
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="handleClick(scope.row)">查看</el-button>
                <router-link class="el-bt" :to="'/goods/editList'">
                  <el-button type="text" size="small" @click="edit">编辑</el-button>
                </router-link>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-container>
      <div class="block pages">
        <el-pagination
          :background="true"
          :current-page="page"
          :page-sizes="[5, 20, 50, 100]"
          :page-size="size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalCout"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
  </div>
</template>
<script>
import { getMenuList } from "@/api/menu.js"
export default {
  data () {
    return {
      labelPosition: 'right',
      formLabelAlign: {
        title: '',
        region: '',
        type: '',
        data1: '',
        data2: ''
      },
      menuList: [],
      totalCout: 0,
      page: 1,
      size: 5
    }
  },
  created () {
    this.getMenuList()
  },
  methods: {
    getMenuList () {
      return new Promise(async (resolve, reject) => {
        try {
          const params = {
            page: this.page,
            size: this.size,
            title: this.formLabelAlign.title
          }
          const response = await getMenuList(params)
          const { data, size, page, totalCout } = response.data
          this.menuList = data
          this.totalCout = totalCout
          resolve()
        } catch (error) {
          reject(error)
        }
      })
    },
    handleClick (row) {
      console.log(row)
    },
    handleSizeChange (val) {
      this.size = val
      this.getMenuList()
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      this.page = val
      this.getMenuList()
      console.log(`当前页: ${val}`)
    },
    edit () { },
    // 时间格式化
    dateFormat: function (row) {
      console.log(row)
      var t = new Date(row.create_time)// row 表示一行数据, createTime 表示要格式化的字段名称
      if (!t) {
        return ''
      }
      let year = t.getFullYear()
      let month = this.dateIfAddZero(t.getMonth() + 1)
      let day = this.dateIfAddZero(t.getDate())
      let hours = this.dateIfAddZero(t.getHours())
      let minutes = this.dateIfAddZero(t.getMinutes())
      let seconds = this.dateIfAddZero(t.getSeconds())
      return year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds
    },
    dateIfAddZero: function (time) {
      return time < 10 ? '0' + time : time
    },
    search () {
      this.getMenuList()
    },
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
