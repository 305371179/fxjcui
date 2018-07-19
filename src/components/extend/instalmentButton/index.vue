/**
 * @author chenmeimei
 * @desc - 我要分期按钮功能
 * @props {payInfo: Obj} Y- 支付信息 必传
 * @param CardNo Y- 支付卡序列号
 * @param payMoney Y- 实际支付金额
 * @param btnTxt  N- 按钮名称
 * @param type  N-默认显示按钮,'adver'-广告位必填
 *   import instalmentButton from '@comp/instalmentButton';
 * @example <instalment-button :payInfo="payInfo"></instalment-button>		
 */

<template>
    <!--分期按钮 -->
	<button class="instalment-button" @click.stop="goExpenseInstalment" v-if="confirmExpenseStatus && payInfo.type!='adver'">
		{{btnTxt}}
	</button>

    <!--分期广告 为你推荐 -->
    <div class="instalment-wrap" v-else-if="confirmExpenseStatus && payInfo.type == 'adver'">
        <div class="instalment-adver">
            <p><span>分期优惠</span></p>
        </div>
        <div>
            <img src="~@/assets/prizeList/banner.png" alt="广告页" @click="goInstalment">
        </div>
    </div>
</template>
<script>
    import { mapState, mapGetters } from "vuex";
	export default {
		name: 'instalmentButton',
		props: ["payInfo"],
		data(){
			return {
                projofNum: 1, //
                minAmtStart: 10000,// 起分金额
				isShow: false,// 默认按钮不显示
				btnTxt: '我要分期',// 默认按钮显示我要分期
				creditFlag: false,// 信用卡标志
                type:'' // 广告类型
			}
		},
		created() {
			App.vm.$store.dispatch('commitUserInfo');
			this.init();
		},
		activated(){
			App.vm.$store.dispatch('commitUserInfo');
		},
		methods: {
			init() {
                if(!this.payInfo.cardNo || !this.payInfo.payMoney) return; // 如果传值不符合要求，则不再往下走
				this.btnTxt = this.payInfo.btnTxt || '我要分期';
                // 判断卡号是否属于本行信用卡
                for (let i = 0; i < this.userInfo.creditCardList.length; i++) {
                    if(this.userInfo.creditCardList[i].accountNo_sequence === this.payInfo.cardNo) {
                        this.creditFlag = true; // 支付卡属于信用卡
                        break;
                    }
                }
                if(this.creditFlag) this.loadMP1069();        // 判断是否满足分期条件
            },
			 /**
             * 跳转至我要分期页面
             * */
            goInstalment() {
                App.Native.pushWindow({
                    url: '/instalment/cdbank_iNeedInstalment/index.html'
                })
            },
             /**
             * 跳转至我要消费分期页面
             * */
            goExpenseInstalment() {
                App.Native.pushWindow({
                    url: '/instalment/cdbank_expense_instalment/index.html'
                })
            },
			 /**
             * 判断是否满足分期条件
             * */
            loadMP1069(){
                let params = {
                    accountNo_sequence: this.payInfo.cardNo,
                    projofNum: this.projofNum,
                    chnlCode: 470,
                    srcChannel: 'MH'
                }
                App.Native.rpc({
                    operationType: "com.ifp.MP1069",
                    data: params,
                    processError: false,
                }).then(res => {
                    this.minAmtStart = res.body.minAmt;
                }, header => {
                    App.Native.toast({ content: header.header.errorMsg });
                });
            }
		},
		computed: {
			 ...mapState(["userInfo"]),
			 confirmExpenseStatus() { // 分期判断
                return parseFloat(this.payInfo.payMoney) >= parseFloat(this.minAmtStart);
            }
		}
	}
</script>
<style lang="scss" scoped>
@import "~@common/scss/functions.scss";
    /*分期按钮样式*/
	.instalment-button{
		color: #222;
		display: block;
		margin: px2rem(24) auto;
		box-sizing: border-box;
		border: 1px solid #e6e6e6;
		height: px2rem(88);
        line-height:px2rem(88);
		width: px2rem(590);
		font-size:px2rem(32);
        border-radius: px2rem(7);
	}

    /*分期广告样式*/
    .instalment-wrap {
        margin-top: px2rem(72);
        margin-bottom:px2rem(40);
        padding:0 px2rem(30);
        .instalment-adver {
            width: 100%;
            margin-bottom: px2rem(26);
            text-align: center;
            color: #8f8f8f;
            font-size: px2rem(30);
            > p {
                display: flex;
                justify-content: space-around;
                align-items:center;
                span {
                    padding:0 px2rem(16);
                }
                &:before, &:after {
                    content: '';
                    display: block;
                    width: px2rem(266);
                    height: 0.02rem;
                    background-color: #E6E6E6;
                }
            }
        }
        img {
            width: 100%;
            height:auto;
        }
    }
</style>