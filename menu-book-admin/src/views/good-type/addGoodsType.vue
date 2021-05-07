<template>
  <div class="content">
    <div style="margin-bottom:20px">
      <zyp-card :lable="'添加商品分类'" @clickBt="clickBt"></zyp-card>
    </div>

    <el-card class="box-card">
      <el-form ref="form" :model="form" label-width="100px">
        <el-form-item label="分类名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>

        <el-form-item label="描述">
          <el-input type="textarea" v-model="form.description"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit">添加商品分类</el-button>
          <el-button @click="back">返回</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
import { postCategory } from '@/service/goods'

import ZypCard from '@/components/ZypCard/ZypCard.vue'

export default {
  components: {
    ZypCard
  },
  data() {
    return {
      form: {
        name: '',
        description: ''
      }
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

  methods: {
    onSubmit() {
      // this.$message({
      //   message: '添加商品分类成功',
      //   type: 'success'
      // })
      postCategory(this.form).then(res => {
        console.log(res)
        this.$message({
          message: '添加商品分类成功',
          type: 'success'
        })
      })
    },
    clickBt() {
      console.log(10)
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

  }
</style>
