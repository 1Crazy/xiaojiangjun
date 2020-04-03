<template>
	<view>
		<view class="header">
			<image class="avatar" :src="imgSrc+'index/listpic1.png'" mode=""></image>
			<view class="name">橙子007</view>
			<view class="vip" @tap="gotoAccount">会员  ></view>
		</view>
		<view class="orderlist">
			<view class="title">
				<view class="leftTitle">商品订单</view>
				<view class="rightTitle" @tap="gotoAllOrder(0)">查看全部订单 ></view>
			</view>
			<view class="content">
				<view class="item" @tap="gotoAllOrder(0)">
					<image :src="imgSrc+'mine/list1.png'" class="img"></image>
					<view class="word">待支付</view>
				</view>
				<view class="item" @tap="gotoAllOrder(1)">
					<image :src="imgSrc+'mine/list2.png'" class="img"></image>
					<view class="word">待发货</view>
				</view>
				<view class="item" @tap="gotoAllOrder(2)">
					<image :src="imgSrc+'mine/list3.png'" class="img"></image>
					<view class="word">待收货</view>
				</view>
				<view class="item" @tap="gotoAllOrder(3)">
					<image :src="imgSrc+'mine/list4.png'" class="img"></image>
					<view class="word">已完成</view>
				</view>
				<view class="item" @tap="gotoAllOrder(4)">
					<image :src="imgSrc+'mine/list5.png'" class="img"></image>
					<view class="word">退款售后</view>
				</view>
			</view>
		</view>
		
		<view class="orderlist">
			<view class="title">
				<view class="leftTitle">服务订单</view>
				<view class="rightTitle" @tap="gotoAllOrder(1,)">查看全部订单 ></view>
			</view>
			<view class="content">
				<view class="item">
					<image :src="imgSrc+'mine/list1.png'" class="img"></image>
					<view class="word">待支付</view>
				</view>
				<view class="item">
					<image :src="imgSrc+'mine/list6.png'" class="img"></image>
					<view class="word">待消费</view>
				</view>
				<view class="item">
					<image :src="imgSrc+'mine/list4.png'" class="img"></image>
					<view class="word">已完成</view>
				</view>
				<view class="item">
					<image :src="imgSrc+'mine/list5.png'" class="img"></image>
					<view class="word">退款售后</view>
				</view>
			</view>
		</view>
		
		<view class="listItem" @tap="gotoAddressManagement">
			<image class="img" :src="imgSrc+'mine/item1.png'"></image>
			<view class="word">地址管理</view>
			<image :src="imgSrc+'public/arrow.png'" class="symbol"></image>
		</view>
		<view class="listItem" @tap="gotoExperiencer">
			<image class="img" :src="imgSrc+'mine/item2.png'"></image>
			<view class="word">体验者</view>
			<image :src="imgSrc+'public/arrow.png'" class="symbol"></image>
		</view>
		<view class="listItem" @tap="gotoMineCoupon">
			<image class="img" :src="imgSrc+'mine/item3.png'"></image>
			<view class="word">优惠券</view>
			<image :src="imgSrc+'public/arrow.png'" class="symbol"></image>
		</view>
		<view class="listItem" @tap="gotoCooperation">
			<image class="img" :src="imgSrc+'public/hezuo.png'"></image>
			<view class="word">合作加盟</view>
			<image :src="imgSrc+'public/arrow.png'" class="symbol"></image>
		</view>
		
		<center-popup title="提示" content="登录后即可操作?" cancelBtn="返回首页" ref="togglePopupChild" @cancelBtn="cancelLogin" @centerPopupSureBtn="islogin()"></center-popup>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex';
	import { Request } from '../../public/utils.js'
	import centerPopup from '@/components/centerPopup/centerPopup.vue'
	export default {
		components: {
			centerPopup,
		},
		data() {
			return {
				imgSrc: this.$store.state.imgSrc,
			}
		},
		onLoad(e) {
			
		},
		onShow(e) {
			if (!this.hasLogin) {
			 uni.login({
				  provider: 'weixin',
				    success: function (res) {
				      console.log(res);
					  if (res.code){
						  uni.setStorageSync('login_code', res.code)
					  }
				    }
				});
				this.showLoginModel()
			}else{
				
			}
		},
		computed:{
			...mapState(['hasLogin','userInfo'])
		},
		methods: {
			...mapMutations(['login']),
			gotoAddressManagement(){
				uni.navigateTo({
					url: '/pages/addressManagement/addressManagement'
				})
			},
			gotoAllOrder(num){
				uni.navigateTo({
					url: '/pages/allOrder/allOrder?status='+num
				})
			},
			gotoAccount(){
				uni.navigateTo({
					url: '/pages/account/account'
				})
			},
			gotoMineCoupon(){
				uni.navigateTo({
					url: '/pages/mingCoupon/mingCoupon'
				})
			},
			// 体验者页面
			gotoExperiencer(){
				uni.navigateTo({
					url: '/pages/experiencer/experiencer'
				})
			},
			// 去合作加盟页面
			gotoCooperation() {
				uni.navigateTo({
					url: '/pages/cooperation/cooperation'
				})
			},
			// 显示登陆授权框
			showLoginModel(){
				console.log(3333)
				this.$refs.togglePopupChild.togglePopup()
			},
			// 登录
			islogin(){
				console.log(444)
				const code = uni.getStorageSync('login_code')
				Request(
					'wxapp.update_info', 
					{
						code,
						comefrom:'wxapp'
					}, 
					'POST',
					'application/x-www-form-urlencoded'
				)
				.then((res)=>{
				    // 成功方法
					if (res.data.code == 1){
						this.login(res.data)
					}else{
						this.$refs.togglePopupChild.togglePopup()
					}
				})
				.catch((res)=>{
				    // 失败方法
				})
			},
			// 返回首页
			cancelLogin(){
				uni.reLaunch({
					url: '/pages/index/index'
				})
			}
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #f6f6f6;
	}
.header{
	width: 750rpx;
	height: 155rpx;
	background-color: #50ce13;
	display: flex;
	position: relative;
	align-items: center;
	.avatar{
		width: 110rpx;
		height: 110rpx;
		background-color: #999999;
		border: solid 3rpx #ffffff;
		border-radius: 50%;
		margin-left: 20rpx;
	}
	.name{
		font-family: PingFang-SC-Bold;
		font-size: 34rpx;
		font-weight: normal;
		font-stretch: normal;
		color: #ffffff;
		margin-left: 20rpx;
	}
	.vip{
		width: 160rpx;
		height: 56rpx;
		background-color: #ffffff;
		border-radius: 28rpx;
		font-family: PingFang-SC-Bold;
		font-size: 30rpx;
		font-weight: normal;
		font-stretch: normal;
		color: #50ce13;
		text-align: center;
		line-height: 56rpx;
		position: absolute;
		right: 20rpx;
	}
}
.orderlist{
	padding: 0 20rpx;
	margin-bottom: 20rpx;
	background-color: white;
	.title{
		display: flex;
		height: 89rpx;
		border-bottom: solid 1rpx #e3e3e3;
		line-height: 89rpx;
		justify-content: space-between;
		.leftTitle{
			font-family: PingFang-SC-Bold;
			font-size: 30rpx;
			font-weight: normal;
			font-stretch: normal;
			color: #333333;
		}
		.rightTitle{
			font-family: PingFang-SC-Medium;
			font-size: 26rpx;
			font-weight: normal;
			font-stretch: normal;
			color: #999999;
		}
	}
	.content{
		display: flex;
		justify-content: space-between;
		padding-top: 30rpx;
		padding-bottom: 40rpx;
		align-items: center;
		.item{
			display: flex;
			flex-direction: column;
			align-items: center;
			.img{
				width: 50rpx;
				height: 40rpx;
			}
			.word{
				font-family: PingFang-SC-Medium;
				font-size: 24rpx;
				font-weight: normal;
				font-stretch: normal;
				color: #666666;
				margin-top: 28rpx;
			}
		}
	}
}
.listItem{
	width: 750rpx;
	height: 111rpx;
	background-color: #ffffff;
	display: flex;
	position: relative;
	align-items: center;
	padding: 0 30rpx;
	box-sizing: border-box;
	.img{
		width: 31rpx;
		height: 36rpx;
		margin-right: 30rpx;
	}
	.word{
		font-family: PingFang-SC-Bold;
		font-size: 30rpx;
		font-weight: normal;
		font-stretch: normal;
		line-height: 36rpx;
		color: #333333;
		marign-left: 30rpx;
	}
	.symbol{
		position: absolute;
		top: 45rpx;
		right: 30rpx;
		color: #999999;
		width: 15rpx;
		height: 27rpx;
	}
}
</style>
