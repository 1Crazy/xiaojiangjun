<template>
	<view>
		<view class="hideCanvasView">
			<canvas class="hideCanvas" canvas-id="default_PosterCanvasId" :style="{width: (poster.width||0) + 'px', height: (poster.height||0) + 'px'}"></canvas>
		</view>
		<!-- 内容 -->
		<view class="swiperWrap">
			<swiper :current="current" @change="swiperChange" class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
				<swiper-item  v-for="(item ,index) in goods.thumbs" :key="index">
					<image class='img' :src="item" mode=""></image>
				</swiper-item>
			</swiper>
			<view class="num">{{current+1}}/{{goods.thumbs.length}}</view>
		</view>
		<view class="content">
			<view class="title">{{goods.title}}</view>
			<view class="description">{{goods.shorttitle}}</view>
			<view class="bottom">
				<view class="price">
					<view class="currentPrice">￥{{goods.marketprice}}</view>
					<view class="originalPrice">￥{{goods.productprice}}</view>
				</view>
				<view class="count">销量：{{goods.sales}}</view>
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
				<view v-html = "goods.content"></view>
			</view>
			<view :class="tab == 2 ? 'comment': 'hide'"  v-for="(item ,index) in commentList" :key="index">
				<view class="commentHeader">
					<image class="avatar" :src="item.headimgurl"></image>
					<view class="name">{{item.nickname}}</view>
					<image :class="item.level>=1 ? 'star': 'hide'" :src="imgSrc+'productInfo/star.png'" mode=""></image>
					<image :class="item.level>=2 ? 'star': 'hide'" :src="imgSrc+'productInfo/star.png'" mode=""></image>
					<image :class="item.level>=3 ? 'star': 'hide'" :src="imgSrc+'productInfo/star.png'" mode=""></image>
					<image :class="item.level>=4 ? 'star': 'hide'" :src="imgSrc+'productInfo/star.png'" mode=""></image>
					<image :class="item.level>=5 ? 'star': 'hide'" :src="imgSrc+'productInfo/star.png'" mode=""></image>
					<view class="date">{{item.createtime}}</view>
				</view>
				<view class="commentContent">{{item.content}}</view>
				<view :class="item.images.length>0?'commentPic':'hide'">
					<image :src="itemPic" class="pic" v-for="(itemPic ,index) in item.commentPic" :key="index"></image>
				</view>
			</view>
		</view>
		<view style="height: 100rpx;"></view>
		<!-- 底部 -->
		<view class="footer">
			<view class="wrap" @tap="gotoIndex()">
				<image :src="imgSrc+'public/xiangqing_huishouye.png'" ></image>
				<view>首页</view>
			</view>
			<view class="wrap center" @tap="shareFc()" >
				<image :src="imgSrc+'public/xiagnqiang_fenxiang.png'"></image>
				<view>分享</view>
			</view>
			<button open-type="contact" class="wrap" style="margin-right: 44rpx;height:80rpx;">
				<image :src="imgSrc+'public/xiangqing_kefu.png'"></image>
				<view style="margin-top: 24rpx;">客服</view>
			</button>
			<button class="btn addCart" @tap="addCartModel(true,1)">加入购物车</button>
			<button class="btn buy" @tap="addCartModel(true,2)">立刻购买</button>
		</view>
		<!-- 物流说明弹框 -->
		<uni-popup ref="popup" type="bottom">
			<view class="logisticsInfoModelContent">
				<image class="closeImg" :src="imgSrc+'public/goumai_guanbi.png'" @tap="LogisticsInfoModel(false)"></image>
				<view class="h-title">物流说明</view>
				<view class="step" v-for="(item , index) in delivery" :key="index">
					<view class="num">{{index+1}}</view>
					<view class="model-content">{{item}}</view>
				</view>
			</view>
		</uni-popup>
		<!-- 加入购物车商品规格选择模态框 -->
		<uni-popup ref="addCartPopup" type="bottom">
			<view class="productSpecificationsModelContent">
				<image class="closeImg" :src="imgSrc+'public/goumai_guanbi.png'" @tap="addCartModel(false)"></image>
				<view class="headerModelContent">
					<image class="img" :src="goods.thumb"></image>
					<view class="rightBox">
						<view class="r-title">{{goods.title}}</view>
						<view class="r-info">净含量：{{goods.weight}}克</view>
						<view class="r-num">库存：{{goods.total}}{{goods.unit}}</view>
					</view>
				</view>
				<view class="centerModelContent">
					<view class="c-header">
						<view class="price">￥{{goods.marketprice}}</view>
						<!-- <view class="hy-price">会员价:￥420</view> -->
						<view class="num">销量：{{goods.sales}}</view>
					</view>
					<view class="c-bottom">
						<view class="c-b-word">购买数量</view>
						<view class="r-wrap">
							<button class="symbol" @tap="delNum()">-</button>
							<input class="ipt" type="text" v-model="productNum" />
							<button class="symbol" @tap="addNum()">+</button>
						</view>
					</view>
					<view class="c-bottom-bottom">
						<view class="c-b-title">选择规格：</view>
						<view class="btn-wrap">
							<button type="default" :class="specificationIndex==index ? 'active-btn btn ' : 'btn'" v-for="(item ,index) in picker" :key="index" @tap="changeActiveBtn(index)">{{item.title}}</button>				
						</view>
					</view>
				</view>
				<button class="submitBtn" @tap="submitBtn()">提交</button>
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
	import { Request } from '../../public/utils.js'
	
	export default {
		components: {uniPopup},
		data() {
			return {
				imgSrc: this.$store.state.imgSrc,
				swiper: [{
					img: `${this.$store.state.imgSrc}productInfo/banner1.png`
				}, {
					img: `${this.$store.state.imgSrc}productInfo/banner2.png`
				}],
				current: 0,
				modelType: 1, // 1是加入购物车的,2是支付的
				tab: 1,//商品详情1，用户评价2
				commentList: [],
				/**
				 * 选择规格数据
				 */
				specificationList: [
					'我是规格1',
					'我是规格',
					'我是规格3',
					'我是规格4',
				],
				productNum: 1,
				specificationIndex: null,
				/**
				 * 海报绘制相关变量
				 */
				poster: {},
				qrShow: false,
				canvasId: 'default_PosterCanvasId',
				goods: [],
				goodscontent: "",
				compage:1,
				picker:[],
				pickerChoose:'',
				delivery:[]//物流说明
				//
			}
		},
		onLoad(e) {
			this.id = e.id;
			this.getGoodDetail(e.id);
		},
		methods: {
			swiperChange (e) {
				this.current=e.detail.current
			},
			//改变tab值
			changeTab(num){
				this.tab=num
			},
			getGoodDetail(id){
				Request(
					'goods.get_detail',
					{
						id:id
					}
				).then((res)=>{
					// console.log(res.data.goods)
					this.goods = res.data.goods
					this.delivery = res.data.deliverys.delivery_msg
					this.getComment(id)
					this.getPicker(id)
					// 成功方法
				})
				.catch((res)=>{
					// 失败方法
				})
			},
			getComment(id){
				Request(
					'goods.get_comment_list',
					{
						id:id,
						level:'all',
						page:this.compage
					}
				).then((res)=>{
					console.log(res.data)
					this.commentList = res.data.list
					// 成功方法
				})
				.catch((res)=>{
					// 失败方法
				})
			},
			getPicker(id){
				Request(
					'goods.get_picker',
					{
						id:id
					}
				).then((res)=>{
					console.log(res.data)
					this.picker = res.data.options
					// 成功方法
				})
				.catch((res)=>{
					// 失败方法
				})
			},
			addToCart(id,num){
				if(this.pickerChoose=='' && this.picker.length!=0){
					_app.showToast('请选择规格');
					return false
					// this.$refs.addCartPopup.open()
				}else{
					Request(
						'member.cart.add',
						{
							id:id,
							total:num,
							optionid:this.pickerChoose
						}
					).then((res)=>{
						// 成功方法
						if(res.data.error==0){
							_app.showToast('添加成功');
						}
						// uni.navigateTo({
						// 	url: '/pages/isSureOrder/isSureOrder'
						// })
					})
					.catch((res)=>{
						// 失败方法
					})
				}
			},
			//物流说明模态框
			LogisticsInfoModel(bool){
				bool ? this.$refs.popup.open() : this.$refs.popup.close()
			},
			// 商品加入购物车弹出模态框
			addCartModel(bool,num){
				this.modelType = num
				bool ? this.$refs.addCartPopup.open() : this.$refs.addCartPopup.close()
			},
			//返回首页
			gotoIndex(){
				uni.reLaunch({
					url: '/pages/index/index'
				})
			},
			// 改变当前规格参数值
			changeActiveBtn(index){
				this.specificationIndex = index
				this.pickerChoose = this.picker[index]['id']
				console.log(this.pickerChoose)
			},
			delNum(){
				if (this.productNum > 1) {
					this.productNum--
				}
			},
			addNum(){
				if (this.productNum < 200) {
					this.productNum++
				}
			},
			// 提交
			submitBtn(){
				// this.$refs.addCartPopup.close()
				const info =  this.id
				if(this.modelType==1){
					this.addToCart(info,this.productNum)
				}else{
					if(this.pickerChoose=='' && this.picker.length!=0){
						_app.showToast('请选择规格');
						return false
						// this.$refs.addCartPopup.open()
					}else{
						uni.navigateTo({
							url: '/pages/isSureOrder/isSureOrder?id='+info+'&num='+this.productNum+'&optionid='+this.pickerChoose
						})
					}
				}
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
											url: this.goods.thumb,
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
											url: this.goods.thumb,//小程序二维码
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
											text: this.goods.title,
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
											text: this.goods.marketprice,
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
	.btn{
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
