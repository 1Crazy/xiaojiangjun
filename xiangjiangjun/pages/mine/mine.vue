<template>
	<view>
		<!-- 普通用户 -->
		<view v-if="isCommonUser">
			<view class="header">
				<image lazy-load class="avatar" :src="userInfo.avatar" mode=""></image>
				<view class="name">{{userInfo.nickname}}</view>
				<view class="vip" @tap="gotoAccount">会员  ></view>
			</view>
			<view class="orderlist">
				<view class="title">
					<view class="leftTitle">商品订单</view>
					<view class="rightTitle" @tap="gotoAllOrder(0)">查看全部订单 ></view>
				</view>
				<view class="content">
					<view class="item" @tap="gotoAllOrder(0)">
						<image lazy-load :src="imgSrc+'mine/list1.png'" class="img"></image>
						<view class="word">待支付</view>
						<view class="num" v-if="productOrder[0]>0">{{productOrder[0]>99 ? '···' : productOrder[0]}}</view>
					</view>
					<view class="item" @tap="gotoAllOrder(1)">
						<image lazy-load :src="imgSrc+'mine/list2.png'" class="img"></image>
						<view class="word">待发货</view>
						<view class="num" v-if="productOrder[1]>0">{{productOrder[1]>99 ? "···" : productOrder[1]}}</view>
					</view>
					<view class="item" @tap="gotoAllOrder(2)">
						<image lazy-load :src="imgSrc+'mine/list3.png'" class="img"></image>
						<view class="word">待收货</view>
						<view class="num" v-if="productOrder[2]>0">{{productOrder[2]>99 ? "···" : productOrder[2]}}</view>
					</view>
					<view class="item" @tap="gotoAllOrder(3)">
						<image lazy-load :src="imgSrc+'mine/list4.png'" class="img"></image>
						<view class="word">已完成</view>
					</view>
					<view class="item" @tap="gotoAllOrder(4)">
						<image lazy-load :src="imgSrc+'mine/list5.png'" class="img"></image>
						<view class="word">退款售后</view>
						<view class="num" style="right:-12rpx" v-if="productOrder[4]>0">{{productOrder[4]>99 ? "···" : productOrder[4]}}</view>
					</view>
				</view>
			</view>
			
			<view class="orderlist">
				<view class="title">
					<view class="leftTitle">服务订单</view>
					<view class="rightTitle" @tap="gotoAllOrder(0,false)">查看全部订单 ></view>
				</view>
				<view class="content">
					<view class="item" @tap="gotoAllOrder(0,false)">
						<image lazy-load :src="imgSrc+'mine/list1.png'" class="img"></image>
						<view class="word">待支付</view>
						<view class="num" style="right:-12rpx" v-if="serviceOrder[0]>0">{{serviceOrder[0]>99 ? "···" : serviceOrder[0]}}</view>
					</view>
					<view class="item" @tap="gotoAllOrder(1,false)">
						<image lazy-load :src="imgSrc+'mine/list6.png'" class="img"></image>
						<view class="word">待消费</view>
						<view class="num" style="right:-12rpx" v-if="serviceOrder[1]>0">{{serviceOrder[1]>99 ? "···" : serviceOrder[1]}}</view>
					</view>
					<view class="item" @tap="gotoAllOrder(3,false)">
						<image lazy-load :src="imgSrc+'mine/list4.png'" class="img"></image>
						<view class="word">已完成</view>
						<view class="num" style="right:-12rpx" v-if="serviceOrder[2]>0">{{serviceOrder[2]>99 ? "···" : serviceOrder[2]}}</view>
					</view>
					<view class="item" @tap="gotoAllOrder(4,false)">
						<image lazy-load :src="imgSrc+'mine/list5.png'" class="img"></image>
						<view class="word">退款售后</view>
						<view class="num" style="right:-12rpx" v-if="serviceOrder[3]>0">{{serviceOrder[3]>99 ? "···" : serviceOrder[3]}}</view>
					</view>
				</view>
			</view>
			<view class="listItem" @tap="gotoAddressManagement">
				<image lazy-load class="img" :src="imgSrc+'mine/item1.png'"></image>
				<view class="word">地址管理</view>
				<image lazy-load :src="imgSrc+'public/arrow.png'" class="symbol"></image>
			</view>
			<view class="listItem" @tap="gotoExperiencer">
				<image lazy-load class="img" :src="imgSrc+'mine/item2.png'"></image>
				<view class="word">体验者</view>
				<image lazy-load :src="imgSrc+'public/arrow.png'" class="symbol"></image>
			</view>
			<view class="listItem" @tap="gotoMineCoupon">
				<image lazy-load class="img" :src="imgSrc+'mine/item3.png'"></image>
				<view class="word">优惠券</view>
				<image lazy-load :src="imgSrc+'public/arrow.png'" class="symbol"></image>
			</view>
			
			<view class="listItem" @tap="gotoCooperation">
				<image lazy-load class="img" :src="imgSrc+'public/hezuo.png'"></image>
				<view class="word">合作加盟</view>
				<image lazy-load :src="imgSrc+'public/arrow.png'" class="symbol"></image>
			</view> 
		</view>
		
		<!-- 汽配厂家 -->
		<view v-if="!isCommonUser">
			<view class="qp-header">
				<image src="../../static/public/dor-S.png" class="avatar"></image>
				<view class="name" @tap="updateShopName">
					<view>店铺名称</view>
					<image src="../../static/public/ic_compile.png" class="update-name-img"></image>
				</view>
				<view class="money-wrap">
					<view>提现</view>
					<view @tap="gotoIncomeDetails">收益明细</view>
				</view>
			</view>
			
			<view class="qb-order">
				<view class="item">
					<image src="../../static/public/ic_daifahuo.png"></image>
					<view class="word">待发货</view>
					<view class="num">3</view>
				</view>
				<view class="item">
					<image src="../../static/public/ic_daishouhuo.png"></image>
					<view class="word">待收货</view>
					<view class="num">3</view>
				</view>
				<view class="item">
					<image src="../../static/public/ic_yiwancheng.png"></image>
					<view class="word">已完成</view>
					<view class="num num1">3</view>
				</view>
				<view class="item">
					<image src="../../static/public/ic_tuihuo2.png"></image>
					<view class="word">退货/退款</view>
					<view class="num num1">3</view>
				</view>
			</view>
			<button class="qb-hexiao-btn">扫码核销</button>
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
	import './qp.scss'
	export default {
		components: {
			centerPopup,
		},
		data() {
			return {
				imgSrc: this.$store.state.imgSrc,
				productOrder: [0,0,0,0,0],
				serviceOrder:[1,1,1,1],
				isCommonUser: true,
			}
		},
		onLoad(e) {
			let userInfo = uni.getStorageSync('userInfo') || '';
			if(userInfo.id){
				this.login(userInfo,true);
			}
		},
		onShow(e) {
			console.log(this.hasLogin,'haslogin')
			if (!this.hasLogin) {
				this.showLoginModel()
			}else{
				this.loadOrderNum()
			}
		},
		computed:{
			...mapState(['hasLogin','userInfo'])
		},
		methods: {
			...mapMutations(['login']),
			gotoIncomeDetails(){
				uni.navigateTo({
					url: '/pages/incomeDetails/incomeDetails'
				})
			},
			gotoAddressManagement(){
				uni.navigateTo({
					url: '/pages/addressManagement/addressManagement'
				})
			},
			gotoAllOrder(num,isgoods=true){
				uni.navigateTo({
					url: '/pages/allOrder/allOrder?status='+num+'&isgoods='+isgoods
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
				const openid = uni.getStorageSync('openid')
				const that = this
				// console.log(openid)
				uni.getUserInfo({
					provider: 'weixin',
				    success: function (res) {
						console.log('aaa');
						console.log(res.userInfo);
						// let data = res.data.userInfo
						
						// let data['avaratUrl'] = res.userInfo.avaratUrl;
						// let data.nickName = res.userInfo.nickName;
						
						var data = {};
						data.avaratUrl= res.userInfo.avaratUrl;
						data.nickName = res.userInfo.nickName;
						
						Request(
							'wxapp.update_info', 
							{
								openid,
								data : res.userInfo,
								iv : res.iv
							}
						)
						.then((res)=>{
						    // 成功方法
							if (res.data.code == 1){
								that.login(res.data.member)
								that.loadOrderNum()
							}else{
								that.$refs.togglePopupChild.togglePopup()
							}
						})
						.catch((res)=>{
						    // 失败方法
						})
				    }
				});
			},
			// 返回首页
			cancelLogin(){
				uni.reLaunch({
					url: '/pages/index/index'
				})
			},
			loadOrderNum(){
				Request(
					'member'
				)
				.then((res)=>{
				    // 成功方法
					if (res.data.error == 0) {
						const {order_0,order_1,order_2,order_4} = res.data.statics
						this.productOrder = [order_0,order_1,order_2,0,order_4]
						this.serviceOrder = [res.data.service.order_0,res.data.service.order_1,res.data.service.order_4]
					}
				})
				.catch((res)=>{
				    // 失败方法
				})
			},
			updateShopName(){
				
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
			position: relative;
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
			.num{
				position: absolute;
				width: 32rpx;
				height: 32rpx;
				background-color: #ff9000;
				font-family: PingFang-SC-Medium;
				font-size: 24rpx;
				font-weight: normal;
				font-stretch: normal;
				line-height: 32rpx;
				letter-spacing: 0rpx;
				color: #ffffff;
				top: -15rpx;
				right: -20rpx;
				text-align: center;
				border-radius: 50%;
				padding: 1px;
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
