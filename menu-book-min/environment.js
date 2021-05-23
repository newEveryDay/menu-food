/**
 * 接口域名的管理
 */
const serviceConfig = {
    "mock": {
        "SERVERURL": "http://localhost:3007", // mock环境
    },
	"test": {
		"SERVERURL": "http://127.0.0.1:3000", // 53:25480
	},
	"product": {
		"SERVERURL": "https://www.nmss.icu/api", // 生产环境
	}
}


function getEnvironmentConfig() {
	let obj = {};
    
    // #ifdef MP-WEIXIN
    var platForm = wx.getSystemInfoSync().platform;
    //开发者工具
    if (platForm === "devtools") {
        // test环境配置
        obj = serviceConfig["test"];
    } else {
        //开发版、体验版以及审核版本
        obj = serviceConfig["product"];
    }
    // #endif
    
    // #ifdef H5
	if (window.location.hostname.indexOf("localhost") !== -1) {
		obj = serviceConfig["test"]
	} else {
		for (let key in serviceConfig) {
			if (serviceConfig[key].WXCONFIGURL.indexOf(window.location.origin + window.location.pathname) !== -1) {
				obj = serviceConfig[key]
			}
		}
		if (!obj || obj === {}) {
            obj = serviceConfig['product']
        }
	}
    // #endif
    
	return obj;
}
const environment = getEnvironmentConfig();
export default environment;
