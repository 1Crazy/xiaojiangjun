<template>
	<view>
		<view class="headerModelContent" :style="'border-bottom:'+ borderBottomStyle">
			<image class="img" :src="img"></image>
			<view class="rightBox">
				<view class="r-title"  v-if="title">{{title}}</view>
				<view class="r-shortTitle" v-if="shortTitle">{{shortTitle}}</view>
				<view class="r-info" v-if="details">{{details}}</view>
				<view class="r-price" v-if="price">￥{{price}}</view>
				<view class="r-num"  v-if="stock" >{{stock}}</view>
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
				default: null,
			},
			title: {
				type: String,
				default: null
			},
			details: {
				type: String,
				default: null
			},
			stock: {
				type: String,
				default: null
			},
			num: {
				type: Number,
				default: null
			},
			borderBottomStyle: {
				type: String,
				default: '1px solid #e3e3e3'
			},
			shortTitle: {
				type: String,
				default: null
			},
			price: {
				type: String,
				default: null
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
				width: 470rpx;
				font-family: PingFang-SC-Medium;
				font-size: 28rpx;
				font-weight: normal;
				font-stretch: normal;
				color: #333333;
				line-height: 29rpx;
				margin-top: 20rpx;
			}
			.r-shortTitle{
				font-family: PingFang-SC-Medium;
				font-size: 28rpx;
				font-weight: normal;
				font-stretch: normal;
				color: #888888;
				margin-top: 29rpx;
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
			.r-price{
				position: absolute;
				bottom: 32rpx;
				font-family: PingFang-SC-Medium;
				font-size: 30rpx;
				font-weight: normal;
				font-stretch: normal;
				color: #333333;
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
