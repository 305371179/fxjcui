 <template>
	<v-page>
		<v-header :rightOptions="[{title:'颜正生'}]">
			<div slot="overwrite-title">盐老板救我</div>
			<div slot="other-layout">
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
			</div>
		</v-header>
		<div class="main">

			<div class="bscroll-demo-main">
				<div class="bscroll-demo-body">
					<div class="place-holder">
						随便写点什么占个茅坑吧，高度未知的，根据内容撑起来的，为了坑你们埋下伏笔
					</div>
					<div class="bscroll">
						<bscroll ref="bscrolls" :data="data" :pullDownRefresh="{txt:'颜老板'}" @pullingDown="pullingDown"
							:pullUpLoad="true"
						>
						<cell v-for="(item, index) in list" :key="index" :title="{desc:`Beyond歌迷${index}`}" :value="{desc:'谁伴我闯荡'}" :is-link="true"></cell>
						</bscroll>
					</div>
				</div>
			</div>

		</div>
		
		<div>
			<global-big-button>
				￥<b style="padding:0 0.1rem;font-family:Helvetica Neue">99999.00</b>确认支付
			</global-big-button>
		</div>
	</v-page>
</template>
<script>
import _ from 'lodash'
import Cell from '@comp/cell'
import globalBigButton from '@comp/globalBigButton'
import Bscroll from '@comp/Vscroll'
import TabSelect from '@comp/tabSelect'
import { setTimeout } from 'timers';
export default {
	name: 'demo-bscroll',
	data(){
		return {
			list: new Array(2),
			tabSelectValue: 'ball1'
		}
	},
	mounted(){
		console.log(this.$refs.bscrolls.refresh)
	},
	components: {
		globalBigButton, Bscroll, Cell, TabSelect
	},
	methods: {
		abc(item){
			console.log(item)
		},
		pullingDown(){
			this.list = new Array(25)
			setTimeout(() => {
				setTimeout(() => {
					this.$refs.bscrolls.forceUpdate(true)
				}, this.$refs.bscrolls.refreshDelay)
			}, 2000)
			
			
		}
	}
}

</script>
<style lang="scss">
	@import './scss/index.scss';
</style>
