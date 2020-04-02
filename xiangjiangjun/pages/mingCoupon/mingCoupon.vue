<template>
	<view>
		<view class="wrap" v-for="(item , index) in couponlist" :key="index">
			<image class="img" :src="imgSrc+'public/quan_img.png'"></image>
			<view class="leftTop">
				<text class="txt1">￥</text>
				<text class="txt2">{{item.deduct}}</text>
				<text class="txt3">{{item.title2}}</text>
			</view>
<<<<<<< HEAD
			<view class="time">使用期限：{{item.timestr}}</view>
			<button type="default" class="useImmediately">立即使用</button>
=======
			<view class="time">使用期限：2019.12.10-2020.05.10</view>
			<button type="default" class="useImmediately" @tap='gotoUse'>立即使用</button>
		</view>
		<view class="wrap">
			<image class="img" :src="imgSrc+'public/quan_img.png'"></image>
			<view class="leftTop">
				<text class="txt1">￥</text>
				<text class="txt2">20</text>
				<text class="txt3">满380元可使用</text>
			</view>
			<view class="time">使用期限：2019.12.10-2020.05.10</view>
			<button type="default" class="useImmediately" @tap='gotoUse'>立即使用</button>
		</view>
		<view class="wrap">
			<image class="img" :src="imgSrc+'public/quan_img.png'"></image>
			<view class="leftTop">
				<text class="txt1">￥</text>
				<text class="txt2">20</text>
				<text class="txt3">满380元可使用</text>
			</view>
			<view class="time">使用期限：2019.12.10-2020.05.10</view>
			<button type="default" class="useImmediately" @tap='gotoUse'>立即使用</button>
>>>>>>> 67618f3be5668a425b459f44dba089b94d478091
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
				couponlist:[]
			}
		},
		onShow() {
			this.getData()
		},
		methods: {
<<<<<<< HEAD
			getData(){
				Request(
					'sale.coupon.my.getlist',
					{
						page:this.page
					}
				)
				.then((res)=>{
					this.couponlist = res.data.list
				})
				.catch((res)=>{
					
=======
			gotoUse(){
				uni.reLaunch({
					url: '/pages/category/category'
>>>>>>> 67618f3be5668a425b459f44dba089b94d478091
				})
			}
		}
	}
</script>

<style lang="scss">
	page{
		padding: 0 20rpx;
		box-sizing: border-box;
	}
	.wrap{
		width: 710rpx;
		height: 186rpx;
		position: relative;
		margin: 0 auto;
		box-sizing: border-box;
		margin-top: 28rpx;
		.time{
			font-family: PingFang-SC-Regular;
			font-size: 26rpx;
			font-weight: normal;
			font-stretch: normal;
			letter-spacing: 0rpx;
			color: #ff9000;
			position: absolute;
			left: 30rpx;
			top: 129rpx;
		}
		.img{
			width: 710rpx;
			height: 186rpx;
		}
		.leftTop{
			left: 30rpx;
			top: 32rpx;
			position: absolute;
			.txt1{
				font-family: MicrosoftYaHei;
				font-size: 30rpx;
				font-weight: normal;
				font-stretch: normal;
				line-height: 42rpx;
				letter-spacing: 0rpx;
				color: #ff9000;
			}
			.txt2{
				font-family: Impact;
				font-size: 70rpx;
				font-weight: normal;
				font-stretch: normal;
				line-height: 42rpx;
				letter-spacing: 0rpx;
				color: #ff9000;
			}
			.txt3{
				font-family: PingFang-SC-Medium;
				font-size: 28rpx;
				font-weight: normal;
				font-stretch: normal;
				line-height: 42rpx;
				letter-spacing: 0rpx;
				color: #ff9000;
				margin-left: 22rpx;
			}
		}
		.useImmediately{
			width: 140rpx;
			height: 54rpx;
			background-color: #ff9000;
			border-radius: 27rpx;
			font-family: NotoSansHans-Regular;
			font-size: 24rpx;
			font-weight: normal;
			font-stretch: normal;
			line-height: 54rpx;
			color: #ffffff;
			position: absolute;
			right: 30rpx;
			top: 66rpx;
		}
	}
		
</style>
