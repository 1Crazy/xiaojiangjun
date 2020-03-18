<template>
	<view>
		<view class="nav">
			<view class="nav-left">
				<scroll-view scroll-y :style="'height:'+height+'px'">
					<view class="nav-left-item" v-for="(item,index) in categoryList" @click="categoryClickMain(item,index)" :key="index"
					 :style="index==categoryActive?'color:'+activeTextColor+';background-color:'+activeBackgroundColor:''">
						{{item[label]}}
					</view>
				</scroll-view>
			</view>
			<view class="nav-right" :style="'background-color:'+rightBackgroundColor">
				<scroll-view scroll-y :scroll-top="scrollTop" @scroll="scroll" :style="'height:'+height+'px'" scroll-with-animation>
					<view class="nav-right-item" v-for="(item,index2) in subCategoryList" :key="index2" @click="categoryClickSub(item)">
						<image :src="item[imgSrc]" :style="'width:'+rightImgWidth+';height:'+rightImgHeight+';border-radius:'+rightImgBorderRadius" />
						<view>{{item[label]}}</view>
					</view>
				</scroll-view>
			</view>
		</view>
	</view>
</template>

<script>
	//https://ext.dcloud.net.cn/plugin?id=72
	export default {
		name: "category",
		data() {
			return {
				height: 0,
				scrollTop: 0,
				scrollHeight: 0,
				categoryActive: 0,
				activeStyle: {
					color: this.activeTextColor,
					backgroundColor: this.activeBackgroundColor
				}
			}
		},
		props: {
			//主分类激活索引
			defaultActive: {
				type: Number,
				default: 0
			},
			//主分类List
			categoryList: {
				type: Array,
				default: () => {
					return null;
				}
			},
			//侧边分类List
			subCategoryList: {
				type: Array,
				default: () => {
					return null;
				}
			},
			activeTextColor: {
				type: String,
				default: '#F24544'
			},
			activeBackgroundColor: {
				type: String,
				default: '#e5e5e5'
			},
			label: {
				type: String,
				default: 'name'
			},
			imgSrc: {
				type: String,
				default: 'logo'
			},
			//主分类点击事件
			categoryMainClick: {},
			//子分类点击事件
			categorySubClick: {},
			rightBackgroundColor: {
				type: String,
				default: '#e5e5e5'
			},
			rightImgWidth:{
				type: String,
				default: '50rpx'
			},
			rightImgHeight:{
				type: String,
				default: '50rpx'
			},
			rightImgBorderRadius:{
				type: String,
				default: '100%'
			}
		},
		methods: {
			scroll(e) {
				this.scrollHeight = e.detail.scrollHeight;
			},
			categoryClickMain(category, index) {
				this.$emit('categoryMainClick',category)
				this.categoryActive = index;
				this.scrollTop = -this.scrollHeight * index;
			},
			categoryClickSub(category) {
				this.$emit('categorySubClick',category)
			}
		},
		mounted() {
			this.categoryActive = this.defaultActive
			uni.getSystemInfo({
				success: res => {
					this.height = res.screenHeight;
				}
			})
		},
		watch: {
			subCategoryList(newValue, oldValue) {
				
			}
		},
	}
</script>

<style scoped>
	.nav {
		display: flex;
		width: 100%;
	}

	.nav-left {
		width: 30%;
	}

	.nav-left-item {
		height: 120rpx;
		border-right: solid 1px #E0E0E0;
		border-bottom: solid 1px #E0E0E0;
		font-size: 30rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.nav-right {
		width: 70%;
		padding-top: 22rpx;
	}

	.nav-right-item {
		width: 28%;
		height: 100px;
		float: left;
		text-align: center;
		padding: 10rpx;
		font-size: 26rpx;
	}

	.nav-right-item image {
		width: 50rpx;
		height: 50rpx;
	}

	.active {
		color: #F24544;
	}

	.padding {
		height: var(--status-bar-height);
		width: 100%;
		top: 0;
		position: fixed;
		background-color: #F24544;
	}
</style>
