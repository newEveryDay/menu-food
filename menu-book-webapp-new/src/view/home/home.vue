<!--
 * @Author: your name
 * @Date: 2021-07-02 11:03:57
 * @LastEditTime: 2021-07-02 14:55:58
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vant-vue2-h5\vant-app\src\components\HelloWorld.vue
-->
<template>
  <div class="home">
    <van-nav-bar title="菜谱之家" fixed />
    <!-- <div style="height:1000px;background:red;margin-top:46px">13232323</div> -->

    <van-tabbar v-model="active">
      <van-tabbar-item icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item icon="search" dot>菜谱</van-tabbar-item>
      <van-tabbar-item icon="friends-o" badge="5">收藏</van-tabbar-item>
      <van-tabbar-item icon="setting-o" badge="20">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { NavBar, Tabbar, TabbarItem } from 'vant'
export default {
  components: {
    [NavBar.name]: NavBar,
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem,
  },

  data () {
    return {
      active: 0
    }
  },
  methods: {

  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
