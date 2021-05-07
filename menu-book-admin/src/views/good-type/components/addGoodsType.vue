<template>
  <div class="content">
    <div style="margin-bottom:20px">
      <el-card class="box-card">
        <div class="clearfix">
          <span class="box-card-title">商品分类</span>
          <!-- <el-button type="primary" icon="el-icon-plus" class="el-bt">添加商品分类</el-button> -->
        </div>
      </el-card>
    </div>

    <el-card class="box-card">
      <el-form ref="form" :model="form" label-width="100px">
        <el-form-item label="分类名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>

        <el-form-item label="售货机描述">
          <el-input type="textarea" v-model="form.description"></el-input>
        </el-form-item>

        <!--        <el-form-item>-->
        <!--          <el-button type="primary" @click="onSubmit">保存</el-button>-->
        <!--          <el-button @click="back">重置</el-button>-->
        <!--        </el-form-item>-->
      </el-form>
    </el-card>
  </div>
</template>
<script>
import { postCategory } from '@/service/goods'

export default {
  data() {
    return {
      form: {
        vems_id: '',
        name: '',
        description: ''
      },
      vemsList: []
    }
  },
  props: {
    // 基础类型检测, null意味着任何类型都行
    listRowData: {
      type: Object,
      default() {
        return {}
      }
    }
    // 多种类型
  },
  created() {
  },
  mounted() {
    this.form = this.listRowData
    //   this.form.vems_id=this.listRowData.vems_id[0]._id
  },
  watch: {
    listRowData(newVal) {
      this.form = newVal
    }
  },
  methods: {
    onSubmit() {
      postCategory(this.form).then(res => {
        console.log(res)
        this.$message({
          message: '添加商品分类成功',
          type: 'success'
        })
      })
    },
    back() {
    }
  }
}
</script>
<style lang="scss">
  .content {

    .text {
      font-size: 14px;
    }

    .item {
      margin-bottom: 18px;
    }

    .clearfix:before,
    .clearfix:after {
      display: table;
      content: "";
    }

    .clearfix:after {
      clear: both;
    }

    .el-card__body {
      padding: 10px;
    }

    .box-card {
      width: 100%;
    }

    .box-card-title {
      border-left: 4px solid #fc5721;
      /*height: 40px;*/
      /*line-height: 40px;*/
      padding-left: 10px;
    }

    .el-bt {
      float: right;
    }
  }
</style>
