<template>
  <div class="content">
    <zyp-card :lable="'添加商品'">
      <el-steps class="step" :active="active" finish-status="success">
        <el-step title="基本信息" />
        <el-step title="食材准备" />
        <el-step title="料理准备" />
      </el-steps>
    </zyp-card>

    <el-card class="box-card">
      <el-form label-width="100px">
        <!--基本信息-->
        <div label="基本信息" v-show="active==0">
          <el-form-item label="名称">
            <el-col :span="6">
              <el-input v-model="model.name" width="150" />
            </el-col>
          </el-form-item>
          <el-form-item label="所属分类">
            <el-cascader :options="categorys" clearable @change="cascaderChange"></el-cascader>
            <!-- <el-select v-model="model.parent">
              <el-option
                v-for="item in parents"
                :key="item._id"
                :label="item.name"
                :value="item._id"
              />
            </el-select>-->
          </el-form-item>
          <el-form-item label="轮播图展示">
            <el-col :span="8">
              <el-carousel :interval="4000" type="card" height="80px">
                <el-carousel-item v-for="(item,i) in model.images" :key="i">
                  <img v-if="item.img" :src="'http://127.0.0.1:3000/'+item.img" class="avatar" />
                </el-carousel-item>
              </el-carousel>
            </el-col>
          </el-form-item>

          <el-form-item label="上传轮播图">
            <el-upload
              :action="'http://localhost:9527/dev-api/v1/upload'"
              :file-list="model.images.img"
              list-type="picture-card"
              :on-remove="handleRemove"
              :on-success="afterUpload"
            >
              <i class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>

          <el-form-item label="难度系数">
            <el-rate v-model="model.difficulty" style="margin-top:0.6rem" show-text :texts="texts" />
          </el-form-item>
          <el-form-item label="制作时间">
            <el-col :span="4">
              <el-input v-model="model.time">
                <template slot="append">分钟</template>
              </el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="简单描述">
            <el-col :span="15">
              <el-input v-model="model.description" type="textarea" :rows="2" />
            </el-col>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" style=" margin-top:10px;" @click="nextStep(1)">下一步</el-button>
          </el-form-item>
        </div>
        <!--end of 基本信息-->

        <!--食材信息-->
        <div label="食材准备" name="ingredient" v-show="active==1">
          <el-button @click="model.ingredient.push({})">
            <i class="el-icon-plus" />添加食材
          </el-button>
          <el-row
            v-for="(item,i) in model.ingredient"
            :key="i"
            :gutter="10"
            type="flex"
            style="flex-wrap:wrap;margin-top:5px;"
          >
            <el-form-item label="食材">
              <el-col :span="12">
                <el-input v-model="item.foodname" placeholder="请填写食材名称" />
              </el-col>
              <el-col :span="10">
                <el-input v-model="item.amount" class="input-with-select">
                  <el-select slot="append" v-model="item.unit" placeholder="请选择单位">
                    <el-option v-for="u in units" :key="u" :label="u" :value="u" />
                  </el-select>
                </el-input>
              </el-col>
              <el-col :span="2">
                <el-button size="small" type="danger" @click="model.ingredient.splice(i,1)">删除</el-button>
              </el-col>
            </el-form-item>
          </el-row>
          <el-form-item>
            <el-button type="primary" style=" margin-top:10px;" @click="nextStep(0)">上一步</el-button>
            <el-button type="primary" style=" margin-top:10px;" @click="nextStep(2)">下一步</el-button>
          </el-form-item>
        </div>
        <!--end of 食材信息-->

        <!--料理步骤-->
        <div label="料理步骤" v-show="active==2">
          <el-button @click="model.step.push({})">
            <i class="el-icon-plus" />添加料理步骤
          </el-button>
          <el-row
            v-for="(item,i) in model.step"
            :key="i"
            :gutter="20"
            type="flex"
            style="flex-wrap:wrap;margin-top:10px;"
          >
            <el-col :span="2.5">
              <el-upload
                class="avatar-uploader"
                :show-file-list="false"
                :on-success="res=>$set(item,'image',res.url)"
              >
                <img v-if="item.image" :src="item.image" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon" />
              </el-upload>
            </el-col>
            <el-col :span="14">
              <el-input v-model="item.desc" type="textarea" :rows="3" placeholder="请填写步骤描述" />
            </el-col>
            <el-col :span="2">
              <el-button
                size="small"
                type="danger"
                style=" margin-top:20px;"
                @click="model.step.splice(i,1)"
              >删除</el-button>
            </el-col>
          </el-row>

          <el-form-item>
            <el-button type="primary" style=" margin-top:10px;" @click="nextStep(1)">上一步</el-button>
            <el-button type="primary" style=" margin-top:10px;" native-type="submit">提交</el-button>
          </el-form-item>
        </div>
        <!--end of 料理步骤-->
      </el-form>
    </el-card>
  </div>
