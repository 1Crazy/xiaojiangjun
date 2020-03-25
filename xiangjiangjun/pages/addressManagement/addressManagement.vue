<template>
	<view>
		<view class="addrssListWrap">
			<view class="addressList" v-for="(item ,index) in lists" :key="index">
				<view class="top">
					<view>
						<view class="name">{{item.realname}} {{item.mobile}}</view>
						<view class="address">{{item.province}} {{item.city}} {{item.area}} {{item.address}}</view>
					</view>
					<image class="img" :src="imgSrc+'public/dizhi_xiugai.png'" @tap="gotoAddOrUpdateAddress()"></image>
				</view>
				<view class="bottom">
					<label class="radio">
						<radio value="x" /><text class="defaultAddress" style="margin-left: 18rpx;">默认地址</text>
					</label>
					<view class="del">
						<view>删除</view>
						<image class="img" :src="imgSrc+'public/delete.png'"></image>
					</view>
				</view>
			</view>
		</view>
		<view class="btnWrap">
			<button class="addAdressBtn" @tap="gotoAddOrUpdateAddress()">+ 添加地址</button>
		</view>
	</view>
</template>

<script>
	import './index.scss'
	import { Request } from '../../public/utils.js'
	export default {
		data() {
			return {
				imgSrc: this.$store.state.imgSrc,
				lists:[]
			};
		},
		onLoad() {
			this.getData();
		},
		onShow() {
			
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
			gotoAddOrUpdateAddress() {
				uni.navigateTo({
					url: '/pages/addOrUpdateAddress/addOrUpdateAddress'
				})
			}
		}
	}
</script>

<style lang="scss">

</style>
