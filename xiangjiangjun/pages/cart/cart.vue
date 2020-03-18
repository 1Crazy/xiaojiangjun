<template>
	<view>
		<view class="itemMenu">
			<radio class="itemRadio" value="r3" />
			<image class="img" src="/static/index/listpic1.png"></image>
			<view class="info">
				<view class="infoTop">
					<view class="title">YBM/意奔玛空调滤清YMB3140007空...</view>
					<view class="price">￥366</view>
				</view>
				<view class="shortitle">我是短标题</view>
			</view>
			<view class="wrap">
				<view class="del">-</view>
				<input class="num" type="text" value="1" />
				<view class="add">+</view>
			</view>
			<image class="delete" src='/static/public/delete.png'></image>
		</view>
		<view class="itemMenu">
			<radio class="itemRadio" value="r3" />
			<image class="img" src="/static/index/listpic1.png"></image>
			<view class="info">
				<view class="infoTop">
					<view class="title">YBM/意奔玛空调滤清YMB3140007空...</view>
					<view class="price">￥366</view>
				</view>
				<view class="shortitle">我是短标题</view>
			</view>
			<view class="wrap">
				<view class="del">-</view>
				<input class="num" type="text" value="1" />
				<view class="add">+</view>
			</view>
			<image class="delete" src='/static/public/delete.png'></image>
		</view>
		<view class="itemMenu">
			<radio class="itemRadio" value="r3" />
			<image class="img" src="/static/index/listpic1.png"></image>
			<view class="info">
				<view class="infoTop">
					<view class="title">YBM/意奔玛空调滤清YMB3140007空...</view>
					<view class="price">￥366</view>
				</view>
				<view class="shortitle">我是短标题</view>
			</view>
			<view class="wrap">
				<view class="del">-</view>
				<input class="num" type="text" value="1" />
				<view class="add">+</view>
			</view>
			<image class="delete" src='/static/public/delete.png'></image>
		</view>
		<view class="itemMenu">
			<radio class="itemRadio" value="r3" />
			<image class="img" src="/static/index/listpic1.png"></image>
			<view class="info">
				<view class="infoTop">
					<view class="title">YBM/意奔玛空调滤清YMB3140007空...</view>
					<view class="price">￥366</view>
				</view>
				<view class="shortitle">我是短标题</view>
			</view>
			<view class="wrap">
				<view class="del">-</view>
				<input class="num" type="text" value="1" />
				<view class="add">+</view>
			</view>
			<image class="delete" src='/static/public/delete.png'></image>
		</view>
		<view class="itemMenu">
			<radio class="itemRadio" value="r3" />
			<image class="img" src="/static/index/listpic1.png"></image>
			<view class="info">
				<view class="infoTop">
					<view class="title">YBM/意奔玛空调滤清YMB3140007空...</view>
					<view class="price">￥366</view>
				</view>
				<view class="shortitle">我是短标题</view>
			</view>
			<view class="wrap">
				<view class="del">-</view>
				<input class="num" type="text" value="1" />
				<view class="add">+</view>
			</view>
			<image class="delete" src='/static/public/delete.png'></image>
		</view>
		<view style="height: 98rpx;"></view>
		<view class="bottom">
			<label class="radio">
				<radio class="itemRadio" value="r2" />全选</label>
			<view class="center">
				<view class="alltotall">合计：</view>
				<view class="price">￥732</view>
			</view>
			<button class="btn">结算(2)</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {

		}
	}
</script>

<style lang="scss">
	page {
		background-color: #f6f6f6;
	}

	.wrap {
		height: 306rpx;
	}

	.itemMenu {
		width: 750rpx;
		height: 306rpx;
		background-color: white;
		display: flex;
		position: relative;
		padding: 0 30rpx;
		box-sizing: border-box;
		margin-bottom: 14rpx;
		.itemRadio {
			width: 40rpx;
			height: 40rpx;
			margin-top: 90rpx;
		}
		.img {
			width: 160rpx;
			height: 160rpx;
			background-color: #c0c0c0;
			border-radius: 10rpx;
			border: solid 1rpx #e3e3e3;
			margin-left: 17rpx;
			margin-top: 30rpx;
			margin-right: 19rpx;
		}

		.info {
			.infoTop {
				margin-top: 40rpx;
				display: flex;

				.title {
					width: 290rpx;
					font-family: PingFang-SC-Medium;
					font-size: 30rpx;
					font-weight: normal;
					font-stretch: normal;
					color: #333333;
					line-height: 1.2;
				}

				.price {
					margin-left: 70rpx;
					font-family: PingFang-SC-Medium;
					font-size: 36rpx;
					font-weight: normal;
					font-stretch: normal;
					color: #ff9000;
				}

			}

			.shortitle {
				margin-top: 37rpx;
				font-family: PingFang-SC-Medium;
				font-size: 28rpx;
				font-weight: normal;
				font-stretch: normal;
				color: #888888;
			}
		}

		.wrap {
			position: absolute;
			left: 270rpx;
			bottom: 31rpx;
			width: 224rpx;
			height: 56rpx;
			border-radius: 27rpx;
			line-height: 54rpx;
			display: flex;

			.del {
				width: 60rpx;
				height: 54rpx;
				background-color: #ffffff;
				border-radius: 27rpx 0rpx 0rpx 27rpx;
				text-align: center;
				border: 1px solid;
				border-color: #e3e3e3;
			}

			.num {
				width: 100rpx;
				height: 54rpx;
				background-color: #ffffff;
				text-align: center;
				border: 1px solid;
				border-color: #e3e3e3;
			}

			.add {
				width: 60rpx;
				height: 54rpx;
				background-color: #ffffff;
				border-radius: 0rpx 27rpx 27rpx 0rpx;
				text-align: center;
				border: 1px solid;
				border-color: #e3e3e3;
			}
		}
		.delete{
			position: absolute;
			bottom: 43rpx;
			right: 30rpx;
			width: 30rpx;
			height: 30rpx;
		}
	}

	// 底部
	.bottom {
		width: 750rpx;
		height: 98rpx;
		background-color: #FFFFFF;
		position: fixed;
		bottom: 0;
		padding-left: 30rpx;
		padding-right: 20rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		.radio {
			display: flex;
			align-items: center;
			font-size: 30rpx;
			font-weight: normal;
			font-stretch: normal;
			color: #333333;

			.itemRadio {
				margin-right: 10rpx;
			}
		}

		.center {
			display: flex;
			margin-left: 39rpx;
			align-items: center;

			.alltotal {
				font-family: PingFang-SC-Medium;
				font-size: 24rpx;
				font-weight: normal;
				font-stretch: normal;
				color: #333333;
				margin-left: 29rpx;
			}

			.price {
				font-family: PingFang-SC-Medium;
				font-size: 42rpx;
				font-weight: normal;
				font-stretch: normal;
				color: #ff9000;
			}
		}

		.btn {
			position: absolute;
			width: 200rpx;
			height: 71rpx;
			background-image: linear-gradient(90deg,
				#6fde39 0%,
				#46c806 100%),
				linear-gradient(#e3e3e3,
				#e3e3e3);
			background-blend-mode: normal,
				normal;
			border-radius: 35rpx;
			line-height: 71rpx;
			color: #ffffff;
			right: 20rpx;
			top: 14rpx;
		}
	}
</style>
