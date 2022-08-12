<template>
  <div class="type-nav">
    <div class="container">
      <!-- 三级联动 -->
      <div @mouseleave="leaveIndex" @mouseover="show()">
        <h2 class="all">全部商品分类</h2>
        <!-- <transition
          name="animate__animated animate__bounce"
          enter-active-class="animate__zoomIn"
          leave-active-class="animate__zoomOut"
        > -->
        <div class="sort" v-show="isShow">
          <div class="all-sort-list2" @click="goSearch">
            <div
              class="item"
              v-for="(c1, index) in categoryList.slice(0, 15)"
              :key="c1.categoryId"
            >
              <!-- 一级菜单 -->
              <h3
                @mouseover="changeIndex(index)"
                :class="{ cur: currentIndex == index }"
              >
                <a
                  :data-categoryName="c1.categoryName"
                  :data-category1Id="c1.categoryId"
                  >{{ c1.categoryName }}</a
                >
              </h3>
              <!-- 二三级菜单 -->
              <div
                class="item-list clearfix"
                :style="{ display: currentIndex == index ? 'block' : 'none' }"
              >
                <!-- 二级菜单 -->
                <div class="subitem">
                  <dl
                    class="fore"
                    v-for="(c2, index) in c1.categoryChild"
                    :key="c2.categoryId"
                  >
                    <dt>
                      <a
                        :data-categoryName="c2.categoryName"
                        :data-category2Id="c2.categoryId"
                        >{{ c2.categoryName }}</a
                      >
                    </dt>
                    <dd>
                      <!-- 三级菜单 -->
                      <em
                        v-for="(c3, index) in c2.categoryChild"
                        :key="c3.categoryId"
                      >
                        <a
                          :data-categoryName="c3.categoryName"
                          :data-category3Id="c3.categoryId"
                          >{{ c3.categoryName }}</a
                        >
                      </em>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- </transition> -->
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
// import "animate.css";
import { mapState } from "vuex";
import throttle from "lodash/throttle";
export default {
  name: "TypeNav",
  data() {
    return {
      currentIndex: -1,
      isShow: true,
    };
  },
  methods: {
    // 鼠标移入一级菜单,改变背景色
    changeIndex: throttle(function (index) {
      this.currentIndex = index;
    }, 50),
    // 鼠标移出一级菜单,背景色恢复, 导航栏移除
    leaveIndex() {
      this.currentIndex = -1;
      if (this.$route.path !== "/home") {
        this.isShow = false;
      }
    },
    // 点击链接实现路由跳转至search页面并携带相应参数
    goSearch(event) {
      let element = event.target;
      // 点击携带的自定义属性
      let { categoryname, category1id, category2id, category3id } =
        element.dataset;
      if (categoryname) {
        // 路由跳转的参数
        let location = { name: "search" };
        let query = { categoryName: categoryname };
        // 一级目录
        if (category1id) {
          query.category1Id = category1id;
          // 二级目录
        } else if (category2id) {
          query.category2Id = category2id;
          // 三级目录
        } else {
          query.category3Id = category3id;
        }
        // 判断：如果路由跳转携带params参数，合并传递
        location.query = query;
        if (this.$route.params) {
          location.params = this.$route.params;
        }
        this.$router.push(location);
      }
    },
    // 鼠标移入导航标题,导航栏显示
    show() {
      if (this.$route.path !== "/home") {
        this.isShow = true;
      }
    },
  },
  mounted() {
    // 判断三级联动列表是否展示
    if (this.$route.path !== "/home") {
      this.isShow = false;
    }
  },

  computed: {
    // ...mapState({
    //   categoryList: (state) => state.home.categoryList,
    // }),
    ...mapState("home", { categoryList: "categoryList" }),
  },
};
</script>

<style scoped lang="less">
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #b1191a;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 48px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #c81623;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;
            background-color: #c81623;

            a {
              color: white;
            }
          }
          // h3:hover {
          //   background-color: white;
          //   a {
          //     color: #c81623;
          //   }
          // }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          // &:hover {
          //   .item-list {
          //     display: block;
          //   }
          // }
        }
        .cur {
          background-color: white !important;
          a {
            color: #c81623 !important;
          }
        }
      }
    }
  }
}
</style>