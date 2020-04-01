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
			<view class="listItem">
				<image class="img" src="../../static/public/ic_tuikuan.png" mode=""></image>
				<view class="center">
					<view class="txt1">我要退款(无需退货)</view>
					<view class="txt2">没收到货，或与商家协商同意不用退货只退款</view>
				</view>
				<image class="arrow" src="../../static/public/arrow.png" mode=""></image>
			</view>
			<view class="listItem" @tap="gotoReturnRefund">
				<image class="img" src="../../static/public/ic_tuihuo.png" mode=""></image>
				<view class="center">
					<view  class="txt1">我要退货退款</view>
					<view  class="txt2">已收到货，需要退还收到的货物</view>
				</view>
				<image class="arrow" src="../../static/public/arrow.png" mode=""></image>
			</view>
		</view>
		
		<!-- 加入购物车商品规格选择模态框 -->
		<uni-popup ref="addCartPopup" type="bottom">
			<view class="productSpecificationsModelContent">
				<image class="closeImg" :src="imgSrc+'public/goumai_guanbi.png'" @tap="addCartModel(false)"></image>
				
				<button class="submitBtn" @tap="submitBtn()">提交</button>
			</view>
		</uni-popup>
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
				
			};
		},
		methods:{
			gotoReturnRefund(){
				uni.navigateTo({
					url: '/pages/returnRefund/returnRefund'
				})
			}
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

// 加入购物车显示模态框
.productSpecificationsModelContent{
	width: 750rpx;
	// height: 722rpx;
	background-color: #ffffff;
	border-radius: 20rpx 20rpx 0rpx 0rpx;
	position: relative;
	padding-bottom: 29rpx;
	padding-top: 40rpx;
	padding-left: 20rpx;
	padding-right: 30rpx;
	box-sizing: border-box;
	.closeImg{
		position: absolute;
		width: 50rpx;
		height: 50rpx;
		right: 20rpx;
		top: 21rpx;
	}
	.submitBtn{
		width: 710rpx;
		height: 79rpx;
		background-image: linear-gradient(90deg, 
			#6fde39 0%, 
			#46c806 100%), 
		linear-gradient(
			#e3e3e3, 
			#e3e3e3);
		background-blend-mode: normal, 
			normal;
		border-radius: 39rpx;
		font-family: PingFang-SC-Regular;
		font-size: 28rpx;
		font-weight: normal;
		font-stretch: normal;
		line-height: 79rpx;
		color: #333333;
		margin-top: 60rpx;
		font-family: PingFang-SC-Bold;
		font-size: 30rpx;
		font-weight: normal;
		font-stretch: normal;
		line-height: 79rpx;
		letter-spacing: 0rpx;
		color: #ffffff;
	}
}

</style>
