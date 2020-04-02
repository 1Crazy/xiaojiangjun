<template>
	<view>
		<view class="header-wrap">
			<product-title
				img="../../static/public/addpic.png"
				title="YBM/意奔玛空调滤清YMB3140007空调滤芯空调滤芯"
				shortTitle='我是短标题'
				:borderBottomStyle='none'
			></product-title>
		</view>
		<view class="content">
			<view class="listItem" @tap="gotoReturnRefund('notReturnGoods')">
				<image class="img" src="../../static/public/ic_tuikuan.png" mode=""></image>
				<view class="center">
					<view class="txt1">我要退款(无需退货)</view>
					<view class="txt2">没收到货，或与商家协商同意不用退货只退款</view>
				</view>
				<image class="arrow" src="../../static/public/arrow.png" mode=""></image>
			</view>
			<view class="listItem" @tap="gotoReturnRefund()">
				<image class="img" src="../../static/public/ic_tuihuo.png" mode=""></image>
				<view class="center">
					<view  class="txt1">我要退货退款</view>
					<view  class="txt2">已收到货，需要退还收到的货物</view>
				</view>
				<image class="arrow" src="../../static/public/arrow.png" mode=""></image>
			</view>
		</view>
		
		
	</view>
</template>

<script>
	import productTitle from '@/components/productTitle/productTitle.vue'

	export default {
		components: {
			productTitle
		},
		data() {
			return {
				imgSrc: this.$store.state.imgSrc,
			};
		},
		methods:{
			gotoReturnRefund(w){
				if (w == 'notReturnGoods'){
					uni.navigateTo({
						url: `/pages/returnRefund/returnRefund?word=${w}`
					})
				}else{
					uni.navigateTo({
						url: '/pages/returnRefund/returnRefund'
					})
				}
				
			},
			
		}
	}
</script>
<style lang="scss">
page{
	background-color: #f4f4f4;
	overflow: hidden;
}
.header-wrap{
	padding: 0 20rpx;
	background-color: white;
}
.content{
	width: 100%;
	height: 992rpx;
	margin-top: 20rpx;
	background-color: white;
	.listItem{
		position: relative;
		display: flex;
		padding: 38rpx 0;
		padding-left: 20rpx;
		padding-right: 14rpx;
		border: 1px solid #e3e3e3;
		.img{
			width: 36rpx;
			height: 34rpx;
		}
		.center{
			margin-left: 20rpx;
			.txt1{
				font-family: PingFang-SC-Bold;
				font-size: 30rpx;
				font-weight: normal;
				font-stretch: normal;
				color: #333333;
				letter-spacing: 0rpx;
			}
			.txt2{
				font-family: PingFang-SC-Medium;
				font-size: 28rpx;
				font-weight: normal;
				font-stretch: normal;
				letter-spacing: 0rpx;
				color: #999999;
				margin-top: 28rpx;
			}
		}
		.arrow{
			width: 12rpx;
			height: 20rpx;
			position: absolute;
			right: 14rpx;
			top: 73rpx;
		}
	}
}

</style>
