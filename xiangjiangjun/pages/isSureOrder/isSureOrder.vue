<template>
	<view>
		<view class="header">
			<view class="h-title">收货方式</view>
			<uni-list>
			    <uni-list-item title="标题文字" thumb=""></uni-list-item>
			</uni-list>
		</view>
		
	</view>
</template>

<script>
	import uniList from "@/components/uni/uni-list/uni-list.vue"
	import uniListItem from "@/components/uni/uni-list-item/uni-list-item.vue"
	import './index.scss'
	export default {
		components: {
			uniList,
			uniListItem
		},
		data() {
			return {
				imgSrc: this.$store.state.imgSrc,
			};
		}
	}
</script>

<style lang="scss">

</style>
