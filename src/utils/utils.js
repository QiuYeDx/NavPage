import {throttle} from "@/utils/throttle";

export const getOffsetTop = (element) => {
    let offsetTop = 0;
    while (element) {
        offsetTop += element.offsetTop;
        element = element.offsetParent;
    }
    return offsetTop;
}

export const getScrollTop = () => {
    let scrollTop = 0;
    if (window) {
        scrollTop = window.scrollY;
    } else if (document.documentElement && document.documentElement.scrollTop) {
        scrollTop = document.documentElement.scrollTop;
    } else if (document.body) {
        scrollTop = document.body.scrollTop;
    }
    return scrollTop;
}

export const getClientHeight = () => {
    let clientHeight = 0;
    if (document.body.clientHeight && document.documentElement.clientHeight) {
        clientHeight = (document.body.clientHeight < document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight;
    } else {
        clientHeight = (document.body.clientHeight > document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight;
    }
    return clientHeight;
}

export const getScrollHeight = () => {
    return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
}

export const randomNum = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

export const isURL = (str) => {
    const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
    return urlRegex.test(str);
};

/**
 *
 * @param url 欲下载资源的URL
 * @param callback 回调函数，入参为下载进度百分比(number)，精确到两位小数。
 * @returns {Promise<unknown>}
 */
export function downloadWithProgress(url, loading_callback, finished_callback, id) {
    return new Promise((resolve, reject) => {
        fetch(url)
            .then(response => {
                const totalBytes = response.headers.get('Content-Length');
                let downloadedBytes = 0;

                const reader = response.body.getReader();
                const chunks = [];

                function read() {
                    reader.read().then(({ done, value }) => {
                        if (done) {
                            const blob = new Blob(chunks);
                            finished_callback && finished_callback(id);
                            resolve(blob);
                            return;
                        }

                        chunks.push(value);
                        downloadedBytes += value.length;

                        const progress = (downloadedBytes / totalBytes) * 100;
                        loading_callback && loading_callback(progress.toFixed(2), id);
                        // console.log(`下载进度：${progress.toFixed(2)}%`);

                        // 继续读取下一块数据
                        read();
                    }).catch(error => {
                        reject(error);
                    });
                }

                read();
            })
            .catch(error => {
                reject(error);
            });
    });
}

export function isIOS() {
    const userAgent = window.navigator.userAgent.toLowerCase();
    return /iphone|ipad|ipod/.test(userAgent);
}

export function isAndroid() {
    const userAgent = window.navigator.userAgent.toLowerCase();
    return /android/.test(userAgent);
}