<script>
	import {
		mapMutations
	} from 'vuex';
	export default {
		methods: {
			...mapMutations(['login'])
		},
		onLaunch: function() {
			let userInfo = uni.getStorageSync('userInfo') || '';
			if(userInfo.openid){
				//更新登陆状态
				uni.getStorage({
					key: 'userInfo',
					success: (res) => {
						this.login(res.data);
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