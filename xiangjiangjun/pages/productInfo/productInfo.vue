<template>
	<view>
		<view class="swiperWrap">
			<swiper :current="current" @change="swiperChange" class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
				<swiper-item  v-for="(item ,index) in swiper" :key="index">
					<image class='img' :src="item.img" mode=""></image>
				</swiper-item>
			</swiper>
			<view class="num">{{current+1}}/{{swiper.length}}</view>
		</view>
		<view class="content">
			<view class="title">马驰宝汽车机油正品全合成5W-40德国进口奔驰宝马奥迪大众本田4L</view>
			<view class="description">全合成机油</view>
			<view class="bottom">
				<view class="price">
					<view class="currentPrice">￥488</view>
					<view class="originalPrice">￥608</view>
				</view>
				<view class="count">销量：1999</view>
			</view>
		</view>
		<view class="nav">
			<view>物流说明</view>
			<image src="../../static/public/arrow.png" class="symbol"></image>
		</view>
		<!-- 详情 -->
		<view class="info">
			<view class="navwrap">
				<view :class="tab == 1 ? 'active': ''" @click="changeTab(1)">商品详情</view>
				<view :class="tab == 2 ? 'active': ''" @click="changeTab(2)">用户评价</view>
			</view>
			<view :class="tab == 1 ? 'productInfo': 'hide'">
				<view class="article">抗氧化性能最好，即使用周期最长，减少了废旧机油排放。 fuel-burn系数低，即油门反应高，节省了燃油消耗环保低碳。</view>
				<image class="img1" src="../../static/index/picnav3.png" style="margin-top: 40rpx;margin-bottom: 93rpx;"></image>
				<image class="img2" src="../../static/index/picnav3.png"></image>
			</view>
			<view :class="tab == 2 ? 'comment': 'hide'"  v-for="(item ,index) in commentList" :key="index">
				<view class="commentHeader">
					<image class="avatar" :src="item.avatar"></image>
					<view class="name">{{item.name}}</view>
					<image :class="item.star>=1 ? 'star': 'hide'" src="/static/productInfo/star.png" mode=""></image>
					<image :class="item.star>=2 ? 'star': 'hide'" src="/static/productInfo/star.png" mode=""></image>
					<image :class="item.star>=3 ? 'star': 'hide'" src="/static/productInfo/star.png" mode=""></image>
					<image :class="item.star>=4 ? 'star': 'hide'" src="/static/productInfo/star.png" mode=""></image>
					<image :class="item.star>=5 ? 'star': 'hide'" src="/static/productInfo/star.png" mode=""></image>
					<view class="date">{{item.date}}</view>
				</view>
				<view class="commentContent">{{item.content}}</view>
				<view :class="item.commentPic.length>0?'commentPic':'hide'">
					<image :src="itemPic" class="pic" v-for="(itemPic ,index) in item.commentPic" :key="index"></image>
				</view>
			</view>
		</view>
		<view style="height: 100rpx;"></view>
		<!-- 底部 -->
		<view class="footer">
			<view class="wrap">
				<image src="../../static/public/xiangqing_huishouye.png" ></image>
				<view>首页</view>
			</view>
			<view class="wrap center">
				<image src="../../static/public/xiagnqiang_fenxiang.png"></image>
				<view>分享</view>
			</view>
			<view class="wrap" style="margin-right: 44rpx;">
				<image src="../../static/public/xiangqing_kefu.png"></image>
				<view>客服</view>
			</view>
			<button class="addCart">加入购物车</button>
			<button class="buy">立刻购买</button>
		</view>
	</view>
</template>

<script>
	import './index.scss'
	export default {
		data() {
			return {
				swiper: [{
					img: '../../static/productInfo/banner1.png'
				}, {
					img: '../../static/productInfo/banner2.png'
				}],
				current: 0,
				tab: 1,//商品详情1，用户评价2
				commentList: [
					{
						avatar: '../../static/index/add.png',
						name: '张先生',
						star: 2,
						date: '2019-12-25',
						content: '机油收到了，已经购买了几次了，值得信赖的商家，还是一如既往的好，和实体店购买的一样，实惠质量也非常不错！！！！',
						commentPic: ['../../static/index/listpic1.png','../../static/index/listpic1.png','../../static/index/listpic1.png']
					},
					{
						avatar: '../../static/index/add.png',
						name: 'x先生',
						star: 3,
						date: '2019-11-25',
						content: 'xxxxxxxx！！！',
						commentPic: []
					},
				]
			}
		},
		methods: {
			swiperChange (e) {
				this.current=e.detail.current
			},
			//改变tab值
			changeTab(num){
				this.tab=num
			}
		}
	}
