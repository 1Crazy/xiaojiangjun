<!-- 收益明细页面 -->
<template>
	<view>
		<view class="itemWrap" v-for="(item,index) in list" :key='index'>
			<!-- <image lazy-load class="avatar" src="../../static/public/addpic.png" mode=""></image> -->
			<view class="center">
				<!-- <view class="nickName">用户昵称</view> -->
				
				
				<view class="orderWord" v-if="item.rechargetype == 'wxapp'">余额支付</view>
				<view class="orderWord" v-if="item.rechargetype == 'exchange' || item.rechargetype == 'system'">后台充值</view>
				<view class="orderWord" v-if="item.rechargetype == 'wechat'">微信支付</view>
				<view class="orderWord" v-if="item.type == '1'">提现</view>
				<view class="time">{{item.createtime}}</view>
			</view>
			<view class="price">{{item.money}}</view>
		</view>
	</view>
</template>

<script>
	import { Request } from '../../public/utils.js'
	export default {
		data() {
			return {
				imgSrc: this.$store.state.imgSrc,
				page:1,
				list:[]
			};
		},
		onLoad() {
			this.getData()
		},
		// 上拉加载，拉到底部触发
		onReachBottom() {
		  // console.log('aa')
		  this.page = this.page+1
		  this.getData()
		},
		onPullDownRefresh() {
			this.page = 1;
			this.list = [];
			this.getData()
		    setTimeout(function () {
		        uni.stopPullDownRefresh();
		    }, 1000);
		},
		methods:{
			getData(){
				Request(
					'member.log.get_listall',
					{
						page:this.page
					}
				).then((res)=>{
					console.log(res)
					if(this.page==1){
						this.list = res.data.list
					}else{
						this.list = this.list.concat(res.data.list)
					}
					// 成功方法
				})
				.catch((res)=>{
					// 失败方法
				})
			}
		}
	}
</script>

<style lang="scss">
page{
	background-color: #f6f6f6;
}
.itemWrap{
	width: 750rpx;
	height: 215rpx;
	background-color: #ffffff;
	padding: 30rpx;
	display: flex;
	position: relative;
	box-sizing: border-box;
	border-bottom:1px solid #e3e3e3;
	.avatar{
		width: 90rpx;
		height: 90rpx;
		background-color: #e3e3e3;
		border-radius: 50%;
	}
	.nickName{
		height: 31rpx;
		font-family: PingFang-SC-Medium;
		font-size: 32rpx;
		font-weight: normal;
		font-stretch: normal;
		line-height: 41rpx;
		letter-spacing: 0rpx;
		color: #333333;
		margin-left: 20rpx;
	}
	.orderWord{
		font-family: PingFang-SC-Regular;
		font-size: 30rpx;
		font-weight: normal;
		font-stretch: normal;
		line-height: 41rpx;
		margin-left: 20rpx;
		margin-top: 26rpx;
		color: #666666;
	}
	.time{
		font-family: PingFang-SC-Regular;
		font-size: 24rpx;
		font-weight: normal;
		font-stretch: normal;
		line-height: 36rpx;
		letter-spacing: 0rpx;
		color: #000000;
		opacity: 0.66;
		margin-top: 29rpx;
		margin-left: 20rpx;
	}
	.price{
		position: absolute;
		right: 30rpx;
		top: 77rpx;
		font-family: PingFang-SC-Medium;
		font-size: 38rpx;
		font-weight: normal;
		font-stretch: normal;
		color: #ff9000;
	}
}
.itemWrap:last-child{
	border: none;
}
</style>
