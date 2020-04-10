<template>
	<view>
		<view class="itemMenu" v-for="(item ,index) in lists.list" :key="item.id">	
			<radio class="itemRadio" color="#ff9000" :value="item.id" @tap="radioChange(item.id)" :checked="item.selected==1 ? true : false" />
			<image lazy-load class="img" :src="item.thumb"></image>
			<view class="info">
				<view class="infoTop">
					<view class="title">{{item.title}}</view>
					<view class="price">￥{{item.marketprice}}</view>
				</view>
				<view class="shortitle">{{item.shorttitle}}</view>
			</view>
			<view class="wrap">
				<view class="del" @tap="delNum(index)">-</view>
				<input class="num" type="text" v-model="item.total" :id="index" @confirm="choose" />
				<view class="add" @tap="addNum(index)">+</view>
			</view>
			<image lazy-load class="delete" :src="imgSrc+'public/delete.png'" @tap="delNum(index,true)"></image>
		</view>
		
		<view style="height: 98rpx;"></view>
		<view class="bottom">
			<label class="radio">
				<radio class="itemRadio" color="#ff9000" value="all" :checked="allSelectChecked" @tap="AllCheckRadio" />全选</label>
			<view class="center">
				<view class="alltotall">合计：</view>
				<view class="price">￥{{lists.totalprice}}</view>
			</view>
			<button class="btn" @tap="settlement">结算({{lists.total}})</button>
		</view>
	</view>
</template>

<script>
	import { Request } from '../../public/utils.js'
	export default {
		data() {
			return {
				imgSrc: this.$store.state.imgSrc,
				lists:[],
				allSelectChecked: false
			}
		},
		onLoad() {
			
		},
		onShow() {
			this.getData()
		},
		methods: {
			// 全选
			AllCheckRadio(e){
				console.log(e,'ewwewe')
				const lists = this.lists
				if (!this.allSelectChecked) {
					lists.list = lists.list.map(curr=>{
						curr.selected = 1
						return curr
					})
					this.upGoodsChecked('all',1)
				}else{
					lists.list = lists.list.map(curr=>{
						curr.selected = 0
						return curr
					})
					this.upGoodsChecked('all',0)
				}
				this.lists = lists
				this.allSelectChecked ?  this.allSelectChecked = false : this.allSelectChecked = true
			},
			radioChange(id){
				const lists = this.lists
				let allSelectChecked = true
				lists.list = lists.list.map(curr=>{
					if (curr.id == id) {
						curr.selected == 1 ? curr.selected = 0 : curr.selected = 1
						this.upGoodsChecked(id,curr.selected)
					}
					if (curr.selected == 0){
						allSelectChecked = false
					}
					return curr
				})
				this.allSelectChecked = allSelectChecked
				this.lists = lists
			},
			upGoodsChecked(id,select){
				Request(
					'member.cart.select',
					{
						id,
						select
					},
					"POST",
					'application/x-www-form-urlencoded'
				).then((res)=>{
					console.log(res)
					// 成功方法
					this.getData()
				})
				.catch((res)=>{
					// 失败方法
				})
			},
			getData(){
				Request(
					'member.cart.get_cart'
				).then((res)=>{
					console.log(res,'reresresrs')
					// 成功方法
					this.lists = res.data
					
					this.allSelectChecked = res.data.ischeckall
				})
				.catch((res)=>{
					// 失败方法
				})
			},
			upGoodsNum(id,num){
				Request(
					'member.cart.update',
					{
						id:id,
						total:num
					}
				).then((res)=>{
					console.log(res)
					// 成功方法
					this.getData()
				})
				.catch((res)=>{
					// 失败方法
				})
			},
			delGoods(id){
				// console.log(id)
				Request(
					'member.cart.remove',
					{
						ids:id
					}
				).then((res)=>{
					console.log(res)
					// 成功方法
					this.getData()
				})
				.catch((res)=>{
					// 失败方法
				})
			},
			delNum(id,remove=false){
				const that = this
				if(remove){
					// console.log('点击删除');
					uni.showModal({
					    title: '提示',
					    content: '确定删除吗?',
					    success: function (res) {
					        if (res.confirm) {
					           const ids = [];
					           ids.push(that.lists.list[id]['id'])
					           that.delGoods(ids)
					        } else if (res.cancel) {
					            console.log('用户点击取消');
					        }
					    }
					});
				}else{
					if(parseInt(this.lists.list[id]['total'])-1==0){
						// this.$refs.centerpopup.open()
						// const ids = [];
						// ids.push(this.lists.list[id]['id'])
						// this.delGoods(ids)
						uni.showToast({
							title:'数量已经不能再低了',
							icon: 'none'
						})
					}else{
						this.upGoodsNum(this.lists.list[id]['id'],parseInt(this.lists.list[id]['total'])-1)
					}
				}
			},
			addNum(id){
				// console.log(id)
				// console.log(this.lists.list[id]['id'])
				this.upGoodsNum(this.lists.list[id]['id'],parseInt(this.lists.list[id]['total'])+1)
			},
			choose(e){
				// console.log(e.target.id)
				// console.log(e.detail.value)
				if(parseInt(e.detail.value)==0){
					const ids = [];
					ids.push(this.lists.list[e.target.id]['id'])
					this.delGoods(ids)
				}else{
					this.upGoodsNum(this.lists.list[e.target.id]['id'],parseInt(e.detail.value))
				}
			},
			settlement(){
				if (this.lists.total > 0) {
					uni.navigateTo({
						url: '/pages/isSureOrder/isSureOrder'
					})
				}else{
					uni.showToast({
						title: '未选择订单',
						icon: 'none'
					})
				}
			}
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
