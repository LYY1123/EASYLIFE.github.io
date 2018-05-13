<template>
  <div id="appPage">
    <scroll ref="scrollEvent"
            @scroll="pageScroll"
            :eventPassthrough="'horizontal'">
    <!-- 头部 -->
      <div class="headerPart">
        <h5>{{name}}<span>Easy Life</span> </h5>
        <h6>{{slogan}}</h6>
        <p>地址：{{adress}}</p>
        <p>联系电话：<a :href="'tel:' + phone">{{phone}}</a></p>
        <p class="QRcode-wrapper">
          <span>
            <img :src="wxQRcodeUrl" 
                 alt="个人微信二维码" 
                 class="QRcode">
            <em>扫一扫 加微信</em>
          </span>
          <span>
            <img :src="zhshQRcodeUrl" 
                 alt="智慧生活公众号" 
                 class="QRcode">
            <em>关注公众号 抽取优惠券</em>
          </span>
        </p>
      </div>
    <!-- 头部end -->
    <!-- 产品列表 -->
      <div class="list-title-tab">
        <span :class="{'active': tabId == 1}"
              @click="changeTab(1)">索伯菲智能锁</span><span :class="{'active': tabId == 2}"
              @click="changeTab(2)">智伴儿童教育机器人</span><span :class="{'active': tabId == 3}"
              @click="changeTab(3)">腾飞之翼智能锁</span><span :class="{'active': tabId == 4}"
              @click="changeTab(4)">滴塔狗智能锁</span><span :class="{'active': tabId == 5}"
              @click="changeTab(5)">伊派尔智能锁</span><span :class="{'active': tabId == 6}"
              @click="changeTab(6)">智能猫眼</span><span @click="changeTab(7)"
              :class="{'active': tabId == 7}">智能垃圾桶</span>
      </div>
      <div class="list-wapper">
        <div class="products"
             v-for="(item,index) in list" :key="index"
             @click="fullScreenEvent(item)">
          <img :src="item.picUrl" :alt="item.name">
          <p>{{item.name}}</p>
        </div>
      </div>
    <!-- 产品列表end -->
    <div class="footer">
      <p>浙江索伯菲（中德合资）兰考县总代理</p>
      <p>深圳腾飞之翼兰考县总代理</p>
    </div>
    </scroll>
    <!-- 联系我们 -->
    <div class="callMe"
         v-if="toTopShow">
      <a :href="'tel:' + phone">
        联系<br/>我们
      </a>
    </div>
    <!-- 联系我们end -->
    <!-- 回到顶部 -->
    <div class="gototop"
         @click="gotoTop"
         v-if="toTopShow">
      <p>回到</p>
      <p>顶部</p>
    </div>
    <!-- 回到顶部end -->
    <!-- 全屏显示产品 -->
    <div class="fullScreen-product"
         v-show="fullScreenFLag">
      <span class="closeFullScreen-button"
            @click="closeFullScreen">x</span>
      <img :src="bigProductUrl" :alt="bigProductName">
      <p class="bigProductName">{{bigProductName}}</p>
      <p class="productFunctions">功能：{{productFunctions}}</p>
    </div>
    <!-- 全屏显示产品 end -->
    <!-- video -->
    <div class="video-wrapper"
         v-if="videoShowFlag">
      <video poster="https://raw.githubusercontent.com/LYY1123/lyyglob.github.io/master/easylife/src/img/video-pre.png"
             src="https://raw.githubusercontent.com/LYY1123/lyyglob.github.io/master/easylife/src/video/suobofei.mp4"
             class="video-suobofei"
             controls
             x5-playsinline=""
             playsinline=""
             webkit-playsinline=""
             preload="auto"
             @loadstart="videoAlready"
             @ended="videoEnd">
           您的浏览器暂时不支持此视频播放，请更换浏览器尝试！
           </video>
      <span class="closeVideo-button"
            @click="videoEnd"
            v-show="closeButtomShowFlag">关闭视频</span>
    </div>
    
    <!-- video end  -->
    <loading :loadingAlreadyFlag="loadingAlreadyFlag"></loading>
  </div>
</template>
<script>
import { getData } from "js/request.js"
import scroll from "components/scroll.vue"
import loading from "components/loading.vue"

