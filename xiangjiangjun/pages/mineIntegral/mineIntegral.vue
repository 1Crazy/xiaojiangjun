<template>
	<view>
		<view class="header">
			<view>
				<text class="txt1">积分余额</text>
				<text class="txt2">2693</text>
			</view>
		</view>
		<view class="contentWrap">
			<view class="title">
				<image class="img" :src="imgSrc+'public/jifen_jilu.png'" mode=""></image>
				<view>积分记录</view>
			</view>
			<view class="itenamemWrap">
				<view class="name">返积分</view>
				<view class="time">2019012.20  12:23:30</view>
				<view class="num">+20</view>
			</view>
			<view class="itenamemWrap">
				<view class="name">抵扣</view>
				<view class="time">2019012.20  12:23:30</view>
				<view class="num">+20</view>
			</view>
			<view class="itenamemWrap">
				<view class="name">返积分</view>
				<view class="time">2019012.20  12:23:30</view>
				<view class="num">+20</view>
			</view>
			<view class="itenamemWrap">
				<view class="name">购物积分</view>
				<view class="time">2019012.20  12:23:30</view>
				<view class="num">+20</view>
			</view>
			<view class="itenamemWrap">
				<view class="name">抵扣</view>
				<view class="time">2019012.20  12:23:30</view>
				<view class="num">+20</view>
			</view>
			<view class="itenamemWrap">
				<view class="name">返积分</view>
				<view class="time">2019012.20  12:23:30</view>
				<view class="num">+20</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	import { Request } from '../../public/utils.js'
	export default {
		data() {
			return {
				imgSrc: this.$store.state.imgSrc,
			};
		},
		onShow() {
			
		},
		methods:{
			getData(){
				
			}
		}
	}
</script>

<style lang="scss">
	page{
		background: #f2f2f2;
	}
.header{
	width: 750rpx;
	height: 252rpx;
	background-color: #50ce13;
	position: relative;
	view{
		position: absolute;
		left: 30rpx;
		bottom: 129rpx;
		.txt1{
			font-family: PingFang-SC-Medium;
			font-size: 30rpx;
			font-weight: normal;
			font-stretch: normal;
			color: #ffffff;
		}
		.txt2{
			font-family: PingFang-SC-Bold;
			font-size: 58rpx;
			font-weight: normal;
			font-stretch: normal;
			margin-left: 30rpx;
			letter-spacing: 0rpx;
			color: #ffffff;
		}
	}
}
.contentWrap{
	width: 710rpx;
	background-color: #ffffff;
	border-radius: 10rpx 10rpx 0rpx 0rpx;
	position: absolute;
	top: 132rpx;
	left: 20rpx;
	padding: 0 30rpx;
	box-sizing: border-box;
	.title{
		height: 101rpx;
		display: flex;
		align-items: center;
		border-bottom: 1px solid #e3e3e3;
		.img{
			width: 34rpx;
			height: 36rpx;
			margin-right: 20rpx;
		}
		view{
			font-family: PingFang-SC-Bold;
			font-size: 32rpx;
			font-weight: normal;
			font-stretch: normal;
			color: #333333;
		}
	}
	.itenamemWrap{
		position: relative;
		border-bottom: 1px solid #e3e3e3;
		height: 166rpx;
		.name{
			font-family: PingFang-SC-Medium;
			font-size: 30rpx;
			font-weight: normal;
			font-stretch: normal;
			color: #333333;
			margin-top: 41rpx;
		}
		.time{
			margin-top: 29rpx;
			font-family: PingFang-SC-Medium;
			font-size: 26rpx;
			font-weight: normal;
			font-stretch: normal;
			line-height: 36rpx;
			letter-spacing: 0rpx;
			color: #999999;
		}
		.num{
			position: absolute;
			right: 30rpx;
			top: 47rpx;
			font-family: PingFang-SC-Bold;
			font-size: 30rpx;
			font-weight: normal;
			font-stretch: normal;
			color: #ff9000;
		}
		.delNum{
			color: #666666;
		}
	}
}
</style>
