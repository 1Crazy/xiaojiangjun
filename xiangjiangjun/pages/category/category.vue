<template>
	<view>
		<view class="header">
			<input class="ipt" type="text" value="" @input="find" placeholder="请输入你想要搜索的内容" />
			<image lazy-load src="/static/public/fdj1.png" class="img"></image>
		</view>
		<!-- <view v-if="update"> -->
			<category
				activeBackgroundColor='#1db728'
				activeTextColor='white' 
				:categoryList="categoryList" 
				:subCategoryList="subCategoryList"
				@categoryMainClick="categoryMainClick"
				@categorySubClick="categorySubClick"
				rightBackgroundColor='white'
				rightFontSize='26rpx'
				rightImgWidth='120rpx'
				rightImgHeight="120rpx"
				rightImgBorderRadius="50%"
				:defaultActive='activeIndex'
				borderStyle='1px solid #e3e3e3'
			>
			</category>
		<!-- </view> -->
		
	</view>
</template>

<script>
	import category from "../../components/qiyue-category/qiyue-category.vue"
	import { Request } from "../../public/utils.js"
	import _app from '../../js_sdk/QuShe-SharerPoster/util/QS-SharePoster/app.js';
	        export default {
	            components:{
	                category
	            },
	            data() {
	                return {
						imgSrc: this.$store.state.imgSrc,
	                    categoryList:[],// 主分类数据
	                    subCategoryList:[], // 子分类数据
						update: false,
						activeIndex: null
	                }
	            },
				onLoad() {
					this.getData('',true);
				},
				onShow() {
					
				},
	            methods: {
					// 子分类左边点击事件
	                categoryMainClick(category){
						this.activeIndex=category.id
	                    this.subCategoryList = category.subCategoryList;
						if(!this.subCategoryList){
							this.subCategoryList = []
							_app.showToast('该分类占无商品')
						}
	                },
					// 子分类右边点击事件
	                categorySubClick(category){
	                    console.log(category);
						uni.navigateTo({
							url: `/pages/productInfo/productInfo?id=`+category.id
						})
	                },
					getData(findkey = '',bool){
						Request(
							'goods.get_bycategory',
							{
								findkey:findkey,
								type:1
							}
						)
						.then((res)=>{
							this.categoryList = res.data.categoryList
							if(bool){
								this.subCategoryList = this.categoryList[0].subCategoryList;
							}else{
								res.data.categoryList.map((curr,index)=>{
									if (curr.id == this.activeIndex){
										this.subCategoryList = this.categoryList[index].subCategoryList
									}
								})
							}
						})
						.catch((res)=>{
							// 失败方法
						})
					},
					find(e){
						this.getData(e.detail.value);
					}
	            },
	            mounted() {
					
	            }
	        }
</script>

<style lang="scss">
	page{
		background-color: #f8f8f8;
	}
.header{
	background-color: #f8f8f8;
	margin: 20rpx auto;
	position: relative;
	width: 710rpx;
	height: 80rpx;
	.ipt{
		width: 710rpx;
		height: 80rpx;
		background-color: #ffffff;
		border-radius: 40rpx;
		border: solid 1rpx #e3e3e3;
		line-height: 80rpx;
		font-family: PingFang-SC-Regular;
		font-size: 28rpx;
		font-weight: normal;
		font-stretch: normal;
		color: #999999;
		padding-left: 101rpx;
		padding-right: 29rpx;
		box-sizing: border-box;
		margin: 0 auto;
	}
	.img{
		position: absolute;
		width: 40rpx;
		height: 33rpx;
		left:29rpx;
		top: 23rpx;
	}
}
</style>
