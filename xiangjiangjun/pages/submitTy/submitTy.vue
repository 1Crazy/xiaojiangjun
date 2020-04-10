<!-- 提交体验 -->
<template>
	<view>
		<view class="itemWrap">
			<view class="name">姓名:</view>
			<input class="ipt" type="text" v-model="name" placeholder="请输入姓名">
		</view>
		<view class="itemWrap">
			<view class="name">电话号码:</view>
			<input class="ipt" type="text" v-model="moblie" placeholder="请输入电话号码">
		</view>
		<view class="itemWrap">
			<view class="name">保单号:</view>
			<input class="ipt" type="text" v-model="policy" placeholder="请输入保单号">
		</view>
		
		<button class="btn" @tap="sumbit()">提交</button>
	</view>
</template>

<script>
	import {Request,VerifyPhoneNumber} from "../../public/utils.js"
	import _app from '../../js_sdk/QuShe-SharerPoster/util/QS-SharePoster/app.js';
	export default {
		data() {
			return {
				name: '',
				moblie: '',
				policy:'',
				id: null
			};
		},
		onLoad(options){
			if(options.id){
				this.id = options.id
			}
		},
		methods:{
			sumbit(){
				if (this.name.trim() == ''){
					_app.showToast('姓名未填写')
					return false
				}
				console.log(this.moblie,'this.mobile')
				console.log(VerifyPhoneNumber(+this.moblie))
				if(!VerifyPhoneNumber(this.moblie)){
					_app.showToast('电话格式不正确')
					return false
				}
				if (this.policy.trim() == ''){
					_app.showToast('保单号未填写')
					return false
				}
				if (this.policy.trim().length > 50){
					_app.showToast('保单号不能超过50位')
					return false
				}
					Request(
						'changce.merch.apply',
						{
							mobile: this.mobile,
							name: this.name,
							policy: this.policy,
							id: this.id
						},
						"GET",
					)
					.then((res)=>{
						console.log(res)
						if(res.data.error==0){
							_app.showToast('提交成功');							
							setTimeout(()=>{
								uni.navigateBack({})
							}, 2000)
						}
					})
					.catch((res)=>{
						
					})
			}
		}
	}
</script>

<style lang="scss">
page{
	background-color: white;
}
.itemWrap{
	margin-top: 40rpx;
	padding: 0 30rpx;
	.name{
		font-family: PingFang-SC-Bold;
		font-size: 32rpx;
		font-weight: normal;
		font-stretch: normal;
		color: #333333;
	}
	.ipt{
		width: 690rpx;
		height: 100rpx;
		background-color: #f9f9f9;
		border-radius: 10rpx;
		border: solid 1rpx #cccccc;
		font-family: PingFang-SC-Medium;
		font-size: 30rpx;
		font-weight: normal;
		font-stretch: normal;
		line-height: 100rpx;
		letter-spacing: 0rpx;
		color: #999999;
		padding: 0 20rpx;
		margin-top: 30rpx;
		box-sizing: border-box;
	}
}
.btn{
	position: fixed;
	width: 710rpx;
	height: 88rpx;
	background-image: linear-gradient(90deg, 
		#6fde39 0%, 
		#46c806 100%), 
	linear-gradient(
		#47cfec, 
		#47cfec);
	background-blend-mode: normal, 
		normal;
	border-radius: 44rpx;
	font-family: PingFang-SC-Bold;
	font-size: 30rpx;
	font-weight: normal;
	font-stretch: normal;
	line-height: 88rpx;
	letter-spacing: 0rpx;
	color: #ffffff;
	bottom: 20rpx;
	left: 20rpx;
}
</style>
