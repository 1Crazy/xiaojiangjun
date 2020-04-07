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
				<textarea value="" placeholder="点评一下吧,您的意见很重要哦~" class="txtarea" />
			</view>
			<view class="picWrap">
				<image class="img" src="../../static/public/index-S.png" mode=""></image>
				<image class="img" src="../../static/public/index-S.png" mode=""></image>
				<image class="img" src="../../static/public/index-S.png" mode=""></image>
				<image class="img" src="../../static/public/index-S.png" mode=""></image>
				<!-- 图片以上是循环，图片以下是上传按钮的图片 -->
				<image class="img" src="../../static/public/addpic.png" @tap="uploadImage" mode=""></image>
			</view>
		</view>
		<button class="wordBtn">发表评论</button>
	</view>
</template>

<script>
	import { Request } from '../../public/utils.js'
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
			};
		},
		onLoad(e) {
			console.log(e)
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
			changeStar(idx){
				this.starArray = this.starArray.map((curr,index)=>{
					idx>=index ? curr = 'star.png' : curr = 'star_n.png';
					return curr
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
						// console.log(res,'resresres')
				  //       console.log(JSON.stringify(res.tempFilePaths));
						that.uploadImg.push(res.tempFilePaths)
						uni.uploadFile({
						    url: 'util.uploader.upload&file=file', //仅为示例，非真实的接口地址
						    filePath: JSON.stringify(that.uploadImg),
						    name: 'file',
						    formData: {
						        'user': 'test'
						    },
						    success: (uploadFileRes) => {
						        // console.log(uploadFileRes.data);
						    }
						});
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
		.img{
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