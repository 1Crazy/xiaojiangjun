import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		// imgSrc: '../../static/',
		imgSrc: 'http://xiaojiangjun.cduxj.com/attachment/images/',
		hasLogin: false,
		userInfo: {id: 1,idd:2},
	},
	mutations: {
		login(state, provider,notShowModel) {
			state.hasLogin = true;
			state.userInfo = provider;
			uni.setStorage({//缓存用户登陆状态
			    key: 'userInfo',  
			    data: provider  
			}) 
			if (notShowModel) {
				uni.showToast({
				    title: '登录成功',
				    duration: 2000,
					icon: 'none'
				});
			}
			
			console.log(state.userInfo);
		},
		logout(state) {
			state.hasLogin = false;
			state.userInfo = {};
			uni.removeStorage({  
                key: 'userInfo'  
            })
		}
	},
	actions: {
	
	}
})

export default store
