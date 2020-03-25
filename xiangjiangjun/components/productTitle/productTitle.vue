<template>
	<view>
		<view class="headerModelContent" :style="'border:'+ borderBottomStyle">
			<image class="img" :src="img"></image>
			<view class="rightBox">
				<view class="r-title">{{title}}</view>
				<view class="r-info">{{details}}</view>
				<view class="r-num">{{stock}}</view>
				<view class="num" v-if="num">X{{num}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'ProductTitle',
		props: {
			img: {
				type: String,
				default: false,
			},
			title: {
				type: String,
				default: false
			},
			details: {
				type: String,
				default: false
			},
			stock: {
				type: String,
				default: false
			},
			num: {
				type: Number,
				default: null
			},
			borderBottomStyle: {
				type: String,
				default: '1px solid #e3e3e3'
			}
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
	.headerModelContent{
		display: flex;
		padding-bottom: 32rpx;
		// border-bottom: ;
		position: relative;
		.img{
			width: 200rpx;
			height: 201rpx;
			border-radius: 10rpx;
		}
		.rightBox{
			margin-left: 20rpx;
			.r-title{
				width: 343rpx;
				font-family: PingFang-SC-Medium;
				font-size: 28rpx;
				font-weight: normal;
				font-stretch: normal;
				color: #333333;
				line-height: 29rpx;
			}
			.r-info{
				font-family: PingFang-SC-Medium;
				font-size: 24rpx;
				font-weight: normal;
				font-stretch: normal;
				color: #999999;
				margin-top: 38rpx;
				margin-bottom: 19rpx;
			}
			.r-num{
				font-family: PingFang-SC-Medium;
				font-size: 24rpx;
				font-weight: normal;
				font-stretch: normal;
				color: #999999;
			}
			.num{
				position: absolute;
				right: 0;
				bottom: 32rpx;
				font-family: PingFang-SC-Medium;
				font-size: 26rpx;
				font-weight: normal;
				font-stretch: normal;
				color: #666666;
			}
		}
	}
</style>
