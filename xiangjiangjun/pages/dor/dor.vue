<template>
	<view>
		<view class="headerWrap">
			<view class="header">
				<input class="ipt" type="text" :value="serchName" @input="find" placeholder="搜索您要找的门店名称" />
				<image lazy-load :src="imgSrc+'public/fdj1.png'" class="img"></image>
			</view>
		</view>
		<view class="nav" v-if="isUser">
			<view :class="cutDorStoreSortNum == 1 ? 'tit1 active' : 'tit1'" @tap="cutDorStoreSort(1)">综合排序</view>
			<view :class="cutDorStoreSortNum == 2 ? 'tit2 active' : 'tit2'"  @tap="cutDorStoreSort(2)">距离</view>
		</view>
		<ss-scroll-navbar  v-if="!isUser" :navArr="navList" :tabCurrentIndex="currentIndex" @navbarTap="navbarTapHandler"></ss-scroll-navbar>
		<view class="content" v-if="isUser">
			<view class="itemView" v-for="(item ,index) in liststores" :key="index" @tap="listStoresClick(item.id)">
				<image lazy-load :src="item.logo" class="img"></image>
				<view class="rightBox">
					<view class="title">{{item.storename}}</view>
					<view class="center">
						<view v-for="(item ,index) in item.store_services" :key="index">{{item.service_name}}</view>
					</view>
					<view class="distance">{{item.distance}}km</view>
				</view>
				<image lazy-load class="threedot" :src="imgSrc+'public/threeDot.png'"></image>
			</view>
		</view>
		<view class="content2" v-if="!isUser">
			<view class="itemWrap" v-for="(item ,index ) in chooselist" :key="index">
				<product-title class="listItem" :img="item.logo" :title='item.name' priceColor="#ff9000" :price="item.marketprice" :originPrice="item.productprice" :shortTitle='item.shorttitle' borderBottomStyle='none'></product-title>
				<button @tap="goodsDetail(item.id)">购买</button>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex';
	import { Request } from '../../public/utils.js'
	import ssScrollNavbar from '@/components/ss-scroll-navbar/ss-scroll-navbar.vue'
	import productTitle from '@/components/productTitle/productTitle.vue'
	export default {
		components:{
		    ssScrollNavbar,
			productTitle
		},
		data() {
			return {
				imgSrc: this.$store.state.imgSrc,
				liststores:[],
				longitude:'',
				latitude:'',
				// 区分汽修厂家与终端用户 true终端用户，false为汽修厂家
				isUser: true,
				cutDorStoreSortNum: 1,  // 1是门店，2是距离
				// 索引
				currentIndex: 0,
				// 导航
				navList: [
					{
						title: '机油',
						url: '机油'
					}
				],
				chooselist:[] ,//当前分类子菜单列表
				page:1,
				serchName: '',
				choTit:false
			}
		},
		onLoad(options) {
			if (options.services){
				this.serchName = options.services
				this.getStores(options.services)
			}
		},
		computed:{
			...mapState(["userInfo"])
		},
		onShow(){
			console.log(this.userInfo.groupid,'a')
			if(this.userInfo.groupid != '' && this.userInfo.groupid){
				this.isUser = false
			}
			
			let title = '门店/商家'
			this.isUser ? title = '门店/商家' : title = '汽车配件'
			uni.setNavigationBarTitle({
			    title
			});
			
			this.isUser ? this.getLocation() : this.getGoodsData()
		},
		methods: {
			// 切换综合商家和距离的方法
			cutDorStoreSort(num){
				this.cutDorStoreSortNum = num
				this.choTit = true
				this.page = 1
				if(num==1){
					this.getStores(this.serchName,'1')
				}else{
					this.getStores(this.serchName,'2')
				}
				console.log('a')
			},
			navbarTapHandler (index) {
				console.log(index,'index')
				this.currentIndex = index;
				this.chooselist = this.navList[index].subCategoryList;//赋值给当前菜单列表
			},
			getLocation(){
				const that = this;
				wx.getLocation({
					type: 'gcj02 ',
					success (res) {
						that.longitude = res.longitude
						that.latitude = res.latitude
						// that.getStores();
						that.getStores(that.serchName);
					}
				})
			},
			// orby = 1是综合排序，2是距离排序
			getStores(findkey='',orby='1'){
				const that = this;
				Request(
					'store.get_stores',
					{
						lng:that.longitude,
						lat:that.latitude,
						findkey:findkey,
						orby:orby,
						page:this.page
					}
				).then((res)=>{
					console.log(res)
					
					if(this.choTit){
						this.liststores = res.data.list
						this.choTit = false
					}else{
						this.liststores = this.liststores.concat(res.data.list)
					}
					// 成功方法
				})
				.catch((res)=>{
					// 失败方法
				})
			},
			find(e){
				this.choTit = true
				this.serchName = e.detail.value
				this.isUser ? this.getStores(e.detail.value,this.cutDorStoreSortNum) : this.getGoodsData(e.detail.value,this.cutDorStoreSortNum)
			},
			onReachBottom() {
				this.page = this.page+1
				this.getStores(this.serchName,this.cutDorStoreSortNum)
			},
			getGoodsData(findkey=''){
				Request(
					'goods.get_bycategory',
					{
						findkey:findkey,
						type:2,
						page:this.page
					}
				)
				.then((res)=>{
					this.navList = res.data.categoryList//返回总数组
					this.chooselist = this.navList[0].subCategoryList;//第一个菜单列表
					
					// this.chooselist = this.chooselist.concat(res.data.categoryList[this.currentIndex].subCategoryList) ;//赋值给当前菜单列表
					
				})
				.catch((res)=>{
					// 失败方法
				})
			},
			goodsDetail(id){
				uni.navigateTo({
					url: `/pages/productInfo/productInfo?id=${id}`
				})
			},
			// 进入门店详情
			listStoresClick(id){
				uni.navigateTo({
					url: '/pages/dorInfo/dorInfo?id='+id
				})
			}
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #f6f6f6;
	}
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
//导航
.nav{
	display: flex;
	padding: 24rpx 30rpx;
	background-color: white;
	.tit1{
		font-family: PingFang-SC-Medium;
		font-size: 30rpx;
		font-weight: normal;
		font-stretch: normal;
		color: #999999;
	}
	.tit2{
		font-family: PingFang-SC-Medium;
		font-size: 30rpx;
		font-weight: normal;
		font-stretch: normal;
		color: #999999;
		margin-left: 78rpx;
	}
	.active{
		color: #1db728;
		font-family: PingFang-SC-Bold;
	}
}
//列表
.content{
	margin-top: 20rpx;
	.itemView{
		width: 750rpx;
		height: 202rpx;
		background-color: #ffffff;
		padding: 21rpx 14rpx;
		box-sizing: border-box;
		position: relative;
		display: flex;
		.img{
			width: 160rpx;
			height: 160rpx;
			border-radius: 10rpx;
		}
		.rightBox{
			margin-left: 20rpx;
			.title{
				font-family: PingFang-SC-Bold;
				font-size: 32rpx;
				font-weight: normal;
				font-stretch: normal;
				color: #333333;
			}
			.center{
				display: flex;
				margin-top: 20rpx;
				margin-bottom: 34rpx;
				view{
					width: 66rpx;
					height: 32rpx;
					background-color: #f4f4f4;
					border-radius: 16rpx;
					font-family: PingFang-SC-Medium;
					font-size: 22rpx;
					margin-right: 10rpx;
					font-weight: normal;
					font-stretch: normal;
					text-align: center;
					color: #474747;
				}
			}
			.distance{
				font-family: PingFang-SC-Medium;
				font-size: 28rpx;
				font-weight: normal;
				font-stretch: normal;
				color: #666666;
			}
		}
		.threedot{
			position: absolute;
			right: 30rpx;
			top: 98rpx;
			width: 34rpx;
			height: 8rpx;
		}
	}
}
.content2{
	.itemWrap{
		background-color: white;
		padding: 0 20rpx;
		box-sizing: border-box;
		padding-top:30rpx;
		margin-bottom: 20rpx;
		position: relative;
		&:last-child{
			margin-bottom: 0;
		}
		button{
			position: absolute;
			bottom: 20rpx;
			right: 20rpx;
			width: 140rpx;
			height: 54rpx;
			background-image: linear-gradient(90deg, 
				#6fde39 0%, 
				#46c806 100%), 
			linear-gradient(
				#1eac28, 
				#1eac28);
			background-blend-mode: normal, 
				normal;
			border-radius: 27rpx;
			font-family: PingFang-SC-Bold;
			font-size: 30rpx;
			font-weight: normal;
			font-stretch: normal;
			line-height: 54rpx;
			letter-spacing: 0rpx;
			color: #fffefe;
		}
	}
}
</style>
