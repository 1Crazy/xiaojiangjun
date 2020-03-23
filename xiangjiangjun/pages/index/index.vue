<template>
	<view>
		<view class="header">
			<view class="left">
				<image class="img" :src="imgSrc+'public/adress1.png'"></image>
				<view class="address">成都 ></view>
			</view>
			<view class="right">
				<image class="fdj" :src="imgSrc+'public/fdj1.png'"></image>
				<input class="ipt" type="text" placeholder="输入关键字搜索内容">
			</view>
		</view>
		<!-- 轮播 -->
		<uni-swiper-dot :info="info" :current="current" field="content" :mode="mode" Color="#fff" selectedBackgroundColor="#ffffff">
		    <swiper autoplay class="swiper-box" @change="change">
		        <swiper-item v-for="(item ,index) in info" :key="index">
		            <view class="swiper-item">
		                <image class="img" :src='item'></image>
		            </view>
		        </swiper-item>
		    </swiper>
		</uni-swiper-dot>
		<!-- 导航 -->
		<view class="nav">
			<view v-for="(item ,index) in nav" :key="index">
				<image class="img" :src="item.img"></image>
				<view class="word">{{item.word}}</view>
			</view>
		</view>
		<!-- 体验区 -->
		<view class="tyq">
			<view class="box" v-for="(item ,index) in tyq" :key="index">
				<image class="img" :src="item.img">
				<view class="word">{{item.word}}</view>
			</view>
		</view>
		<!-- 图片 -->
		<view class="picnav">
			<image class="img img1" :src="imgSrc+'index/picnav1.png'"></image>
			<image class="img img2" :src="imgSrc+'index/picnav2.png'"></image>
			<image class="img img3" :src="imgSrc+'index/picnav3.png'"></image>
			<image class="img img4" :src="imgSrc+'index/picnav4.png'"></image>
		</view>
		<!-- 商品列表 -->
		<view class='nav-word'>
			<view class="word">商品列表    </view>
			<image class="img" :src="imgSrc+'public/arrow.png'"></image>
		</view>
		<!-- 列表详情 -->
		<view class="bggreay">
			<view class="listwrap"  v-for="(item ,index) in listwrap" :key="index" @click="gotoProductInfo(item.id)">
				 <image class="img" :src='item.thumb'></image>
				 <view class="rightbox">
					 <view class="title">{{item.title}}</view>
					 <view class="shorttitle">{{item.shorttitle}}</view>
					 <image :src="imgSrc+'index/add.png'" class="addimg"></image>
					 <view class="price">
						 <view class="currentPrice">￥ {{item.marketprice}}</view>
						 <view class="originalPrice">￥ {{item.productprice}}</view>
					 </view>
				 </view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniSwiperDot from "@/components/uni/uni-swiper-dot/uni-swiper-dot.vue"
	import { Request } from "../../public/utils.js"
	export default {
		components: {
			uniSwiperDot,
		},
		data() {
			return {
				imgSrc: this.$store.state.imgSrc,
				title: '首页',
				info: [
				// 	{
				// 	img: '../../static/index/banner.png'
				// }, {
				// 	img: '../../static/index/banner.png'
				// }, {
				// 	img: '../../static/index/banner.png'
				// },
				],
				current: 0,
				mode: 'round',
				//nav
				nav:[
					{
						img: '../../static/index/nav1.png',
						word: '快修快保'
					},
					{
						img: '../../static/index/nav2.png',
						word: '汽车美容'
					},
					{
						img: '../../static/index/nav3.png',
						word: '道路救援'
					}
				],
				tyq:[
					{
						img: '../../static/index/tyq2.png',
						word: '保险客户体验区'
					},
					{
						img: '../../static/index/tyq1.png',
						word: '更多体验'
					},
				],
				listwrap:[
					{
						img: '../../static/index/listpic1.png',
						title: 'YBM/意奔玛空调滤清YMB3140007空调滤芯空调滤芯',
						shortitle: '我是短标题'
					},
					{
						img: '../../static/index/listpic1.png',
						title: 'YBM/意奔玛空调滤清YMB3140007空调滤芯空调滤芯',
						shortitle: '我是短标题'
					},
					{
						img: '../../static/index/listpic1.png',
						title: 'YBM/意奔玛空调滤清YMB3140007空调滤芯空调滤芯',
						shortitle: '我是短标题'
					}
				]
			}
		},
		onLoad() {
			const that = this;
			wx.getLocation({
				type: 'gcj02 ',
				success (res) {
					that.longitude = res.longitude
					that.latitude = res.latitude
				}
			})
		},
		onShow() {
			const that = this;
			Request(
				'index.get_data'			
			).then((res)=>{
				console.log(res)
				that.info = res.data.data.info
				that.listwrap = res.data.data.goods
				// 成功方法
			})
			.catch((res)=>{
				// 失败方法
			}) 
		},
		methods: {
			change(e) {
				this.current = e.detail.current;
			},
			gotoProductInfo(info){
				uni.navigateTo({
					url: `/pages/productInfo/productInfo?info=${info}`
				})
			}
		}
	}