export default {
  name: 'AppPage',
  components: {
    scroll,
    loading
  },
  data () {
    return {
      name: '智慧生活',
      slogan: '未来城市的推动人',
      adress: '兰考县健康南路未来都市26-8',
      phone: '15515513450',
      wxQRcodeUrl: '',
      zhshQRcodeUrl: '',
      tabId: 1,
      dataList: '',
      list: [],
      toTopShow: 0,
      loadingShowFlag: 1,
      loadingAlreadyFlag: 0,
      videoShowFlag: 1,
      closeButtomShowFlag: 0,
      fullScreenFLag: 0,
      bigProductUrl: '',
      bigProductName: '',
      productFunctions: "--"
    };
  },
  mounted () {
    let _this = this;
    getData().then(function(res){
      if(res && res.status == 200) {
        let data = res.data;
        _this.name = data.name;
        _this.slogan = data.slogan;
        _this.adress = data.adress;
        _this.phone = data.phone;
        _this.wxQRcodeUrl = data.wxQRcodeUrl;
        _this.zhshQRcodeUrl = data.zhshQRcodeUrl;
        _this.dataList = data.data;
        _this.list = data.data['1'];
      }
    })
  },
  methods: {
    changeTab (id) {
      this.tabId = id;
      this.list = this.dataList[String(id)];
    },
    fullScreenEvent (data) {
      this.fullScreenFLag = 1;
      this.bigProductUrl = data.bigPicUrl;
      this.bigProductName = data.name;
    },
    closeFullScreen () {
      this.fullScreenFLag = 0;
    },
    pageScroll (pos) {
      if(pos && pos.y <= -200) {
        this.toTopShow = 1;
      }else{
        this.toTopShow = 0;
      }
    },
    gotoTop () {
      this.$refs.scrollEvent.scrollTo(0,0,200)
    },
    videoAlready () {
      let _this = this;
      this.loadingAlreadyFlag = 1;
      setTimeout(function(){
        _this.closeButtomShowFlag = 1;
      },10000)
    },
    videoEnd () {
      this.videoShowFlag = 0;
    }
  }
};
</script>
<style lang="less" scoped>
#appPage {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
  overflow: hidden;
  .headerPart {
    box-sizing: border-box;
    padding: 1rem;
    color: #fff;
    background-image: url("https://raw.githubusercontent.com/LYY1123/lyyglob.github.io/master/easylife/src/img/content-bg.jpg");
    background-size: 100% auto;
    &>p,
    h5,
    h6 {
      margin-bottom: 0.5rem;
    }
    h5>span {
      margin-left: 0.5rem;
      font-size: 0.5rem;
    }
    p {
      font-size: 0.8rem;
    }
    .QRcode-wrapper {
      margin-top: 1rem;
      display: flex;
      align-items: center;
      justify-content: space-around;
      &>span {
        display: flex;
        flex-flow: column;
        align-items: center;
        justify-content: center;
        font-size: 0.7rem;
      }
    }
    .QRcode {
      margin-bottom: 0.5rem;
      display: block;
      width: 4rem;
      height: 4rem;
      border: 2px solid #fff;
    }
  }
  .list-title-tab {
    width: 100%;
    font-size: 0.8rem;
    white-space: nowrap;
    overflow: auto;
    span {
      display: inline-block;
      padding: 0.5rem 0.5rem;
      border-right: 1px solid #ccc;
    }
    span:last-child {
      border: none;
    }
    span.active {
      color: #fff;
      background-color: #33cde5;
      border-right-color: #33cde5;
    }
  }
  .list-wapper {
    box-sizing: border-box;
    padding: 0.5rem 1rem;
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    justify-content: space-between;
    width: 100%;
    color: #fff;
    background-image: url("https://raw.githubusercontent.com/LYY1123/lyyglob.github.io/master/easylife/src/img/content-bg.jpg");
    background-size: 100% auto;
    .products {
      margin-bottom: 0.5rem;
      display: flex;
      flex-flow: column;
      align-items: center;
      justify-content: space-between;
      width: 45%;
      min-height: 14rem;
      img {
        display: block;
        margin-bottom: 0.5rem;
        width: 100%;
        height: auto;
        border: 1px solid #ccc;
      }
      p {
        width: 100%;
        font-size: 0.7rem;
        text-align: center;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
  .footer {
    padding: 1rem 0;
    font-size: 0.8rem;
    color: #333;
    text-align: center;
  }
  .gototop,
  .callMe {
    position: fixed;
    right: 0.5rem;
    bottom: 2rem;
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: center;
    width: 2rem;
    height: 2rem;
    font-size: 0.6rem;
    color: #fff;
    background-color: rgba(0,0,0,0.5);
  }
  .callMe {
    bottom: 4.5rem;
    &>a {
      color: #fff !important;
    }
  }
  .fullScreen-product {
    position: absolute;
    top: 0;
    left: 0;
    flex-flow: column;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0,0, 0.9);
    img {
      display: block;
      width: auto;
      height: 78%;
    }
    p {
      margin-top: 0.5rem;
      font-size: 0.7rem;
      color: #fff;
    }
    .productFunctions {
      width: 70%;
    }
    .closeFullScreen-button {
      position: absolute;
      top: 0.5rem;
      right: 0.5rem;
      padding: 0.5rem;
      color: #fff;
      border-radius: 50%;
    }
  }
  .video-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #fff;
    .video-suobofei {
      display: block;
      position: absolute;
      top: 30%;
      left: 0;
      width: 100%;
      height: 40%;
    }
    .closeVideo-button {
      position: absolute;
      top: 1rem;
      right: 1rem;
      padding: 0.2rem 0.5rem;
      font-size: 0.6rem;
      color: #fff;
      background-color: rgba(0, 0,0, 0.5);
    }
  }
  
}
</style>
