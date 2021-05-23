/**
 * 通用uni-app网络请求
 * 基于 Promise 对象实现更简单的 request 使用方式，支持请求和响应拦截
 */


// 开放的接口
import environment from '@/environment.js'
import * as constant from './constant.js'


const TIME_OUT = '30000';

export default class Http {
	constructor() {
		this.config = {
			netWork: true,
			baseUrl: "",
			header: {
				'Accept': 'application/json, text/plain, */*',
				'Content-Type': 'application/json;charset=UTF-8'
			},
			method: "GET",
			dataType: "json",
			/* 如设为json，会对返回的数据做一次 JSON.parse */
			responseType: "text",
			success() {},
			fail() {},
			complete() {}
		}
	};
	request(options, timeout) {
			if (!options) {
				options = {}
			}
			options.baseUrl = options.baseUrl || this.config.baseUrl;
			options.dataType = options.dataType || this.config.dataType;
			if (options.baseUrl) {
				options.url = options.baseUrl + options.url;
			}
			if (!(options.url.substr(0, 7).toLowerCase() === "http://" || options.url.substr(0, 8).toLowerCase() ===
					"https://")) {
				options.url = environment.SERVERURL + options.url
			}
			options.method = options.method || this.config.method;
			//TODO 加密数据
			const _token = {};
			/*此处设置额外的头部，token常用于登陆令牌*/
			if (constant.constant.TOKEN) {
				/*token数据来源自己设置，我常用localStorage存取相关数据*/
				_token.Authorization = 'Bearer ' + constant.constant.TOKEN;

				if (options.header) {
					options.header = Object.assign(options.header, _token);
				} else {
					options.header = Object.assign({}, _token);
				}
			}
			options.header = Object.assign(options.header, this.config.header);

			let returnPromise = new Promise((resolve, reject) => {
				let _config = null;
				options.complete = (response) => {
					let statusCode = response.statusCode;
					response.config = _config;
					if (process.env.NODE_ENV === 'development') {
						if (statusCode === 200) {
							// console.log("【" + _config.requestId + "】 结果：" + JSON.stringify(response.data))
						}
					}
					if (this.interceptor.response) {
						let newResponse = this.interceptor.response(response)
						if (newResponse) {
							response = newResponse
						}
					}
					// 统一的响应日志记录
					_reslog(response);
					if (statusCode === 200) { //成功
						resolve(response.data);
					} else {
						reject(response)
					}
				};

				_config = Object.assign({}, this.config, options);
				_config.requestId = new Date().getTime();

				if (this.interceptor.request) {
					this.interceptor.request(_config)
				}

				// 统一的请求日志记录
				this._reqlog(_config);
				uni.request(_config);
			});
			//如果设置了请求超时，则按照设置的来，否则按照默认的来
			if (timeout) {
				return this.timeoutPromise(returnPromise, timeout);
			} else {
				return this.timeoutPromise(returnPromise, TIME_OUT);
			}
		};
		get(url, data, options, timeout) {
			// debugger;
			if (!options) {
				options = {}
			}
			options.url = url;
			options.data = data;
			options.method = 'GET';
			return this.request(options, timeout)
		};
	post(url, data, options, timeout) {
		if (!options) {
			options = {}
		}
		options.url = url;
		options.data = data;
		options.method = 'POST';
		return this.request(options, timeout)
	};
	put(url, data, options, timeout) {
		if (!options) {
			options = {}
		}
		options.url = url;
		options.data = data;
		options.method = 'PUT';
		return this.request(options, timeout)
	};
	delete(url, data, options, timeout) {
		if (!options) {
			options = {}
		}
		options.url = url;
		options.data = data;
		options.method = 'DELETE';
		return this.request(options, timeout)
	};
	timeoutPromise(promise, ms) {
		var timeout = this._delayPromise(ms).then(function() {
			throw new Error('Operation timed out after ' + ms + ' ms');
		});
		return Promise.race([promise, timeout]);
	}
	_delayPromise(ms) {
		return new Promise(function(resolve) {
			setTimeout(resolve, ms);
		});
	}
}





