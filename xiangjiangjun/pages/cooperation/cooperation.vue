<template>
	<view>
		<view class="itemWrap">
			<view class="name">姓名:</view>
			<input class="ipt" type="text" placeholder="请输入姓名">
		</view>
		<view class="itemWrap">
			<view class="name">电话号码:</view>
			<input class="ipt" type="text" placeholder="请输入电话号码">
		</view>
		<view class="itemWrap">
			<view class="name">类型:</view>
			<input class="ipt" type="text" placeholder="请输入类型">
		</view>
		<view class="itemWrap">
			<view class="name">主营产品/服务:</view>
			<input class="ipt" type="text" placeholder="请输入主营产品/服务">
		</view>
		<view class="itemWrap">
			<view class="name">地址:</view>
			<input class="ipt" type="text" placeholder="地址">
		</view>
		<button class="btn">提交</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
page{
	background-color: white;
}
.itemWrap{
	margin-top: 40rpx;
	padding: 0 30rpx;
	.name{
		font-family: PingFang-SC-Bold;
		font-size: 32rpx;
		font-weight: normal;
		font-stretch: normal;
		color: #333333;
	}
	.ipt{
		width: 690rpx;
		height: 100rpx;
		background-color: #f9f9f9;
		border-radius: 10rpx;
		border: solid 1rpx #cccccc;
		font-family: PingFang-SC-Medium;
		font-size: 30rpx;
		font-weight: normal;
		font-stretch: normal;
		line-height: 100rpx;
		letter-spacing: 0rpx;
		color: #999999;
		padding: 0 20rpx;
		margin-top: 30rpx;
		box-sizing: border-box;
	}
}
.btn{
	position: fixed;
	width: 710rpx;
	height: 88rpx;
	background-image: linear-gradient(90deg, 
		#6fde39 0%, 
		#46c806 100%), 
	linear-gradient(
		#47cfec, 
		#47cfec);
	background-blend-mode: normal, 
		normal;
	border-radius: 44rpx;
	font-family: PingFang-SC-Bold;
	font-size: 30rpx;
	font-weight: normal;
	font-stretch: normal;
	line-height: 88rpx;
	letter-spacing: 0rpx;
	color: #ffffff;
	bottom: 20rpx;
	left: 20rpx;
}
</style>
