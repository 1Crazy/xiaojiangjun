<template>
	<view>
		
<!-- 		<button type="primary" @tap="shareFc()">生成海报</button> -->
		<view class="hideCanvasView">
			<canvas class="hideCanvas" canvas-id="default_PosterCanvasId" :style="{width: (poster.width||0) + 'px', height: (poster.height||0) + 'px'}"></canvas>
		</view>
		<!-- 内容 -->
		<view class="swiperWrap">
			<swiper :current="current" @change="swiperChange" class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
				<swiper-item  v-for="(item ,index) in swiper" :key="index">
					<image class='img' :src="item.img" mode=""></image>
				</swiper-item>
			</swiper>
			<view class="num">{{current+1}}/{{swiper.length}}</view>
		</view>
		<view class="content">
			<view class="title">马驰宝汽车机油正品全合成5W-40德国进口奔驰宝马奥迪大众本田4L</view>
			<view class="description">全合成机油</view>
			<view class="bottom">
				<view class="price">
					<view class="currentPrice">￥488</view>
					<view class="originalPrice">￥608</view>
				</view>
				<view class="count">销量：1999</view>
			</view>
		</view>
		<view class="nav" @tap="LogisticsInfoModel(true)">
			<view>物流说明</view>
			<image :src="imgSrc+'public/arrow.png'" class="symbol"></image>
		</view>
		<!-- 详情 -->
		<view class="info">
			<view class="navwrap">
				<view :class="tab == 1 ? 'active': ''" @tap="changeTab(1)">商品详情</view>
				<view :class="tab == 2 ? 'active': ''" @tap="changeTab(2)">用户评价</view>
			</view>
			<view :class="tab == 1 ? 'productInfo': 'hide'">
				<view class="article">抗氧化性能最好，即使用周期最长，减少了废旧机油排放。 fuel-burn系数低，即油门反应高，节省了燃油消耗环保低碳。</view>
				<image class="img1" :src="imgSrc+'index/picnav3.png'" style="margin-top: 40rpx;margin-bottom: 93rpx;"></image>
				<image class="img2" :src="imgSrc+'index/picnav3.png'"></image>
			</view>
			<view :class="tab == 2 ? 'comment': 'hide'"  v-for="(item ,index) in commentList" :key="index">
				<view class="commentHeader">
					<image class="avatar" :src="item.avatar"></image>
					<view class="name">{{item.name}}</view>
					<image :class="item.star>=1 ? 'star': 'hide'" :src="imgSrc+'productInfo/star.png'" mode=""></image>
					<image :class="item.star>=2 ? 'star': 'hide'" :src="imgSrc+'productInfo/star.png'" mode=""></image>
					<image :class="item.star>=3 ? 'star': 'hide'" :src="imgSrc+'productInfo/star.png'" mode=""></image>
					<image :class="item.star>=4 ? 'star': 'hide'" :src="imgSrc+'productInfo/star.png'" mode=""></image>
					<image :class="item.star>=5 ? 'star': 'hide'" :src="imgSrc+'productInfo/star.png'" mode=""></image>
					<view class="date">{{item.date}}</view>
				</view>
				<view class="commentContent">{{item.content}}</view>
				<view :class="item.commentPic.length>0?'commentPic':'hide'">
					<image :src="itemPic" class="pic" v-for="(itemPic ,index) in item.commentPic" :key="index"></image>
				</view>
			</view>
		</view>
		<view style="height: 100rpx;"></view>
		<!-- 底部 -->
		<view class="footer">
			<view class="wrap">
				<image :src="imgSrc+'public/xiangqing_huishouye.png'" ></image>
				<view>首页</view>
			</view>
			<view class="wrap center" @tap="shareFc()" >
				<image :src="imgSrc+'public/xiagnqiang_fenxiang.png'"></image>
				<view>分享</view>
			</view>
			<view class="wrap" style="margin-right: 44rpx;">
				<image :src="imgSrc+'public/xiangqing_kefu.png'"></image>
				<view>客服</view>
			</view>
			<button class="addCart">加入购物车</button>
			<button class="buy">立刻购买</button>
		</view>
		<!-- 物流说明弹框 -->
		<uni-popup ref="popup" type="bottom">
			<view class="logisticsInfoModelContent">
				<image class="closeImg" :src="imgSrc+'public/goumai_guanbi.png'" @tap="LogisticsInfoModel(false)"></image>
				<view class="h-title">物流说明</view>
				<view class="step">
					<view class="num">1</view>
					<view class="model-content">付款后一般24小时内发货，付款后一般24小时内发货付款后一般24小时内发货付款后一般24小时内发货</view>
				</view>
				<view class="step">
					<view class="num">2</view>
					<view class="model-content">付款后一般24小时内发货，付款后一般24小时内发货付款后一般24小时内发货付款后一般24小时内发货</view>
				</view>
				<view class="step">
					<view class="num">3</view>
					<view class="model-content">付款后一般24小时内发货，付款后一般24小时内发货付款后一般24小时内发货付款后一般24小时内发货付款后一般24小时内发货，付款后一般24小时内发货付款。</view>
				</view>
			</view>
		</uni-popup>
		
		<!-- 海报 -->
		<view class="flex_row_c_c modalView" :class="qrShow?'show':''" @tap="hideQr()">
			<view class="flex_column" style="width: 750rpx;height: 852rpx;position: fixed;bottom: 132rpx;left: 0;">
				<view class="backgroundColor-white padding1vh border_radius_10px" style="padding: 30rpx;">
					<image :src="poster.finalPath || ''" class="posterImage"></image>
					<!-- <view style="height: 268rpx;width: 750rpx;background-color: white;"></view> -->
				</view>
				<view class="flex_row marginTop2vh">
					<button open-type="share" @tap.prevent.stop="share()" style="display: flex;align-items: center;background: white;">
						<image :src="imgSrc+'productInfo/fenxiang_weixin.png'" class="canvasImage"></image>
						<view>微信好友</view>
					</button>
					<view @tap.prevent.stop="saveImage()" style="display: flex;align-items: center;">
						<image :src="imgSrc+'productInfo/fenxiang_pengyouquan.png'" class="canvasImage"></image>
						<view>朋友圈</view>
						<button class="canvas-btn">保存图片</button>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import _app from '../../js_sdk/QuShe-SharerPoster/util/QS-SharePoster/app.js';
	import {
		getSharePoster
	} from '../../js_sdk/QuShe-SharerPoster/util/QS-SharePoster/QS-SharePoster.js';
	import {uniPopup} from '../../components/uni/uni-popup/uni-popup.vue'
	import './index.scss'
	
	export default {
		components: {uniPopup},
		data() {
			return {
				imgSrc: this.$store.state.imgSrc,
				swiper: [{
					img: '../../static/productInfo/banner1.png'
				}, {
					img: '../../static/productInfo/banner2.png'
				}],
				current: 0,
				tab: 1,//商品详情1，用户评价2
				commentList: [
					{
						avatar: '../../static/index/add.png',
						name: '张先生',
						star: 2,
						date: '2019-12-25',
						content: '机油收到了，已经购买了几次了，值得信赖的商家，还是一如既往的好，和实体店购买的一样，实惠质量也非常不错！！！！',
						commentPic: ['../../static/index/listpic1.png','../../static/index/listpic1.png','../../static/index/listpic1.png']
					},
					{
						avatar: '../../static/index/add.png',
						name: 'x先生',
						star: 3,
						date: '2019-11-25',
						content: 'xxxxxxxx！！！',
						commentPic: []
					},
				],
				/**
				 * 海报绘制相关变量
				 */
				poster: {},
				qrShow: false,
				canvasId: 'default_PosterCanvasId',
				//
			}
		},
		onLoad() {
		},
		methods: {
			swiperChange (e) {
				this.current=e.detail.current
			},
			//改变tab值
			changeTab(num){
				this.tab=num
			},
			//物流说明模态框
			LogisticsInfoModel(bool){
				bool ? this.$refs.popup.open() : this.$refs.popup.close()
			},
			/**
			 * 绘制海报
			 */
			async shareFc() {
					try {
						console.log('准备生成:' + new Date())
						const d = await getSharePoster({
							_this: this, //若在组件中使用 必传
							type: 'testShareType',
							formData: {
								//访问接口获取背景图携带自定义数据
			
							},
							posterCanvasId: this.canvasId,	//canvasId
							delayTimeScale: 20, //延时系数
							background: {
								// width: 1080,
								// height: 1920,
								width: 1000,
								height: 1600,
								backgroundColor: 'white'
							},
							drawArray: ({
								bgObj,
								type,
								bgScale
							}) => {
								const dx = bgObj.width * 0.3;
								const fontSize = bgObj.width * 0.045;
								const lineHeight = bgObj.height * 0.04;
								//可直接return数组，也可以return一个promise对象, 但最终resolve一个数组, 这样就可以方便实现后台可控绘制海报
								return new Promise((rs, rj) => {
									rs([
										{
											type: 'image',
											url: '/static/productInfo/banner1.png',
											alpha: 1,
											dx: 30,
											dy: 30,
											infoCallBack(imageInfo) {
												let scale = bgObj.width * 0.2 / imageInfo.height;
												return {
													dWidth: 690, // 因为设置了圆形图片 所以要乘以2
													dHeight: 794,
												}
											}
										},
										{
											type: 'image',
											url: '/static/productInfo/banner2.png',
											alpha: 1,
											dx: 30,
											dy: 1020,
											infoCallBack(imageInfo) {
												let scale = bgObj.width * 0.2 / imageInfo.height;
												return {
													dWidth: 160, // 因为设置了圆形图片 所以要乘以2
													dHeight: 160,
												}
											}
										},
										{
											type: 'text',
											fontStyle: 'normal',
											text: 'YBM/意奔玛空调滤清YMB3140007空调滤芯空调滤芯',
											size: 30,
											color: 'black',
											alpha: 1,
											textAlign: 'left',
											textBaseline: 'middle',
											fontFamily: 'PingFang-SC-Medium',
											infoCallBack(textLength) {
												_app.log('index页面的text的infocallback ，textlength:' + textLength);
												return {
													dx: 30,
													dy: 894,
												}
											},
											lineFeed: { //换行设置
												maxWidth: 411,
												lineHeight: 40,
												lineNum: -1,
												dx: -1
											},
											serialNum: 0,
											id: 'tag1'	//自定义标识
										},
										{
											type: 'text',
											fontStyle: 'normal',
											text: '￥366',
											size: 36,
											color: '#ff9000',
											alpha: 1,
											textAlign: 'left',
											textBaseline: 'middle',
											fontFamily: 'PingFang-SC-Medium',
											infoCallBack(textLength) {
												_app.log('index页面的text的infocallback ，textlength:' + textLength);
												return {
													dx: 611,
													dy: 920,
												}
											},
											serialNum: 0,
											id: 'tag2'	//自定义标识
										},
										{
											type: 'text',
											fontStyle: 'normal',
											text: '小将军',
											size: 28,
											color: '#333333',
											alpha: 1,
											textAlign: 'left',
											textBaseline: 'middle',
											fontFamily: 'PingFang-SC-Medium',
											infoCallBack(textLength) {
												return {
													dx: 210,
													dy: 1080,
												}
											},
											serialNum: 0,
											id: 'tag3'	//自定义标识
										},
										{
											type: 'text',
											fontStyle: 'normal',
											text: '长按识别图中二维码',
											size: 28,
											color: '#333333',
											alpha: 1,
											textAlign: 'left',
											textBaseline: 'middle',
											fontFamily: 'PingFang-SC-Medium',
											infoCallBack(textLength) {
												return {
													dx: 210,
													dy: 1140,
												}
											},
											serialNum: 0,
											id: 'tag4'	//自定义标识
										},
									]);
								})
							},
							setCanvasWH: ({
								bgObj,
								type,
								bgScale
							}) => { // 为动态设置画布宽高的方法，
								this.poster = bgObj;
							}
						});
						console.log('海报生成成功, 时间:' + new Date() + '， 临时路径: ' + d.poster.tempFilePath)
						this.poster.finalPath = d.poster.tempFilePath;
						this.qrShow = true;
					} catch (e) {
						_app.hideLoading();
						_app.showToast(JSON.stringify(e));
						console.log(JSON.stringify(e));
					}
				},
				saveImage() {
					// #ifndef H5
					uni.saveImageToPhotosAlbum({
						filePath: this.poster.finalPath,
						success(res) {
							_app.showToast('保存成功');
						}
					})
					// #endif
					// #ifdef H5
					_app.showToast('保存了');
					// #endif
				},
				share() {
					// #ifdef APP-PLUS
					_app.getShare(false, false, 2, '', '', '', this.poster.finalPath, false, false);
					// #endif
					
					// #ifndef APP-PLUS
					_app.showToast('分享了');
					// #endif
				},
				hideQr() {
					this.qrShow = false;
				}
				
		}
	}
