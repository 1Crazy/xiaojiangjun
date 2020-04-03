<template>
	<view>
		<view class="header">
			<image class="img" src="../../static/public/addpic.png"></image>
			<view class="dor-title">主营服务</view>
			<view class="h-content">
				<view v-for="(item ,index) in serviceTypeBtn" :key="index">{{item}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	import './index.scss'
	export default {
		data() {
			return {
				serviceTypeBtn: ['车身美容','内部美容','漆面处理','漆面处理','洗车','贴膜','打蜡']
			};
		}
	}
</script>

<style lang="scss">
page{
	background-color: #f6f6f6;
}
.header{
	width: 750rpx;
	background-color: white;
	.img{
		width: 750rpx;
		height: 300rpx;
	}
	.dor-title{
		padding-left: 20rpx;
		margin-top: 40rpx;
		font-family: PingFang-SC-Bold;
		font-size: 30rpx;
		font-weight: normal;
		font-stretch: normal;
		letter-spacing: 0rpx;
		color: #333333;
	}
	.h-content{
		display: flex;
		flex-wrap: wrap;
		padding:0 19rpx;
		padding-bottom: 30rpx;
		view{
			width: 169rpx;
			height: 60rpx;
			background-color: #f8f8f8;
			border-radius: 30rpx;
			border: solid 1rpx #e3e3e3;
			font-family: PingFang-SC-Medium;
			font-size: 28rpx;
			font-weight: normal;
			font-stretch: normal;
			line-height: 60rpx;
			letter-spacing: 0rpx;
			color: #333333;
			margin-right: 8rpx;
			margin-top: 27rpx;
			text-align: center;
			&:last-child{
				margin-right: 0;
			}
		}
	}
}

</style>
