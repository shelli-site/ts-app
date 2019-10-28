/* eslint-disable */
/**
 * html5+能力初始化
 * @param callback
 */
export function plusReady(callback: (...args: any) => any) {
    return new Promise((resolve, reject)=>{
        if(window.plus) {
            setTimeout(()=>{
                callback();
                resolve()
            }, 0)
        }else {
            document.addEventListener('plusready', () => {
                callback();
                resolve();
            }, false);
            resolve();
        }
    })
}

/**
 * 获取设备状态栏高度
 */
export function getStatusBatHeight() : number{
    let statusBarHeight: number = 0;
    // 获取当前手机状态栏模式
    let ms = (/Html5Plus\/.+\s\(.*(Immersed\/(\d+\.?\d*).*)\)/gi).exec(navigator.userAgent);
    // 当前环境为沉浸式状态栏模式
    if (ms && ms.length >= 3) {
        // 获取状态栏的高度
        statusBarHeight = parseFloat(ms[2]);
    }
    return statusBarHeight
}