</script>

<style lang="scss">
page{
	background-color: #f6f6f6;
}
.swiperWrap{
	position: relative;
	.swiper{
		width: 750rpx;
		height: 600rpx;
		.img{
			width: 750rpx;
			height: 600rpx;
		}
	}
	.num{
		position: absolute;
		right: 10rpx;
		bottom: 10rpx;
		width: 74rpx;
		height: 36rpx;
		background-color: #000000;
		border-radius: 18rpx;
		color: white;
		font-size: 28rpx;
		text-align: center;
		line-height: 36rpx;
	}
}
.content{
	width: 750rpx;
	padding: 30rpx;
	border-bottom: 1px solid #e3e3e3;
	box-sizing: border-box;
	background-color: white;
	.title{
		width: 685rpx;
		height: 80rpx;
		font-family: PingFang-SC-Bold;
		font-size: 34rpx;
		font-weight: normal;
		font-stretch: normal;
		color: #333333;
	}
	.description{
		font-family: PingFang-SC-Medium;
		font-size: 28rpx;
		font-weight: normal;
		font-stretch: normal;
		color: #888888;
		margin-top: 29rpx;
		margin-bottom: 29rpx;
	}
	.bottom{
		display: flex;
		justify-content: space-between;
		align-items: center;
		.price{
			display: flex;
			align-items: center;
			.currentPrice{
				font-family: PingFang-SC-Medium;
				font-size: 42rpx;
				font-weight: normal;
				font-stretch: normal;
				color: #ff9000;
			}
			.originalPrice{
				font-family: PingFang-SC-Medium;
				font-size: 28rpx;
				font-weight: normal;
				font-stretch: normal;
				color: #999999;
				text-decoration: line-through;
				margin-left: 20rpx;
			}
		}
	}
}
.nav{
	height: 106rpx;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0 30rpx;
	font-family: PingFang-SC-Medium;
	font-size: 28rpx;
	font-weight: normal;
	font-stretch: normal;
	color: #333333;
	background-color: white;
	.symbol{
		width: 15rpx;
		height: 27rpx;
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
			background-color: #47c807;
			color: white;
		}
		view{
			width: 345rpx;
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
// 底部
.footer{
	width: 750rpx;
	height: 98rpx;
	background-color: #ffffff;
	position: fixed;
	bottom: 0;
	display: flex;
	padding-left: 30rpx;
	padding-right: 10rpx;
	align-items: center;
	box-sizing: border-box;
	.wrap{
		display: flex;
		flex-direction: column;
		align-items: center;
		image{
			width: 40rpx;
			height: 40rpx;
		}
		view{
			font-family: PingFang-SC-Medium;
			font-size: 20rpx;
			font-weight: normal;
			font-stretch: normal;
			color: #333333;
			margin-top: 9rpx;
		}
	}
	.center{
		margin-left: 73rpx;
		margin-right: 73rpx;
	}
	.addCart{
		width: 200rpx;
		height: 79rpx;
		background-image: linear-gradient(90deg, 
			#6fde39 0%, 
			#46c806 100%), 
		linear-gradient(
			#1eac28, 
			#1eac28);
		background-blend-mode: normal, 
			normal;
		border-radius: 39rpx 0rpx 0rpx 39rpx;
	}
	.buy{
		width: 200rpx;
		height: 79rpx;
		background-image: linear-gradient(90deg, 
			#feb12a 0%, 
			#ff8c06 100%), 
		linear-gradient(
			#ff9000, 
			#ff9000);
		background-blend-mode: normal, 
			normal;
		border-radius: 0rpx 39rpx 39rpx 0rpx;
	}
	button{
		font-family: PingFang-SC-Medium;
		font-size: 30rpx;
		font-weight: normal;
		font-stretch: normal;
		color: #ffffff;
		line-height: 79rpx;
		text-align: center;
		margin: 0;
		padding: 0;
	}
}
</style>
