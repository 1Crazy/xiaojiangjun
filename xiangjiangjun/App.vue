<script>
	import {
		mapMutations
	} from 'vuex';
	import { Request } from 'public/utils.js'
	export default {
		methods: {
			...mapMutations(['login'])
		},
		onLaunch: function() {
			uni.login({
				provider: 'weixin',
					success: function (res) {
						// console.log(res);
						if (res.code){
							uni.setStorageSync('login_code', res.code)
						}
					}
			});
			const code = uni.getStorageSync('login_code')
			Request(
				'wxapp.login', 
				{
					code,
					comefrom:'wxapp'
				},
				'POST',
				'application/x-www-form-urlencoded'	
			)
			.then((res)=>{
				// this.$store.state.hasLogin = true,
				uni.setStorageSync('openid', res.data.openid)
			})
			.catch((res)=>{
			    // 失败方法
			})
			
			let userInfo = uni.getStorageSync('userInfo') || '';
			if(userInfo.id){
				//更新登陆状态
				uni.getStorage({
					key: 'userInfo',
					success: (res) => {
						this.login(res.data,true);
					}
				});
			}
			
		},
		onShow: function() {
			
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	button{
		padding: 0;
		margin: 0;
		background: white;
		line-height: 0;
	}
	button::after{
		display: none;
	}
	.hide{
		display: none;
	}
	.show{
		display: block;
	}
</style>