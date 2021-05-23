/**
 * service 提供所有接口服务的类文件，本项目所有http请求接口都在这里处理
 */
import Http from '@/common/http'; // 导入http中创建的axios实例
import environment from '@/environment.js';
import store from '../store';
//根服务url
const options = {
    baseUrl: environment.SERVERURL + '/v1',
	
}

class Token  {
	constructor() {
	    this.verifyUrl = `${options.baseUrl}/token/verify`;
	    this.tokenUrl = `${options.baseUrl}/token`;
	  }
	  verify() {
	    const token = wx.getStorageSync("token");
	    if (!token) {
	      this.getToken();
	    } else {
	      this.onVerifyToken(token);
	    }
	  }
	  getToken(callBack) {
	    // 登录获取 token
	    uni.login({
	      success: (res) => {
	        if (res.code) {
	          uni.request({
	            url: this.tokenUrl,
	            method: "POST",
	            data: {
	              account: res.code,
	              type: 100
	            },
	            success: (res) => {
	              const code = res.data.code.toString();
				  console.log('token',res)
	              if (code.startsWith('2')) {
	                uni.setStorageSync('token', res.data.data.token);
	                callBack && callBack(res.data.token);
	              }
	            }
	          })
	        }
	      }
	    })
	  }
	
	  onVerifyToken(token) {
	    uni.request({
	      url: this.verifyUrl,
	      method: 'POST',
	      data: {
	        token
	      },
	      success: (res) => {
	         if(!res.data.is_valide) {
	           this.getToken();
	         }
	      }
	    })
	  }
	
}

export  {
	Token
};
