<template>
	<view>
		<view class="headerWrap">
			<view class="header">
				<input class="ipt" type="text" value="" placeholder="搜索您要找的门店名称" />
				<image :src="imgSrc+'public/fdj1.png'" class="img"></image>
			</view>
		</view>
		<view class="listWrap">
			<view>
				<view class="distance">1.5km</view>
				<view class="storeName">成都市高新区环球店</view>
			</view>
			<button type="default" class="btn">确定</button>
		</view>
		<view class="listWrap">
			<view>
				<view class="distance">1.5km</view>
				<view class="storeName">成都市高新区环球店</view>
			</view>
			<button type="default" class="btn">确定</button>
		</view>
		<view class="listWrap">
			<view>
				<view class="distance">1.5km</view>
				<view class="storeName">成都市高新区环球店</view>
			</view>
			<button type="default" class="btn">确定</button>
		</view>
		<button type="default" class="lookMore">查看更多</button>
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
