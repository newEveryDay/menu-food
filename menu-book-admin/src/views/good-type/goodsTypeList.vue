<template>
  <div>
    <zyp-card :lable="'分类列表'" :isShowBt="false"></zyp-card>
    <div class="el-elem-field el-container-box">
      <el-container>
        <div class="el-elem-warp">
          <el-table :data="goodsTypeList" border style="width: 100%">
            <el-table-column fixed prop="name" label="售货机名称" width="200"></el-table-column>
            <el-table-column fixed prop="description" label="描述"></el-table-column>
            <el-table-column fixed="right" label="操作" width="120">
              <template slot-scope="scope">
                <!--                <el-button type="text" size="small">查看</el-button>-->
                <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
                <el-button @click="deletProductType(scope.row)" type="text" size="small">删除</el-button>

              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-container>
      <div class="block pages">
        <el-pagination
          @size-change="handleSizeChange"
          :background="true"
          @current-change="handleCurrentChange"
          :current-page="current_page"
          :page-sizes="[10, 20, 50, 400]"
          :page-size="pagination.page_size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pagination.total_pages"
        ></el-pagination>
      </div>
    </div>

    <el-dialog title="" :visible.sync="dialogVisible" width="50%" :before-close="handleClose">
      <!-- <span>这是一段信息</span> -->
      <add-goods-type :listRowData='rowData'></add-goods-type>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { getCategory, deleteProductCategory } from '@/service/goods'
import addGoodsType from './components/addGoodsType'
import ZypCard from '@/components/ZypCard/ZypCard.vue'

export default {
  components: {
    addGoodsType,
    ZypCard
  },
  data() {
    return {
      vems_id: '',
      goodsTypeList: [],
      pagination: {},
      labelPosition: 'right',
      current_page: 1,
      page_size: 10,
      dialogVisible: false,
      rowData: {}
    }
  },
  created() {
    this.getCategory()
  },
  methods: {
    confirm() {
      this.dialogVisible = false
    },
    getCategory() {
      const params = {
        vems_id: this.vems_id
      }
      getCategory(params).then(res => {
        console.log(res.data)
        this.goodsTypeList = res.data
      })
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
        })
        .catch(_ => {
        })
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    },
    handleClick(row) {
      this.rowData = row
      console.log(this.rowData)
      this.dialogVisible = true
    },
    //  删除商品分类
    deletProductType(row) {
      this.$confirm('确认删除此商品分类？')
        .then(_ => {
          const index = this.goodsTypeList.findIndex(item => item._id === row._id)
          this.goodsTypeList.splice(index, 1)
          deleteProductCategory(row._id).then(res => {
            // this.goodsTypeList = res.data;
            this.$message({
              message: '删除成功',
              type: 'success'
            })
          })
        })
        .catch(_ => {
        })
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
    margin: 10px 0;
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
        float: left;
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
