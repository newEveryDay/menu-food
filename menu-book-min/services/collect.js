/**
 * service 提供所有接口服务的类文件，本项目所有http请求接口都在这里处理
 */
import http from '@/common/http'; // 导入http中创建的axios实例
import environment from '@/environment.js';
import store from '../store';
//根服务url
const options = {
    baseUrl: environment.SERVERURL + '/v1'
}

const collect = {
	/**
	 * 用户收藏
	 * @param id 菜谱id
	 */
	collectMenu(params){
		return http.post('/collect', params, options);
	},
	/**
	 * 用户取消收藏（
	 * @param id 菜谱id
	 */
	cancelCollectMenu(params){
		return http.post('/collect/cancel', params, options);
	},
	
	
};

export default collect;
