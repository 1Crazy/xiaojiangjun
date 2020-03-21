<script>
	export default {
		// globalData: {
		//    imgSrc: '/static' 
		// },
		onLaunch: function() {
			console.log('App Launch')
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
<script>
	/**
	 * vuex管理登陆状态，具体可以参考官方登陆模板示例
	 */
	import {
		mapMutations
	} from 'vuex';
</script>