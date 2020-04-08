<template>
	<view>
		<view class="header">
			<product-title v-for="(item,index) in goods" :key="index" :img="item.thumb" :title='item.title' shortTitle='我是短标题' borderBottomStyle='none'></product-title>
		</view>
		<view class="content">
			<view class="ct-header">
				<view class="title">星级评价：</view>
				<image v-for="(item , index) in starArray" :key="index" :src="imgSrc+'public/'+item" class="star" @tap="changeStar(index)"></image>
			</view>
			<view class="txtareaWrap">
				<image src="../../static/public/pen.png" class="img"></image>
				<textarea @input="changeTextAreaContent" :value="reviewContent" placeholder="点评一下吧,您的意见很重要哦~" class="txtarea" />
			</view>
			<view class="picWrap">
				<view class="imgWrap" v-for="(item,index) in uploadImg" :key="index">
					<image class="img" :src="item" mode=""></image>
					<image src="../../static/public/redFalse.png" class="img redfalseimg" @tap="delCurrentUploadImg(index)"></image>
				</view>
				<!-- 图片以上是循环，图片以下是上传按钮的图片 -->
				<image class="uploadimg" src="../../static/public/addpic.png" @tap="uploadImage" mode=""></image>
			</view>
		</view>
		<button class="wordBtn" @tap="publishReview">发表评论</button>
	</view>
</template>

<script>
	import { Request,dev } from '../../public/utils.js'
	import productTitle from '@/components/productTitle/productTitle.vue'
	export default {
		components:{
			productTitle
		},
		data() {
			return {
				imgSrc: this.$store.state.imgSrc,
				goods:[],
				starArray: ['star_n.png','star_n.png','star_n.png','star_n.png','star_n.png'],
				uploadImg: [],
				id: '',
				reviewContent: ''
			};
		},
		onLoad(e) {
			this.id = e.id
			this.getData(e.id)
		},
		onShow() {
			
		},
		methods:{
			getData(id){
				Request(
					'order.comment',
					{
						id
					}
				)
				.then((res)=>{
					console.log(res,'res')
					this.goods = res.data.goods
				})
				.catch((res)=>{

				})
			},
			// 文本框
			changeTextAreaContent(e){
				this.reviewContent = e.detail.value
			},
			// 发表评论
			publishReview(){
				const num = this.starArray.findIndex(curr=>curr == 'star_n.png')
				const submitImg = []
				this.uploadImg.map((curr,index)=>{
					uni.uploadFile({
						url: dev +'util.uploader.upload&file=file', //仅为示例，非真实的接口地址
						filePath: curr,
						name: 'file',
						formData: {
							'user': 'test'
						},
						success: (uploadFileRes) => {
							submitImg.push(JSON.parse(uploadFileRes.data).files[0].url)
							if(index == this.uploadImg.length-1){
								const comments = this.goods.map(curr=>{
									curr.level = num
									curr.content = this.reviewContent
									curr.images = submitImg
									return curr
								})
								Request(
									'order.comment.submit',
									{
										orderid: this.id,
										comments
									}
								)
								.then((res)=>{
									console.log(res,'res')
									this.goods = res.data.goods
								})
								.catch((res)=>{
									
								})
							}
						},
						fail:(err) => {
							console.log(err)
						}
					});
				})
			},
			// 星级
			changeStar(idx){
				this.starArray = this.starArray.map((curr,index)=>{
					idx>=index ? curr = 'star.png' : curr = 'star_n.png';
					return curr
				})
			},
			// 删除图片
			delCurrentUploadImg(idx){
				console.log(idx,'idx')
				this.uploadImg = this.uploadImg.filter((curr,index)=>{
					return index != idx
				})
			},
			uploadImage(){
				console.log(3333)
				const that  = this
				if (that.uploadImg.length >= 6) {
				  uni.showToast({
					title:'图片最多上传6张',
					icon: 'none'
				  })
				  return false
				}
				uni.chooseImage({
				    count: 6, //默认9
				    sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				    sourceType: ['album'], //从相册选择
				    success: function (res) {
						console.log(res,'resresres')
						that.uploadImg = that.uploadImg.concat(res.tempFilePaths)
						// res.tempFilePaths.map(curr=>{
						// 	uni.uploadFile({
						// 	    url: dev +'util.uploader.upload&file=file', //仅为示例，非真实的接口地址
						// 	    filePath: curr,
						// 	    name: 'file',
						// 	    formData: {
						// 	        'user': 'test'
						// 	    },
						// 	    success: (uploadFileRes) => {
						// 	        console.log(uploadFileRes.data,'1314');
						// 	    },
						// 		fail:(err) => {
						// 			console.log(err)
						// 		}
						// 	});
						// })
						// that.uploadImg.push(res.tempFilePaths)
						// that.uploadImage = JSON.parse(JSON.stringify(that.uploadImg))[0].join(',')
						// console.log(that.uploadImage)
				    }
				});
			}
		}
	}
</script>

<style lang="scss">
page{
	background-color: #f4f4f4;
}
.header{
	padding: 0 21rpx;
	background-color: white;
}
.content{
	width: 750rpx;
	height: 992rpx;
	margin-top: 20rpx;
	background-color: white;
	padding:40rpx 20rpx;
	box-sizing: border-box;
	.title{
		font-family: PingFang-SC-Medium;
		font-size: 30rpx;
		font-weight: normal;
		font-stretch: normal;
		color: #333333;
	}
	.ct-header{
		display: flex;
		.star{
			width: 43rpx;
			height: 40rpx;
			margin-left: 29rpx;
		}
	}
	.txtareaWrap{
		box-sizing: border-box;
		margin-top: 40rpx;
		padding:10rpx 10rpx;
		padding-left: 40rpx;
		width: 100%;
		height: 192rpx;
		box-sizing: border-box;
		position: relative;
		border: 1px solid #f4f4f4;
		.txtarea{
			width: 100%;
			height: 192rpx;
			color: #999999;
		}
		.img{
			position: absolute;
			left: 10rpx;
			top: 14rpx;
			width: 25rpx;
			height: 32rpx;
		}
	}
	.picWrap{
		width: 100%;
		display: flex;
		margin-right: 15rpx;
		flex-wrap: wrap;
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
}
.wordBtn{
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
	font-family: PingFang-SC-Medium;
	font-size: 30rpx;
	font-weight: normal;
	font-stretch: normal;
	line-height: 88rpx;
	position: fixed;
	bottom: 0;
	left: 20rpx;
	bottom: 20rpx;
	color: white;
}
</style>