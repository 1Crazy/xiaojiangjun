<template>
	<view>
		<view class="header-wrap">
			<product-title v-for="(item,index) in goods" :key="index"
				:img="item.thumb"
				:title="item.title"
				:shortTitle='item.shorttitle'
				:borderBottomStyle='none'
			></product-title>
		</view>
		<view class="chooiseWrap">
			<view class="chooiseItem isborder" @tap="goodsStatus(true)" v-if="notReturnGoods">
				<view class="leftWrap">
					<view class="title">货物状态</view>
				</view>
				<view class="right">{{currentStatusGoodsWord?currentStatusGoodsWord:'请选择'}}</view>
				<image class="img" src="../../static/public/arrow.png" mode=""></image>
			</view>
			<view class="chooiseItem"  @tap="refundReson">
				<view class="leftWrap">
					<view class="title">退款原因</view>
					<view class="leftBottom">
						<text class="txt1">退款金额：</text>
						<text class="txt2">￥{{orderInfo.price}}</text>
					</view>
				</view>
				<view class="right">{{currentReturnResonWord?currentReturnResonWord:'请选择'}}</view>
				<image class="img" src="../../static/public/arrow.png" mode=""></image>
			</view>
		</view>
		<view class="uploadCertificate">
			<view class="title">上传凭证</view>
			<view class="imageWrap">
				<view class="imgWrap" v-for="(item,index) in chooseImg" :key="index">
					<image class="img" :src="item" mode=""></image>
					<image src="../../static/public/redFalse.png" class="img redfalseimg" @tap="delCurrentUploadImg(index)"></image>
				</view>
				<!-- 图片以上是循环，图片以下是上传按钮的图片 -->
				<image class="uploadimg" src="../../static/public/addpic.png" @tap="chooseImges" mode=""></image>
			</view>
		</view>
		
		

		
		<view style="height: 108rpx;width: 750rpx;background-color: white;"></view>
		<button class="submitBtn" @tap="subRefund()">提交</button>
		<!-- 货物状态模态框 -->
		<uni-popup ref="addCartPopup" type="bottom">
			<view class="productSpecificationsModelContent">
				<image class="closeImg" :src="imgSrc+'public/goumai_guanbi.png'" @tap="goodsStatus(false)"></image>
				<view class="title">货物状态</view>
				 <radio-group @change="goodsStatusChange">
					<label class="radio" v-for="(item ,index) in goodsStatusArray" :key="index">
						<text>{{item.name}}</text><radio :value="item.value" color="#ff9000"/>
					</label>
				</radio-group>
				<button class="submitBtn" @tap="submitBtn()">提交</button>
			</view>
		</uni-popup>
		<!-- 退款原因模态框 -->
		<uni-popup ref="returnMoneyReason" type="bottom">
			<view class="productSpecificationsModelContent">
				<image class="closeImg" :src="imgSrc+'public/goumai_guanbi.png'" @tap="refundReson(false)"></image>
				<view class="title">退款原因</view>
				 <radio-group class="radioGroup" @change="returnReasonChange">
					<label class="radio" v-for="(item ,index) in returnReasonArray" :key="index">
						<text>{{item.name}}</text><radio :value="item.value" color="#ff9000"/>
					</label>
				 </radio-group>
				<button class="submitBtn" @tap="returnMoneyReasonSubmitBtn()">提交</button>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import productTitle from '@/components/productTitle/productTitle.vue'
	import {uniPopup} from '../../components/uni/uni-popup/uni-popup.vue'
	import {Request,dev} from '../../public/utils.js'
	export default {
		components: {
			productTitle,
			uniPopup
		},
		data() {
			return {
				imgSrc: this.$store.state.imgSrc,
				notReturnGoods: true,
				currentStatusGoodsWord: null,
				currentReturnResonWord: null,
				tmpWord: ['请选择','请选择'],
				goodsStatusArray: [{
					name: '未收到货',
					value: '0'
				},{
					name: '已收到货',
					value: '1'
				},],
				returnReasonArray: [{
					name: '不想买了',
					value: '0'
				},{
					name: '拍错了/订单信息错误',
					value: '1'
				},{
					name: '其他',
					value: '2'
				},],
				orderid:'',//订单id
				goods:{},
				orderInfo:{},//订单信息
				chooseImg:[]
			};
		},
		onLoad(options) {
			options.word == 'notReturnGoods' ? this.notReturnGoods = false : this.notReturnGoods = true,
			this.orderid = options.id
			this.getData()
		},
		onShow() {
			
		},
		methods:{
			goodsStatus(bool){
				bool ? this.$refs.addCartPopup.open() : this.$refs.addCartPopup.close()
			},
			refundReson(bool){
				bool ? this.$refs.returnMoneyReason.open() : this.$refs.returnMoneyReason.close()
			},
			submitBtn(){
				this.currentStatusGoodsWord = this.tmpWord[0]
				this.$refs.addCartPopup.close()
				
			},
			// 删除图片
			delCurrentUploadImg(idx){
				console.log(idx,'idx')
				this.chooseImg = this.chooseImg.filter((curr,index)=>{
					return index != idx
				})
			},
			//货物切换状态
			goodsStatusChange(e){
				// currentStatusGoodsWord: null,
				// currentReturnResonWord: null,
				// goodsStatusArray,returnReasonArray  this.currentReturnResonWord
				this.goodsStatusArray.map(curr=>{
					if ( curr.value == e.detail.value ) {
						this.tmpWord[0] = curr.name
					}
				})
				console.log(e)
			},
			//退款原因切换状态
			returnReasonChange(e){
				this.returnReasonArray.map(curr=>{
					if ( curr.value == e.detail.value ) {
						this.tmpWord[1] = curr.name
					}
				})
			},
			// 退款原因模态框中的确定按钮
			returnMoneyReasonSubmitBtn(){
				this.currentReturnResonWord = this.tmpWord[1]
				this.$refs.returnMoneyReason.close()
			},
			getData(){
				Request(
					'order.detail',
					{
						id:this.orderid
					}
				)
				.then((res)=>{
					this.goods = res.data.goods
				})
				.catch((res)=>{
					
				})
				Request(
					'order.refund',
					{
						id:this.orderid
					}
				)
				.then((res)=>{
					this.orderInfo = res.data
				})
				.catch((res)=>{
					
				})
			},
			chooseImges(){
				const that = this
				uni.chooseImage({
					count: 6, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: function (res) {
						that.chooseImg = that.chooseImg.concat(res.tempFilePaths);
					}
				});
			},
			subRefund(){
				// console.log(this.chooseImg)
				// const url = dev+'util.uploader.upload&file=file'
				// uni.uploadFile({
				//     url: url, //仅为示例，非真实的接口地址
				//     filePath: this.chooseImg[0],
				//     name: 'file',
				//     success: (uploadFileRes) => {
				//         console.log(uploadFileRes.data);
				//     }
				// });
				
				const submitImg = []
				const that = this
				// 循环异步，后期更换
				this.chooseImg.map((curr,index)=>{
					uni.uploadFile({
						url: dev +'util.uploader.upload&file=file', //仅为示例，非真实的接口地址
						filePath: curr,
						name: 'file',
						formData: {
							'user': 'test'
						},
						success: (uploadFileRes) => {
							submitImg.push(JSON.parse(uploadFileRes.data).files[0].url)
							if(index == this.chooseImg.length-1){
								const data = {}
								data.orderid= that.id
								data.images= submitImg
								data.price= that.orderInfo.price
								data.reason= that.currentReturnResonWord
								if (that.notReturnGoods) {
									data.rtype=  that.currentStatusGoodsWord == '未收到货' ? 0 : 1
								}
													
								Request(
									'order.refund.submit',
									data,
									'POST'
								)
								.then((res)=>{
									uni.showToast({
										title: '申请退款成功',
										icon: 'none'
									})
									uni.navigateBack({})
								})
								.catch((res)=>{
									uni.showToast({
										title: '申请退款失败',
										icon: 'none'
									})
								})
							}
						},
						fail:(err) => {
							console.log(err)
						}
					});
				})
				
				
				
				
				// uni.uploadFile({
				//     url: url, //仅为示例，非真实的接口地址
				//     files: this.chooseImg,
				//     name: 'file',
				//     success: (uploadFileRes) => {
				//         console.log(uploadFileRes.data);
				//     }
				// });
			}
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
			width: 442rpx;
			font-family: PingFang-SC-Medium;
			font-size: 30rpx;
			font-weight: normal;
			font-stretch: normal;
			line-height: 36rpx;
			letter-spacing: 0rpx;
			color: #999999;
			text-align: right;
			overflow:hidden; 
			text-overflow:ellipsis; 
			white-space:nowrap; 
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
	.imageWrap{
		display: flex;
		flex-wrap: wrap;
	}
	.imgWrap{
		position: relative;
		width: 158rpx;
		height: 158rpx;
		margin-top: 20rpx;
		margin-right: 15rpx;
		border: 1px solid #f3f3f3;
		.img{
			width: 158rpx;
			height: 158rpx;
		}
		.redfalseimg{
			width: 30rpx;
			height: 30rpx;
			position: absolute;
			right: -15rpx;
			top: -15rpx;
		}
	}
	.uploadimg{
		width: 162rpx;
		height: 162rpx;
		margin-top: 20rpx;
		margin-right: 15rpx;
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
	.title{
		font-family: PingFang-SC-Bold;
		font-size: 30rpx;
		font-weight: normal;
		font-stretch: normal;
		line-height: 36rpx;
		letter-spacing: 0rpx;
		color: #333333;
		text-align: center;
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
	.radio{
			display: flex;
			justify-content: space-between;
			margin-top: 48rpx;
		}
	.radio:last-child{
		margin-bottom: 136rpx;
	}
}
</style>
