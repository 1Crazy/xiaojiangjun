<template>
	<view>
		<view class="itemWrap">
			<view class="name">商户名称:</view>
			<input class="ipt" type="text" v-model="cooperationInfo.merchaname" placeholder="请输入商户名称">
		</view>
		<view class="itemWrap">
			<view class="name">姓名:</view>
			<input class="ipt" type="text" v-model="cooperationInfo.realname" placeholder="请输入姓名">
		</view>
		<view class="itemWrap">
			<view class="name">电话号码:</view>
			<input class="ipt" type="text" v-model="cooperationInfo.mobile" placeholder="请输入电话号码">
		</view>
		<!-- <view class="itemWrap">
			<view class="name">类型:</view>
			<picker class="ipt" @change="bindPickerChange" :value="index" :range="array">
				<view>{{index == null ? '请输入主营产品/服务' : array[index]}}</view>
			</picker>
		</view> -->
		<view class="itemWrap">
			<view class="name">主营项目/服务:</view>
			<input class="ipt" type="text" v-model="cooperationInfo.salecate" placeholder="请输入类型">
		</view>
		
		<!-- <view class="itemWrap">
			<view class="name">地址:</view>
			<input class="ipt" type="text" v-model="cooperationInfo.address" placeholder="地址">
		</view> -->
		
		<view class="itemWrap">
			<view class="name">用户名:</view>
			<input class="ipt" type="text" v-model="cooperationInfo.uname" placeholder="用户名">
		</view>
		
		<view class="itemWrap">
			<view class="name">密码:</view>
			<input class="ipt" type="password" v-model="cooperationInfo.upass" placeholder="密码">
		</view>
		<view style="height: 120rpx;"></view>
		
		<button class="btn" @tap="sumbit()">提交</button>
	</view>
</template>

<script>
	import {Request,VerifyPhoneNumber} from "../../public/utils.js"
	import _app from '../../js_sdk/QuShe-SharerPoster/util/QS-SharePoster/app.js';
	export default {
		data() {
			return {
				array: ['普通用户','汽修厂家','汽配厂家'],
				index: 0,
				cooperationInfo:{
					merchaname :"",
					salecate :"",
					realname :"",
					mobile :"",
					uname:"",
					upass:""
				}
			};
		},
		methods:{
			bindPickerChange: function(e) {
				this.index = e.target.value
				this.cooperationInfo.type = e.target.value
			},
			sumbit(){
				console.log(this.cooperationInfo)
				if(!VerifyPhoneNumber(this.cooperationInfo.mobile)){
					_app.showToast('电话格式不正确')
				}else if(this.cooperationInfo.salecate=='' || this.cooperationInfo.realname=='' || this.cooperationInfo.mobile=='' || this.cooperationInfo.uname=='' || this.cooperationInfo.upass==''){
					_app.showToast('请完善信息')
				}
				else{
					Request(
						'changce.merch.apply',
						{
							merchname :this.cooperationInfo.merchaname,
							salecate :this.cooperationInfo.salecate,
							realname :this.cooperationInfo.realname,
							mobile :this.cooperationInfo.mobile,
							uname:this.cooperationInfo.uname,
							upass:this.cooperationInfo.upass
						},
						"POST",
						"application/x-www-form-urlencoded"
					)
					.then((res)=>{
						console.log(res)
						if(res.data.status==1){
							_app.showToast('提交成功');
						}else{
							_app.showToast(res.data.message);
						}
					})
					.catch((res)=>{
						
					})
				}
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
