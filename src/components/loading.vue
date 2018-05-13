<template>
  <div id="loading" v-if="loadingShowFlag">
      <div class="loaing-wrapper">
          <h1>智慧生活</h1>
          <h2>未来城市推动人</h2>
          <p>{{loadingProcess}}%</p>
      </div>
  </div>
</template>
<script>
    export default {
        name : "loading",
        props: {
            loadingAlreadyFlag: {
                type: Number,
                default: 0
            }
        },
        data () {
            return {
                loadingShowFlag: 1,
                loadingProcess: 1
            }
        },
        mounted () {
            this.processFunc();
        },
        methods: {
            processFunc () {
                let _this = this;
                let processInterval = setInterval(function () {
                    if (_this.loadingAlreadyFlag == 0 && _this.loadingProcess < 100) {
                        _this.loadingProcess = _this.loadingProcess + 1;
                    }else{
                        clearInterval(processInterval);
                        if (_this.loadingProcess >= 100) {
                            _this.loadingShowFlag = 0;
                        }else{
                            let quickInterval = setInterval(function(){
                                if ( _this.loadingProcess >= 100) {
                                    clearInterval(quickInterval);
                                    _this.loadingShowFlag = 0;
                                }else{
                                    _this.loadingProcess = _this.loadingProcess + 1;
                                }
                            },50)
                        }
                    }
                },1000)
            }
        }
    }
</script>
<style lang="less">
    @keyframes loadingShow {
        0%  { background-position: 0 0;}
        100% { background-position: -100% 0;}
    }
    #loading {
        position: absolute;
        top: 0;
        left: 0;
        display: flex;
        flex-flow: column;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        text-align: center;
        background-color: #fff;
        .loaing-wrapper {
            background-image: -webkit-linear-gradient(left, #00c1de,#fff 25%, #00c1de 50%, #fff 75%, #00c1de);
            -webkit-text-fill-color: transparent;
            -webkit-background-clip: text;
            background-size: 200% 100%;
            animation: loadingShow 4s infinite linear;
        }
    }
</style>

