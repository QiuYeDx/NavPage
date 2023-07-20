import axios from "axios";

export const app_config = {
    app_id: 'jyninllnnkfkllpv',
    app_secret: 'bWF3clZ2RENRMmx3aG95dVVaU1NKQT09'
}

// 在此处设置后端API的主机和端口、前端应用部署的域名
export const log_api_config = getLog_api_config('http://localhost:5050', 'nav.qiuyedx.com');

/**
 * ## `getLog_api_config()`
 * @param {String} API_BASE_URL - 后端API的根URL PS: 结尾不要加斜杠 e.g. http://localhost:5050
 * @param {String} app_domain - 前端应用的域名 e.g. nav.qiuyedx.com
 */
function getLog_api_config(API_BASE_URL, app_domain){
    return {
        domain: process.env.NODE_ENV === 'development' ? 'test.domain' : app_domain,
        API_BASE_URL,
        url: {
            counts: API_BASE_URL + '/api/counts/',
            url_counts: API_BASE_URL + '/api/url/counts/'
        },
        api_key: '785d273b7996ce1b6793eed63e03c25e23733ccb5cd59ac4d281dee27d974a81',

        /**
         * ## `updateCount()`更新服务的请求次数
         * @param {String} name - 服务的名称 e.g. qrcode, bilibili, tiktok, selenium ...
         */
        updateCount: function(name){
            // 更新服务请求次数
            axios.put(log_api_config.url.counts, {
                name: name, api_key: log_api_config.api_key
            })
                .then(res => {
                    if(process.env.NODE_ENV === 'development')
                        console.log(res);
                })
                .catch(e => {
                    if(process.env.NODE_ENV === 'development')
                        console.log(e);
                });
            axios.get(log_api_config.url.counts, {
                params: {name: name, api_key: log_api_config.api_key}
            })
                .then(res => {
                    if(process.env.NODE_ENV === 'development')
                        console.log(res);
                })
                .catch(e => {
                    if(process.env.NODE_ENV === 'development')
                        console.log(e);
                });
        },
    }
}