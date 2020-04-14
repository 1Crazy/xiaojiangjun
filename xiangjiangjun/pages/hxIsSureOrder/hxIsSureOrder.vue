<!-- 核销确认订单页面 -->
<template>
	<view>
		<view class="header">
			<view class="word1">订单号：{{orderDetail.order.ordersn}}</view>
			<view class="word2">到店自提:{{orderDetail.store.city}}{{orderDetail.store.area}}{{orderDetail.store.address}}</view>
		</view>
		<view class="c-info" v-for="(item,index) in orderDetail.goods" :key="index" >
			<product-title 
				:img=item.thumb
				:title=item.title
				:details="'规格：'+item.optionname"
				:num=item.total
			></product-title>
			<!-- <view class="c-bottom">
				<view class="c-b-word">产品规格</view>
				<view class="r-wrap-c">我是规格</view>
			</view> -->
			<view class="totalPrice">
				<text class="txt1">共{{item.total}}件商品</text>
				<text class="txt2">合计：</text>
				<text class="txt3">￥: {{item.price}}</text>
			</view>
			<view class="hx-num" v-for="(item,index) in orderDetail.order.verifyinfo" :key="index" >
				核销码：{{item.verifycode}}
			</view>
		</view>
		<view class="b-footer">
			<view class="txtWrap">
				<view class="txt1">合计</view>
				<view class="txt2">￥{{orderDetail.order.price}}</view>
			</view>
			<button type="default" class="btn" @tap="hx()">核销</button>
		</view>
		
	</view>
</template>

<script>
	import productTitle from '@/components/productTitle/productTitle.vue'
	import { Request } from '../../public/utils.js'
	import _app from '../../js_sdk/QuShe-SharerPoster/util/QS-SharePoster/app.js';
	export default {
		components: {
			productTitle
		},
		data() {
			return {
				imgSrc: this.$store.state.imgSrc,
				orderDetail:[{
					order:[{
						ordersn:'',
						price:''
					}],
					store:[{
						city:'',
						area:'',
						address:''
					}],						
				}],
				orderid:""
			};
		},
		onLoad(e) {
			
			const scene = decodeURIComponent(e.scene)
			var strs= new Array();
			strs = scene.split('=');
			this.orderid = strs[1];
			this.getData()
		},
		methods:{
			getData(){
				Request(
					'order.detail',
					{
						id:this.orderid
					}
				)
				.then((res)=>{
					this.orderDetail = res.data
				})
				.catch((res)=>{
					
				})
			},
			hx(){
				Request(
					'order.subhx',
					{
						id:this.orderid
					}
				)
				.then((res)=>{
					if(res.data.status == '0'){
						_app.showToast(res.data.result.message)
					}else{
						uni.reLaunch({
							url:'/pages/mine/mine'
						})
					}
				})
				.catch((res)=>{
					
				})
			}
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
