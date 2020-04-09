<template>
	<view>
		<view class="iptWrap">
			<view class="name">姓名</view>
			<input class="ipt" type="text" v-model="addrss.realname" placeholder="请输入姓名"/>
		</view>
		<view class="iptWrap">
			<view class="name">手机号码</view>
			<input class="ipt" type="text" v-model="addrss.mobile" placeholder="请输入联系方式"/>
		</view>
		<view class="iptWrap">
			<view class="name">所在地区</view>
			<!-- 不兼容支付宝小程序,当mode=region时 -->
			<picker class="ipt" mode="region" @change="bindMultiPickerChange" @columnchange="bindMultiPickerColumnChange">
				<view class="picker">
					<!-- {{multiArray[0][multiIndex[0]]}}，{{multiArray[1][multiIndex[1]]}}，{{multiArray[2][multiIndex[2]]}} -->
					{{addrss.province}}{{addrss.city}}{{addrss.area}}
				</view>
			</picker>
			<image lazy-load class="img" :src="imgSrc+'public/arrow.png'" mode=""></image>
		</view>
		<view class="iptWrap">
			<view class="name">详细地址</view>
			<input class="ipt" type="text" v-model="addrss.address" placeholder="请输入详细地址"/>
		</view>
		
		<button class="saveBtn" @tap="addAddress">保存</button>
	</view>
</template>

<script>
	import { Request,VerifyPhoneNumber } from '../../public/utils.js'
	import _app from '../../js_sdk/QuShe-SharerPoster/util/QS-SharePoster/app.js';
	export default {
		data() {
			return {
				imgSrc: this.$store.state.imgSrc,
				multiArray: [['北京', '成都'], ['青羊区', '金牛区', '武侯区'], ['1', '2']],
				multiIndex: [0, 0, 0],
				addrss:{
					province : "请选择地址区域",
					city : "",
					area : ""
				}
			};
		},
		onLoad(e){
			// console.log(e)
			if(e.id=='null'){
				console.log('添加')
				// this.addrss.province = "请选择地址区域"
			}else{
				// console.log('编辑')
				this.getData(e.id)
			}
		},
		methods: {
			bindMultiPickerChange(e) {
				this.addrss.province = e.detail.value[0]
				this.addrss.city = e.detail.value[1]
				this.addrss.area = e.detail.value[2]
			},
			bindMultiPickerColumnChange(e) {
		      
		    },
			getData(id){
				Request(
					'member.address.get_detail',
					{
						id:id
					}
				).then((res)=>{
					console.log(res)
					// 成功方法
					this.addrss = res.data.detail
					
				})
				.catch((res)=>{
					// 失败方法
				})
			},
			addAddress(){
				if(!VerifyPhoneNumber(this.addrss.mobile)){
					_app.showToast('电话格式不正确')
				}else{
					const id = this.addrss.id
					const name = this.addrss.realname
					const mobile = this.addrss.mobile
					const address = this.addrss.address
					const province = this.addrss.province
					const city = this.addrss.city
					const area = this.addrss.area
					Request(
						'member.address.submit',
						{
							id:id,
							realname: name,
							mobile: mobile,
							address: address,
							province: province,
							city: city,
							area: area
						}
					).then((res)=>{
						console.log(res)
						// 成功方法
						_app.showToast('成功')
						var pages = getCurrentPages();
						var prevPage = pages[pages.length - 2];  
						uni.navigateBack();
					})
					.catch((res)=>{
						// 失败方法
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
.iptWrap{
	width: 690rpx;
	height: 120rpx;
	margin: 0 auto;
	border-bottom: 1px solid #e3e3e3;
	display: flex;
	position: relative;
	.name{
		width: 168rpx;
		font-family: PingFang-SC-Medium;
		font-size: 30rpx;
		font-weight: normal;
		font-stretch: normal;
		line-height: 120rpx;
		letter-spacing: 0rpx;
		color: #333333;
	}
	.ipt{
		flex: 1;
		height: 120rpx;
		line-height: 120rpx;
		font-family: PingFang-SC-Medium;
		font-size: 30rpx;
		font-weight: normal;
		font-stretch: normal;
		color: #999999;
		padding-right: 15rpx;
		box-sizing: border-box;
	}
	.img{
		position: absolute;
		right: 0;
		top: 50rpx;
		width: 15rpx;
		height: 27rpx;
	}
}
.saveBtn{
	position: fixed;
	bottom: 20rpx;
	left: 20rpx;
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
}
</style>
