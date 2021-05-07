<template>
  <div class="content">
    <zyp-card :lable="'添加商品'"></zyp-card>
    <el-card class="box-card">
      <el-form ref="form" :model="form" label-width="100px">
        <el-form-item label="商品名称">
          <el-input v-model="form.mercName"></el-input>
        </el-form-item>
        <el-form-item label="商品价格">
          <el-input v-model="form.price"></el-input>
        </el-form-item>
        <el-form-item label="库存数量">
          <el-input v-model="form.stock"></el-input>
        </el-form-item>

        <el-form-item label="商品分类">
          <el-select v-model="form.categoryId" placeholder="请选择商品分类">
            <el-option
              v-for="vem in goodsTypeList"
              :key="vem.id"
              :label="vem.name"
              :value="vem.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品主图">
          <div>
            <el-upload
              action="http://localhost:3000/v1/uploadImg"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
              :on-success="handleAvatarSuccess"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt/>
            </el-dialog>
          </div>
        </el-form-item>

        <el-form-item label="商品描述">
          <el-input v-model="form.description" type="textarea">商品描述</el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit">添加商品</el-button>
          <el-button>返回</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
import { getCategory, postGoods } from '@/service/goods'
import ZypCard from '@/components/ZypCard/ZypCard.vue'
export default {
  components: {
    ZypCard
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
  data() {
    return {
      form: {
        mercName: '',
        description: '',
        price: '',
        categoryId: '',
        imgList: [],
        stock: 0
      },
      goodsTypeList: [],
      //   上传相关信息
      dialogImageUrl: '',
      dialogVisible: false
    }
  },
  created() {
    this.getCategory()
  },
  mounted() {
    if (Object.keys(this.listRowData).length > 0) {
      this.form = this.listRowData
    }
  },
  methods: {
    getCategory() {
      getCategory().then(res => {
        this.goodsTypeList = res.data
      })
    },
    onSubmit() {
      postGoods(this.form).then(res => {
        this.$message({
          message: '添加商品成功',
          type: 'success'
        })
      })
    },

    handleRemove(file, fileList) {
      console.log(file, fileList)
      //   thumb_id
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleAvatarSuccess(res, file) {
      this.form.imgList.push(res.data)
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
