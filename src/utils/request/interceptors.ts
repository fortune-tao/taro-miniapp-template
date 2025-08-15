import { showToast, hideLoading } from "@tarojs/taro";
import { getAuthorized } from "../tools";
import { ECode, IApiData } from "./interface";

export default function (chain) {
    const requestParams = chain.requestParams;
    const { url } = requestParams;
    const isNeedSetToken = !(url && url.includes("login"));
    if (isNeedSetToken) {
        requestParams.header = {
            ...requestParams.header,
            // token: GlobalStore.token || "",
        };
    }

    return chain
        .proceed(requestParams)
        .then(async (res) => {
            return await checkResponse(res.data);
        })
        .catch((err) => {
            return errResponse(err);
        });
}

export function checkResponse(response: IApiData) {
    hideLoading();
    const { code, msg } = response;
    // if (code === ECode.UN_AUTHORIZED) {
    //   getAuthorized();
    //   return Promise.reject();
    // }
    if (code !== ECode.OPERATION_SUCCESS) {
        showToast({
            title: msg || "网络异常",
            icon: "none",
        });
        Promise.reject({ code, msg });
    }

    if (code == ECode.UN_AUTHORIZED) {
        console.log(msg)
        showToast({
            title: msg,
            icon: "none",
        })
        return Promise.reject({ code, msg });
    }
    return Promise.resolve(response?.data);
}

export function errResponse(err) {
    // hideLoading();
    // showToast({ icon: "none", title: "网络异常" });
    return Promise.reject(err);
}
