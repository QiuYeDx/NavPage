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
 * ## `流式下载函数`
 *
 * 可传入下载进度回调函数和下载完成回调函数
 *
 * @param url 欲下载资源的URL
 * @param {function} loading_callback - 下载进度回调函数，参数为下载进度百分比（精确到两位小数）
 * @param {function} finished_callback - 下载完成回调函数，参数为下载任务ID
 * @param {number} id - 下载任务ID
 * @returns {Promise<Blob>} - 包含下载内容的 Blob 对象的 Promise
 */
export function downloadWithProgress(url, loading_callback, finished_callback, id) {
    return new Promise((resolve, reject) => {
        fetch(url).then(response => {
            const totalBytes = response.headers.get('Content-Length');
            let downloadedBytes = 0;

            const reader = response.body.getReader();
            const chunks = [];

            function read() {
                reader.read().then(({done, value}) => {
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
        }).catch(error => {
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

export function blobToDataUrl(blob) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            resolve(reader.result);
        };
        reader.onerror = reject;
        reader.readAsDataURL(blob);
    });
}

export function dataURLtoBlob(dataurl) {
    let arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1], bstr = atob(arr[1]), n = bstr.length,
        u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], {type: 'image/jpeg'});
}

export function getFormattedDate() {
    const currentDate = new Date();

    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const hours = String(currentDate.getHours()).padStart(2, '0');
    const minutes = String(currentDate.getMinutes()).padStart(2, '0');
    const seconds = String(currentDate.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day}-${hours}h${minutes}m${seconds}s`;
}

export function formatDate(inputDate) {
    const date = new Date(inputDate); // 将输入的日期字符串转换为Date对象
    const year = date.getFullYear(); // 获取年份
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 获取月份，并补齐两位
    const day = String(date.getDate()).padStart(2, '0'); // 获取日期，并补齐两位
    const hours = String(date.getHours()).padStart(2, '0'); // 获取小时，并补齐两位
    const minutes = String(date.getMinutes()).padStart(2, '0'); // 获取分钟，并补齐两位
    const seconds = String(date.getSeconds()).padStart(2, '0'); // 获取秒钟，并补齐两位

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

export function removeAdjacentDuplicates(arr) {
    return arr.filter((element, index) => index === 0 || element !== arr[index - 1]);
}

/**
 * Encodes special characters in a search key.
 *
 * @param {string} key - The search key to be encoded.
 * @returns {string} - The encoded search key.
 *
 * @example
 * const encodedKey = encodeSearchKey("name=John&age=30");
 * console.log(encodedKey);  // Output: "name%3DJohn%26age%3D30"
 */
export function encodeSearchKey(key) {
    const encodeMap = {
        '%': '%25',
        '?': '%3F',
        '#': '%23',
        '&': '%26',
        '=': '%3D'
    };

    return key.replace(/[%?#&=]/g, match => encodeMap[match]);
}

/**
 * Decodes special characters in an encoded search key.
 *
 * @param {string} key - The encoded search key to be decoded.
 * @returns {string} - The decoded search key.
 *
 * @example
 * const decodedKey = decodeSearchKey("name%3DJohn%26age%3D30");
 * console.log(decodedKey);  // Output: "name=John&age=30"
 */
export function decodeSearchKey(key) {
    const decodeMap = {
        '%25': '%',
        '%3F': '?',
        '%23': '#',
        '%26': '&',
        '%3D': '='
    };

    return key.replace(/%25|%3F|%23|%26|%3D/g, match => decodeMap[match]);
}

/**
 * 修改字符串前的数字。
 *
 * @param {string} str - 原始字符串，如 "0.15s"。
 * @param {Function} operation - 运算函数，接受一个数字作为参数。
 * @param {*} param - 运算参数。
 * @returns {string} 修改后的字符串。
 */
export const modifyNumericPrefix = (str, operation, param) => {
    const match = str.match(/^([\d.]+)(.*)$/);
    if (match) {
        const value = parseFloat(match[1]);
        const suffix = match[2];
        const newValue = operation(value, param);
        return `${newValue}${suffix}`;
    }
    return null;
};