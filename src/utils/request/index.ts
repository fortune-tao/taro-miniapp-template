import { useUserStore } from 'src/stores/user-store';
import Taro, { addInterceptor, getAccountInfoSync } from "@tarojs/taro";
import interceptors, { checkResponse, errResponse } from "./interceptors";
// import { GlobalStore } from "@shared/store";

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

export const apiUrl = getApiUrl()
export const imgUrl = apiUrl

addInterceptor(interceptors);
class httpRequest {
    request(
        params: Taro.request.Option | Taro.uploadFile.Option,
        isFile?: boolean
    ): Promise<any> {
        const token = useUserStore.use.token();
        const options = {
            ...params,
            token: token || "",
            header: {
                token: token || "",
                "Content-Type": "application/json;",
            },
            url: apiUrl + params.url,
        } as any;
        if (isFile) {
            const formData = new FormData();
            formData.append('token', token)
            const uploadOptions = {
                url: apiUrl + params.url,
                filePath: options.file.url,
                name: 'file',
                formData: {
                    typeId: options.typeId
                }
            };
            return Taro.uploadFile(uploadOptions as Taro.uploadFile.Option)
                .then(async (res) => {
                    return await checkResponse(JSON.parse(res.data));
                })
                .catch((err) => {
                    return errResponse(err);
                });
        }

        return Taro.request({ ...options, data: { ...params.data, token: token || "" } })
    }
    get(url: string, data?: any) {
        return this.request({
            url,
            data,
            method: "GET",
        });
    }

    post(url: string, data?: any, isFile?: boolean) {
        if (isFile) {
            return this.request({ url, ...data, method: "POST" }, isFile);
        }
        return this.request({ url, data, method: "POST" }, isFile);
    }
    put(url: string, data: any) {
        return this.request({ url, data, method: "PUT" });
    }
    delete(url: string, data: any) {
        return this.request({ url, data, method: "DELETE" });
    }
}
export default new httpRequest();
export * from "./interface";
