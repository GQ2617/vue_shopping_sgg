 <<template>
   <div class="swiper-container" ref="floor1Swiper">
        <div class="swiper-wrapper">
            <!-- 楼层轮播图模块 -->
            <div
            class="swiper-slide"
            v-for="(carouseFloor, index) in list"
            :key="carouseFloor.id"
            >
                <img :src="carouseFloor.imgUrl" />
            </div>
        </div>
        <!-- 如果需要分页器 -->
        <div class="swiper-pagination"></div>

        <!-- 如果需要导航按钮 -->
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
    </div>
 </template>
 
 <script>
import Swiper from "swiper";
export default {
  name: "Carousel",
  props: ["list"],
  watch: {
    list: {
      immediate: true,
      handler() {
        this.$nextTick(() => {
          var mySwiper = new Swiper(this.$refs.floor1Swiper, {
            loop: true,
            pagination: {
              el: ".swiper-pagination",
              clickable: true,
            },
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
          });
        });
      },
    },
  },
};
</script>
 
 <style>
</style>