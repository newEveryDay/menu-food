/**
 * 通用uni-app网络请求
 * 基于 Promise 对象实现更简单的 request 使用方式，支持请求和响应拦截
 */


// 开放的接口
import environment from '@/environment.js'
import * as constant from './constant.js'
function delayPromise(ms) {
    return new Promise(function (resolve) {
        setTimeout(resolve, ms);
    });
}

function timeoutPromise(promise, ms) {
    var timeout = delayPromise(ms).then(function () {
            throw new Error('Operation timed out after ' + ms + ' ms');
        });
    return Promise.race([promise, timeout]);
}

const TIME_OUT = '30000';

export default {
    config: {
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
    },
    interceptor: {
        request: null,
        response: null
    },
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
		const token = uni.getStorageSync("token")
        /*此处设置额外的头部，token常用于登陆令牌*/
        if (token) {
            /*token数据来源自己设置，我常用localStorage存取相关数据*/
            _token.Authorization = 'Bearer ' + token;

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
            _reqlog(_config);
            uni.request(_config);
        });
        //如果设置了请求超时，则按照设置的来，否则按照默认的来
        if(timeout){
            return timeoutPromise(returnPromise, timeout);
        } else {
            return timeoutPromise(returnPromise, TIME_OUT);
        }
    },
    get(url, data, options, timeout) {
		// debugger;
        if (!options) {
            options = {}
        }
        options.url = url;
        options.data = data;
        options.method = 'GET';
        return this.request(options, timeout)
    },
    post(url, data, options, timeout) {
        if (!options) {
            options = {}
        }
        options.url = url;
        options.data = data;
        options.method = 'POST';
        return this.request(options, timeout)
    },
    put(url, data, options, timeout) {
        if (!options) {
            options = {}
        }
        options.url = url;
        options.data = data;
        options.method = 'PUT';
        return this.request(options, timeout)
    },
    delete(url, data, options, timeout) {
        if (!options) {
            options = {}
        }
        options.url = url;
        options.data = data;
        options.method = 'DELETE';
        return this.request(options, timeout)
    },
    formData(url, params) {
        return formDataRequest(url, params);
    },
    putArray(url, params) {
        return putArrayRequest(url, params);
    }
}


/**
 * 请求接口日志记录
 */
function _reqlog(req) {
    return;
    if (process.env.NODE_ENV === 'development') {
        console.log("【" + req.requestId + "】 地址：" + req.url);
        if (req.data) {
            console.log("【" + req.requestId + "】 请求参数：" + JSON.stringify(req.data))
        }
    }
    //TODO 调接口异步写入日志数据库
}

/**
 * 响应接口日志记录
 */
function _reslog(res) {
    return;
    let _statusCode = res.statusCode;
    if (process.env.NODE_ENV === 'development') {
        console.log("【" + res.config.requestId + "】 地址：" + res.config.url);
        if (res.config.data) {
            console.log("【" + res.config.requestId + "】 请求参数：" + JSON.stringify(res.config.data))
        }
        console.log("【" + res.config.requestId + "】 响应结果：" + JSON.stringify(res))
    }
    //TODO 除了接口服务错误外，其他日志调接口异步写入日志数据库
    switch (_statusCode) {
        case 200:
            break;
        case 401:
            break;
        case 404:
            break;
        default:
            break;
    }
}

// 用于兼容formData请求
function formDataRequest(url, params) {
    return new Promise(async (resolve, reject) => {
        var XHR = null;
        if (window.XMLHttpRequest) {
            // 非IE内核
            XHR = new XMLHttpRequest();
        } else if (window.ActiveXObject) {
            XHR = new ActiveXObject("Microsoft.XMLHTTP");
        } else {
            XHR = null;
        }

        if (XHR) {
            let formData = new FormData();
            for(let k in params.adata) {
                formData.append(k, params.adata[k]);
            }
            for (let i = 0; i < params.file.length; i++) {
                const blob = await fileRead.getBlobFromUrl(params.file[i]);
                const file = fileRead.blobToFile(blob);
                const newFile = await fileRead.compress(file);
                formData.append('file', newFile);
            }
            XHR.open("post", url, true);
            XHR.setRequestHeader('Accept', '*/*');
            XHR.setRequestHeader('Authorization', 'Bearer ' + token);
            XHR.onreadystatechange = function() {
                if (XHR.readyState === 4 && XHR.status === 200) {
                    const resultValue = XHR.responseText;
                    resolve(JSON.parse(resultValue));
                    XHR = null;
                }
            };
            XHR.send(formData);
        }
    });
}

// 用于兼容put array请求
function putArrayRequest(url, params) {
    return new Promise(async (resolve, reject) => {
        var XHR = null;
        if (window.XMLHttpRequest) {
            // 非IE内核
            XHR = new XMLHttpRequest();
        } else if (window.ActiveXObject) {
            XHR = new ActiveXObject("Microsoft.XMLHTTP");
        } else {
            XHR = null;
        }

        if (XHR) {
            XHR.open("put", url, true);
            XHR.setRequestHeader('Accept', 'application/json, text/plain, */*');
            XHR.setRequestHeader('Content-Type', 'application/json');
            XHR.setRequestHeader('Authorization', 'Bearer ' + token);
            XHR.onreadystatechange = function() {
                if (XHR.readyState === 4 && XHR.status === 200) {
                    const resultValue = XHR.responseText;
                    resolve(JSON.parse(resultValue));
                    XHR = null;
                }
            };
            XHR.send(JSON.stringify(params));
        }
    });
}
