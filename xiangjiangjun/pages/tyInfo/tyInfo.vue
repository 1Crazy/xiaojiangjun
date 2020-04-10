<!-- 体验详情 -->
<template>
	<view>
		<view class="header">
			<image lazy-load class="img" :src="banner"></image>
		</view>
		<!-- 详情 -->
		<view class="info">
			<view class="navwrap">
				<!-- 690rpx -->
				<view class="active">详情</view>
			</view>
			<view :class="productInfo">
				<view class="article">{{desc}}</view>
			</view>
		</view>
		<button class="submitBtn">提交详情</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imgSrc: this.$store.state.imgSrc,
				banner: `${this.$store.state.imgSrc}productInfo/banner1.png`,
				desc: '详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情'
			};
		}
	}
</script>

<style lang="scss">
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
.info{
	margin-top: 14rpx;
	text-align: center;
	background-color: white;
	.navwrap{
		display: flex;
		padding: 30rpx 0;
		justify-content: center;
		.active{
			background-color: #D70830;
			color: white;
		}
		view{
			width: 690rpx;
			height: 80rpx;
			background-color: #f2f2f2;
			line-height: 80rpx;
		}
	}
	.article{
		width: 687rpx;
		font-family: PingFang-SC-Regular;
		font-size: 28rpx;
		font-weight: normal;
		font-stretch: normal;
		line-height: 42rpx;
		color: #333333;
		margin: 0 auto;
		text-align: left;
	}
	.productInfo{
		.img1{
			width: 707rpx;
			height: 559rpx;
		}
		.img2{
			width: 750rpx;
		}
	}
	
}
.submitBtn{
	position: fixed;
	background-color: #47c807;
	width:750rpx;
	bottom: 0;
	height: 100rpx;
	line-height: 100rpx;
	color: white;
}
</style>