</template>
<script>
// import { getCategory, postGoods } from '@/api/goods'
import { getCategory } from '@/api/menu.js'
import ZypCard from '@/components/ZypCard/ZypCard.vue'
export default {
  components: {
    ZypCard
  },
  props: {
    // 基础类型检测, null意味着任何类型都行
    listRowData: {
      type: Object,
      default () {
        return {}
      }
    }
    // 多种类型
  },
  data () {
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
      dialogVisible: false,
      fileList: [],
      texts: ['简单', '一般', '中等', '困难', '极难'],
      model: {

        name: '',
        images: [],
        difficulty: 0,
        time: '',
        description: '',
        ingredient: [],
        step: []

      },
      selectparent: '',
      parents: [],
      categorys: [],
      units: ['勺', '克', '个', '片', '毫升', '斤', '滴', '根'],
      active: 0

    }
  },
  created () {
    this.getTypeList()
  },
  mounted () {
    if (Object.keys(this.listRowData).length > 0) {
      this.form = this.listRowData
    }
  },
  methods: {
    getTypeList () {
      this.listLoading = true
      getCategory().then(res => {
        let data = res.data
        let parentTree = this.toTreeData(data)
        this.categorys = parentTree
        console.log(parentTree)
      })
    },
    // 将有父子关系的数组转换成树形结构数据
    toTreeData (data, attr) {
      data.forEach(ele => {
        ele.label = ele.categoryName
        ele.value = ele.id
        let pid = ele.pid
        if (pid === 0) {
          //是根元素的hua ,不做任何操作,如果是正常的for-i循环,可以直接continue.
        } else {
          //如果ele是子元素的话 ,把ele扔到他的父亲的child数组中.
          data.forEach(d => {
            if (d.id === pid) {
              let childArray = d.children
              if (!childArray) {
                childArray = []
              }
              childArray.push(ele)
              d.children = childArray
            }
          })
        }
      })
      //去除重复元素
      return data.filter(ele => ele.pid === 0)
    },
    onSubmit () {
      postGoods(this.form).then(res => {
        this.$message({
          message: '添加商品成功',
          type: 'success'
        })
      })
    },

    handleRemove (file, fileList) {
      console.log(file, fileList)
      //   thumb_id
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleAvatarSuccess (res, file) {
      this.form.imgList.push(res.data)
    },
    afterUpload (res) {
      //this.$push(this.model,'images',res.url)
      this.model.images.push({ img: res.data.fileUrl })
      // this.model.images=res.url;

    },
    nextStep (activeIndex) {
      console.log(this.model)
      setTimeout(() => {
        this.active = activeIndex

      })
    },
    tabClick (tab, event) {
      console.log(tab)
      console.log(event)
    },
    cascaderChange (e) {
      console.log(e)
    }
  }
}
</script>
<style lang="scss">
.content {
  margin: 10px 20px 0;
  overflow: hidden;

  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }
  .step {
    padding: 10px;
  }
  .box-card {
    margin-bottom: 20px;
  }
  .el-select .el-input {
    width: 120px;
  }

  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }
}
</style>
