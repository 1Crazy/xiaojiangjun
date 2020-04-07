<template>
	<view>
		<!-- 弹出框 -->
		<uni-popup ref="showtip" type="center" :mask-click="false" @change="change">
			<view class="uni-tip">
				<text class="uni-tip-title">{{title}}</text>
				<text class="uni-tip-content">{{content}}</text>
				<view class="uni-tip-group-button">
					<text class="uni-tip-button" @click="cancel()">{{cancelBtn}}</text>
					<button open-type="getUserInfo" class="uni-tip-button" @click="isSureBtn()">{{sureBtn}}</button>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import uniPopup from '@/components/uni/uni-popup/uni-popup.vue'
	export default {
		name: 'centerPopup',
		components: {
			uniPopup,
		},
		props: {
			title: {
				type: String,
				default: '标题',
			},
			content: {
				type: String,
				default: '内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容',
			},
			cancelBtn: {
				type: String,
				default: '取消',
			},
			sureBtn: {
				type: String,
				default: '确认',
			},
			// centerPopupSureBtn:{},
		},
		data() {
			return {
				obj: null
			};
		},
		methods:{
			togglePopup() {
				this.$nextTick(() => {
					this.$refs['showtip'].open()
				})
			},
			cancel() {
				this.$refs['showtip'].close()
				this.$emit('cancelBtn');// 触发取消按钮
			},
			// 确认按钮点击事件
			isSureBtn(){
				this.$refs['showtip'].close()
				this.$emit('centerPopupSureBtn');// 触发删除按钮
			},
			change(e){
				// console.log('open,close')
			}
		}
	}
</script>

<style lang="scss">
/* 提示窗口 */
	.uni-tip {
		/* #ifndef APP-NVUE */
		display: flex;
		flex-direction: column;
		/* #endif */
		padding: 15px;
		width: 300px;
		background-color: #fff;
		border-radius: 10px;
	}

	.uni-tip-title {
		margin-bottom: 10px;
		text-align: center;
		font-weight: bold;
		font-size: 16px;
		color: #333;
	}

	.uni-tip-content {
		/* padding: 15px;
 */
		font-size: 14px;
		color: #666;
		text-align: center;
		padding: 20rpx 0;
	}

	.uni-tip-group-button {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		margin-top: 20px;
	}

	.uni-tip-button {
		flex: 1;
		text-align: center;
		font-size: 14px;
		color: #3b4144;
	}
</style>
