<template>
	<view>
		<view class="addrssListWrap">
			<view class="addressList">
				<view class="top">
					<view>
						<view class="name">王雨涵 135****8350</view>
						<view class="address">四川省 成都市 成华区 圣灯路xx号</view>
					</view>
					<image class="img" :src="imgSrc+'public/delete.png'"></image>
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
			<view class="addressList">
				<view class="top">
					<view>
						<view class="name">王雨涵 135****8350</view>
						<view class="address">四川省 成都市 成华区 圣灯路xx号</view>
					</view>
					<image class="img" :src="imgSrc+'public/delete.png'"></image>
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
			<view class="addressList">
				<view class="top">
					<view>
						<view class="name">王雨涵 135****8350</view>
						<view class="address">四川省 成都市 成华区 圣灯路xx号</view>
					</view>
					<image class="img" :src="imgSrc+'public/delete.png'"></image>
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
			<button class="addAdressBtn">+ 添加地址</button>
		</view>
	</view>
</template>

<script>
	import './index.scss'
	export default {
		data() {
			return {
				imgSrc: this.$store.state.imgSrc,
			};
		}
	}
</script>

<style lang="scss">

</style>
