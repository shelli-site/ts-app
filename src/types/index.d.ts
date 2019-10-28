// @ts-ignore
declare var window: Window;

interface Window {
    // 也可以添加
    // 字符串签名 可以允许添加未知名称属性
    [p: string]: any
}

declare var plus: any;

interface plus {
    // 也可以添加
    // 字符串签名 可以允许添加未知名称属性
    [p: string]: any
}

