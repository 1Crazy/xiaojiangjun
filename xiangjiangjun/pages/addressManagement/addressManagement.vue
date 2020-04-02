<template>
	<view>
		<view class="addrssListWrap">
		 <radio-group>
			<view class="addressList" v-for="(item ,index) in lists" :key="index">
				<view class="top">
					<view @tap="chooseAddress(item.id)">
						<view class="name">{{item.realname}} {{item.mobile}}</view>
						<view class="address">{{item.province}} {{item.city}} {{item.area}} {{item.address}}</view>
					</view>
					<image class="img" :src="imgSrc+'public/dizhi_xiugai.png'" @tap="gotoAddOrUpdateAddress(item.id)"></image>
				</view>
					<view class="bottom">
							<label class="radio" @tap="setDefault(item.id)">
								<radio :value="item.id" :checked="item.isdefault==0?false:true"/><text class="defaultAddress" style="margin-left: 18rpx;" >默认地址</text>
							</label>
						<!-- <view class="del">
							<view @tap="delAddress(item.id)">删除</view>
							<image class="img" :src="imgSrc+'public/delete.png'"></image>
						</view> -->
						<view class="del"  @tap="togglePopup(item)">
							<view>删除</view>
							 <!-- @tap="delAddress(item.id)" -->
							<image class="img" :src="imgSrc+'public/delete.png'"></image>
						</view>
					</view>
			</view>
		</radio-group>
		</view>
		<view class="listbtn"></view>
		<view class="btnWrap">
			<button class="addAdressBtn" @tap="gotoAddOrUpdateAddress()">+ 添加地址</button>
		</view>
		<center-popup ref="togglePopupChild" @centerPopupSureBtn="delAddress(currentListItem.id)"></center-popup>
	</view>
</template>

<script>
	import './index.scss'
	import { Request } from '../../public/utils.js'
	import centerPopup from '@/components/centerPopup/centerPopup.vue'
	export default {
		components: {
			centerPopup,
		},
		data() {
			return {
				imgSrc: this.$store.state.imgSrc,
				lists:[]
			};
		},
		onLoad() {
			
		},
		onShow() {
			this.getData();
		},
		methods: {
			// 
			getData(){
				const that = this;
				
				Request(
					'member.address.get_list'
				).then((res)=>{
					console.log(res)
					// 成功方法
					this.lists = res.data.list
				})
				.catch((res)=>{
					// 失败方法
				})
			},
			gotoAddOrUpdateAddress(id=null) {
				uni.navigateTo({
					url: '/pages/addOrUpdateAddress/addOrUpdateAddress?id='+id
				})
			},
			delAddress(id){
				Request(
					'member.address.delete',
					{
						id:id
					}
				).then((res)=>{
					console.log(res)
					// 成功方法
					this.getData()
				})
				.catch((res)=>{
					// 失败方法
				})
			},
			setDefault(id){
				Request(
					'member.address.set_default',
					{
						id:id
					}
				).then((res)=>{
					console.log(res)
					
					// 成功方法
					// this.getData()
				})
				.catch((res)=>{
					// 失败方法
				})
			},
			chooseAddress(id){
				// console.log(id)
				var pages = getCurrentPages();
				// var nowPage = pages[pages.length -1]
				var prevPage = pages[pages.length - 2];  
				prevPage.$vm.chooseAddress = id 
				uni.navigateBack();
			},
			// 弹出删除模态框
			togglePopup(item) {
				this.currentListItem = item
				this.$refs.togglePopupChild.togglePopup()
			},
		}
	}
</script>

<style lang="scss">

</style>
