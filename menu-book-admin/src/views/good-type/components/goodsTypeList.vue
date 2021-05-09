<template>
  <div>
    <div class="el-elem-field">
      <div class="el-breadcrumbs">
        <span>分类列表</span>
        <a href class="el-bt">
          <el-button type="primary" icon="el-icon-plus">一级分类</el-button>
        </a>
      </div>
    </div>
    <div class="el-elem-field el-container-box">
      <el-container>
        <div class="el-elem-warp">
          <el-table :data="goodsTypeList" border style="width: 100%">
            <el-table-column fixed prop="name" label="售货机名称" />
            <el-table-column fixed="right" label="操作" width="100">
              <template slot-scope="scope">
                <el-button type="text" size="small">查看</el-button>
                <el-button type="text" size="small" @click="handleClick(scope.row)">编辑</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-container>
      <div class="block pages">
        <el-pagination
          :background="true"
          :current-page="currentPage4"
          :page-sizes="[10, 20, 50, 400]"
          :page-size="pagination.page_size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pagination.total_pages"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>

    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { getCategory } from '@/api/goods'

export default {
  data () {
    return {
      vems_id: '',
      goodsTypeList: [],
      pagination: {},
      labelPosition: 'right',
      current_page: 1,
      page_size: 10,
      dialogVisible: false
    }
  },
  created () {
    this.getCategory()
  },
  methods: {
    getCategory () {
      getCategory().then(res => {
        console.log(res.data)
        this.goodsTypeList = res.data
        // this.pagination = res.pagination;
      })
    },
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {
        })
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    },
    handleClick (row) {
      this.dialogVisible = true
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
