<template>
	<view>
		<view class="iptWrap">
			<view class="name">姓名</view>
			<input class="ipt" type="text" value="" placeholder="填写姓名"/>
		</view>
		<view class="iptWrap">
			<view class="name">手机号码</view>
			<input class="ipt" type="text" value="" placeholder="填写手机号码"/>
		</view>
		<view class="iptWrap">
			<view class="name">所在地区</view>
			<picker class="ipt" mode="multiSelector" @change="bindMultiPickerChange" @columnchange="bindMultiPickerColumnChange" :value="multiIndex" :range="multiArray">
				<view class="picker">
				  {{multiArray[0][multiIndex[0]]}}，{{multiArray[1][multiIndex[1]]}}，{{multiArray[2][multiIndex[2]]}}
				</view>
			</picker>
			<image class="img" :src="imgSrc+'public/arrow.png'" mode=""></image>
		</view>
		<view class="iptWrap">
			<view class="name">详细地址</view>
			<input class="ipt" type="text" value="" placeholder="填写小区名/门牌号等详细地址"/>
		</view>
		<button class="saveBtn">保存</button>
	</view>
</template>

<script>

export default {
		data() {
			return {
				imgSrc: this.$store.state.imgSrc,
				multiArray: [['北京', '成都'], ['青羊区', '金牛区', '武侯区'], ['1', '2']],
				multiIndex: [0, 0, 0],
			};
		},
		methods: {
			bindMultiPickerChange(e) {
			  this.multiIndex= e.detail.value
		  },
		  bindMultiPickerColumnChange(e) {
		      
		    },
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
