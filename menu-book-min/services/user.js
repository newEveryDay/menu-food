/**
 * service 提供所有接口服务的类文件，本项目所有http请求接口都在这里处理
 */
import http from '@/common/http'; // 导入http中创建的axios实例
import environment from '@/environment.js';
import store from '../store';
//根服务url
const options = {
    baseUrl: environment.SERVERURL + '/v1',
	header:{
		source:'wx_app'
	}
}
console.log(store.state.uid)

const user = {
	getCaseCategory(params){
		return http.get('/case_category.yj', params, options);
	},
	getCaseList(params){
		return http.get('/case_list.yj', params, options);
	},
	// 通过code获取用户信息
	getWXLogin(params){
		return http.post('/token', params, options);
	},
	updataUserInfo(params){
		return http.post('/user/update', params, options);
	},
	// 获取用户信息
	getUserInfo(params,token){
		if(token){
			options.header.token = token
		}
		return http.get('/profile.yj', params, options);
	},
	// 获取用户信息
	wxBindPhone(params,token){
		if(token){
			options.header.token = token
		}
		return http.post('/wx_bind_phone.yj', params, options);
	},
	// 获取用户信息
	getShopVideoList(params){
		return http.get('/shop_video_list.yj', params, options);
	},
	// 店铺记录
	getshopRecord(params,token){
		if(token){
			options.header.token = token
		}
		return http.get('/shop_record.yj', params, options);
	},
	// 添加店铺记录
	lookRecord(params,token){
		if(token){
			options.header.token = token
		}
		return http.post('/look_record.yj', params, options);
	},
	// 添加店铺记录
	totalime(params,token){
		if(token){
			options.header.token = token
		}
		return http.post('/total_time.yj', params, options);
	},
	shopTodayVistors(params,token){
		if(token){
			options.header.token = token
		}
		return http.get('/shop_today_vistors.yj', params, options);
	},
	// 意向用户
	shopAbc(params,token){
		if(token){
			options.header.token = token
		}
		return http.get('/shop_abc.yj', params, options);
	},
	// 添加今日访客
	addTodayVistors(params,token){
		if(token){
			options.header.token = token
		}
		return http.post('/add_today_vistors.yj', params, options);
	}
	
	
	
	
};

export default user;
