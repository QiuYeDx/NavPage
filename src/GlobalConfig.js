import axios from "axios";

export const app_config = {
    app_id: 'jyninllnnkfkllpv',
    app_secret: 'bWF3clZ2RENRMmx3aG95dVVaU1NKQT09'
}

// 在此处设置生产环境下的后端API的主机和端口、前端应用部署的域名
export const log_api_config = getLog_api_config('https://api.qiuyedx.com', 'nav.qiuyedx.com');

/**
 * ## `getLog_api_config()`
 * @param {String} API_BASE_URL - 后端API的根URL PS: 结尾不要加斜杠 e.g. http://localhost:5050
 * @param {String} app_domain - 前端应用的域名 e.g. nav.qiuyedx.com
 */
function getLog_api_config(API_BASE_URL, app_domain){
    const BASE_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:5050' : API_BASE_URL;
    const DOMAIN = process.env.NODE_ENV === 'development' ? 'test.domain' : app_domain;
    const KEY = '785d273b7996ce1b6793eed63e03c25e23733ccb5cd59ac4d281dee27d974a81';
    const URL = {
        counts: BASE_URL + '/api/counts',
        url_counts: BASE_URL + '/api/url/counts',
        logs: BASE_URL + '/api/logs'
    };
    return {
        domain: DOMAIN,
        API_BASE_URL: BASE_URL,
        url: URL,
        api_key: KEY,

        /**
         * ## `awaitCountAPI()`: /api/counts API 相关请求 可用GET PUT
         * @param {String} method - 方法类型 e.g. GET, PUT, POST, DELETE ...
         * @param {String} name - 服务的名称 e.g. qrcode, bilibili, tiktok, selenium ...
         */
        awaitCountAPI: async function(method, name){
            // 更新服务请求次数
            try {
                let res = null;
                if(method.toLowerCase() === 'put'){
                    res = await axios.put(URL.counts, {
                        name: name, api_key: KEY
                    });
                }else if(method.toLowerCase() === 'get'){
                    res = await axios.get(URL.counts, {
                        params: {name: name, api_key: KEY}
                    });
                }
                // if(process.env.NODE_ENV === 'development')
                //     console.log(res);
                return res;
            } catch (err) {
                // if(process.env.NODE_ENV === 'development')
                //     console.log(err);
                throw err;
            }
        },
        /**
         * ## `awaitUrlCountAPI()`: /api/url/counts API 相关请求 可用GET PUT
         * @param {String} method - 方法类型 e.g. GET, PUT, POST, DELETE ...
         * @param {String} url - 网页URL e.g. '/tools/qrcode'
         */
        awaitUrlCountAPI: async function(method, url){
            // 更新网页访问次数
            try {
                let res = null;
                if(method.toLowerCase() === 'put'){
                    res = await axios.put(URL.url_counts, {
                        domain: DOMAIN, url: url,  api_key: KEY
                    });
                }else if(method.toLowerCase() === 'get'){
                    res = await axios.get(URL.url_counts, {
                        params: {domain: DOMAIN, url: url,  api_key: KEY}
                    });
                }
                // if(process.env.NODE_ENV === 'development')
                //     console.log(res);
                return res;
            } catch (err) {
                // if(process.env.NODE_ENV === 'development')
                //     console.log(err);
                throw err;
            }
        },
        /**
         * ## `awaitLogsAPI()`: /api/url/counts API 相关请求 可用GET
         * @param {String} method - 方法类型 e.g. GET, PUT, POST, DELETE ...
         * @param {Number} n_per_page - 每页的数量 defaults: 10
         * @param {Number} p_index - 请求第几页的数据 [1, 2, ...] defaults: 10
         */
        awaitLogsAPI: async function(method, n_per_page = 10, p_index= 1){
            // 更新网页访问次数
            try {
                let res = null;
                if(method.toLowerCase() === 'put'){
                    res = null
                }else if(method.toLowerCase() === 'get'){
                    res = await axios.get(URL.logs, {
                        params: {n_per_page: n_per_page, p_index: p_index,  api_key: KEY}
                    });
                }
                // if(process.env.NODE_ENV === 'development')
                //     console.log(res);
                return res;
            } catch (err) {
                // if(process.env.NODE_ENV === 'development')
                //     console.log(err);
                throw err;
            }
        },
    }
}