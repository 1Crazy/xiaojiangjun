<template>
	<view>
		<view class="header-wrap">
			<product-title
				img="../../static/public/addpic.png"
				title="YBM/意奔玛空调滤清YMB3140007空调滤芯空调滤芯"
				shortTitle='我是短标题'
				:borderBottomStyle='none'
			></product-title>
		</view>
		<view class="chooiseWrap">
			<view class="chooiseItem isborder" @tap="goodsStatus">
				<view class="leftWrap">
					<view class="title">货物状态</view>
				</view>
				<view class="right">请选择</view>
				<image class="img" src="../../static/public/arrow.png" mode=""></image>
			</view>
			<view class="chooiseItem"  @tap="refundReson">
				<view class="leftWrap">
					<view class="title">退款原因</view>
					<view class="leftBottom">
						<text class="txt1">退款金额：</text>
						<text class="txt2">￥336</text>
					</view>
				</view>
				<view class="right">请选择</view>
				<image class="img" src="../../static/public/arrow.png" mode=""></image>
			</view>
		</view>
		<view class="uploadCertificate">
			<view class="title">上传凭证</view>
			<view class="imgWrap">
				<image class="img" src="../../static/public/addpic.png" mode=""></image>
				<image class="img" src="../../static/public/addpic.png" mode=""></image>
				<image class="img" src="../../static/public/addpic.png" mode=""></image>
				<image class="img" src="../../static/public/addpic.png" mode=""></image>
				<image class="img" src="../../static/public/addpic.png" mode=""></image>
				
				<!-- 上面为图片循环 -->
				<image class="img" src="../../static/public/addpic.png" mode=""></image>
			</view>
		</view>
		
		<view style="height: 108rpx;width: 750rpx;background-color: white;"></view>
		<button class="submitBtn">提交</button>
		<!-- 加入购物车商品规格选择模态框 -->
		<uni-popup ref="addCartPopup" type="bottom">
			<view class="productSpecificationsModelContent">
				<image class="closeImg" :src="imgSrc+'public/goumai_guanbi.png'" @tap="addCartModel(false)"></image>
				
				<button class="submitBtn" @tap="submitBtn()">提交</button>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import productTitle from '@/components/productTitle/productTitle.vue'
	export default {
		components: {
			productTitle
		},
		data() {
			return {
				
			};
		},
		methods:{
			goodsStatus(bool,num){
				this.modelType = num
				bool ? this.$refs.addCartPopup.open() : this.$refs.addCartPopup.close()
			},
			refundReson(){
				
			},
		}
	}
</script>

<style lang="scss">
page{
	background-color: #f4f4f4;
}
.header-wrap{
	padding: 0 20rpx;
	background-color: white;
}
.chooiseWrap{
	background-color: white;
	margin-top: 20rpx;
	.chooiseItem{
		padding: 40rpx 0;
		padding-left: 20rpx;
		padding-right: 45rpx;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;	
		position: relative;
		.img{
			width: 12rpx;
			height: 20rpx;
			position: absolute;
			right: 14rpx;
			top: 49rpx;
		}
		.right{
			font-family: PingFang-SC-Medium;
			font-size: 30rpx;
			font-weight: normal;
			font-stretch: normal;
			line-height: 36rpx;
			letter-spacing: 0rpx;
			color: #999999;
		}
		.leftWrap{
			.leftBottom{
				margin-top: 40rpx;
				.title{
					font-family: PingFang-SC-Medium;
					font-size: 30rpx;
					font-weight: normal;
					font-stretch: normal;
					line-height: 36rpx;
					letter-spacing: 0rpx;
					color: #333333;
				}
				.txt1{
					font-family: PingFang-SC-Medium;
					font-size: 30rpx;
					font-weight: normal;
					font-stretch: normal;
					line-height: 36rpx;
					letter-spacing: 0rpx;
					color: #333333;
				}
				.txt2{
					font-family: PingFang-SC-Medium;
					font-size: 30rpx;
					font-weight: normal;
					letter-spacing: 0rpx;
					color: #ff9000;
				}
			}
		}
	}
	.isborder{
		border-bottom: 1px solid #cccccc;
	}
}
.uploadCertificate{
	margin-top: 20rpx;
	width: 750rpx;
	min-height: 687rpx;
	background-color: white;
	padding: 0 20rpx;
	.title{
		font-family: PingFang-SC-Medium;
		font-size: 30rpx;
		font-weight: normal;
		font-stretch: normal;
		padding-top: 40rpx;
		letter-spacing: 0rpx;
		color: #333333;
	}
	.imgWrap{
		display: flex;
		flex-wrap: wrap;
		.img{
			width: 162rpx;
			height: 162rpx;
			border-radius: 4rpx;
			border: solid 1rpx #999999;
			margin-right: 18rpx;
			margin-top: 41rpx;
		}
	}
}
.submitBtn{
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
	position: fixed;
	bottom: 20rpx;
	left: 20rpx;
	line-height: 88rpx;
	color: white;
}
// 加入购物车显示模态框
.productSpecificationsModelContent{
	width: 750rpx;
	// height: 722rpx;
	background-color: #ffffff;
	border-radius: 20rpx 20rpx 0rpx 0rpx;
	position: relative;
	padding-bottom: 29rpx;
	padding-top: 40rpx;
	padding-left: 20rpx;
	padding-right: 30rpx;
	box-sizing: border-box;
	.closeImg{
		position: absolute;
		width: 50rpx;
		height: 50rpx;
		right: 20rpx;
		top: 21rpx;
	}
	.submitBtn{
		width: 710rpx;
		height: 79rpx;
		background-image: linear-gradient(90deg, 
			#6fde39 0%, 
			#46c806 100%), 
		linear-gradient(
			#e3e3e3, 
			#e3e3e3);
		background-blend-mode: normal, 
			normal;
		border-radius: 39rpx;
		font-family: PingFang-SC-Regular;
		font-size: 28rpx;
		font-weight: normal;
		font-stretch: normal;
		line-height: 79rpx;
		color: #333333;
		margin-top: 60rpx;
		font-family: PingFang-SC-Bold;
		font-size: 30rpx;
		font-weight: normal;
		font-stretch: normal;
		line-height: 79rpx;
		letter-spacing: 0rpx;
		color: #ffffff;
	}
}
</style>
