import Taro, { hideLoading, showModal } from "@tarojs/taro";
import { useUserStore } from "src/stores/user-store";

// import { GlobalStore } from "@shared/store";

/**
 * 登录鉴权
 */
export function getAuthorized() {
    const token = useUserStore.use.token()
    if (token) return true
    hideLoading()

    showModal({
        title: "提示!",
        content: "您好，请先登录哦~",
        success: async (res) => {
            if (res.confirm) {
                // 跳转登录页
                Taro.navigateTo({
                    url: "/pages/login/index",
                })
            }
        },
    });
}

// 小程序下载保存文件
export function downloadFile(url: string) {
    Taro.downloadFile({
        url,
        success: (res) => {
            console.log(res, 123)

            Taro.getFileSystemManager().saveFile({
                tempFilePath: res.tempFilePath,
                success: (res) => {
                    console.log(res)
                    Taro.showToast({
                        title: "保存成功",
                        icon: "none",
                    });
                },
                fail: (err) => {
                    Taro.showToast({
                        title: "保存失败",
                        icon: "none",
                    });
                },
            });
        },
        fail: (err) => {
            Taro.showToast({
                title: "保存失败",
                icon: "none",
            });
        },
    });
}

interface IPaymentData {
    timeStamp: string;
    nonceStr: string;
    prepayId: string;
    paySign: string;
}
export function requestPayment(data: IPaymentData, success, fail, complete?) {
    Taro.requestPayment({
        timeStamp: data.timeStamp,
        nonceStr: data.nonceStr,
        package: `prepay_id=${data.prepayId}`,
        paySign: data.paySign,
        signType: "MD5",
        success: success,
        fail: fail,
        complete: complete,
    });
}

export function getEnumListToLabel(enumList: Array<any>, value: string | number) {
    var result = ''
    enumList.forEach(function (item) {
        if (item.value == value) result = item.label
    })

    return result
}
