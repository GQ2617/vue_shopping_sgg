<template>
  <div class="pagination">
    <button :disabled="pageNo === 1" @click="pageUpHandler()">上一页</button>
    <button v-if="startNumAndEndNum.start > 1" @click="pageFirstHandler()">
      1
    </button>
    <button v-if="startNumAndEndNum.start > 2">···</button>

    <button
      v-for="(page, index) in startNumAndEndNum.end"
      :key="index"
      v-if="page >= startNumAndEndNum.start"
      @click="pageNoHandler(page)"
      :class="{ active: pageNo === page }"
    >
      {{ page }}
    </button>

    <button v-if="startNumAndEndNum.end < totalPage - 1">···</button>
    <button v-if="startNumAndEndNum.end < totalPage" @click="pageLastHandler()">
      {{ totalPage }}
    </button>
    <button :disabled="pageNo === totalPage" @click="pageDownHandler()">
      下一页
    </button>

    <button style="margin-left: 30px">共 {{ total }} 条</button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: ["pageNo", "pageSize", "total", "continues"],
  methods: {
    // 上一页
    pageUpHandler() {
      this.$emit("getPageNo", this.pageNo - 1);
    },
    // 第一页
    pageFirstHandler() {
      this.$emit("getPageNo", 1);
    },
    // 连续页
    pageNoHandler(page) {
      this.$emit("getPageNo", page);
    },
    // 最后页
    pageLastHandler() {
      this.$emit("getPageNo", this.totalPage);
    },
    // 下一页
    pageDownHandler() {
      this.$emit("getPageNo", this.pageNo + 1);
    },
  },
  computed: {
    // 总共多少页
    totalPage() {
      return Math.ceil(this.total / this.pageSize);
    },
    // 页码的起始数字和结束数字
    startNumAndEndNum() {
      const { continues, pageNo, totalPage } = this;
      let start = 0;
      let end = 0;
      //   判断连续页数是否小于总页数
      if (continues > totalPage) {
        start = 1;
        end = totalPage;
      } else {
        start = pageNo - Math.floor(continues / 2);
        end = pageNo + Math.floor(continues / 2);
        // 判断起始页是否小于1
        if (start < 1) {
          start = 1;
          end = continues;
        }
        // 判断结束页是否大于总页数
        if (end >= totalPage) {
          start = totalPage - continues + 1;
          end = totalPage;
        }
      }
      return { start, end };
    },
  },
};
</script>

<style scoped lang="less">
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      //   cursor: not-allowed;
      background-color: #e1251b;
      color: #fff;
    }
  }
}
</style>