<template>
	<view>
		<view class="header">
			<product-title img="../../static/public/goumai_guanbi.png" title='YBM/意奔玛空调滤清YMB3140007空调滤芯空调滤芯' shortTitle='我是短标题' borderBottomStyle='none'></product-title>
		</view>
		<view class="content">
			<view class="ct-header">
				<view class="title">星级评价：</view>
				<image :src="imgSrc+'productInfo/star.png'" mode="" class="star"></image>
				<image :src="imgSrc+'productInfo/star.png'" mode="" class="star"></image>
				<image :src="imgSrc+'productInfo/star.png'" mode="" class="star"></image>
				<image :src="imgSrc+'productInfo/star.png'" mode="" class="star"></image>
				<image :src="imgSrc+'productInfo/star.png'" mode="" class="star"></image>
			</view>
			<view class="txtareaWrap">
				<image src="../../static/public/pen.png" class="img"></image>
				<textarea value="" placeholder="点评一下吧,您的意见很重要哦~" class="txtarea" />
			</view>
			<view class="picWrap">
				<image class="img" src="../../static/public/index-S.png" mode=""></image>
				<image class="img" src="../../static/public/index-S.png" mode=""></image>
				<image class="img" src="../../static/public/index-S.png" mode=""></image>
				<image class="img" src="../../static/public/index-S.png" mode=""></image>
				<!-- 图片以上是循环，图片以下是上传按钮的图片 -->
				<image class="img" src="../../static/public/addpic.png" mode=""></image>
			</view>
		</view>
		<button class="wordBtn">发表评论</button>
	</view>
</template>

<script>
	import { Request } from '../../public/utils.js'
	import productTitle from '@/components/productTitle/productTitle.vue'
	export default {
		components:{
			productTitle
		},
		data() {
			return {
				imgSrc: this.$store.state.imgSrc,
			};
		},
		onLoad(e) {
			console.log(e)
			this.getData(e.id)
		},
		onShow() {
			
		},
		methods:{
			getData(id){
				Request(
					'order.comment',
					{
						id:id
					}
				)
				.then((res)=>{
					
				})
				.catch((res)=>{
					
				})
			}
		}
	}
</script>

<style lang="scss">
page{
	background-color: #f4f4f4;
}
.header{
	padding: 0 21rpx;
	background-color: white;
}
.content{
	width: 750rpx;
	height: 992rpx;
	margin-top: 20rpx;
	background-color: white;
	padding:40rpx 20rpx;
	box-sizing: border-box;
	.title{
		font-family: PingFang-SC-Medium;
		font-size: 30rpx;
		font-weight: normal;
		font-stretch: normal;
		color: #333333;
	}
	.ct-header{
		display: flex;
		.star{
			width: 43rpx;
			height: 40rpx;
			margin-left: 29rpx;
		}
	}
	.txtareaWrap{
		box-sizing: border-box;
		margin-top: 40rpx;
		padding:10rpx 10rpx;
		padding-left: 40rpx;
		width: 100%;
		height: 192rpx;
		box-sizing: border-box;
		position: relative;
		border: 1px solid #f4f4f4;
		.txtarea{
			width: 100%;
			height: 192rpx;
			color: #999999;
		}
		.img{
			position: absolute;
			left: 10rpx;
			top: 14rpx;
			width: 25rpx;
			height: 32rpx;
		}
	}
	.picWrap{
		width: 100%;
		display: flex;
		margin-right: 15rpx;
		flex-wrap: wrap;
		.img{
			width: 162rpx;
			height: 162rpx;
			margin-top: 20rpx;
			margin-right: 15rpx;
		}
	}
}
.wordBtn{
	width: 710rpx;
	height: 88rpx;
	background-image: linear-gradient(90deg, 
		#6fde39 0%, 
		#46c806 100%), 
	linear-gradient(
		#47cfec, 
		#47cfec);
	background-blend-mode: normal, 
		normal;
	border-radius: 44rpx;
	font-family: PingFang-SC-Medium;
	font-size: 30rpx;
	font-weight: normal;
	font-stretch: normal;
	line-height: 88rpx;
	position: fixed;
	bottom: 0;
	left: 20rpx;
	bottom: 20rpx;
	color: white;
}
</style>