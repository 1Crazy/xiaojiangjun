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
			<uni-list v-if="!orderInfo.address">
				<uni-list-item title="添加收货地址"></uni-list-item>
			</uni-list>
			<view class="address-info" v-if="orderInfo.address" @tap="gotoAddressManagement">
				<view class="top">
					<view class="name">{{orderInfo.address.realname}}</view>
					<view class="phone">{{orderInfo.address.mobile}}</view>
				</view>
				<uni-list>
					<uni-list-item notHighLight :title="orderInfo.address.city+orderInfo.address.area+orderInfo.address.address"></uni-list-item>
				</uni-list>
			</view>
		</view>
		<view class="c-info" v-for="(item , index) in goods" :key="index">
			<product-title
				:img="item.thumb"
				:title="item.title"
				:details="'净含量：'+item.weight+'克'"
				:stock="'库存：'+item.kucun+'件'"
			></product-title>
			<view class="c-bottom" v-if="item.optiontitle">
				<view class="c-b-word">产品规格</view>
				<view class="r-wrap-c">{{item.optiontitle}}</view>
			</view>
			<view class="c-bottom">
				<view class="c-b-word">购买数量</view>
				<view class="r-wrap">
					<button class="symbol" @tap="delNum(index)">-</button>
					<input class="ipt" type="number" v-model="item.total" />
					<button class="symbol" @tap="addNum(index)">+</button>
				</view>
			</view>
			<view class="totalPrice">
				<text class="txt1">共{{item.total}}件商品</text>
				<text class="txt2">合计：</text>
				<text class="txt3">￥{{item.marketprice*item.total}}</text>
			</view>
			<!-- <view class="integral">
				<view class="leftWord">可用560个积分抵用5.60元</view>
				<radio value="r1" :checked="false" class="radio"/>
			</view> -->
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
				<view class="txt2">￥{{orderInfo.realprice}}</view>
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
				isStoreName: false, // 是否到店自提
				isAdress: true, // 控制快递地址
				productNum: 1,
				orderInfo:[],
				goods:[],
				chooseAddress:'',
				aa:'',
				bb:''
			};
		},
		onLoad(options) {
			this.id = options.id;
			this.num = options.num;
			this.optionid = options.optionid;
			this.getData(this.id,this.num,this.optionid);
		},
		onShow(e) {
			console.log(this.chooseAddress)
			if(this.chooseAddress==''){
				console.log('不是返回进入')
			}else{
				console.log('返回进入')
				// this.updataOrder();
			}
		},
		methods:{
			delNum(id){
				// console.log(id,this.goods[id][total])
				this.goods[id]['total'] = Number(this.goods[id]['total']) - 1
				this.updataOrder();
			},
			addNum(id){
				// 
				// console.log(id,this.goods[id]['total'])
				this.goods[id]['total'] = Number(this.goods[id]['total']) + 1
				this.updataOrder();
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
				// Request(
				// 	'order.create',
				// 	{
				// 		id:id,
				// 		total:num,
				// 		optionid:optionid
				// 	}
				// ).then((res)=>{
					
				// })
				// .catch((res)=>{
				// 	// 失败方法
				// })
				uni.navigateTo({
					url: '/pages/paySuccess/paySuccess'
				})
			},
			getData(id='',num='',optionid=''){
				Request(
					'order.create',
					{
						id:id,
						total:num,
						optionid:optionid
					}
				).then((res)=>{
					
					// 成功方法
					// this.aa = JSON.stringify(res)
					// this.bb = JSON.parse(this.aa)
					this.orderInfo = res.data
					this.goods = res.data.goods[0]['goods']
					// this.goods = Array.from(res.data.goods[0]['goods'])
				})
				.catch((res)=>{
					// 失败方法
				})
			},
			updataOrder(){
				console.log(this.goods)
				Request(
					'order.create.caculate',
					{
						goods: JSON.stringify(this.goods),
						addressid: this.chooseAddress ? this.chooseAddress : this.orderInfo.address.id,//选择收货地址id
						packageid: this.orderInfo.packageid,
						discountprice: this.orderInfo.discountprice,
						dflag:""//0自提 1快递
					},
					'POST',
					'application/x-www-form-urlencoded'
				).then((res)=>{
					console.log(res)
					this.getData()
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
