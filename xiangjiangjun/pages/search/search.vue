<template>
	<view>
		<view class="headerWrap">
			<view class="header">
				<input class="ipt" type="text" :value="searchName" @input="find" placeholder="搜索附近商品" />
				<image lazy-load :src="imgSrc+'public/fdj1.png'" class="img"></image>
			</view>
		</view>
		<!-- 商品列表 -->
		<view class='nav-word'>
			<view class="word">商品列表    </view>
			<image lazy-load class="img" :src="imgSrc+'public/arrow.png'"></image>
		</view>
		<!-- 列表详情 -->
		<view class="bggreay">
			<view class="listwrap"  v-for="(item ,index) in listwrap" :key="index" @tap="gotoProductInfo(item.id)">
				 <image lazy-load class="img" :src='item.thumb'></image>
				 <view class="rightbox">
					 <view class="title">{{item.title}}</view>
					 <view class="shorttitle">{{item.shorttitle}}</view>
					 <image lazy-load :src="imgSrc+'index/add.png'" class="addimg"></image>
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
	import {
		mapState,
		mapMutations
	} from 'vuex';
	import { Request } from "../../public/utils.js"
	
	export default {
		data() {
			return {
				imgSrc: this.$store.state.imgSrc,
				searchName: '',
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
			};
		},
		computed:{
			...mapState(["cityName"])
		},
		onShow(){
			this.getList()
		},
		methods:{
			getList(){
				Request(
					'index.get_data',
					{
						cityWord: this.cityName,
						keyWord: this.searchName
					}
				).then((res)=>{
					console.log(res)
					if (res.data.error == 0) {
						this.info = res.data.data.info
						this.listwrap = res.data.data.goods
						this.ad = res.data.data.ad
					}
					// 成功方法
				})
				.catch((res)=>{
					// 失败方法
				}) 
			},
			find(){
				this.getList()
			}
		},
	}
</script>

<style lang="scss">
.headerWrap{
	background-color: white;
	padding: 20rpx;
	.header{
		background-color: #f8f8f8;
		position: relative;
		width: 710rpx;
		border-radius: 40rpx;
		height: 80rpx;
		.ipt{
			width: 710rpx;
			height: 80rpx;
			background-color: #f2f2f2;
			border-radius: 40rpx;
			border: solid 1rpx #e3e3e3;
			line-height: 80rpx;
			font-family: PingFang-SC-Regular;
			font-size: 28rpx;
			font-weight: normal;
			font-stretch: normal;
			color: #999999;
			padding-left: 101rpx;
			padding-right: 29rpx;
			box-sizing: border-box;
			margin: 0 auto;
		}
		.img{
			position: absolute;
			width: 40rpx;
			height: 33rpx;
			left:29rpx;
			top: 23rpx;
		}
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
			border: 1px solid #e3e3e3;
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
