/**
 * Y表示必填,N表示非必填
 * @desc - 验证码发送/输入框（有倒计时）
 * @props {label: String} - N 左边标题文字
 * @props {align: String} - N 输入框文字的对齐方式，可选left center right
 * @props {placeholder: String} - N 输入框默认文字
 * @props {time: Number} - N 倒计时时间跨度，默认60S
 * @props {maxlength: Number} - N 验证码长度，默认6
 * @props {keyboardType: String} - N 键盘类型（h5：h5数字键盘；system：系统自带键盘；native：原生数字键盘），默认为h5
 * @props {isFocus: boolean} - N 设置焦点出现光标（isReadOnly = true 时有效）
 * @props {isCountDown: Boolean} - N 倒计时开关，为true时开始倒计时，否则显示“获取”按钮
 * @event {clickHandler} - N input点击的回调(isReadOnly = true 时有效)
 * @event {sendCodeHandler} - Y 获取验证码按钮点击回调 入参为可复位倒计时的回调函数
 * @example <tiny-msg-code :isCountDown.sync="isCountDown" @sendCodeHandler="sendSmsCode"></tiny-msg-code>
 * ps 此组件非全局，使用前需要import
 */


<template>
	<div>
		<cell :is-link="false" class="v-cell-input code">
			<div class="v-cell-input-bd" slot="cell-bd">
				<div class="label">
					<label>{{label}}</label>
				</div>
				<div class="inputs" :class="focusClass">
					<span v-if="isFocus && isReadOnly">
							<i>{{value}}</i>
						</span>
					<input type="tel" :readonly="isReadOnly" :style="{'text-align': this.align}" v-model="value" :placeholder="placeholder" @click.stop="inputClick" @input="oninput" :maxlength="maxlength">
				</div>
			</div>
			<v-button slot="cell-icon" plain="true" @clickHandler="sendCode" :disabled="isCountDown" class="sendBtn">
				<span v-show="!isCountDown" class="get">获取</span>
				<countdown v-show="isCountDown" :start="isCountDown" v-model="countDownTime" @on-finish="finish"></countdown>
				<span v-show="isCountDown">s</span>
			</v-button>
		</cell>
		<number-keyboard v-if="keyboardType==='h5'" :len="maxlength" v-model="isFocus" :word.sync="value" type="code" :tips="false" @on-hide="onHideKeyboard" @on-show="onShowKeyboard"></number-keyboard>
	</div>
</template>

<script>
	import {
		Countdown
	} from "vux";
	import props from "./utils/props";
	import cell from "@comp/cell";
	import numberKeyboard from '@comp/numberKeyboard';
	export default {
		name: "tiny-msg-code",
		props,
		data() {
			return {
				countDownTime: this.time, //不能直接改变time，设立局部变量并初始化时同步time
				isShowH5Keyboard: false
			};
		},
		watch: {
			value(newVal){
				this.$emit("input", newVal);
			},
			isCountDown(newVal) {
				if (newVal) {
					//若countdown从false切换至true，重新同步time，避免复位倒计时后计数不重置
					this.countDownTime = this.time;
				}
			},
			countDownTime(newVal) {
				//countDownTime变化时同步给time，上层可sync time的值并保存以支持暂停功能，下次组件重新创建的时候会同步time
				this.$emit("update:time", newVal);
			}
		},
		methods: {
			//倒计时完成、复位倒计时方法
			finish() {
				this.$emit("update:isCountDown", false);
			},
			//获取按钮点击回调
			sendCode() {
				this.$emit("sendCodeHandler", this.finish);
			},
			//输入框点击回调
			inputClick() {
				if (this.isReadOnly) {
					if(this.keyboardType === 'h5'){
						this.$emit("update:isFocus", true);
					}else if(this.keyboardType === 'h5' || this.keyboardType === 'native'){
						this.$emit("clickHandler");
					}
				}
			},
			//输入框input事件回调
			oninput({target}) {
				this.$emit("input", target.value);
			},
			//h5数字键盘显示事件
			onShowKeyboard() {
				this.$emit("on-show");
			},
			//h5数字键盘隐藏事件
			onHideKeyboard() {
				this.$emit("on-hide");
			}
		},
		computed: {
			isReadOnly(){
				return this.keyboardType !== 'system'
			},
			focusClass() {
				if (this.align === "left") {
					return {
						"focus-left": true
					}
				} else if (this.align === "right") {
					return {
						"focus-right": true
					}
				} else return {}
			}
		},
		components: {
			cell,
			Countdown,
			numberKeyboard
		}
	};
</script>

<style lang="scss">
	@import "./scss/index.scss";
</style>