</script>

<style lang="scss">
	.header{
		width: 710rpx;
		height: 56rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 20rpx;
		.left{
			display: flex;
			align-items: center;
			.img{
				width:40rpx;
				height: 40rpx;
				margin-right: 13rpx;
			}
			.address{
				font-family: PingFang-SC-Medium;
				font-size: 36rpx;
				font-weight: normal;
				font-stretch: normal;
				color: #333333;
			}
		}
		.right{
			width: 500rpx;
			height: 56rpx;
			position: relative;
			.ipt{
				width: 500rpx;
				height: 56rpx;
				background-color: #f1f1f1;
				border-radius: 28rpx;
				font-family: PingFang-SC-Regular;
				font-size: 26rpx;
				font-weight: normal;
				font-stretch: normal;
				line-height: 56rpx;
				color: #999999;
				padding-right: 30rpx;
				padding-left: 78rpx;
				box-sizing: border-box;
			}
			.fdj{
				position: absolute;
				left: 30rpx;
				top: 14rpx;
				width: 24rpx;
				height: 24rpx;
			}
		}
	}
	//轮播
	.swiper-box{
		width: 710rpx;
		height: 280rpx;
		margin: 0 auto;
		.img{
			width: 710rpx;
			height: 280rpx;
		}
	}
	//导航
	.nav{
		width: 710rpx;
		height: 188rpx;
		margin: 0 auto;
		margin-top: 20rpx;
		margin-bottom: 15rpx;
		padding: 0 20rpx;
		padding-top: 17rpx;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
		.img{
			width: 110rpx;
			height: 112rpx;
		}
		.word{
			font-family: PingFang-SC-Medium;
			font-size: 26rpx;
			font-weight: normal;
			font-stretch: normal;
			color: #333333;
		}
	}
	//体验区
	.tyq{
		display: flex;
		padding: 0 20rpx;
		justify-content: space-between;
		box-sizing: border-box;
		margin-top: 18rpx;
		margin-bottom: 50rpx;
		.box{
			width: 345rpx;
			height: 150rpx;
			background-color: #f1f1f1;
			border-radius: 10rpx;
			.img{
				width: 52rpx;
				height: 52rpx;
				margin-left: 23rpx;
				margin-top: 25rpx;
			}
			.word{
				font-family: PingFang-SC-Medium;
				font-size: 28rpx;
				font-weight: normal;
				font-stretch: normal;
				color: #333333;
				margin-left: 27rpx;
				margin-top: 18rpx;
			}
		}
	}
	// pic
	.picnav{
		margin: 0 20rpx;
		width: 710rpx;
		height: 410rpx;
		position: relative;
		box-sizing: border-box;
		.img{
			position: absolute;
		}
		.img1{
			left: 0;
			top: 0;
			width: 230rpx;
			height: 410rpx;
		}
		.img2{
			right: 0;
			top: 0;
			width: 470rpx;
			height: 200rpx;
		}
		.img3{
			top: 210rpx;
			right: 240rpx;
			width: 230rpx;
			height: 200rpx;
		}
		.img4{
			right: 0;
			top: 210rpx;
			width: 230rpx;
			height: 200rpx;
		}
	}
	//商品列表nav-word
	.nav-word{
		display: flex;
		padding: 0 20rpx;
		justify-content: space-between;
		margin-top: 40rpx;
		margin-bottom: 40rpx;
		.word{
			font-family: PingFang-SC-Medium;
			font-size: 34rpx;
			font-weight: normal;
			font-stretch: normal;
			color: #222222;
		}
		.img{
			width: 15rpx;
			height: 27rpx;
		}
	}
	//列表
	.bggreay{
		background: #f6f6f6;
	}
	.listwrap{
		width: 750rpx;
		box-sizing: border-box;
		margin-bottom: 14rpx;
		display: flex;
		justify-content: space-between;
		background-color: white;
		padding: 0 20rpx;
		padding-top: 30rpx;
		padding-bottom: 23rpx;
		.img{
			width: 200rpx;
			height: 200rpx;
		}
		.rightbox{
			width: 482rpx;
			position: relative;
			.title{
				font-family: PingFang-SC-Medium;
				font-size: 30rpx;
				font-weight: normal;
				font-stretch: normal;
				color: #333333;
			}
			.shorttitle{
				font-family: PingFang-SC-Medium;
				font-size: 28rpx;
				font-weight: normal;
				font-stretch: normal;
				color: #888888;
				margin-top: 20rpx;
				margin-bottom: 42rpx;
			}
			.addimg{
				width: 54rpx;
				height: 54rpx;
				position: absolute;
				bottom: 0;
				right: 0;
			}
		}
		.price{
			display: flex;
			.currentPrice{
				color: #ff9000;
			}
			.originalPrice{
				color: #dadada;
				margin-left: 21rpx;
				text-decoration: line-through;
			}
		}
	}
</style>
