<!--
 * @Author: your name
 * @Date: 2021-07-02 11:03:57
 * @LastEditTime: 2021-07-02 14:55:58
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vant-vue2-h5\vant-app\src\components\HelloWorld.vue
-->
<template>
  <div class="wrapper">
    <header>
      <van-nav-bar :title="navBarTitle" fixed />
    </header>
    <section>
      <router-view />
    </section>

    <footer>
      <van-tabbar v-model="active" @change="onChange" :route="true">
        <van-tabbar-item icon="home-o" to="/home">首页</van-tabbar-item>
        <van-tabbar-item icon="search" dot to="/menu">菜谱</van-tabbar-item>
        <van-tabbar-item icon="friends-o" badge="5" to="/collect">收藏</van-tabbar-item>
        <van-tabbar-item icon="setting-o" badge="20" to="/user">我的</van-tabbar-item>
      </van-tabbar>
    </footer>
  </div>
</template>

<script>
import {
  mapState,
} from 'vuex'
import { NavBar, Tabbar, TabbarItem } from 'vant'
export default {
  components: {
    [NavBar.name]: NavBar,
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem,
  },

  data () {
    return {
      active: 0,
    }
  },
  computed: {
    ...mapState(['navBarTitle'])
  },
  methods: {
    onChange (e) {
      console.log(e)
      console.log(this)
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less'>
.wrapper {
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
}
header,
footer {
  height: 46px;
  line-height: 46px;
  background-color: #d8d8d8;
  text-align: center;
}
section {
  flex: 1;
  width: 100%;
  overflow: auto; /* winphone8和android4+ */
  -webkit-overflow-scrolling: touch; /* ios5+ */
}
</style>
