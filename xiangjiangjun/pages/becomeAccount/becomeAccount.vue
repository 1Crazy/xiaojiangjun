<template>
	<view>
		<view class="header">
			<image lazy-load :src="imgSrc+'public/huiyuan_img_bj.png'" class="img"></image>
			<view class="price">￥{{vipdetail.ordermoney}}</view>
			<view class="word">开通 {{vipdetail.levelname}} 只需</view>
		</view>
		<view class="c-title">
			<image lazy-load class="img" src="../../static/public/huiyuan_shuoming.png" mode=""></image>
			<view class="word">会员权益明细说明</view>
		</view>
		<view>
			{{vipdetail.levelmsg}}
		</view>
		<button class="btn">立即支付</button>
	</view>
</template>

<script>
	import { Request } from "../../public/utils.js"
	export default {
		data() {
			return {
				imgSrc: this.$store.state.imgSrc,
				vipdetail:{
					levelname:'会员',//会员等级名
					ordermoney:'2000',//需要金额
					levelmsg:'会员权益描述'//权益说明
				}
			};
		},
		onLoad() {
			this.getData()
		},
		onShow() {
			
		},
		methods:{
			getData(){
				Request(
					'member.getVips'
				)
				.then((res)=>{
					this.vipdetail = res.data.vip
				})
				.catch((res)=>{
					
				})
			}
		}
	}
</script>

<style lang="scss">
page{
	background-color: white;
}
.header{
	width: 710rpx;
	height: 252rpx;
	background-image: linear-gradient(90deg, 
		#6fde39 0%, 
		#46c806 100%), 
	linear-gradient(
		#47cfec, 
		#47cfec);
	background-blend-mode: normal, 
		normal;
	border-radius: 20rpx;
	position: relative;
	margin: 0 auto;
	margin-top: 12rpx;
	.img{
		width: 710rpx;
		height: 252rpx;
		position: absolute;
		z-index: -1;
	}
	.price{
		font-family: PingFang-SC-Bold;
		font-size: 60rpx;
		font-weight: normal;
		font-stretch: normal;
		letter-spacing: 0rpx;
		color: #ffffff;
		text-align: center;
		padding-top: 50rpx;	
	}
	.word{
		font-family: PingFang-SC-Medium;
		font-size: 30rpx;
		font-weight: normal;
		font-stretch: normal;
		letter-spacing: 0rpx;
		color: #ffffff;
		margin-top: 30rpx;
		text-align: center;
	}
}
.c-title{
	padding: 0 30rpx;
	margin-top: 82rpx;
	display: flex;
	align-items: center;
	margin-bottom: 42rpx;
	.img{
		width: 36rpx;
		height: 36rpx;
	}
	.word{
		font-family: PingFang-SC-Medium;
		font-size: 34rpx;
		font-weight: normal;
		font-stretch: normal;
		margin-left: 21rpx;
		letter-spacing: 0rpx;
		color: #333333;
	}
}
.btn{
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
	line-height: 88rpx;
	font-family: PingFang-SC-Bold;
	font-size: 30rpx;
	font-weight: normal;
	font-stretch: normal;
	letter-spacing: 0rpx;
	color: #ffffff;
	position: fixed;
	bottom: 20rpx;
	left: 20rpx;
}
</style>
