<template>
	<view>
		<view class="header">
			<view class="headerWord">邀请5人注册商城账号可获得体验者资格</view>
			<button class="btn" open-type='share'>邀请好友注册</button>
			<view class="man">
				<view class="item" v-for="(item, index) in userList" :key="index">
					<image lazy-load :src="item.avatar" class="img"></image>
					<view>{{item.nickname}}</view>
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
				<view v-if="userList.length > 4" :class="isQualify && currentTab==1 ?  'word active' : 'word'" @tap="cutTab(1)">
					核销
					<view class="line"></view>
				</view>
				<view :class="isQualify && currentTab==2 ?  'word active' : 'word'" @tap="cutTab(2)">
					体验记录
					<view class="line"></view>
				</view>
			</view>
			<view class="qrcodeWrap" v-if="isQualify && currentTab == 1">
				<image lazy-load :src=qr class="img"></image>
				<view class="word">商家扫码核销</view>
			</view>
			<view class="qrcodeWrap" v-if="isQualify && currentTab == 2">
				<view class="itemWrap" v-for="(item,index) in exLog" :key="index">
					<view class="title">{{item.storename}}</view>
					<view class="textcontent">
						<view class="txt1">{{item.service}}</view>
						<view class="txt2">{{item.use_date}}</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import './index.scss'
	import { Request } from '../../public/utils.js'
	import _app from '../../js_sdk/QuShe-SharerPoster/util/QS-SharePoster/app.js';
	export default {
		data() {
			return {
				imgSrc: this.$store.state.imgSrc,
				isQualify: true,
				currentTab: 2,
				userList:[],
				exLog:[],
				qr:'',
				member:''
			};
		},
		onLoad(e) {
			// this.getData();
			const scene = decodeURIComponent(e.scene)
			var strs= new Array();
			strs = scene.split('=');
			this.member = strs[1];
			if(this.member){
				console.log('核销')
				this.hx(this.member)
				
			}else{
				console.log('aa')
			}
			
		},
		onShow(e) {
			this.getData();
		},
		onShareAppMessage() {
		   return {
		         title: '一起来体验',
		         desc: '',
		         path: '/pages/experiencer/experiencer?id=12' // 路径，传递参数到指定页面。
		    }
		},
		methods:{
			cutTab(num){
				this.currentTab = num
			},
			getData(){
				Request(
					'member.getMyExperiencer'
				)
				.then((res)=>{
					this.userList = res.data.users
					this.exLog = res.data.exlog
					this.qr = res.data.qr
					
					console.log(this.userList.length)
					console.log(this.exLog.length)
					
					if(res.data.users.length>4 && this.exLog.length<1 && res.data.sumb==''){
						this.isQualify=false
					}
				})
				.catch((res)=>{
					
				})
			},
			sumbit(){
				
			},
			hx(id){
				Request(
					'member.hexiao',
					{
						id:id
					}
				)
				.then((res)=>{
					if(res.data.code=='1'){
						_app.showToast(res.data.message)
					}
				})
				.catch((res)=>{
					
				})
			}
		}
	}
</script>

<style lang="scss">

</style>
