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
      <el-form label-width="100px" :model="menu" :rules="rules" ref="baseinfo">
        <!--基本信息-->
        <div label="基本信息" v-show="active==0">
          <el-form-item label="名称" prop="menuName">
            <el-col :span="6">
              <el-input v-model="menu.menuName" width="150" />
            </el-col>
          </el-form-item>
          <el-form-item label="所属分类" prop="categoryIds">
            <el-cascader
              :options="categorys"
              clearable
              @change="cascaderChange"
              v-model="menu.categoryIds"
            ></el-cascader>
          </el-form-item>
          <!-- :file-list="menu.img" -->
          <el-form-item label="上传轮播图">
            <el-upload
              class="upload-demo"
              :action="'http://localhost:9527/dev-api/v1/upload'"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :file-list="menu.imgLists"
              :on-success="handleAvatarSuccess"
              list-type="picture-card"
            >
              <i class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>

          <el-form-item label="难度系数" prop="difficulty">
            <el-rate v-model="menu.difficulty" style="margin-top:0.6rem" show-text :texts="texts" />
          </el-form-item>
          <el-form-item label="制作时间" prop="time">
            <el-col :span="4">
              <el-input v-model="menu.time">
                <template slot="append">分钟</template>
              </el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="简单描述" prop="description">
            <el-col :span="15">
              <el-input v-model="menu.description" type="textarea" :rows="2" />
            </el-col>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              style=" margin-top:10px;"
              @click="validateForm('baseinfo',1)"
            >下一步</el-button>
          </el-form-item>
        </div>
        <!--end of 基本信息-->
        <!--食材信息-->
        <div label="食材准备" v-show="active==1">
          <el-button @click="menu.ingredients.push({})">
            <i class="el-icon-plus" />添加食材
          </el-button>
          <el-row
            v-for="(item,index) in menu.ingredients"
            :key="index"
            :gutter="10"
            type="flex"
            style="flex-wrap:wrap;margin-top:5px;"
          >
            <el-col :span="6">
              <el-form-item
                label="食材"
                :prop="`ingredients[${index}].foodname`"
                :rules="rules.foodname"
              >
                <el-input v-model="item.foodname" placeholder="请填写食材名称" />
              </el-form-item>
            </el-col>
            <el-col :span="3">
              <el-form-item
                label="食材数量"
                :prop="`ingredients[${index}].amount`"
                :rules="rules.amount"
              >
                <el-input v-model="item.amount"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="3">
              <el-form-item
                label-width="0"
                :prop="`ingredients[${index}].unit`"
                :rules="rules.unit"
              >
                <el-select v-model="item.unit" placeholder="请选择单位">
                  <el-option v-for="u in units" :key="u" :label="u" :value="u" />
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="2">
              <el-button size="small" type="danger" @click="menu.ingredient.splice(i,1)">删除</el-button>
            </el-col>
          </el-row>
          <el-form-item>
            <el-button
              type="primary"
              style=" margin-top:10px;"
              @click="validateForm('baseinfo',0)"
            >上一步</el-button>
            <el-button
              type="primary"
              style=" margin-top:10px;"
              @click="validateForm('baseinfo',2)"
            >下一步</el-button>
          </el-form-item>
        </div>
        <!--料理步骤-->
        <div label="料理步骤" v-show="active==2">
          <el-button @click="menu.steps.push({})">
            <i class="el-icon-plus" />添加料理步骤
          </el-button>
          <el-row
            v-for="(item,i) in menu.steps"
            :key="i"
            :gutter="20"
            type="flex"
            style="flex-wrap:wrap;margin-top:10px;"
          >
            <!-- :on-success="res=>$set(item,'url',res.data.fileUrl)" -->
            <el-col :span="2.5">
              <el-upload
                :action="'http://localhost:9527/dev-api/v1/upload'"
                class="avatar-uploader"
                :show-file-list="false"
                :on-success="res=>$set(item,'img',res.data.fileUrl)"
              >
                <img v-if="item.img" :src="'http://127.0.0.1:3000/'+item.img" class="avatar" />
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
                @click="menu.steps.splice(i,1)"
              >删除</el-button>
            </el-col>
          </el-row>

          <el-form-item>
            <el-button type="primary" style=" margin-top:10px;" @click="nextStep(1)">上一步</el-button>
            <el-button
              v-if="this.menuId"
              type="primary"
              style=" margin-top:10px;"
              @click="updataMenu"
            >修改</el-button>
            <el-button v-else type="primary" style=" margin-top:10px;" @click="onSubmit">提交</el-button>
          </el-form-item>
        </div>
        <!--end of 料理步骤-->
      </el-form>
    </el-card>
  </div>
