<template>
	<view>
		<view class="headerWrap">
			<view class="header">
				<input class="ipt" type="text" value="" placeholder="搜索您要找的门店名称" />
				<image lazy-load :src="imgSrc+'public/fdj1.png'" class="img"></image>
			</view>
		</view>
		<view class="listWrap" v-for="(item ,index) in list" :key="index">
			<view>
				<view class="distance">{{item.distance}}km</view>
				<view class="storeName">{{item.storename}}</view>
			</view>
			<button type="default" class="btn" @tap="chooseStore(index)">确定</button>
		</view>
		
		<button v-if="nomore" type="default" class="lookMore" @tap="moreData()">查看更多</button>
	</view>
</template>

<script>
	import './index.scss'
	import { Request } from '../../public/utils.js'
	export default {
		data() {
			return {
				imgSrc: this.$store.state.imgSrc,
				list:[],
				page:1,
				nomore:true
			};
		},
		onLoad() {
			this.getLocation()
		},
		onShow() {
			
		},
		methods:{
			getData(){
				const that = this;
				Request(
					'store.get_stores',
					{
						lng:that.longitude,
						lat:that.latitude
					}
				).then((res)=>{
					// console.log(res)
					// 成功方法
					that.list = res.data.list
				})
				.catch((res)=>{
					// 失败方法
				})
			},
			getLocation(){
				const that = this;
				wx.getLocation({
					type: 'gcj02 ',
					success (res) {
						that.longitude = res.longitude
						that.latitude = res.latitude
						that.getData();
					}
				})
			},
			moreData(){
				// console.log(this.page+1)
				this.page = this.page+1
				// console.log( this.list)
				Request(
					'store.get_stores',
					{
						lng:this.longitude,
						lat:this.latitude,
						page:this.page
					}
				).then((res)=>{
					// console.log(res)
					// 成功方法
					if(res.data.list==''){
						this.nomore=false;
					}else{
						// this.lists = res.data.list
						this.list = this.list.concat(res.data.list)
					}
					
				})
				.catch((res)=>{
					// 失败方法
				})
			},
			chooseStore(index){
				
				
				console.log(this.list[index])
				var pages = getCurrentPages();
				// var nowPage = pages[pages.length -1]
				var prevPage = pages[pages.length - 2];  
				prevPage.$vm.chooseStore = this.list[index]['id'] 
				prevPage.$vm.chooseAddress = ''
				prevPage.$vm.storeName = this.list[index]['address']+this.list[index]['storename']+'店',
				prevPage.$vm.checkToPay = true
				prevPage.$vm.isStoreName = true
				prevPage.$vm.isAdress = false
				prevPage.$vm.orderInfo.address = false
				uni.navigateBack();
			},
		}
	}
</script>

<style lang="scss">

</style>
