<template>
  <div>
    <zyp-card :lable="'商品列表'" :isShowBt="false"></zyp-card>
    <div class="el-elem-field el-container-box">
      <el-container>
        <div class="el-elem-warp">
          <el-table :data="goodList" border style="width: 100%">

            <el-table-column fixed prop="mercName" label="商品名称"></el-table-column>
            <el-table-column fixed label="商品图">
              <template slot-scope="scope">
                <img
                  style="display:inline-block;height:80px"
                  v-for="(item,index) in scope.row.imgList"
                  :key="index"
                  :src="baseUrl + item.url"
                  alt
                />
              </template>
            </el-table-column>

            <el-table-column fixed prop="price" label="商品价格"></el-table-column>
            <el-table-column fixed prop="stock" label="库存数量"></el-table-column>
            <el-table-column fixed prop="description" label="商品描述"></el-table-column>
            <el-table-column fixed="right" label="操作" width="100">
              <template slot-scope="scope">
                <el-button type="text" size="small">查看</el-button>
                <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
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
          :current-page="pagination.page"
          :page-sizes="[2, 20, 50, 400]"
          :page-size="pagination.size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalCount"
        ></el-pagination>
      </div>
    </div>
    <el-dialog title="" ref="dialog" @open="open" :visible="dialogVisible" width="50%" :before-close="handleClose">
      <!-- <span>这是一段信息</span> -->
      <edit-goods :listRowData="rowData"/>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { getGoods, putGoods } from '@/service/goods'
import editGoods from './editGoods'
import ZypCard from '@/components/ZypCard/ZypCard.vue'
export default {
  components: {
    editGoods,
    ZypCard
  },
  data() {
    return {
      goodList: [],
      baseUrl: 'http://localhost:3000',
      pagination: {
        page: 1,
        size: 2
      },
      totalCount: 0,
      labelPosition: 'right',
      currentPage: 1,
      dialogVisible: false,
      rowData: {}
    }
  },
  created() {
    this.getGoods()
  },
  methods: {
    getGoods() {
      const params = this.pagination
      getGoods(params).then(res => {
        const goodsList = res.data.data
        this.totalCount = res.data.count
        // for (let i = 0; i < goodsList.length; i++) {
        //   for (let j = 0; j < goodsList[i].imgList.length; j++) {
        //     goodsList[i].imgList[j].url =
        //       this.baseUrl + goodsList[i].imgList[j].url
        //   }
        // }
        this.goodList = goodsList
      })
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {
        })
    },
    handleSizeChange(val) {
      this.pagination.size = val
      this.getGoods()
    },
    handleCurrentChange(val) {
      this.pagination.page = val
      this.getGoods()
      console.log(`当前页: ${val}`)
    },
    open(e) {
      console.log(e)
    },
    handleClick(row) {
      // console.log(row)
      this.rowData = row
      console.log(this.rowData)

      setTimeout(() => {
        this.dialogVisible = true
      }, 100)
    },
    putGoods() {
      putGoods(this.rowData).then(res => {
        this.$message({
          message: '修改商品成功',
          type: 'success'
        })
      })
    },
    confirm() {
      this.putGoods()
      this.dialogVisible = false
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
  }
</style>
