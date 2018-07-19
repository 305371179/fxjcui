 <template>
	<v-page>
		<v-header :show="true"  :rightOptions="[{title:'颜正生'}]">
			<div slot="overwrite-title">盐老板救我￥</div>
		</v-header>
		<div class="main">
			<div style="font-size: 0.32rem;">
				<div style="font-weight: 100;">文字粗细对照表font-weight: 100</div>
				<div style="font-weight: 200;">文字粗细对照表font-weight: 200</div>
				<div style="font-weight: 300;">文字粗细对照表font-weight: 300</div>
				<div style="font-weight: 400;">文字粗细对照表font-weight: 400</div>
				<div style="font-weight: 500;">文字粗细对照表font-weight: 500</div>
				<div style="font-weight: 600;">文字粗细对照表font-weight: 600</div>
				<div style="font-weight: 700;">文字粗细对照表font-weight: 700</div>
			</div>
			<!-- <group title="批量加挂">
				<cell :title="{desc:''}" :isLink="true" @clickHandler="multiaddSwitch = true"></cell>
			</group> -->
			<group title="selectItem">
				<cell :title="{desc:`&yen;优惠券`}" :isLink="true" :value="{desc:selectInfo.key}" @clickHandler="acSwitch = true"></cell>
			</group>
			<group title="actionSheet">
				<cell :title="{desc:'优惠券'}" :isLink="true" @clickHandler="actionSheetSwitch = true"></cell>
			</group>
			<tab-select 
				v-model="tabSelectValue"
				:tabs="[{
					key: '乒乓球',
					value: 'ball1',
				},{
					key: '羽毛球',
					value: 'ball2'
				},{
					key: '哈库拉玛塔塔',
					value: 'ball3'
				}]">
			</tab-select>
			<group title="二维码">
				<qr-code></qr-code>
			</group>
			<group title="cell列表">
				<cell :title="{desc:'广发银行（9527）', isBreak:false}" :isLink="true">
					<s-logo slot="cell-hd" logo="CGB"></s-logo>
					<!-- <i slot="cell-hd" class="test-icon">
						<img src="~@/assets/tab_icon_wonderful_press@3x.png">
					</i> -->
				</cell>
				<cell :title="{desc:'单行列表'}" :isLink="true" :value="{desc:'描述信息',isBreak: false, align:'left'}"></cell>
				<cell :title="{desc:'单行列表'}" :value="{desc:'描述信息'}"></cell>
				<cell :title="{desc:'单行列表'}" :isLink="true" :value="{desc:'描述信息'}"></cell>
				<cell :title="{desc:'单行列表'}" :isLink="true"></cell>
				<cell :title="{desc:'双行列表'}" :value="{desc:'时间停留',subDesc:'描述信息'}" :isLink="true"></cell>
				<cell :title="{desc:'双行列表',subDesc:'描述信息'}" :isLink="true"></cell>
				<cell :title="{desc:'双行列表',subDesc:'描述信息'}" :value="{desc:'描述信息'}" :isLink="true"></cell>
				<cell :text="{desc:'广东省佛山市南海区桂城镇灯湖东路6号广发银行金融中心'}" :isLink="true"></cell>
				<cell :text="{desc:'广东省佛山市南海区桂城镇灯湖东路6号广发银行金融中心', isBreak:true}" :isLink="true"></cell>
			</group>
			<group title="选择城市">
				<cell :title="{desc:'电脑不行',subDesc:'点击选择'}" 
				:value="{desc:addressInfo.names.join(' ')}" 
				:isLink="true" 
				@clickHandler="clickHandler"
				></cell>
			</group>
			<group title="开关">
				<cell :title="{desc:'开关'}">
					<v-inline-switch v-model="sswitch" slot="cell-ft" @clickHandler="oc"></v-inline-switch>
				</cell>
      		</group>

			<group title="列表输入/模拟光标">
        		<cell-input type="password" align="left" v-model="word" :readonly="true" :focus="setF" @clickHandler="setFoucs"></cell-input>
      		</group>
			
			<group title="带扫描/输入/说明项图标">
				<cell-input iconType="tips" align="left" @on-focus="onFoucs" @on-blur="onBlue" placeholder="预设内容"></cell-input>
				<cell-input iconType="camera" align="left" placeholder="预设内容" @clickIconHandler="clickIconHandler"></cell-input>
			</group>

			<group :top="true">
        		<cell-input label="多项输入"></cell-input>
				<cell-input label="输入"></cell-input>
				<cell-input></cell-input>
				<cell-input label="标题实在太长"></cell-input>
			</group>

			<group title="短信验证码：不带请求的用法示例">
				<!-- <cell-input iconType="code" v-model="kk" align="left" label="短信验证码" :time="5" :countdown.sync="countdown" placeholder="预设内容" @messageCode="messageCode"></cell-input> -->
				<msg-code v-model="msgVC" startNum="10" keyboardType="nat" :hasRpc="false" @focusHandler="focusInput" @clickFetch="clickFetch" @blurHandler="blurHandler"></msg-code>
			</group>

			<group title="短信验证码：封装了请求的用法示例，正式使用isDemo缺省">
				<msg-code v-model="msgCode" startNum="10" :isValidBeforeFetch="true" :isDemo="true" :isSystemKeyboard="false"></msg-code>
			</group>

			<group title="协议复选框">
				<checkbox v-model="check">
					<p @click.stop="aa">
						同意<a>《财智金产品服务协议》及还款计划</a>
					</p>
				</checkbox>
			</group>

			<group title="各种按钮/cm">
				<div class="flexx">
					<v-button size="m"></v-button>
					<v-button size="s"></v-button>
				</div>
			</group>
			<group title="各种按钮/cm/plain">
				<div class="flexx">
					<v-button size="m" :plain="true"></v-button>
					<v-button size="s" :plain="true"></v-button>
				</div>
			</group>
			<group title="各种按钮/cm/禁用">
				<div class="flexx">
				<v-button size="m" :disabled="true" @clickHandler="dsd"></v-button>
				<v-button size="s" :disabled="true"></v-button>
				</div>
			</group>
			<group title="各种按钮/cm/plain/禁用">
				<div class="flexx">
				<v-button size="m" :disabled="true"></v-button>
				<v-button size="s" :disabled="true"></v-button>
				</div>
			</group>


			<group title="各种按钮/cg">
				<div class="flexx">
				<v-button size="m" type="cg"></v-button>
				<v-button size="s" type="cg"></v-button>
				</div>
			</group>

			<group title="各种按钮/cg/plain">
				<div class="flexx">
				<v-button size="m" type="cg" :plain="true"></v-button>
				<v-button size="s" type="cg" :plain="true"></v-button>
				</div>
			</group>

			<group title="各种按钮/cg/禁用">
				<div class="flexx">
				<v-button size="m" type="cg" :disabled="true"></v-button>
				<v-button size="s" type="cg" :disabled="true"></v-button>
				</div>
			</group>

			<group title="各种按钮/cg/plain/禁用">
				<div class="flexx">
				<v-button size="m" type="cg" :plain="true" :disabled="true"></v-button>
				<v-button size="s" type="cg" :plain="true" :disabled="true"></v-button>
				</div>
			</group>

			<group title="各种按钮/co">
				<div class="flexx">
					<v-button size="m" type="co"></v-button>
					<v-button size="s" type="co"></v-button>
				</div>
			</group>

			<group title="各种按钮/co/禁用">
				<div class="flexx">
					<v-button size="m" type="co" :disabled="true"></v-button>
					<v-button size="s" type="co" :disabled="true"></v-button>
				</div>
			</group>


			<group title="普通大按钮/cm/cg">
				<p style="padding:0.1rem"></p>
				<v-button></v-button>
				<p style="padding:0.1rem"></p>
				<v-button :plain="true"></v-button>
				<p style="padding:0.1rem"></p>
				<v-button type="cg"></v-button>
				<p style="padding:0.1rem"></p>
				<v-button type="cg" :plain="true"></v-button>
				<p style="padding:0.1rem"></p>
				<v-button type="co" :plain="true"></v-button>
			</group>
			<group title="并排按钮">
				<global-button-multiple></global-button-multiple>
			</group>
			<group title="并排按钮/禁用">
				<global-button-multiple :disabled="true"></global-button-multiple>
			</group>
			<group title="tab筛选栏">
				<tab-filter 
					:tabs="[{
						key: '价格',
						value: 'price',
					},{
						key: '销量',
						value: 'sold'
					}]"
					@tabClick="tabFilterClick">
				</tab-filter>
			</group> 
			<group title="tab筛选栏(多个)">
				<tab-filter 
					:tabs="[{
						key: '价格',
						value: 'price',
					},{
						key: '销量',
						value: 'sold'
					},{
						key: '质量',
						value: '1'
					},{
						key: '品牌',
						value: '2'
					},{
						key: '口碑',
						value: '3'
					}]"
					@tabClick="tabFilterClick">
				</tab-filter> 
			</group>
			<group title="选卡组件">
				<cell :title="{desc:'卡号'}" :isLink="true" :value="{desc:cardInfo.key}" @clickHandler="cardListSwitch = true"></cell>
				<cell :title="{desc:'卡号'}" :isLink="true" :value="{desc:cardInfo.key}" @clickHandler="cardListSwitch2 = true"></cell>
			</group>
			<group title="支付组件">
				<v-button size="l" @clickHandler="popupPayShow=true">确定支付</v-button>
			</group>
			<number-keyboard v-model="keyboard" :word.sync="word"></number-keyboard>
			<v-address 
				v-model="select"
				:showAddress.sync="showAddress"
				@on-hide="addressOnHide"
				@on-shadow-change="addressOnShadowChange"	
			></v-address>
		</div>
		<div>
			<global-big-button>
				￥<b style="padding:0 0.1rem">199999.00</b>确认支付
			</global-big-button>
		</div>
		<popup-picker-date v-model="yourValue" :times="yourTimes"></popup-picker-date>
		<encourage v-model="xb" @clickHandler="cbclickHandler">
			这是自定义内容！！
		</encourage>
		<popup-pay
			v-model="popupPayShow"
			:enableMicroPay="false"
			:enableFingerprintPay="true"
			:autoFactor="false"
			:paymentCard="cardInfo.key"
			total="5001"
			goodsInfo="商品信息"
			:mustbeGoodsInfo="true"
			:mustbeSelectCard="true"
			:mustbePassword="true"
			:mustbeMessage="true"
			:autoClose="true"
			title="验证身份"
			:priceVisible="true"
			:autoCheckIsSetPayPassword="false"
			@selectCardHandler="popupPaySelectCard"
			@clickHandler="popupPayResult">
      </popup-pay>
	  <!-- 若有popupPay组件是，选卡控件一定要在popupPay组件后面定义，不能在其前面。否则popupPay内弹出选卡控件时，选卡控件将会被popupPay挡住 -->
		<select-card 
    v-model="cardListSwitch"
    :cardList="{
      normal: [
				{
					key: '广发储蓄卡（3123）',
					iconType: 'CGB',
					value: '1'
				}
			]
    }"
		defaultCard="2"
    disableCardListTitle="该卡片不支持当前交易"
    @result="normalCardSelected"
    ></select-card>
		<select-item
		v-model="acSwitch"
		:cardList="{
			normal: [
				{
					key: '代金券',
					value: '1',
					selected: true
				},{
					key: '优惠券',
					value: '2'
				},{
					key: '商城券',
					value: '3'
				},{
					key: '活动券',
					value: '4'
				},{
					key: '分期优惠券',
					value: '5'
				}
			]
		}"
		title="选取优惠券"
		@clickNormalItem="selectItemResult"
		></select-item>
		<action-sheet
		v-model="actionSheetSwitch"
		:cardList="{
			normal: [
				{
					key: '代金券',
					value: '1',
					selected: true
				},{
					key: '优惠券',
					value: '2'
				},{
					key: '商城券',
					value: '3'
				},{
					key: '活动券',
					value: '4'
				},{
					key: '分期优惠券',
					value: '5'
				}
			]
		}"
		title="选取优惠券"
		@clickNormalItem="selectItemResult"
		></action-sheet>
		<multiadd
		v-model="multiaddSwitch"
		:list="[
			{
				key: '广发xxx卡(123)',
				value: '123',
				status: true
			},
			{
				key: '广发xxx卡(321)',
				value: '321',
				status: true
			},
			{
				key: '广发xxx卡(321)',
				value: '321',
				status: true
			},
			{
				key: '广发xxx卡(321)',
				value: '321',
				status: true
			},
			{
				key: '广发xxx卡(321)',
				value: '321',
				status: true
			},
			{
				key: '广发xxx卡(321)',
				value: '321',
				status: true
			},
			{
				key: '广发xxx卡(321)',
				value: '321',
				status: true
			}
		]"
		></multiadd>
		
	</v-page>
