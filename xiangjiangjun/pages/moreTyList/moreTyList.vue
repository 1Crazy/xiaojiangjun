<!-- 更多体验 -->
<template>
	<view>
		<view class="itemWrap" @tap="gotoTyInfo">
			<image class="img" :src="banner" mode=""></image>
			<view>保险客户体验区</view>
		</view>
		<view class="itemWrap" @tap="gotoTyInfo">
			<image class="img" :src="banner" mode=""></image>
			<view>保险客户体验区</view>
		</view>
		<view class="itemWrap" @tap="gotoTyInfo">
			<image class="img" :src="banner" mode=""></image>
			<view>保险客户体验区</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imgSrc: this.$store.state.imgSrc,
				banner: `${this.$store.state.imgSrc}productInfo/banner1.png`,
			};
		},
		methods:{
			gotoTyInfo(){
				uni.navigateTo({
					url: '/pages/tyInfo/tyInfo'
				})
			},
		}
	}
</script>

<style lang="scss">
.itemWrap{
	width: 710rpx;
	height: 200rpx;
	margin: 0 auto;
	margin-bottom: 20rpx;
	position: relative;
	.img{
		width: 710rpx;
		height: 200rpx;
		position: absolute;
		top: 0;
		left: 0;
	}
	view{
		font-size: 32rpx;
		position: absolute;
		top: 50rpx;
		left: 80rpx;
		color: white;
	}
}
</style>
