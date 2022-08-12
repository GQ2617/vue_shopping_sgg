<template>
  <header class="header">
    <!-- 头部的第一行 -->
    <div class="top">
      <div class="container">
        <div class="loginList">
          <p>品优购欢迎您！</p>
          <!-- 未登录 -->
          <p v-if="!userName">
            <span>请</span>
            <!-- 路由跳转 -->
            <router-link to="/login">登录</router-link>
            <router-link to="/register" class="register">免费注册</router-link>
          </p>
          <!-- 已登录 -->
          <p v-else="userName">
            <!-- 路由跳转 -->
            <a>{{ userName }}</a>
            <a class="register" @click="userLogout">退出登录</a>
          </p>
        </div>
        <div class="typeList">
          <router-link to="/center">我的订单</router-link>
          <router-link to="/shopcart">我的购物车</router-link>
          <a href="###">我的品优购</a>
          <a href="###">品优购会员</a>
          <a href="###">企业采购</a>
          <a href="###">关注品优购</a>
          <a href="###">合作招商</a>
          <a href="###">商家后台</a>
        </div>
      </div>
    </div>
    <!--头部第二行 搜索区域-->
    <div class="bottom">
      <h1 class="logoArea">
        <!-- 路由跳转 -->
        <router-link class="logo" title="品优购" to="/home">
          <img src="./images/logo.png" alt="" />
        </router-link>
      </h1>
      <div class="searchArea">
        <form action="###" class="searchForm">
          <input
            type="text"
            autocomplete="off"
            id="autocomplete"
            class="input-error input-xxlarge"
            v-model="keyword"
            @keyup.enter="goSearch"
          />
          <!-- 路由跳转 -->
          <button
            class="sui-btn btn-xlarge btn-danger"
            type="button"
            @click="goSearch"
          >
            搜索
          </button>
        </form>
      </div>
      <!-- 购物车模块 -->
      <div class="shopCar">
        <span class="el-icon-shopping-cart-1"></span>
        <router-link to="/shopcart">我的购物车</router-link>
        <i class="count">{{ cartNum }}</i>
      </div>
    </div>
  </header>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Header",
  data() {
    return {
      keyword: "",
    };
  },
  methods: {
    // 搜索按钮的回调函数，需要向search路由跳转
    goSearch() {
      // 路由传参的对象形式
      if (this.$route.query) {
        const location = {
          name: "search",
          params: { keyword: this.keyword },
        };
        location.query = this.$route.query;
        this.$router.push(location);
      }
    },
    // 用户退出登录
    async userLogout() {
      try {
        await this.$store.dispatch("user/userLogout");
        if (this.$route.path == "/home") {
          alert("退出登录成功.点击确定跳转至登录页面");
          this.$router.push("/login");
        } else {
          alert("退出登录成功.点击确定跳转至首页");
          this.$router.push("/home");
        }
      } catch (error) {
        alert(error.message);
      }
    },
  },
  computed: {
    ...mapGetters("shopcart", ["cartList"]),
    // 购物车数据
    cartInfoList() {
      return this.cartList.cartInfoList || [];
    },
    // 获取购物车数量
    cartNum() {
      return this.cartInfoList.length;
    },
    // 获取用户信息
    userName() {
      this.$store.state.user.userInfo = this.$store.state.user.userInfo || {};
      return this.$store.state.user.userInfo.name;
    },
  },
  mounted() {
    this.$bus.$on("clear", () => {
      this.keyword = "";
    });
  },
};
</script>

<style scoped lang="less">
.el-icon-shopping-cart-1 {
  color: #e1251b;
  font-size: 16px;
}
.shopCar span {
  margin-left: -15px;
  margin-right: 10px;
}
.header {
  & > .top {
    background-color: #eaeaea;
    height: 30px;
    line-height: 30px;

    .container {
      width: 1200px;
      margin: 0 auto;
      overflow: hidden;

      .loginList {
        float: left;

        p {
          float: left;
          margin-right: 10px;

          .register {
            border-left: 1px solid #b3aeae;
            padding: 0 5px;
            margin-left: 5px;
          }
        }
      }

      .typeList {
        float: right;

        a {
          padding: 0 10px;

          & + a {
            border-left: 1px solid #b3aeae;
          }
        }
      }
    }
  }

  & > .bottom {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;

    .logoArea {
      float: left;

      .logo {
        img {
          width: 175px;
          margin: 25px 100px 25px 10px;
        }
      }
    }

    .searchArea {
      margin-top: 35px;

      .searchForm {
        overflow: hidden;

        input {
          box-sizing: border-box;
          width: 500px;
          height: 32px;
          padding: 0px 4px;
          border: 2px solid #b1191a;
          float: left;

          &:focus {
            outline: none;
          }
        }

        button {
          height: 32px;
          width: 68px;
          background-color: #b1191a;
          border: none;
          color: #fff;
          float: left;
          cursor: pointer;

          &:focus {
            outline: none;
          }
        }
      }
    }
  }
  .shopCar {
    position: absolute;
    right: 12%;
    top: 65px;
    // float: right;

    /* text-align: center; */
    line-height: 35px;
    width: 140px;
    height: 35px;
    background-color: #f1f1f1;
  }

  .shopCar::before {
    font-family: "icomoon";
    content: "\e93a";
    margin-left: 10px;
    margin-right: 10px;
    color: #b1191a;
  }

  .shopCar::after {
    font-family: "icomoon";
    content: "\ea42";
    margin-left: 20px;
  }

  .count {
    position: absolute;
    top: -10px;
    left: 100px;
    height: 20px;
    width: 20px;
    line-height: 20px;
    text-align: center;
    border-top-left-radius: 50%;
    border-top-right-radius: 50%;
    border-bottom-right-radius: 50%;
    background-color: #b1191a;
    color: white;
  }
}
</style>