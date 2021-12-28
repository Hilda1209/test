<template>
  <div class="home">
    <van-tabs
      v-model="active"
      color="rgb(204,204,204)"
      title-active-color="rgb(240,89,97)"
      sticky
    >
      <van-tab>
        <template #title>
          <div @click="orign()">综合</div>
        </template>
      </van-tab>
      <van-tab>
        <template #title>
          <div class="outer">
            <div @click="orign()">销量</div>
            <div class="arrow">
              <div class="up" @click="saleAsc()" id="upSale"></div>
              <div class="down" @click="saleDesc()" id="downSale"></div>
            </div>
          </div>
        </template>
      </van-tab>
      <van-tab>
        <template #title>
          <div class="outer">
            <div @click="orign()">价格</div>
            <div class="arrow">
              <div class="up" @click="ascPrice()" id="up"></div>
              <div class="down" @click="descPrice()" id="down"></div>
            </div>
          </div>
        </template>
      </van-tab>
      <van-tab>
        <template #title> 供应商 </template>
      </van-tab>
    </van-tabs>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh()">
      <div class="container">
        <div v-if="noData">暂无数据</div>
        <template v-else>
          <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad()"
          >
            <ul class="shoplist" v-if="list != null">
              <li v-for="(item, index) in list" :key="index">
                <div class="img">
                  <img :src="item.img" alt="" />
                </div>
                <p>{{ item.subtitle }}</p>
                <div class="message">
                  <p>{{ item.name }}</p>
                  <div class="price">
                    <span>￥{{ item.sellPrice }}</span
                    >&nbsp;&nbsp;<del>￥{{ item.marketPrice }}</del>
                  </div>
                </div>
              </li>
            </ul>
          </van-list>
        </template>
      </div>
    </van-pull-refresh>
  </div>
</template>

