<template>
    <div class="msg-code">
        <span class="desc">验证码</span>
        <div class="wrapper" v-if="keyboardType !== 'sys'">
            <span v-if="shown"><i>{{msgCode}}</i></span>
            <input type="tel" maxlength="6" placeholder="请输入短信验证码" v-model="msgCode" readonly @click.stop="focusInput" @blur="blurInput">
        </div>
        <input v-if="keyboardType === 'sys'" type="tel" maxlength="6" placeholder="请输入短信验证码" v-model="msgCode">
        <div class="btn">
            <button v-if="!isCounting" @click.stop="fetchMsgCode()">获取</button>
            <span v-if="isCounting">{{countNum}}s</span>
        </div>
        <number-keyboard v-if="keyboardType === 'h5'" :show-mask="showMask" v-model="shown" :word.sync="msgCode" type="code" :tips="false" @on-hide="hideKeyboard" @on-show="showKeyboard" @on-enter="enterNumber"></number-keyboard>
    </div>
</template>

<script>
    import errorMessage from './utils/errorMessage'
    import props from './utils/props'
    import numberKeyboard from '../numberKeyboard'

    export default {
        name: 'msgCode',
        components: {
            numberKeyboard
        },
        model: {
            prop: 'msgVC'
        },
        props,
        data () {
            return {
                shown: false, // 是否显示模拟光标，或是否显示h5数字键盘
                msgCode: this.msgVC, // 短信验证码
                isCounting: false, // 是否正在倒计时
                countNum: this.$props.startNum, // 倒计时的显示的数字
                isClicked: true,  // 倒计时的“获取”按钮，防止重复点击用到的变量
            }
        },
        watch: {
            msgCode (newMsgCode) {
                this.msgCode = newMsgCode.replace(/\D/g, '');
                if (this.msgCode.length > 6) {
                    this.msgCode = this.msgCode.slice(0, 6);
                }
                this.$emit('input', this.msgCode);
            },
            msgVC (newMsgVC) {
                this.msgCode = newMsgVC;
            }
        },
        methods: {
            focusInput (e) {
                this.shown = true;
                this.$emit('focusHandler', e);
                this.os !== 'ios' && e.target.focus();
                this.os === 'ios' && setTimeout(() => e.target.focus(), 0);
            },
            blurInput (e) {
                if (this.isEntering) {
                    this.isEntering = false;
                    e.target.focus();
                } else {
                    this.shown = false;
                    this.$emit('blurHandler');
                }
            },
            fetchMsgCode () {

                // 以下5行是防止重复点击的控制
                if (!this.isClicked) return;
                this.isClicked = false;
                setTimeout(() => {
                    this.isClicked = true;
                }, 300);

                // 开始、结束倒计时函数，作为clickFetch回调函数的参数
                this.$emit('clickFetch', this.startCount, this.stop);
                if (!this.hasRpc) {
                    return;
                }

                if (!this.$props.isValidBeforeFetch) {
                    return;
                }

                const {rpcOperationType, rpcData} = this.$props;
                if ( !this.isDemo && (!rpcOperationType || !Object.keys(rpcData).length) ) {
                    App.Native.alert({
                        title: '请处理错误',
                        message: 'rpcOperationType, 或者rpcData未传'
                    });
                    return;
                }

                // 发送请求获取短信验证码
                !this.isDemo && this.sendReq(rpcOperationType, rpcData);

                // 开始倒计时
                this.startCount();
            },

            startCount () {
                // 点击后，立即将按钮切换到倒计时，可以防止重复点击
                this.isCounting = true;

                this.intervalNum = setInterval(() => {
                    if (this.countNum > 0) {
                        this.countNum--;
                    } else {
                        this.stop();
                    }
                }, 1000);
            },
            stop () {
                this.isCounting = false;

                // 初始化倒计时开始的秒数
                this.countNum = this.$props.startNum;
                clearInterval(this.intervalNum);
            },
            sendReq (operationType, data) {
                const _this = this;
                function processError ({header}) {
                    const {errorCode, errorMsg} = header;

                    // rpc中调用，会改变this的指代对象
                    _this.nativeToast(errorMessage[errorCode] || errorMsg);
                    _this.stop();
                }
                App.Native.rpc({
                    operationType,
                    data,
                    processError
                }).then(({header, body}) => {
                    const {optionFlag, mobileNo} = body;
                    if (optionFlag !== '0') {
                        this.nativeToast('您刚已获取了短信验证码，无需重新获取');
                        this.stop();
                        return;
                    }
                    this.nativeToast(`已发送至手机尾号${mobileNo.slice(-4)}`);
                    this.$emit('update:mobile', mobileNo);
                });
            },
            nativeToast (content) {
                App.Native.toast({
                    content,
                });
            },
            hideKeyboard () {
                // const vcReg = /^[0-9]{6}$/
                // if ( !vcReg.test(this.msgCode) ) {
                //     App.Native.toast({
                //         content: '6位数字短信验证码',
                //     })
                // }
                this.$emit('keyboard-hide')
            },
            showKeyboard() {
                this.$emit('keyboard-show')
            },
            enterNumber () {
                this.isEntering = true;
            }
        }
    }
</script>

<style lang="scss">
.msg-code {
    position: relative;
    height: 1.04rem;
    line-height: 1.04rem;
    font-size: .32rem;
    padding-left: .3rem;
    background: $color-white;
    display: flex;

    .desc {
        width: 1.68rem;
        margin-right: .32rem;

    }

    input {
        width: 3.6rem;
        font-size: .32rem;

        &:placeholder {
            color: #bbbbbb;
            font-size: .32rem;
        }
    }

    .btn {
        position: absolute;
        right: 0;
        width: 1.6rem;
        text-align: center;
        color: $color-font-fourth;

        button {
            width: 100%;
            height: .88rem;
            padding: .1rem 0;
            color: $color-red;
        }

        &:before {
            content: " ";
            position: absolute;
            top: 50%;
            height: .8rem;
            border-left: solid 1px $line-color;
            transform: scaleX(0.5) translateY(-50%);
        }
        span {
            width: 100%;
            display: inline-block;
        }
    }
    .wrapper {
        display: inline-block;
        position: relative;

        span{
            padding: 0 .02rem;
            height: .48rem;
            display: inline-block;
            border-right-style: solid;
            border-right-width: 2px;
            border-right-color: $color-cb;
            position: absolute;
            top: 50%;
            bottom: 0;
            left: -0.04rem;
            transform: translateY(-50%);
            animation: flicker 1s linear infinite;

            i{
                visibility: hidden
            }
        }
    }
    @keyframes flicker{
        0% {
            border-right-color: transparent;
        }
        49% {
            border-right-color: transparent;
        }
        50% {
            border-right-color: #4e6aea;
        }
        100% {
            border-right-color: #4e6aea;
        }
    }
}
</style>
