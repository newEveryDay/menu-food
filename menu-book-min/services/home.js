/**
 * service 提供所有接口服务的类文件，本项目所有http请求接口都在这里处理
 */
import Http from '@/common/http'; // 导入http中创建的axios实例
import environment from '@/environment.js';
import store from '../store';
//根服务url
const options = {
    baseUrl: environment.SERVERURL + '/home',
	header:{
		source:'wx_app'
	}
}

const home = {
	getHomeVideo(params){
		return http.get('/home_video.yj', params, options);
	},
	/* 获取商品详情 */
	getGoodsDetail(params){
		return http.get('/goods_detail.yj', params, options);
	},
	
	/* 获取商家详情 */
	getShop(params){
		return http.get('/shop_info.yj', params, options);
	},
	/* 
	 获取统计数量
	 1、拨打电话 2、分享 3、添加微信
	 */
	addStatisticCout(params){
		return http.post('/add_phone_num.yj', params, options);
	},
	getGs(params){
		return http.get('/gs.yj', params, options);
	},
	/**
	 * 添加用户播放量（不分页）
	 * @summary 根据operatorId获取线路（不分页）
	 * @param operatorId 运营角色id
	 */
	addLookCount(params) {
		console.log(params)
	    return http.post('/add_look.yj', params, options);
	},
    /**
     * 获取微信授权
     * @params {}  tenantId: 租户id  code:微信code   state:微信state  url:签名页面认证地址
     */
    getInitWeChat(params) {
        return http.get('/getWxConfig', params, _baseUrl);

    },
    // 根据微信code获取openId
    getWechatOpenId(params) {
        return http.get('/wechatOpenIdGet', params, _baseUrl);
    },
    //用户登录时，获取用户信息
    getOperatorByOpenId(params) {
        return http.get('/getOperatorByOpenId', params, _baseUrl);
    },
    //用户注册时，点击“获得验证码”触发获取验证码，在regPage页面调用
    getRegisterCodeOpenId(params) {
        return http.get('/wechatCode', params, _baseUrl);
    },
    //用户注册时，绑定用户，在regPage页面调用
    getUserInfo(params) {
        return http.get('/bindingWeiChat', params, _baseUrl);
    },
	
	
    /**
     * 查询运营经理关联关系
     * @summary 查询运营经理关联关系
     * @param tenantId 租户id
     * @param name 姓名
     * @param id 运营角色id
     */
    operatorRoleGet(tenantId, name, id) {
        var params = {
			tenantId : tenantId
		};
        if (name !== undefined) {
            params.name = name;
        }
        if (id !== undefined) {
            params.id = id;
        }
        return http.get('/operatorRole', params, _baseUrl);
    },
    /**
     * 获取售货机运营计划
     * @param vemId 售货机ID
     * @param tenantId 商品ID
     */
    getVemsPlan(vemId, params) {
        return http.get('/replenish/vemId/' + vemId, params, _baseUrl);
    },
    /**
     * 验证该用户是否能通过终端扫码登录
     * @param vemId
     * @param openId
     * @returns {*}
     */
    scanQrcodeToLogin(vemId, openId) {
        return http.get(`/scanQrcodeToLogin/${vemId}/${openId}`, {}, _baseUrl);
    },
    /**
     * 获取终端扫码登录的返回地址
     */
    wechatLoginUrl() {
        return http.get(`/WechatLogin/url`, {}, _baseUrl);
    },
    /**
     * 运营人员实时位置更新保存
     * @summary 运营人员实时位置更新
     * @param position
     */
    postRealTimeRositions(params) {
    	return http.post('/realTimeRositions', params, _baseUrl);
    },
    /**
     * 查看运营人员位置
     * @summary 查看运营人员位置
     * @param tenantId
     * @param operatorId
     */
    getOperatorsPositions(params) {
    	return http.get('/realTimeRositions', params, _baseUrl);
    },
    /**
     * 根据operatorId获取线路（不分页）
     * @summary 根据operatorId获取线路（不分页）
     * @param operatorId 运营角色id
     */
    getLineInfoList(operatorId) {
        return http.get('/lines/getOperatorIdByLine', { operatorId }, _baseUrl);
    },
	
};

export default home;
