<template>
	<view>
		<view class="header">
			<image lazy-load class="img" :src="storeInfo.logo"></image>
			<view class="dor-title">主营服务</view>
			<view class="h-content">
				<view v-for="(item ,index) in storeInfo.store_services" :key="index">{{item.service_name}}</view>
			</view>
		</view>
		<view class="timeWrap">
			<view class="item">
				<image lazy-load src="../../static/public/shop3.png" mode="" class="img img1"></image>
				<text class="txt1">营业时间:</text>
				<text class="txt2">{{storeInfo.saletime}}</text>
			</view>
			<view class="item">
				<image lazy-load src="../../static/public/shop1.png" mode="" class="img img1"></image>
				<text class="txt1">联系电话:</text>
				<text class="txt2">{{storeInfo.tel}}</text>
				<button class="btn" @tap="markPhoneCall()">一键拨打</button>
			</view>
			<view class="item">
				<image lazy-load src="../../static/public/shop2.png" mode="" class="img img1"></image>
				<text class="txt1">店铺地址:</text>
				<text class="txt2">{{storeInfo.city}}{{storeInfo.area}}{{storeInfo.address}}</text>
				<image lazy-load src="../../static/public/arrow.png" class="arrowImg"></image>
			</view>
		</view>
		<!-- 详情 -->
		<view class="info">
			<view class="navwrap">
				<view :class="tab == 1 ? 'active': ''" @tap="changeTab(1)">商品详情</view>
				<view :class="tab == 2 ? 'active': ''" @tap="changeTab(2)">用户评价</view>
			</view>
			<view :class="tab == 1 ? 'productInfo': 'hide'">
				<view class="article">{{storeInfo.desc}}</view>
			</view>
			<view :class="tab == 2 ? 'comment': 'hide'"  v-for="(item ,index) in commentList" :key="index">
				<view class="commentHeader">
					<image lazy-load class="avatar" :src="item.avatar"></image>
					<view class="name">{{item.name}}</view>
					<image lazy-load :class="item.star>=1 ? 'star': 'hide'" :src="imgSrc+'productInfo/star.png'" mode=""></image>
					<image lazy-load :class="item.star>=2 ? 'star': 'hide'" :src="imgSrc+'productInfo/star.png'" mode=""></image>
					<image lazy-load :class="item.star>=3 ? 'star': 'hide'" :src="imgSrc+'productInfo/star.png'" mode=""></image>
					<image lazy-load :class="item.star>=4 ? 'star': 'hide'" :src="imgSrc+'productInfo/star.png'" mode=""></image>
					<image lazy-load :class="item.star>=5 ? 'star': 'hide'" :src="imgSrc+'productInfo/star.png'" mode=""></image>
					<view class="date">{{item.date}}</view>
				</view>
				<view class="commentContent">{{item.content}}</view>
				<view :class="item.commentPic.length>0?'commentPic':'hide'">
					<image lazy-load :src="itemPic" class="pic" v-for="(itemPic ,index) in item.commentPic" :key="index"></image>
				</view>
			</view>
		</view>
		<button v-if="tab==2" class="lookAllReviewBtn">查看全部</button>
	</view>
</template>

<script>
	import './index.scss'
	import {Request} from '../../public/utils.js'
	export default {
		data() {
			return {
				serviceTypeBtn: ['车身美容','内部美容','漆面处理','漆面处理','洗车','贴膜','打蜡'],
				imgSrc: this.$store.state.imgSrc,
				current: 0,
				tab: 1,//商品详情1，用户评价2
				commentList: [
					{
						avatar: '../../static/public/adress1.png',
						name: '张先生',
						star: 2,
						date: '2019-12-25',
						content: '机油收到了，已经购买了几次了，值得信赖的商家，还是一如既往的好，和实体店购买的一样，实惠质量也非常不错！！！！',
						commentPic: ['../../static/public/adress1.png','../../static/public/adress1.png','../../static/public/adress1.png']
					},
					{
						avatar: '../../static/public/adress1.png',
						name: 'x先生',
						star: 3,
						date: '2019-11-25',
						content: 'xxxxxxxx！！！',
						commentPic: []
					},
				],
				storeInfo:[]
			};
		},
		onLoad(e) {
			this.getData(e.id)
		},
		onShow() {
			
		},
		methods:{
			//改变tab值
			changeTab(num){
				this.tab=num
			},
			getData(id){
				Request(
					'store.storeDetail',
					{
						id:id
					}
				)
				.then((res)=>{
					this.storeInfo = res.data.list
				})
				.catch((res)=>{
					
				})
			},
			markPhoneCall(){
				uni.makePhoneCall({
				    phoneNumber: this.storeInfo.tel //仅为示例
				});
			}
		}
	}
