<!-- 核销确认订单页面 -->
<template>
	<view>
		<view class="header">
			<view class="word1">订单号：163531564684</view>
			<view class="word2">到店自提:自提地址成都高新店</view>
		</view>
		<view class="c-info">
			<product-title
				:img="imgSrc+'public/addpic.png'"
				title="马驰宝汽车机油正品全合成5W-40德国进口奔驰宝马奥迪大众本田4L马驰宝汽车机油正品全合成5W-40德国进口奔驰宝马奥迪大众本田4L"
				:details="'规格：'+'5W-40'+'克'"
				:stock="'价格：'+'￥466'+'件'"
				:num="2"
			></product-title>
			<view class="c-bottom">
				<view class="c-b-word">产品规格</view>
				<view class="r-wrap-c">我是规格</view>
			</view>
			<view class="totalPrice">
				<text class="txt1">共2件商品</text>
				<text class="txt2">合计：</text>
				<text class="txt3">￥: 976</text>
			</view>
			<view class="hx-num">
				核销码：NAJ123
			</view>
		</view>
		<view class="b-footer">
			<view class="txtWrap">
				<view class="txt1">合计</view>
				<view class="txt2">￥960.4</view>
			</view>
			<button type="default" class="btn">核销</button>
		</view>
		
	</view>
</template>

<script>
	import productTitle from '@/components/productTitle/productTitle.vue'
	import { Request } from '../../public/utils.js'
	export default {
		components: {
			productTitle
		},
		data() {
			return {
				imgSrc: this.$store.state.imgSrc,
			};
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #f2f2f2;
	}
	.header{
		width: 750rpx;
		height: 153rpx;
		background-color: #ffffff;
		font-family: PingFang-SC-Medium;
		font-size: 30rpx;
		font-weight: normal;
		font-stretch: normal;
		letter-spacing: 0rpx;
		color: #333333;
		padding-top: 36rpx;
		padding-left:29rpx;
		box-sizing: border-box;
		.word2{
			margin-top:20rpx;
		}
		
	}
	
.c-info{
	padding: 30rpx 20rpx;
	padding-bottom: 0;
	background-color: white;
	margin-top: 20rpx;
	.c-bottom{
		margin-top: 40rpx;
		// height: 166rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		.r-wrap-c{
			font-family: PingFang-SC-Medium;
			font-size: 28rpx;
			font-weight: normal;
			font-stretch: normal;
			color: #333333;
		}
		.c-b-word{
			font-family: PingFang-SC-Medium;
			font-size: 28rpx;
			font-weight: normal;
			font-stretch: normal;
			color: #999999;
		}
		.r-wrap{
			height: 61rpx;
			border-radius: 4rpx;
			display: flex;
			align-items: center;
			.symbol{
				width: 69rpx;
				border-radius: 0;
				text-align: center;
				line-height: 61rpx;
				color: #cccccc;
				font-size: 38rpx;
				border: 1px solid #cccccc;
			}
			.ipt{
				width: 80rpx;
				line-height: 61rpx;
				height: 61rpx;
				font-size: 36rpx;
				border-top: 1px solid #cccccc;
				border-bottom: 1px solid #cccccc;
				text-align: center;
			}
		}
	}
	.totalPrice{
		text-align: right;
		padding: 40rpx 0;
		border-bottom: 1px solid #e3e3e3;
		.txt1{
			font-family: PingFang-SC-Medium;
			font-size: 28rpx;
			font-weight: normal;
			font-stretch: normal;
			color: #999999;
			margin-right: 40rpx;
			line-height: 29rpx;
		}
		.txt2{
			font-family: PingFang-SC-Medium;
			font-size: 28rpx;
			font-weight: normal;
			font-stretch: normal;
			color: #333333;
			line-height: 29rpx;
		}
		.txt3{
			font-family: PingFang-SC-Medium;
			font-size: 28rpx;
			font-weight: normal;
			letter-spacing: 0rpx;
			color: #ff9000;
			line-height: 29rpx;
		}
	}
	.hx-num{
		width: 750rpx;
		height: 106rpx;
		line-height: 106rpx;
		background-color: white;
		font-family: PingFang-SC-Medium;
		font-size: 28rpx;
		font-weight: normal;
		font-stretch: normal;
		letter-spacing: 0rpx;
		color: #333333;
	}
}
.b-footer{
	width: 750rpx;
	height: 98rpx;
	background-color: #ffffff;
	position: fixed;
	bottom: 0;
	display: flex;
	align-items: center;
	padding-left: 30rpx;
	padding-right: 10rpx;
	box-sizing: border-box;
	.txtWrap{
		display: flex;
		align-items: center;
	}
	.txt1{
		font-family: PingFang-SC-Medium;
		font-size: 28rpx;
		font-weight: normal;
		font-stretch: normal;
		color: #333333;
	}
	.txt2{
		font-family: PingFang-SC-Medium;
		font-size: 42rpx;
		font-weight: normal;
		font-stretch: normal;
		color: #ff9000;
		margin-left: 20rpx;
	}
	.btn{
		width: 300rpx;
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
		font-family: PingFang-SC-Medium;
		font-size: 30rpx;
		font-weight: normal;
		font-stretch: normal;
		line-height: 79rpx;
		letter-spacing: 0rpx;
		color: #ffffff;
		margin-left: 181rpx;
		position: absolute;
		right: 20rpx;
	}
}
</style>
