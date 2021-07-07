<!--
 * @Author: your name
 * @Date: 2021-07-02 11:03:57
 * @LastEditTime: 2021-07-02 14:55:58
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vant-vue2-h5\vant-app\src\components\HelloWorld.vue
-->
<template>
  <div class="hello">
    <van-nav-bar title="菜谱之家" fixed />
    <h1>{{ msg }}</h1>
    <van-button type="danger">危险按钮</van-button>
    <van-goods-action-button type="danger" @click="sorry">立即购买</van-goods-action-button>
  </div>
</template>

<script>
// import { Dialog } from 'vant'
import { Button, GoodsActionButton, NavBar } from 'vant'
export default {
  name: 'HelloWorld',
  components: {
    [Button.name]: Button,
    [GoodsActionButton.name]: GoodsActionButton,
    [NavBar.name]: NavBar,
  },
  props: {
    msg: String
  },
  data () {
    return {
      fileList: [
        { url: 'https://img01.yzcdn.cn/vant/leaf.jpg' },
        // Uploader 根据文件后缀来判断是否为图片文件
        // 如果图片 URL 中不包含类型信息，可以添加 isImage 标记来声明
        { url: 'https://cloud-image', isImage: true },
      ],
      value: ''
    }
  },
  methods: {
    // onSelect () {
    //   Dialog({ message: '提示' })
    // },
    onChange () { }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
