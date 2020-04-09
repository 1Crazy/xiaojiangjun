<template>
	<view>
		<view class="header">
			<view class="word">买家已支付成功</view>
			<image lazy-load :src="imgSrc+'paysuccess/headerBg.png'" class="img"></image>
		</view>
		<view class="addressWrap">
			<image lazy-load class="img" :src="imgSrc+'public/adress1.png'" mode=""></image>
			<view class="addressInfo">
				<view><text class="name">柚子007</text><text class="phone">13540738352</text></view>
				<view class="address">四川省成都市成华区保和街道云顶山路兴城佳苑2期B区</view>
			</view>
		</view>
		<view class="c-info">
			<product-title
				:img="imgSrc+'productInfo/banner1.png'"
				title="马驰宝汽车机油正品全合成5W-40德国进口奔驰宝马奥迪大众本田4L"
				details="净含量：4L"
				stock="库存：5999件"
				borderBottomStyle='none'
				num=2
			></product-title>
			<view class="description">
				<text class="txt1">共2件商品</text>
				<text class="txt2">合计：</text>
				<text class="txt3">￥976</text>
			</view>
		</view>
		<view class="btnWrap">
			<button>申请退款</button>
		</view>
		<view class="qrcodeWrap">
			<view class="word">到店核销二维码</view>
			<image lazy-load class="img" :src="qrcode"></image>
		</view>
		<view class="guessYourLike">
			<view class="word">猜你喜欢</view>
			<image lazy-load class="img img-l" :src="imgSrc+'paysuccess/zhifu_biaoti_l.png'"></image>
			<image lazy-load class="img img-r" :src="imgSrc+'paysuccess/zhifu_biaoti_r.png'"></image>
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
	import productTitle from '@/components/productTitle/productTitle.vue'
	import './index.scss'
	import { Request } from "../../public/utils.js"
	export default {
		components:{
			productTitle,
		},
		onLoad() {
			this.getData()
		},
		data() {
			return {
				imgSrc: this.$store.state.imgSrc,
				qrcode: `${this.$store.state.imgSrc}index/listpic1.png`,
				listwrap:[]
			};
		},
		methods: {
			gotoProductInfo(info){
				uni.navigateTo({
					url: `/pages/productInfo/productInfo?id=${info}`
				})
			},
			getData(){
				Request(
					'index.get_data'			
				).then((res)=>{
					this.listwrap = res.data.data.goods
					// 成功方法
				})
				.catch((res)=>{
					// 失败方法
				}) 
			}
		}
	}
</script>

<style lang="scss">

</style>