</script>

<style lang="scss">
page{
	background-color: #f6f6f6;
}
.swiperWrap{
	position: relative;
	.swiper{
		width: 750rpx;
		height: 600rpx;
		.img{
			width: 750rpx;
			height: 600rpx;
		}
	}
	.num{
		position: absolute;
		right: 10rpx;
		bottom: 10rpx;
		width: 74rpx;
		height: 36rpx;
		background-color: #000000;
		border-radius: 18rpx;
		color: white;
		font-size: 28rpx;
		text-align: center;
		line-height: 36rpx;
	}
}
.content{
	width: 750rpx;
	padding: 30rpx;
	border-bottom: 1px solid #e3e3e3;
	box-sizing: border-box;
	background-color: white;
	.title{
		width: 685rpx;
		height: 80rpx;
		font-family: PingFang-SC-Bold;
		font-size: 34rpx;
		font-weight: normal;
		font-stretch: normal;
		color: #333333;
	}
	.description{
		font-family: PingFang-SC-Medium;
		font-size: 28rpx;
		font-weight: normal;
		font-stretch: normal;
		color: #888888;
		margin-top: 29rpx;
		margin-bottom: 29rpx;
	}
	.bottom{
		display: flex;
		justify-content: space-between;
		align-items: center;
		.price{
			display: flex;
			align-items: center;
			.currentPrice{
				font-family: PingFang-SC-Medium;
				font-size: 42rpx;
				font-weight: normal;
				font-stretch: normal;
				color: #ff9000;
			}
			.originalPrice{
				font-family: PingFang-SC-Medium;
				font-size: 28rpx;
				font-weight: normal;
				font-stretch: normal;
				color: #999999;
				text-decoration: line-through;
				margin-left: 20rpx;
			}
		}
	}
}
.nav{
	height: 106rpx;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0 30rpx;
	font-family: PingFang-SC-Medium;
	font-size: 28rpx;
	font-weight: normal;
	font-stretch: normal;
	color: #333333;
	background-color: white;
	.symbol{
		width: 15rpx;
		height: 27rpx;
	}
}
.info{
	margin-top: 14rpx;
	text-align: center;
	background-color: white;
	.navwrap{
		display: flex;
		padding: 30rpx 0;
		justify-content: center;
		.active{
			background-color: #47c807;
			color: white;
		}
		view{
			width: 345rpx;
			height: 80rpx;
			background-color: #f2f2f2;
			line-height: 80rpx;
		}
	}
	.article{
		width: 687rpx;
		font-family: PingFang-SC-Regular;
		font-size: 28rpx;
		font-weight: normal;
		font-stretch: normal;
		line-height: 42rpx;
		color: #333333;
		margin: 0 auto;
		text-align: left;
	}
	.productInfo{
		.img1{
			width: 707rpx;
			height: 559rpx;
		}
		.img2{
			width: 750rpx;
		}
	}
}
// 底部
.footer{
	width: 750rpx;
	height: 98rpx;
	background-color: #ffffff;
	position: fixed;
	bottom: 0;
	display: flex;
	padding-left: 30rpx;
	padding-right: 10rpx;
	align-items: center;
	box-sizing: border-box;
	.wrap{
		display: flex;
		flex-direction: column;
		align-items: center;
		image{
			width: 40rpx;
			height: 40rpx;
		}
		view{
			font-family: PingFang-SC-Medium;
			font-size: 20rpx;
			font-weight: normal;
			font-stretch: normal;
			color: #333333;
			margin-top: 9rpx;
		}
	}
	.center{
		margin-left: 73rpx;
		margin-right: 73rpx;
	}
	.addCart{
		width: 200rpx;
		height: 79rpx;
		background-image: linear-gradient(90deg, 
			#6fde39 0%, 
			#46c806 100%), 
		linear-gradient(
			#1eac28, 
			#1eac28);
		background-blend-mode: normal, 
			normal;
		border-radius: 39rpx 0rpx 0rpx 39rpx;
	}
	.buy{
		width: 200rpx;
		height: 79rpx;
		background-image: linear-gradient(90deg, 
			#feb12a 0%, 
			#ff8c06 100%), 
		linear-gradient(
			#ff9000, 
			#ff9000);
		background-blend-mode: normal, 
			normal;
		border-radius: 0rpx 39rpx 39rpx 0rpx;
	}
	button{
		font-family: PingFang-SC-Medium;
		font-size: 30rpx;
		font-weight: normal;
		font-stretch: normal;
		color: #ffffff;
		line-height: 79rpx;
		text-align: center;
		margin: 0;
		padding: 0;
	}
}

	
	/**
	 * 海报绘制css
	 */
	.hideCanvasView {
		position: relative;
	}
	
	.hideCanvas {
		position: fixed;
		top: -99999upx;
		left: -99999upx;
		z-index: -99999;
	}
	
	.flex_row_c_c {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}
	
	.modalView {
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		opacity: 0;
		outline: 0;
		transform: scale(1.2);
		perspective: 2500upx;
		background: rgba(0, 0, 0, 0.6);
		transition: all .3s ease-in-out;
		pointer-events: none;
		backface-visibility: hidden;
		z-index: 999;
	}
	
	.modalView.show {
		opacity: 1;
		transform: scale(1);
		pointer-events: auto;
	}
	
	.flex_column {
		display: flex;
		flex-direction: column;
	}
	
	.backgroundColor-white {
		background-color: white;
	}
	
	.border_radius_10px {
		border-radius: 10px;
	}
	
	.padding1vh {
		padding: 1vh;
	}
	
	.posterImage {
		/* width: 60vw; */
		width: 690rpx;
		height: 794rpx;
	}
	
	.flex_row {
		display: flex;
		flex-direction: row;
	}
	
	.marginTop2vh {
		margin-top: 2vh;
		width: 750rpx;
		height: 132rpx;
		background-color: white;display: flex;align-items: center;position: fixed;bottom: 0;border-top: 1px solid #e3e3e3;justify-content: space-around;
	}
	.canvas-btn{
		width: 200rpx;
		height: 61rpx;
		background-image: linear-gradient(90deg, 
			#feb12a 0%, 
			#ff8c06 100%), 
		linear-gradient(
			#f6f6f6, 
			#f6f6f6);
		background-blend-mode: normal, 
			normal;
		border-radius: 30rpx;
		position: fixed;
		bottom: 202rpx;
		right: 30rpx;
		line-height: 61rpx;
		color: white;
		z-index: 214748364;
		font-size: 28rpx;
	}
	.canvasImage{
		width: 100rpx;height: 101rpx;margin-right: 20rpx;
	}
</style>
