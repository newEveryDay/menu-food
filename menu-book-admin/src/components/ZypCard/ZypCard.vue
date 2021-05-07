<template>
  <el-card class="box-card" :body-style="{ padding: '6px 10px' }">
    <div class="box-card-con">
      <span class="box-card-title">{{ lable }}</span>
      <el-button type="primary" icon="el-icon-plus" class="el-bt" v-if="isShowBt" @click="clickBt">{{ lable }}
      </el-button>
    </div>
  </el-card>
</template>

<script>
export default {
  name: 'ZypCard',
  props: {
    lable: {
      type: String
    },
    isShowBt: {
      type: Boolean,
      default() {
        return true
      }
    }
  },
  methods: {
    clickBt() {
      this.$emit('clickBt')
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .box-card-con {
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .box-card-title {
    border-left: 4px solid #fc5721;
    padding-left: 10px;
    float: left;
  }

  .el-bt {
    float: right;
  }
</style>
