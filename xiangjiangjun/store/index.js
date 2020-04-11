import Vue from 'vue'
import Vuex from 'vuex'
import {imgAddress} from '../public/config.js'
Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		// imgSrc: '../../static/',
		imgSrc: `${imgAddress}/attachment/images/`,
		hasLogin: false,
		userInfo: {},
		cityName: '',
	},
	mutations: {
		login(state, provider,notShowModel) {
			console.log(provider)
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
		},
		logout(state) {
			state.hasLogin = false;
			state.userInfo = {};
			uni.removeStorage({  
                key: 'userInfo'  
            })
		},
		getCityName(state,name){
			state.cityName = name
		}
	},
	actions: {
	
	}
})

export default store
