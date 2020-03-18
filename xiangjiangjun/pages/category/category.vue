<template>
	<view>
		<view class="header">
			<input class="ipt" type="text" value="" placeholder="请输入你想要搜索的内容" />
			<image src="/static/public/fdj1.png" class="img"></image>
		</view>
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
		>
		</category>
	</view>
</template>

<script>
	import category from "../../components/qiyue-category/qiyue-category.vue"
	        export default {
	            components:{
	                category
	            },
	            data() {
	                return {
	                    categoryList:[],
	                    subCategoryList:[]
	                }
	            },
	            methods: {
	                categoryMainClick(category){
	                    this.subCategoryList = category.subCategoryList;
	                },
	                categorySubClick(category){
	                    console.log(category);
	                }
	            },
	            mounted() {
	                for(var i=0;i<5;i++){
	                    var subList = [];
	                    for(var j=0;j<20;j++){
	                        subList.push({"name":"分类"+i+":商品"+j,"logo":"http://placehold.it/50x50"})
	                    }
	                    this.categoryList.push({"name":"分类"+i,"subCategoryList":subList})
	                }
	                this.subCategoryList = this.categoryList[0].subCategoryList;
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
