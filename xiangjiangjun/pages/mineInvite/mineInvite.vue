<template>
	<view>
		<view class="itemWrap" v-for="(item , index) in list" :key="index">
			<image class="avatar" :src="item.avatar" mode=""></image>
			<view class="name">{{item.nickname}}</view>
			<view class="date">{{item.agenttime}}</view>
		</view>
	</view>
</template>

<script>
	import { Request } from '../../public/utils.js'
	export default {
		data() {
			return {
				imgSrc: this.$store.state.imgSrc,
				page:1,
				list:[1,2,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3]
			};
		},
		onLoad() {
			
		},
		onShow() {
			this.getData()
		},
		methods:{
			getData(){
				Request(
					'commission.down.get_list',
					{
						page:this.page,
						level:1
					}
				).then((res)=>{
					this.list = this.list.concat(res.data.list)
					this.page = this.page+1
				}).catch((res)=>{
					
				})
			},
			// 上拉加载，拉到底部触发
			onReachBottom() {
			  // console.log('aa')
			  this.getData()
			},
			onPullDownRefresh() {
			    this.getData()
			    setTimeout(function () {
			        uni.stopPullDownRefresh();
			    }, 1000);
			}
		}
	}
</script>

<style lang="scss">
.itemWrap{
	width: 750rpx;
	height: 150rpx;
	background-color: #ffffff;
	padding: 0 30rpx;
	display: flex;
	align-items: center;
	position: relative;
	box-sizing: border-box;
	border-bottom:1px solid #e3e3e3;
	.avatar{
		width: 90rpx;
		height: 90rpx;
		background-color: #e3e3e3;
		border-radius: 50%;
	}
	.name{
		font-family: PingFang-SC-Bold;
		font-size: 32rpx;
		font-weight: normal;
		font-stretch: normal;
		line-height: 36rpx;
		color: #333333;
		margin-left: 20rpx;
	}
	.date{
		position: absolute;
		right: 30rpx;
		top: 64rpx;
		font-family: PingFang-SC-Medium;
		font-size: 28rpx;
		font-weight: normal;
		font-stretch: normal;
		color: #999999;
	}
}
</style>
