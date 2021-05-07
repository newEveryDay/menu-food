<template>
  <div class="content">
    <zyp-card :lable="'编辑商品'" :isShowBt="false"></zyp-card>
    <el-card v-if="listRowData" class="box-card">
      <el-form ref="form" :model="form" label-width="100px">
        <el-form-item label="商品名称">
          <el-input v-model="form.mercName">商品价格</el-input>
        </el-form-item>
        <el-form-item label="商品价格">
          <el-input v-model="form.price">商品价格</el-input>
        </el-form-item>
        <el-form-item label="库存数量">
          <el-input v-model="form.stock">库存数量</el-input>
        </el-form-item>

        <el-form-item label="商品分类">
          <el-select v-model="form.categoryId" placeholder="请选择商品分类">
            <el-option
              v-for="(vem,index) in goodsTypeList"
              :key="index"
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
              :file-list="form.imgList"
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
      </el-form>
    </el-card>
  </div>
</template>
<script>
import { getCategory, putGoods } from '@/service/goods'
import ZypCard from '@/components/ZypCard/ZypCard.vue'
// import addGoodsType from '../good-type/components/addGoodsType'
export default {
  components: {
    // addGoodsType,
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
        id: '',
        mercName: '',
        description: '',
        price: '',
        stock: 0,
        categoryId: '',
        imgList: []
      },
      goodsTypeList: [],
      //   上传相关信息
      dialogImageUrl: '',
      dialogVisible: false
    }
  },
  created() {
    this.form = this.listRowData
    this.getCategory()
  },
  mounted() {

  },
  watch: {
    listRowData(newValue) {
      this.form = newValue
    }
  },
  methods: {
    getCategory() {
      getCategory().then(res => {
        this.goodsTypeList = res.data
        console.log(this.goodsTypeList)
        console.log()
      })
    },

    onSubmit() {
      putGoods(this.form).then(res => {
        this.$message({
          message: '修改商品成功',
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
      console.log(file)
      console.log('res' + JSON.stringify(res))
      // const imags = res.data
      this.form.imgList.push(res.data)
    }
  }
}
</script>
<style lang="scss">

</style>
