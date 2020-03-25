<template>
	<view>
		<view class="header">
			<view class="h-title">收货方式</view>
			<uni-list>
			    <uni-list-item title="到店自提" :thumb="imgSrc+'public/shop-icon.png'" @click="gotoDorPages"></uni-list-item>
			</uni-list>
			<view class="storeName" v-if="isStoreName">成都市高新区环球店</view>
			<uni-list>
			    <uni-list-item title="快递邮寄" :show-arrow="false" notHighLight :thumb="imgSrc+'public/adress1.png'"></uni-list-item>
			</uni-list>
			<uni-list v-if="!isAdress">
				<uni-list-item title="添加收货地址"></uni-list-item>
			</uni-list>
			<view class="address-info" v-if="isAdress" @tap="gotoAddressManagement">
				<view class="top">
					<view class="name">柚子007</view>
					<view class="phone">13540738352</view>
				</view>
				<uni-list>
					<uni-list-item notHighLight title="四川省成都市成华区保和街道云顶山路兴城佳苑2期B区"></uni-list-item>
				</uni-list>
			</view>
		</view>
		<view class="c-info">
			<product-title
				:img="imgSrc+'productInfo/banner1.png'"
				title="马驰宝汽车机油正品全合成5W-40德国进口奔驰宝马奥迪大众本田4L"
				details="净含量：4L"
				stock="库存：5999件"
			></product-title>
			<view class="c-bottom">
				<view class="c-b-word">产品规格</view>
				<view class="r-wrap-c">我是规格</view>
			</view>
			<view class="c-bottom">
				<view class="c-b-word">购买数量</view>
				<view class="r-wrap">
					<button class="symbol" @tap="delNum()">-</button>
					<input class="ipt" type="text" v-model="productNum" />
					<button class="symbol" @tap="addNum()">+</button>
				</view>
			</view>
			<view class="totalPrice">
				<text class="txt1">共2件商品</text>
				<text class="txt2">合计：</text>
				<text class="txt3">￥466</text>
			</view>
			<view class="integral">
				<view class="leftWord">可用560个积分抵用5.60元</view>
				<radio value="r1" :checked="false" class="radio"/>
			</view>
			<view class="y-h-q">
				<view>
					<text class="txt1">优惠券：</text>
					<text class="txt2">满300减10元</text>
				</view>
				<view>
					<text class="txt3">-￥10</text>
					<image :src="imgSrc+'public/arrow.png'"></image>
				</view>
			</view>
		</view>
		<view style="height: 116rpx;"></view>
		<view class="b-footer">
			<view class="txtWrap">
				<view class="txt1">合计</view>
				<view class="txt2">￥960.4</view>
			</view>
			<button type="default" class="btn" @tap="pay">立即支付</button>
		</view>
	</view>
</template>

<script>
	import uniList from "@/components/uni/uni-list/uni-list.vue"
	import uniListItem from "@/components/uni/uni-list-item/uni-list-item.vue"
	import productTitle from '@/components/productTitle/productTitle.vue'
	import './index.scss'
	import { Request } from '../../public/utils.js'
	
	export default {
		components: {
			uniList,
			uniListItem,
			productTitle
		},
		data() {
			return {
				imgSrc: this.$store.state.imgSrc,
				isStoreName: true, // 是否到店自提
				isAdress: true, // 控制快递地址
				productNum: 1,
			};
		},
		onLoad(e) {
			console.log(e)
			this.id = e.id;
			this.num = e.num;
			this.getData();
		},
		onShow() {
			
		},
		methods:{
			delNum(){
				if (this.productNum > 1) {
					this.productNum--
				}
			},
			addNum(){
				if (this.productNum < 200) {
					this.productNum++
				}
			},
			// 门店页跳转
			gotoDorPages(){
				uni.navigateTo({
					url: '/pages/chooiseStoreName/chooiseStoreName'
				})
			},
			// 地址页面跳转
			gotoAddressManagement(){
				uni.navigateTo({
					url: '/pages/addressManagement/addressManagement'
				})
			},
			// 支付
			pay() {
				// 支付成功后页面跳转
				uni.navigateTo({
					url: '/pages/paySuccess/paySuccess'
				})
			},
			getData(){
				Request(
					'order.create',
					{
						openid:'sns_wa_o2iWn5Dqvh1NHnN_bjPpi8pKphWs',
						id:this.id,
						total:this.num
					}
				).then((res)=>{
					console.log(res)
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
