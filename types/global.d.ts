/// <reference types="@tarojs/taro" />

declare module "*.png";
declare module "*.gif";
declare module "*.jpg";
declare module "*.jpeg";
declare module "*.svg";
declare module "*.css";
declare module "*.less";
declare module "*.scss";
declare module "*.sass";
declare module "*.styl";

declare namespace NodeJS {
  interface ProcessEnv {
    TARO_ENV: "weapp" | "alipay";
  }
}

declare const PRODUCTION_API_URL : string;
declare const DEVELOPMENT_API_URL : string;
declare const TRIAL_API_URL : string;

// 扩展 Taro 的全局对象
declare namespace Taro {
  interface TaroStatic {
    uma: any;
  }
}

declare const my: any;
declare const wx: any;
