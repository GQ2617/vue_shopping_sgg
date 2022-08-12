<template>
  <div>
    <Header></Header>
    <router-view></router-view>
    <Footer v-show="$route.meta.isShowFooter"></Footer>
    <!-- <Footer
      v-show="$route.path === '/home' || $route.path === '/search'"
    ></Footer> -->
  </div>
</template>

<script>
import Footer from "./components/Footer/Footer.vue";
import Header from "./components/Header/Header.vue";
export default {
  name: "App",
  components: {
    Header,
    Footer,
  },
  mounted() {
    // 通知vuex发请求，获取三级列表数据，存储于仓库中
    this.$store.dispatch("home/categoryList");
  },
};
</script>

<style>
</style>