</script>

<style lang="scss">
page{
	background-color: #f6f6f6;
}
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
.timeWrap{
	background-color: white;
	margin-top: 20rpx;
	.item{
		display: flex;
		align-items: center;
		height: 98rpx;
		border-bottom: 1px solid #e3e3e3;
		padding: 0 20rpx;
		box-sizing: border-box;
		position: relative;
		.img{
			width: 34rpx;
			height: 32rpx;
			margin-right: 18rpx;
		}
		.img1{
			width: 32rpx;
			margin-right: 20rpx;
		}
		.arrowImg{
			width: 12rpx;
			height: 20rpx;
			position: absolute;
			right: 20rpx;
			top: 40rpx
		}
		.btn{
			width: 160rpx;
			height: 59rpx;
			background-image: linear-gradient(90deg, 
				#6fde39 0%, 
				#46c806 100%), 
			linear-gradient(
				#1eac28, 
				#1eac28);
			background-blend-mode: normal, 
				normal;
			border-radius: 29rpx;
			font-family: PingFang-SC-Medium;
			font-size: 30rpx;
			font-weight: normal;
			font-stretch: normal;
			line-height: 59rpx;
			color: #ffffff;
			position: absolute;
			top: 20rpx;
			right: 20rpx;
		}
		.txt1{
			font-family: PingFang-SC-Medium;
			font-size: 28rpx;
			font-weight: normal;
			font-stretch: normal;
			line-height: 36rpx;
			letter-spacing: 0rpx;
			color: #666666;
		}
		.txt2{
			font-family: PingFang-SC-Medium;
			font-size: 28rpx;
			font-weight: normal;
			font-stretch: normal;
			line-height: 36rpx;
			letter-spacing: 0rpx;
			color: #333333;
			margin-left: 27rpx;
			width: 450rpx;
			overflow:hidden; 
			text-overflow:ellipsis;
			white-space:nowrap;
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
// 评论
		.comment{
			padding-left: 25rpx;
			padding-right: 30rpx;
			box-sizing: border-box;
			padding-bottom: 63rpx;
			padding-top: 30rpx;
			.commentHeader{
				display: flex;
				align-items: center;
				position: relative;
				.avatar{
					width: 60rpx;
					height: 60rpx;
					border-radius: 50%;
				}
				.name{
					margin-left: 19rpx;
					margin-right: 4rpx;
					font-family: PingFang-SC-Medium;
					font-size: 32rpx;
					font-weight: normal;
					font-stretch: normal;
					color: #666666;
				}
				.star{
					width: 28rpx;
					height: 26rpx;
					margin-left: 6rpx;
				}
				.date{
					font-family: PingFang-SC-Medium;
					font-size: 26rpx;
					font-weight: normal;
					font-stretch: normal;
					color: #999999;
					position: absolute;
					right: 0;
					top: 21rpx;
				}
			}
			.commentContent{
				text-align: left;
				margin-top: 19rpx;
				font-family: PingFang-SC-Medium;
				font-size: 28rpx;
				font-weight: normal;
				font-stretch: normal;
				color: #333333;
			}
			.commentPic{
				display: flex;
				justify-content: space-between;
				.pic{
					width: 223rpx;
					height: 223rpx;
					margin-top: 20rpx;
				}
			}
		}
		.lookAllReviewBtn{
			width: 200rpx;
			height: 60rpx;
			background-color: #ffffff;
			border-radius: 30rpx;
			border: solid 1rpx #cacaca;
			line-height: 60rpx;
			font-family: PingFang-SC-Medium;
			font-size: 28rpx;
			font-weight: normal;
			font-stretch: normal;
			letter-spacing: 0rpx;
			color: #333333;
			margin: 0 auto;
			margin-top: 77rpx;
			margin-bottom: 77rpx;
		}
</style>
