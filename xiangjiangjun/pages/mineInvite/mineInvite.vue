<template>
	<view>
		<view class="itemWrap">
			<image class="avatar" :src="imgSrc+'index/listpic1.png'" mode=""></image>
			<view class="name">橙子007</view>
			<view class="date">2019-12-27</view>
		</view>
		<view class="itemWrap">
			<image class="avatar" :src="imgSrc+'index/listpic1.png'" mode=""></image>
			<view class="name">橙子007</view>
			<view class="date">2019-12-27</view>
		</view>
		<view class="itemWrap">
			<image class="avatar" :src="imgSrc+'index/listpic1.png'" mode=""></image>
			<view class="name">橙子007</view>
			<view class="date">2019-12-27</view>
		</view>
		<view class="itemWrap">
			<image class="avatar" :src="imgSrc+'index/listpic1.png'" mode=""></image>
			<view class="name">橙子007</view>
			<view class="date">2019-12-27</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imgSrc: this.$store.state.imgSrc,
			};
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
