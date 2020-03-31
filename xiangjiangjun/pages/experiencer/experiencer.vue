<template>
	<view>
		<view class="header">
			<view class="headerWord">邀请5人注册商城账号可获得体验者资格</view>
			<button class="btn">邀请好友注册</button>
			<view class="man">
				<view class="item">
					<image src="../../static/public/adress1.png" class="img"></image>
					<view>橙子007</view>
				</view>
				<view class="item">
					<image src="../../static/public/adress1.png" class="img"></image>
					<view>橙子007</view>
				</view>
				<view class="item">
					<image src="../../static/public/adress1.png" class="img"></image>
					<view>橙子007</view>
				</view>
				<view class="item">
					<image src="../../static/public/adress1.png" class="img"></image>
					<view>橙子007</view>
				</view>
				<view class="item">
					<image src="../../static/public/adress1.png" class="img"></image>
					<view>橙子007</view>
				</view>
			</view>
		</view>
		<view class="formcontent" v-if="!isQualify">
			<view class="formcontentbottom">您已成功邀请5人，填写完整汽车资料即可参与体验</view>
			<view class="item">
				<view class="leftWrod">行驶证</view>
				<input type="text" value="" placeholder="请填写行驶证">
			</view>
			<view class="item">
				<view class="leftWrod">车架号</view>
				<input type="text" value="" placeholder="请填写车架号">
			</view>
			<view class="item">
				<view class="leftWrod">联系电话</view>
				<input type="text" value="" placeholder="请填写联系电话">
			</view>
			<view class="item">
				<view class="leftWrod">车牌号</view>
				<input type="text" value="" placeholder="请填写车牌号">
			</view>
			<view class="item">
				<view class="leftWrod">汽车型号品牌</view>
				<input type="text" value="" placeholder="请填写汽车型号品牌">
			</view>
			<view class="item">
				<view class="leftWrod">汽车换油情况</view>
				<input type="text" value="" placeholder="请填写上次换油时间">
			</view>
			<view class="item">
				<view class="leftWrod">换油地点</view>
				<input type="text" value="" placeholder="请填写换油地点">
			</view>
			<view class="item" style="border: none;">
				<view class="leftWrod">换油消费</view>
				<input type="text" value="" placeholder="请填写换油消费">
			</view>
			<button type="default" class="btn">提交资料</button>
		</view>
		<view class="qualifyWrap" v-if="isQualify">
			<view class="nav">
				<view :class="isQualify && currentTab==1 ?  'word active' : 'word'" @tap="cutTab(1)">
					核销
					<view class="line"></view>
				</view>
				<view :class="isQualify && currentTab==2 ?  'word active' : 'word'" @tap="cutTab(2)">
					体验记录
					<view class="line"></view>
				</view>
			</view>
			<view class="qrcodeWrap" v-if="isQualify && currentTab == 1">
				<image src="../../static/public/adress1.png" class="img"></image>
				<view class="word">商家扫码核销</view>
			</view>
			<view class="qrcodeWrap" v-if="isQualify && currentTab == 2">
				<view class="itemWrap">
					<view class="title">XX汽车美容服务</view>
					<view class="textcontent">
						<view class="txt1">汽车贴膜</view>
						<view class="txt2">2019-12-30</view>
					</view>
				</view>
				<view class="itemWrap">
					<view class="title">XX汽车美容服务</view>
					<view class="textcontent">
						<view class="txt1">汽车贴膜</view>
						<view class="txt2">2019-12-30</view>
					</view>
				</view>
				<view class="itemWrap">
					<view class="title">XX汽车美容服务</view>
					<view class="textcontent">
						<view class="txt1">汽车贴膜</view>
						<view class="txt2">2019-12-30</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import './index.scss'
	export default {
		data() {
			return {
				imgSrc: this.$store.state.imgSrc,
				isQualify: true,
				currentTab: 2
			};
		},
		methods:{
			cutTab(num){
				this.currentTab = num
			},
		}
	}
</script>

<style lang="scss">

</style>
