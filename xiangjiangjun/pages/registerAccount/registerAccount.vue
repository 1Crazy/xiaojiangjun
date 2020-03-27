<template>
	<view>
		<view class="wrap">
			<input class="ipt" type="text" value=""  placeholder="输入您的姓名"/>
		</view>
		<view class="wrap">
			<input class="ipt" type="text" value=""  placeholder="输入您的电话号码"/>
		</view>
		<view class="wrap">
			<input class="ipt" type="text" value=""  placeholder="输入短信验证码"/>
			<button type="default" class="getCodeBtn">获取验证码</button>
		</view>
		<button class="isSure">确定</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
.wrap{
	width: 710rpx;
	height: 100rpx;
	background-color: #f8f8f8;
	border-radius: 10rpx;
	border: solid 1rpx #e3e3e3;
	margin: 0 auto;
	margin-top: 18rpx;
	position: relative;
	.ipt{
		width: 710rpx;
		height: 100rpx;
		padding: 0 20rpx;
		font-family: PingFang-SC-Medium;
		font-size: 30rpx;
		font-weight: normal;
		font-stretch: normal;
		line-height: 100rpx;
		color: #999999;
		box-sizing: border-box;
	}
	.getCodeBtn{
		width: 170rpx;
		height: 60rpx;
		background-color: #50ce13;
		border-radius: 30rpx;
		position: absolute;
		right: 20rpx;
		top: 20rpx;
		font-family: PingFang-SC-Medium;
		font-size: 26rpx;
		font-weight: normal;
		font-stretch: normal;
		line-height: 60rpx;
		color: #ffffff;
	}
}
.isSure{
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
	font-family: PingFang-SC-Medium;
	font-size: 30rpx;
	font-weight: normal;
	font-stretch: normal;
	line-height: 88rpx;
	color: #ffffff;
	position: fixed;
	bottom: 20rpx;
	left: 20rpx;
}
</style>
