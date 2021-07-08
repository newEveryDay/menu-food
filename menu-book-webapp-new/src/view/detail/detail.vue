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
      <van-nav-bar title="菜谱之家" fixed />
    </header>
    <section>
      <!-- 轮播开始 -->
      <van-swipe class="my-swipe" :autoplay="3000">
        <van-swipe-item v-for="(image, index) in images" :key="index">
          <img class="img" v-lazy="image" />
        </van-swipe-item>
      </van-swipe>
      <!-- 轮播结束 -->
      <div class="quick-enter">
        <van-grid :gutter="10" :border="false" :square="true">
          <van-grid-item
            v-for="(cate,key) in  cateSection"
            :key="key"
            :icon="cate.icon"
            :text="cate.name"
          />
        </van-grid>
      </div>
    </section>

    <footer>
      <van-tabbar v-model="active">
        <van-tabbar-item icon="home-o" to="/home">首页</van-tabbar-item>
        <van-tabbar-item icon="search" dot to="/menu">菜谱</van-tabbar-item>
        <van-tabbar-item icon="friends-o" badge="5" to="/collect">收藏</van-tabbar-item>
        <van-tabbar-item icon="setting-o" badge="20" to="/user">我的</van-tabbar-item>
      </van-tabbar>
    </footer>
  </div>
</template>

<script>
import { NavBar, Tabbar, TabbarItem, Swipe, SwipeItem, Grid, GridItem } from 'vant'
export default {
  components: {
    [NavBar.name]: NavBar,
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [Grid.name]: Grid,
    [GridItem.name]: GridItem
  },

  data () {
    return {
      active: 0,
      images: [
        require('../../assets/temp/banner1.jpg'),
        require('../../assets/temp/banner2.jpg'),
        require('../../assets/temp/banner3.jpg'),
        require('../../assets/temp/banner4.jpg')
      ],
      cateSection: [
        {
          icon: require('../../assets/temp/c1.png'),
          name: "蔬菜"
        },
        {
          icon: require('../../assets/temp/c2.png'),
          name: "水果"
        },
        {
          icon: require('../../assets/temp/c3.png'),
          name: "豆类"
        },
        {
          icon: require('../../assets/temp/c4.png'),
          name: "面包"
        },
        {
          icon: require('../../assets/temp/c5.png'),
          name: "烧烤"
        },
        {
          icon: require('../../assets/temp/c6.png'),
          name: "果汁"
        },
        {
          icon: require('../../assets/temp/c7.png'),
          name: "海鲜"
        },
        {
          icon: require('../../assets/temp/c8.png'),
          name: "家居厨卫"
        }
      ]
    }
  },
  methods: {

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
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  height: 150px;
  text-align: center;
}
.my-swipe .van-swipe-item .img {
  height: 100%;
  width: 100%;
}
.quick-enter {
  background: #fff;
}
</style>
