import { getAccountInfoSync } from '@tarojs/taro';
// import store from "src/store";
// import dayjs from "dayjs";

/**
 * 获取当前环境对应的API接口地址
 *
 * 根据小程序当前运行环境版本（生产/体验/开发）返回对应的接口地址。
 * 通过小程序账户信息中的envVersion字段判断当前运行环境。
 *
 * @returns {string} 对应环境的API接口地址字符串
 * @warnning 该方法请谨慎使用，避免暴露内网环境配置信息。
 * 不过可以参考该方法实现小程序在不同运行环境下的动态配置。
 */
export const getApiUrl = () => {
    // 获取小程序账户信息对象，包含环境版本等配置信息
    const acountInfo = getAccountInfoSync();

    // 根据小程序环境版本匹配对应的API地址
    switch (acountInfo.miniProgram.envVersion) {
        case 'release':
            return PRODUCTION_API_URL; // 生产环境
        case 'trial':
            return TRIAL_API_URL; // 体验环境
        default:
            return DEVELOPMENT_API_URL; // 开发环境
    }
};

/** 请求状态 */
// const HTTP_STATUS = {
//   SUCCESS: 200,
//   CREATED: 201,
//   ACCEPTED: 202,
//   CLIENT_ERROR: 400,
//   AUTHENTICATE: 301,
//   FORBIDDEN: 403,
//   NOT_FOUND: 404,
//   SERVER_ERROR: 500,
//   BAD_GATEWAY: 502,
//   SERVICE_UNAVAILABLE: 503,
//   GATEWAY_TIMEOUT: 504,
// };
