<!-- 更多体验 -->
<template>
	<view>
		<view class="itemWrap" @tap="gotoTyInfo(item.id)" v-for="(item) in list" :key="item.id">
			<image class="img" :src="item.images" mode=""></image>
			<view>{{item.title}}</view>
		</view>
	</view>
</template>

<script>
	import {Request} from '../../public/utils.js'
	export default {
		data() {
			return {
				imgSrc: this.$store.state.imgSrc,
				banner: `${this.$store.state.imgSrc}productInfo/banner1.png`,
				page: 1,
				isScroll: true,
				list: [],
			};
		},
		onLoad() {
			
		},
		onShow() {
			this.getList()
		},
		onReachBottom(){
			if (!this.isScroll) {
				uni.showToast({
					title: '已经到底啦',
					icon: 'none'
				})
				return false
			}
			this.getList()
		},
		methods:{
			gotoTyInfo(id){
				uni.navigateTo({
					url: `/pages/tyInfo/tyInfo?static=all&id=${id}`
				})
			},
			getList(){
				Request(
					'index.experience_zone',
					{
						static: 'all',
						page: this.page
					}
				)
				.then((res)=>{	
					if (res.data.error == 0) {
						if (res.data.list.length < 10){
							this.isScroll = false
						}
						if (this.page == 1) {
							this.list = res.data.list
							this.page++
						}else{
							this.list = this.list.concat(res.data.list)
						}
					}
				})
				.catch((res)=>{
					
				})
			}
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
