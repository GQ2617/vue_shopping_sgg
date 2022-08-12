<template>
  <div class="home">
    <!-- 全局组件 -->
    <TypeNav></TypeNav>
    <!-- Home下组件 -->
    <ListContainer></ListContainer>
    <Recommend></Recommend>
    <Rank></Rank>
    <Like></Like>
    <Floor
      v-for="(floor, index) in floorList"
      :key="floor.id"
      :floor="floor"
    ></Floor>
    <Brand></Brand>
  </div>
</template>

<script>
// 引入组件
import ListContainer from "./ListContainer/ListContainer.vue";
import Recommend from "./Recommend/Recommend.vue";
import Rank from "./Rank/Rank.vue";
import Like from "./Like/Like.vue";
import Floor from "./Floor/Floor.vue";
import Brand from "./Brand/Brand.vue";

// 引入
import { mapState } from "vuex";
export default {
  name: "Home",
  components: { ListContainer, Recommend, Rank, Like, Floor, Brand },
  mounted() {
    // 获取Floor组件的数据——请求
    this.$store.dispatch("home/getFloorList");
    // 获取用户信息——请求
    this.$store.dispatch("user/getUserInfo");
  },
  computed: {
    ...mapState("home", { floorList: "floorList" }),
  },
};
</script>

<style>
</style>