</template>
<script>
import _ from 'lodash'
import ActionSheet from '@comp/actionSheet'
import vInlineSwitch from '@comp/inlineSwitch'
import SelectItem from '@comp/selectItem'
import SelectCard from '@comp/selectCard'
import multiadd from '@comp/popupMultiAddCredit'
import popupPay from '@comp/popupPay'
import TabFilter from '@comp/tabFilter'
import TabSelect from '@comp/tabSelect'
import numberKeyboard from '@comp/numberKeyboard'
import vAddress from '@comp/address'
import globalBigButton from '@comp/globalBigButton'
import globalButtonMultiple from '@comp/globalButtonMultiple'
import cellInput from '@comp/cellInput'
import msgCode from '@comp/msgCode'
import Group from '@comp/group'
import Cell from '@comp/cell'
import Checkbox from '@comp/checkbox'
import qrCode from '@comp/qrCode'
import Encourage from '@comp/encourage'
import popupPickerDate from '@comp/popupPickerDate'
import {TransferDom} from 'vux'

export default {
	name: 'demo',
	directives: {
    	TransferDom
  	},
	data(){
		return {
			yourTimes: 3,
			yourValue: false,
			msgVC: '',
			sswitch: false,
			keyboard: false,
			swValue: true,
			showAddress: false,
			addressInfo: {
				names: ['选择地址'],
				ids: []
			},
			select: ["440000", "440100", "440111"],
			setF: false,
			kk: '',
			check: true,
			isBtn: true,
			word: '',
			cardInfo: {},
			cardListSwitch: false,
			popupPayShow: false,
			msgVC: '',
			msgCode: '',
			tabSelectValue: 'ball1',
			xb: false,
			acSwitch: false,
			selectInfo: {},
			multiaddSwitch: false,
			actionSheetSwitch: false
		}
	},
	created(){
		App.Native.hideTitlebar()
	},
	components: {
		Checkbox,
		Group,
		Cell,
		globalBigButton,
		globalButtonMultiple,
		cellInput,
		vAddress,
		numberKeyboard,
		vInlineSwitch,
		TabFilter,
		SelectCard,
		msgCode,
		popupPay,
		qrCode,
		TabSelect, 
		Encourage,
		SelectItem,
		multiadd,
		ActionSheet,
		popupPickerDate
	},
	methods: {
		cbclickHandler(index){
			console.log(index)
		},
		onFoucs(){
			console.log(`kkkkk`)
		},
		onBlue(){
			console.log('jjjjjj')
		},
		oc(){
			this.sswitch = !this.sswitch
		},
		aa(){
			console.log(123)
		},
		setFoucs(){
			this.setF = true
			// App.Native.showKeyboard()
			this.keyboard = true
		},
		clickHandler(){
			// this.showAddress = true
			this.yourValue = true
		},
		addressOnHide(g){
			console.log(g)
		},
		addressOnShadowChange(ids, names){
			this.addressInfo = {
				names,ids
			}
		},
		clickIconHandler(){
			alert(123)
		},
		messageCode(){
			this.countdown = true
		},
		tabFilterClick (e) {
			console.log(e)
		},
		normalCardSelected(cardInfo){
			this.cardInfo = cardInfo
		},
		popupPayResult(verData){
			alert(JSON.stringify(verData))
		},
		popupPaySelectCard(){
			this.cardListSwitch = true
		},
		focusInput(e, cb) {
			console.log('这个方法中处理短信验证码focus input的逻辑');
			App.Native.showNumKeyboard({
				isIDCard: false
			}).then(({height}) => {
				typeof cb === 'function' && cb();
				console.log('focused的input所处位置高度：', height);
			});
		},
		clickFetch (startCount, stopCount) {
			console.log('这个方法中处理短信验证码点击"获取"的逻辑');
			startCount(); // 开始倒计时的回调函数
			setTimeout(() => {
					stopCount() // 结束倒计时的回调函数
				}, 3000);
		},
		blurHandler () {
			App.Native.hideNumKeyboard().then(()=>{

			});
		},
		selectItemResult (info) {
			this.selectInfo = info
		}
	},
	created () {
		window.demoVm = this;
	}
}

</script>
<style lang="scss">
	@import './scss/index.scss';
</style>
