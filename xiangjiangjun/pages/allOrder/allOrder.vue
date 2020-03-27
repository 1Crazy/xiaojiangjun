<template>
	<view>
		<view class="navWrap">
			<view @tap="changeTab(0)" :class="navIndex == 0 ? 'itemWrap active': ''">
				<view class="word">待支付</view>
				<view class="line"></view>
			</view>
			<view @tap="changeTab(1)" :class="navIndex == 1 ? 'itemWrap active': ''">
				<view class="word">待发货</view>
				<view class="line"></view>
			</view>
			<view @tap="changeTab(2)" :class="navIndex == 2 ? 'itemWrap active': ''">
				<view class="word">待收货</view>
				<view class="line"></view>
			</view>
			<view @tap="changeTab(3)" :class="navIndex == 3 ? 'itemWrap active': ''">
				<view class="word">已完成</view>
				<view class="line"></view>
			</view>
			<view @tap="changeTab(4)" :class="navIndex == 4 ? 'itemWrap active': ''">
				<view class="word">售后退款</view>
				<view class="line"></view>
			</view>
		</view>
		<view class="c-info" v-if="orderList.length!=0" v-for="(item , index) in orderList" :key="index">
			
			<product-title v-for="(items,indexs) in item.goods[0]['goods']" :key="indexs"
				:img=items.thumb
				:title=items.title
				:price=items.price
				:num=items.total
				:borderBottomStyle='none'
			></product-title>
			<view class="totalPrice">
				<text class="txt1">共{{item.goods[0]['goods'].length}}件商品</text>
				<text class="txt2">合计：</text>
				<text class="txt3">￥{{item.price}}</text>
			</view>
			<view class="btnWrap" v-if="navIndex!=1">
				<button v-if="navIndex==0" @tap="cancelOrder(item.id)">取消订单</button>
				<button v-if="navIndex==3">删除订单</button>
				<button v-if="navIndex==0" class="activeBtn">去支付</button>
				<button v-if="navIndex==2" class="activeBtn">确认收货</button>
				<button v-if="navIndex==3" class="activeBtn">去评论</button>
				<!-- <button v-if="navIndex==2||navIndex==3" class="activeBtn">查看物流</button> -->
				<!-- <button class="activeBtn">退换货</button> -->
			</view>
		</view>
		
		<view class="noDataBg" v-if="orderList.length==0">
			<image class="noDataImg" :src="imgSrc+'public/img_kongbaiye.png'" mode="" />
			<view class="word">暂还没有订单哦~</view>
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
				navIndex: 0,
				orderList: []
			};
		},
		onLoad(e) {
			console.log(e)
			this.navIndex = e.status
			this.getData(e.status)
		},
		onShow(e) {
			// this.getData(0)
		},
		methods: {
			changeTab(index){
				this.navIndex = index
				this.getData(index)
			},
			getData(type){
				Request(
					'order.get_list',
					{
						page:1,
						status:type
					}
				)
				.then((res)=>{
					console.log(res)
					// 成功方法
					this.orderList = res.data.list
				})
				.catch((res)=>{
					// 失败方法
				})
			},
			cancelOrder(id){
				Request(
					'order.op.cancel',
					{
						id:id,
						remark:"取消购买",
						comefrom:'wxapp'
					},
					'Post',
					'application/x-www-form-urlencoded'
				)
				.then((res)=>{
					console.log(res)
					// 成功方法
					this.getData(this.navIndex)
				})
				.catch((res)=>{
					// 失败方法
				})
			}
		}
	}
</script>

<style lang="scss">
	page{
		background: #f2f2f2;
	}
	.navWrap{
		width: 750rpx;
		height: 80rpx;
		background-color: #ffffff;
		border-top: solid 1rpx #e3e3e3;
		border-bottom: solid 1rpx #e3e3e3;
		font-family: PingFang-SC-Medium;
		font-size: 28rpx;
		font-weight: normal;
		font-stretch: normal;
		color: #666666;
		display: flex;
		justify-content: space-around;
		align-items: center;
		.itemWrap{
			height: 80rpx;
			line-height: 80rpx;
		}
		.active{
			position: relative;
			.word{
				color: #1db728;
			}
			.line{
				width: 50%;
				height: 5rpx;
				background-color: #1db728;
				position: absolute;
				bottom: 0;
				left: 25%;
			}
		}
	}
	.noDataBg{
		position: fixed;
		top: 262rpx;
		left: 133rpx;
		.noDataImg{
			margin: 0 auto;
			width: 483rpx;
			height: 303rpx;
		}
		.word{
			font-family: PingFang-SC-Medium;
			font-size: 28rpx;
			font-weight: normal;
			font-stretch: normal;
			line-height: 70rpx;
			letter-spacing: 0rpx;
			color: #999999;
			text-align: center;
			margin-top: 60rpx;
		}
	}
	.c-info{
	padding: 30rpx 20rpx;
	padding-bottom: 0;
	background-color: white;
	margin-bottom: 20rpx;
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
	.integral{
		display: flex;
		justify-content: space-between;
		padding-top: 40rpx;
		.leftWord{
			font-family: PingFang-SC-Medium;
			font-size: 28rpx;
			font-weight: normal;
			font-stretch: normal;
			color: #333333;
		}
		.radio{
			
		}
	}
	.y-h-q{
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 40rpx 0;
		.txt1{
			font-family: PingFang-SC-Medium;
			font-size: 28rpx;
			font-weight: normal;
			font-stretch: normal;
			color: #333333;
		}
		.txt2{
			font-family: PingFang-SC-Medium;
			font-size: 28rpx;
			font-weight: normal;
			font-stretch: normal;
			color: #999999;
		}
		.txt3{
			font-family: PingFang-SC-Medium;
			font-size: 28rpx;
			font-weight: normal;
			font-stretch: normal;
			color: #ff9000;
		}
		image{
			width: 12rpx;
			height: 20rpx;
			margin-left:38rpx;
		}
	}
	.btnWrap{
		padding: 30rpx 0;
		border-top: 1px solid #e3e3e3;
		display: flex;
		justify-content: flex-end;
		button{
			width: 180rpx;
			height: 66rpx;
			border-radius: 33rpx;
			border: solid 1rpx #cccccc;
			font-family: PingFang-SC-Medium;
			font-size: 28rpx;
			font-weight: normal;
			font-stretch: normal;
			color: #666666;
			line-height: 66rpx;
			margin-right: 40rpx;
		}
		button:last-child{
			margin-right: 0;
		}
		.activeBtn{
			border: solid 1px #1db728;
			color: #1db728;
		}
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
	}
}
</style>
