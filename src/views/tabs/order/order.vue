<template>
    <div class="order">
        <van-nav-bar ref="navBar"
                     :style="{height: nav.height+'px'}"
                     left-text=""
                     right-text=""
                     :left-arrow="false"
                     :border="false"
                     @click-right="onClickRight"
                     fixed>
            <span slot="title" :style="{opacity:nav.opacity,lineHeight:nav.height+'px'}">{{nav.title}}</span>
            <span slot="right" style="font-weight: 500">其他订单</span>
        </van-nav-bar>
        <div class="bg-nav"></div>
        <div class="bg-t"></div>
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh" class="refresh">
            <div class="order-list">
                <div class="list-title">我的订单</div>
                <div class="list-item">
                    <div class="list-left">
                        <div class="img"></div>
                    </div>
                    <div class="list-right">
                        <div class="title">
                            <span class="title__left">圣克士炸鸡汉堡(锦江店)
                            <van-icon name="arrow" color="#7f7f7f"></van-icon></span>
                            <span class="title__right">已送达</span>
                        </div>
                        <div class="time">2018-09-21 11:29</div>
                        <div class="des">
                            <span class="des__left">巨无霸汉堡 等3件</span>
                            <span class="des__right">￥15.74</span>
                        </div>
                    </div>
                </div>
                <div class="list-item">
                    <div class="list-left">
                        <div class="img"></div>
                    </div>
                    <div class="list-right">
                        <div class="title">
                            <span class="title__left">圣克士炸鸡汉堡(锦江店)
                            <van-icon name="arrow" color="#7f7f7f"></van-icon></span>
                            <span class="title__right">已送达</span>
                        </div>
                        <div class="time">2018-09-21 11:29</div>
                        <div class="des">
                            <span class="des__left">巨无霸汉堡 等3件</span>
                            <span class="des__right">￥15.74</span>
                        </div>
                    </div>
                </div>
                <div class="list-item">
                    <div class="list-left">
                        <div class="img"></div>
                    </div>
                    <div class="list-right">
                        <div class="title">
                            <span class="title__left">圣克士炸鸡汉堡(锦江店)
                            <van-icon name="arrow" color="#7f7f7f"></van-icon></span>
                            <span class="title__right">已送达</span>
                        </div>
                        <div class="time">2018-09-21 11:29</div>
                        <div class="des">
                            <span class="des__left">巨无霸汉堡 等3件</span>
                            <span class="des__right">￥15.74</span>
                        </div>
                    </div>
                </div>
                <div class="list-item">
                    <div class="list-left">
                        <div class="img"></div>
                    </div>
                    <div class="list-right">
                        <div class="title">
                            <span class="title__left">圣克士炸鸡汉堡(锦江店)
                            <van-icon name="arrow" color="#7f7f7f"></van-icon></span>
                            <span class="title__right">已送达</span>
                        </div>
                        <div class="time">2018-09-21 11:29</div>
                        <div class="des">
                            <span class="des__left">巨无霸汉堡 等3件</span>
                            <span class="des__right">￥15.74</span>
                        </div>
                    </div>
                </div>
                <div class="list-item">
                    <div class="list-left">
                        <div class="img"></div>
                    </div>
                    <div class="list-right">
                        <div class="title">
                            <span class="title__left">圣克士炸鸡汉堡(锦江店)
                            <van-icon name="arrow" color="#7f7f7f"></van-icon></span>
                            <span class="title__right">已送达</span>
                        </div>
                        <div class="time">2018-09-21 11:29</div>
                        <div class="des">
                            <span class="des__left">巨无霸汉堡 等3件</span>
                            <span class="des__right">￥15.74</span>
                        </div>
                    </div>
                </div>
                <div class="list-item">
                    <div class="list-left">
                        <div class="img"></div>
                    </div>
                    <div class="list-right">
                        <div class="title">
                            <span class="title__left">圣克士炸鸡汉堡(锦江店)
                            <van-icon name="arrow" color="#7f7f7f"></van-icon></span>
                            <span class="title__right">已送达</span>
                        </div>
                        <div class="time">2018-09-21 11:29</div>
                        <div class="des">
                            <span class="des__left">巨无霸汉堡 等3件</span>
                            <span class="des__right">￥15.74</span>
                        </div>
                    </div>
                </div>
                <div class="list-item">
                    <div class="list-left">
                        <div class="img"></div>
                    </div>
                    <div class="list-right">
                        <div class="title">
                            <span class="title__left">圣克士炸鸡汉堡(锦江店)
                            <van-icon name="arrow" color="#7f7f7f"></van-icon></span>
                            <span class="title__right">已送达</span>
                        </div>
                        <div class="time">2018-09-21 11:29</div>
                        <div class="des">
                            <span class="des__left">巨无霸汉堡 等3件</span>
                            <span class="des__right">￥15.74</span>
                        </div>
                    </div>
                </div>
                <div class="list-item">
                    <div class="list-left">
                        <div class="img"></div>
                    </div>
                    <div class="list-right">
                        <div class="title">
                            <span class="title__left">圣克士炸鸡汉堡(锦江店)
                            <van-icon name="arrow" color="#7f7f7f"></van-icon></span>
                            <span class="title__right">已送达</span>
                        </div>
                        <div class="time">2018-09-21 11:29</div>
                        <div class="des">
                            <span class="des__left">巨无霸汉堡 等3件</span>
                            <span class="des__right">￥15.74</span>
                        </div>
                    </div>
                </div>
                <div class="list-item">
                    <div class="list-left">
                        <div class="img"></div>
                    </div>
                    <div class="list-right">
                        <div class="title">
                            <span class="title__left">圣克士炸鸡汉堡(锦江店)
                            <van-icon name="arrow" color="#7f7f7f"></van-icon></span>
                            <span class="title__right">已送达</span>
                        </div>
                        <div class="time">2018-09-21 11:29</div>
                        <div class="des">
                            <span class="des__left">巨无霸汉堡 等3件</span>
                            <span class="des__right">￥15.74</span>
                        </div>
                    </div>
                </div>
                <div class="list-item">
                    <div class="list-left">
                        <div class="img"></div>
                    </div>
                    <div class="list-right">
                        <div class="title">
                            <span class="title__left">圣克士炸鸡汉堡(锦江店)
                            <van-icon name="arrow" color="#7f7f7f"></van-icon></span>
                            <span class="title__right">已送达</span>
                        </div>
                        <div class="time">2018-09-21 11:29</div>
                        <div class="des">
                            <span class="des__left">巨无霸汉堡 等3件</span>
                            <span class="des__right">￥15.74</span>
                        </div>
                    </div>
                </div>
            </div>
            <van-divider :style="{ fontSize:'12px',color: '#969799', borderColor: '#969799', padding: '0 16px' }">
                我有底线
            </van-divider>
        </van-pull-refresh>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import {Toast} from "vant";

    @Component
    export default class Order extends Vue {
        isLoading: boolean = false;
        protected nav: any = {
            title: '我的订单',
            opacity: 0,
            height: 60
        };


        mounted() {
            window.addEventListener('scroll', this.scrollTo)
            this.scrollTo()
        }

        onClickRight() {
            Toast('按钮');
        }

        scrollTo() {
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
            let navBar: any = document.getElementsByClassName('van-nav-bar__title van-ellipsis')[0]
            if (scrollTop <= 20) {
                this.nav.opacity = 0
            } else if (20 < scrollTop && scrollTop < 38) {
                this.nav.opacity = 1 - ((38 - scrollTop) / 20);
            } else {
                this.nav.opacity = 1
            }
        }

        onRefresh() {
            setTimeout(() => {
                this.isLoading = false;
            }, 500);
        }

        destroyed() {
            window.removeEventListener('scroll', this.scrollTo)
            Toast.clear(true);
        }
    }