<script>
// @ is an alias to /src
import { getgoods } from "../utils/request";
export default {
  name: "Home",
  components: {},
  data() {
    return {
      active: 3,
      list: [],
      loading: false, //加载中
      finished: false, //加载完成
      noData: false, // 如果没有数据，显示暂无数据
      isLoading: false, // 下拉的加载图案
      sortType: " ",
      sortRule: " ",
      pageNo: 1,
      pageSize: 10, //页面显示的条数
      totalPage: 8,
    };
  },
  created() {},
  methods: {
    //获取商品
    getInfo(sortType, sortRule) {
      getgoods({
        pageNo: this.pageNo, //请求的页面
        pageSize: this.pageSize, //请求的条数
        totalPage: this.totalPage,
        sortType: sortType,
        sortRule: sortRule,
      })
        .then((res) => {
          // console.log(this.sortRule,this.sortType)
          // 请求成功
          if (res.data.code === 0) {
            this.loading = false;
            this.list.push(...res.data.page.list);
            this.pageNo++;
            // console.log(this.list);
            // 如果没有数据，显示暂无数据
            if (this.list.length === 0 && this.pageNo === 1) {
              this.noData = true;
            }
            //如果加载完毕，显示没有更多了
            if (this.pageNo === this.totalPage) {
              this.finished = true;
            }
          }
        })
        //请求失败则报错
        .catch((error) => {
          console.log(error);
        });
    },
    //列表加载
    onLoad() {
      setTimeout(() => {
        //列表渲染
        if (this.sortType == "price") {
          if (this.sortRule == "desc") {
            this.getInfo("price", "desc");
          } else if (this.sortRule == "asc") {
            this.getInfo("price", "asc");
          }
        } else if (this.sortType == "saleCount") {
          if (this.sortRule == "desc") {
            this.getInfo("saleCount", "desc");
          } else if (this.sortRule == "asc") {
            this.getInfo("saleCount", "asc");
          }
        } else {
          this.getInfo("", "");
        }

        this.loading = true;
        // this.pageNo++;
      }, 500);
    },
    // 刷新
    onRefresh() {
      setTimeout(() => {
        // 重新初始化这些属性
        this.isLoading = false;
        this.list = [];
        this.pageNo = 1;
        this.loading = false;
        this.finished = false;
        this.noData = false;
        // 请求信息
        this.getInfo();
      }, 500);
    },
    saleAsc() {
      if (this.list != null) {
        this.list = [];
      }
      this.sortType = "saleCount";
      this.sortRule = "asc";
      this.pageNo = 1;
      this.getInfo("saleCount", "asc");
      let upSale = document.getElementById("upSale");
      upSale.style.borderBottomColor = "rgb(240, 89, 97)";
      let downSale = document.getElementById("downSale");
      downSale.style.borderTopColor = "rgb(204, 204, 204)";
    },
    saleDesc() {
      if (this.list != null) {
        this.list = [];
      }
      this.sortType = "saleCount";
      this.sortRule = "desc";
      this.pageNo = 1;
      this.getInfo("saleCount", "desc");
      let downSale = document.getElementById("downSale");
      downSale.style.borderTopColor = "rgb(240, 89, 97)";
      let upSale = document.getElementById("upSale");
      upSale.style.borderBottomColor = "rgb(204, 204, 204)";
    },
    ascPrice() {
      if (this.list != null) {
        this.list = [];
      }
      this.sortType = "price";
      this.sortRule = "asc";
      this.pageNo = 1;
      this.getInfo("price", "asc");
      let up = document.getElementById("up");
      up.style.borderBottomColor = "rgb(240, 89, 97)";
      let down = document.getElementById("down");
      down.style.borderTopColor = "rgb(204, 204, 204)";
    },
    descPrice() {
      if (this.list != null) {
        this.list = [];
      }
      this.sortType = "price";
      this.sortRule = "desc";
      this.pageNo = 1;
      this.getInfo("price", "desc");
      let up = document.getElementById("up");
      up.style.borderBottomColor = "rgb(204, 204, 204)";
      let down = document.getElementById("down");
      down.style.borderTopColor = "rgb(240, 89, 97)";
    },
    // 恢复原始顺序
    orign() {
      this.list = [];
      this.sortType = "";
      this.sortRule = "";
      this.pageNo = 1;
      this.getInfo("", "");
      let upSale = document.getElementById("upSale");
      upSale.style.borderBottomColor = "rgb(204, 204, 204)";
      let downSale = document.getElementById("downSale");
      downSale.style.borderTopColor = "rgb(204, 204, 204)";
      let up = document.getElementById("up");
      up.style.borderBottomColor = "rgb(204, 204, 204)";
      let down = document.getElementById("down");
      down.style.borderTopColor = "rgb(204, 204, 204)";
    },
  },
};
</script>
<style>
/* 箭头 */
.outer {
  display: flex;
}
.arrow {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin-left: 5px;
}
.arrow .up {
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 6px solid transparent;
  border-bottom: 6px solid rgb(204, 204, 204);
}
.arrow .down {
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 6px solid transparent;
  border-top: 6px solid rgb(204, 204, 204);
}
.van-tabs__line {
  height: 0;
}
.van-tabs--line .van-tabs__wrap {
  border-bottom: 1px solid rgb(204, 204, 204);
}
.shoplist {
  display: flex;
  flex-wrap: wrap;
  padding: 15px;
  justify-content: space-between;
}
.shoplist > li {
  width: 160px;
  margin-bottom: 15px;
  border: 1px solid rgb(204, 204, 204);
}
.shoplist > li > .img {
  width: 160px;
  height: 134px;
  background: rgb(244, 244, 244);
}
.shoplist > li > .img > img {
  width: 100%;
  height: 100%;
}
.shoplist > li > p {
  height: 28px;
  line-height: 28px;
  padding-left: 8px;
  font-size: 14px;
  background: rgb(240, 236, 225);
  color: rgb(173, 153, 98);
  white-space: nowrap; /*不换行*/
  text-overflow: ellipsis; /*超出的显示省略号*/
  overflow: hidden; /*超出部分隐藏*/
}
.shoplist > li > .message {
  height: 60px;
  padding: 0 8px;
  background: #fff;
  font-size: 14px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.shoplist > li > .message > p {
  white-space: nowrap; /*不换行*/
  text-overflow: ellipsis; /*超出的显示省略号*/
  overflow: hidden; /*超出部分隐藏*/
}
.shoplist > li > .message > .price > span {
  color: rgb(240, 89, 97);
}
.shoplist > li > .message > .price > del {
  color: rgb(204, 204, 204);
  font-size: 13px;
}
</style>