</template>
<script>
// import { getCategory, postGoods } from '@/api/goods'
import { getCategory, addmMenu, getMenuById, updataMenu } from '@/api/menu.js'
import ZypCard from '@/components/ZypCard/ZypCard.vue'
export default {
  components: {
    ZypCard
  },

  data () {
    return {
      fileList: [{ name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' }, { name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' }],
      // 上传相关信息
      dialogImageUrl: '',
      dialogVisible: false,
      texts: ['简单', '一般', '中等', '困难', '极难'],
      menu: {

        menuName: '',
        // 服务器返回的图片
        img: [],
        // 上传到服务器的img
        imgLists: [],
        difficulty: 1,
        time: '10',
        description: '',
        ingredients: [


        ],
        steps: [],
        categoryIds: []

      },
      selectparent: '',
      parents: [],
      categorys: [],
      units: ['勺', '克', '个', '片', '毫升', '斤', '滴', '根'],
      active: 0,
      rules: {
        menuName: [
          { required: true, message: '请输入菜品名称', trigger: 'blur' },
          { min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur' }
        ],

        difficulty: [
          { required: true, message: '请选择难度', trigger: 'change' }
        ],
        // ingredient: [
        //   { type: Array, required: true, message: '请添加食材', trigger: 'change' }
        // ],
        foodname: [
          { required: true, message: '请输入菜品名称', trigger: 'blur' },
          { min: 1, max: 8, message: '长度在 1 到 10 个字符', trigger: 'blur' }
        ],
        // step: [
        //   { type: Array, required: true, message: '请添加步骤', trigger: 'change' }
        // ],
        categoryIds: [
          { required: true, message: '请选择一个分类', trigger: 'change' }
        ],
        time: [
          { required: true, message: '请描述做菜时间', trigger: 'change' }
        ],
        description: [
          { required: true, message: '请填写菜品描述', trigger: 'blur' }
        ],
        unit: [
          { required: true, message: '请选择单位', trigger: 'change' }
        ],
        amount: [
          { required: true, message: '请输入数量', trigger: 'blur' }
        ]
      },
      // 菜单id

    }
  },
  created () {
    this.getTypeList()
    // 编辑时传入数据初始化菜谱信息
    this.menuId = this.$route.query.id
    if (!!this.menuId) {
      this.getMenuById()
    }
  },
  mounted () {
    console.log(this.$route)
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
    getMenuById () {
      getMenuById(this.menuId).then(res => {
        var imgArr = res.data.img
        if (!!imgArr) {
          imgArr = imgArr.split(',').map(item => {
            return {
              url: "http://127.0.0.1:3000/" + item
            }
          })
        }
        res.data.img = imgArr ? imgArr : []
        res.data.time = 10
        this.menu = res.data
        // 深拷贝应用-不明白原因
        this.menu.imgLists = JSON.parse(JSON.stringify(imgArr))
        this.menu.categoryIds = res.data.categoryId

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
    // 创建菜谱
    onSubmit () {
      addmMenu(this.menu).then(res => {
        this.$message({
          message: '添加菜谱成功',
          type: 'success'
        })
        this.resetForm('baseinfo')
        this.active = 0
      })
    },
    // 更新菜谱
    updataMenu () {
      console.log('更新', this.menu)
      updataMenu(this.menu).then(res => {
        this.$message({
          message: '修改菜谱成功',
          type: 'success'
        })
        this.active = 0
      })
    },

    handleRemove (file, fileList) {
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleAvatarSuccess (res, file) {
      console.log(' this.imageUrl', this.imageUrl)
      console.log('handleAvatarSuccess-before', this.menu.imgLists)
      this.menu.img.push(
        {
          img: res.data.fileUrl
        }
      )
    },
    afterUpload (res) {
      this.menu.img.push({ img: res.data.fileUrl })
    },

    nextStep (activeIndex) {
      console.log(this.menu)
      setTimeout(() => {
        this.active = activeIndex

      })
    },
    validateForm (formName, activeIndex) {
      // this.nextStep(activeIndex)
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.nextStep(activeIndex)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    tabClick (tab, event) {
      console.log(tab)
      console.log(event)
    },
    cascaderChange (e) {
      if (e.length > 0) {
        this.menu.categoryId = e.slice(-1).join()
      }
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
      this.centerDialogVisible = false
    },
    handlePreview () { }

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
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    height: 75px;
    width: 75px;
    line-height: 75px;
    // width: 178px;
    // height: 178px;
    // line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
}
</style>