</script>

<style lang="scss" scoped>
    .order {
        .refresh {
            min-height: 667px;
        }
    }

    .bg-nav {
        height: 57px;
    }

    .bg-t {
        position: absolute;
        left: 0px;
        right: 0px;
        top: 0px;
        height: 100%;
        overflow: hidden;
        z-index: -999;
        background-color: #f8f8f8;
    }

    .bg-b {

    }

    .order-list {
        background-color: #f8f8f8;

        .list-title {
            text-align: left;
            font-size: 20px;
            font-weight: 600;
            padding: 15px 25px;
            background-image: linear-gradient(#ffffff, #f8f8f8);
        }

        .list-item {
            background: #ffffff;
            height: 100px;
            /*border: 1px solid #d2d2d2; !*px*!*/
            box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.1); /*px*/
            border-top-width: 0px !important; /*px*/
            margin: 0 10px 10px 10px;
            border-radius: 4px;
            display: flex;

            .list-left {
                /*width: 50px;*/
                text-align: center;

                .img {
                    width: 40px;
                    height: 40px;
                    border-radius: 5px;
                    margin: 15px;
                    background: #f7f7f7;
                }
            }

            .list-right {
                width: 100%;
                display: flex;
                flex-direction: column;
                margin-right: 15px;

                .title {
                    padding-top: 15px;
                    font-size: 14px;
                    font-weight: 600;
                    display: flex;
                    justify-content: space-between;

                    .title__left {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }

                    .title__right {
                        font-weight: 400;

                    }
                }

                .time {
                    color: #7f7f7f;
                    display: flex;
                    align-items: center;
                    justify-content: left;
                    height: 30px;
                    border-bottom: solid 1px #f2f2f2;
                }

                .des {
                    flex: 1;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;

                    .des__left {
                        font-weight: 500;
                    }

                    .des__right {
                        font-weight: 500;
                    }
                }
            }
        }
    }
</style>

<style lang="scss">
    /*.van-nav-bar__title van-ellipsis {*/
    /*height: 100%;*/
    /*display: flex;*/
    /*align-items: center;*/
    /*justify-content: center;*/
    /*}*/
</style>
