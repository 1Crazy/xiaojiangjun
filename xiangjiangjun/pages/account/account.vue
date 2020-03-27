<template>
	<view>
		<uni-list>
			<uni-list-item @click="gotoRegisterAccount" title="注册成为会员"></uni-list-item>
			<uni-list-item @click="gotoUpdatePersonalInfomation" title="个人信息完善" note="完善信息得体验券"></uni-list-item>
			<uni-list-item title="积分"></uni-list-item>
			<uni-list-item title="名下邀请客户"></uni-list-item>
		</uni-list>
	</view>
</template>

<script>
	import uniList from "@/components/uni/uni-list/uni-list.vue"
	import uniListItem from "@/components/uni/uni-list-item/uni-list-item.vue"
	export default {
		components: {
			uniList,
			uniListItem,
		},
		data() {
			return {
				
			};
		},
		methods:{
			gotoRegisterAccount(){
				uni.navigateTo({
					url: '/pages/registerAccount/registerAccount'
				})
			},
			gotoUpdatePersonalInfomation(){
				uni.navigateTo({
					url: '/pages/updatePersonalInfomation/updatePersonalInfomation'
				})
			}
		}
	}
</script>

<style lang="scss">

</style>
