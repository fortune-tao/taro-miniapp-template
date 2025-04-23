# Taro-Miniapp-Template

[![Taro](https://img.shields.io/badge/Taro-3.x-brightgreen)](https://taro-docs.jd.com/) [![Node.js](https://img.shields.io/badge/Node.js-%3E%3D18.17.0-blue)](https://nodejs.org/) [![pnpm](https://img.shields.io/badge/pnpm-%3E%3D8.0.0-orange)](https://pnpm.io/)



> 一个基于 Taro 3.x 的并集成 Tailwind CSS 和 Zustand 等技术栈的小程序开发模板。
>
> 当前仅支持适配微信、支付宝小程序。如果需要适配其他端，需自行安装 Taro 所需依赖。不建议使用该模板开发 RN 应用。

------

## 🚀 快速开始

### 环境要求

- Node.js >= 18.17.0
- pnpm >= 8.0.0
- 微信开发者工具最新版

### 开发流程

#### 1. 安装依赖

```shell
pnpm install
```

#### 2. 启动本地开发服务

```shell
pnpm run dev:weapp
```

#### 3. 预览与调试

打开微信开发者工具，导入 `weapp` 目录并运行。

------

## 📦 生产构建

运行以下命令生成生产包：

```shell
pnpm run build:weapp
```

------

## 🛠 技术栈

### 核心框架

- **[Taro 3.x](https://docs.taro.zone/docs/3.x/)**：多端开发框架
- **React 18**：前端组件化开发
- **TypeScript**：静态类型检查

### 状态管理

- **[Zustand](https://zustand.docs.pmnd.rs/getting-started/introduction)**：轻量级状态管理库

### 样式方案

- **[Tailwind CSS 3.x](https://v3.tailwindcss.com/docs/installation)**：实用优先的 CSS 框架
- **[weapp-tailwindcss](https://weapp-tw.icebreaker.top/docs/quick-start/frameworks/taro)**：Tailwind CSS 在小程序中的适配方案

### 组件库

- **[@antmjs/vantui](https://antmjs.github.io/vantui/#/home)**：基于有赞 VantWeapp 开发的同时支持 Taro 和 React 的 UI 库

### 工具库

- **Lodash**：常用工具函数
- **Dayjs**：轻量级日期处理库

------

## 📁 项目结构

```text
├── config/             # Taro 编译配置
├── src/
│   ├── constant/       # 常量定义
│   ├── components/     # 通用组件
│   ├── hooks/          # 自定义 Hooks
│   ├── store/          # Zustand 状态管理
│   ├── pages/          # 页面组件
│   ├── styles/         # 全局样式
│   ├── types/          # TypeScript 类型定义
│   ├── utils/          # 工具函数
│   │   ├── index.ts    # 工具函数入口
│   │   └── request.ts  # 请求封装
│   ├── app.config.ts  # 应用配置
│   ├── app.less        # 全局样式
│   ├── app.tsx         # 应用入口
│   └── index.html      # HTML 模板
├── types/              # 全局类型定义
│   └── global.d.ts
├── .editorconfig       # 编码规范配置
├── .eslintrc           # ESLint 配置
├── .gitignore          # Git 忽略文件
├── babel.config.js     # Babel 配置
├── postcss.config.js   # PostCSS 配置
├── tailwind.config.js  # Tailwind CSS 配置
├── tsconfig.json       # TypeScript 配置
└── pnpm-lock.yaml      # 依赖锁定文件
```

------

## ⚡ 性能优化

### 1. 延迟渲染

针对页面内容较多的情况，使用 `Taro.nextTick()` 延迟非首屏内容的渲染，减少白屏时间。

```tsx
const NextTickComponent: React.FC = ({ children }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    Taro.nextTick(() => setIsMounted(true));
  }, []);

  return isMounted ? <>{children}</> : null;
};

export default NextTickComponent;

// 使用示例
<NextTickComponent>
  <Content />
</NextTickComponent>
```

### 2. 跳转预加载

在页面跳转时提前加载数据，缩短目标页面的加载时间。

```tsx
// A 页面
Taro.preload({
  RequestPromise: getData(),
});
Taro.navigateTo({ url: '/pages/B/B' });

// B 页面
useEffect(() => {
  Taro.getCurrentInstance().preloadData?.RequestPromise?.then((res) => {
    // 更新状态
  });
}, []);
```

### 3. 图片优化

- 压缩图片大小
- 对长图进行分割
- 开启 `lazyload` 懒加载（注意：懒加载仅对三屏以外的图片生效）

### 4. 缓存策略

对于实时性要求较低的数据（如文章、商品展示），可以实现缓存优先策略。

### 5. 使用性能优化组件

复杂组件可使用 Taro 官方提供的 `CustomWrapper` 包裹，提升渲染性能。

```jsx
<CustomWrapper>
  <GoodsList />
</CustomWrapper>
```

------

## 📊 埋点集成

支持微信、支付宝双端埋点集成。

### 参考文档

- [微信小程序集成](https://developer.umeng.com/docs/147615/detail/147619)
- [支付宝小程序集成](https://developer.umeng.com/docs/147615/detail/147727)
- [uni-app 多端小程序框架集成](https://developer.umeng.com/docs/147615/detail/178170)

### 示例代码

[Taro 集成 Demo](https://github.com/umeng/mp-demos/tree/master/taro)

------

## 🔒 动态获取 API 地址

`src/utils/request.ts` 提供了根据当前环境动态获取 API 地址的方法 `getApiUrl`。

> 注意：暴露测试环境或开发环境地址可能带来安全风险，请谨慎使用。

------

## ⚠️ 开发注意事项

1. **缓存问题**
   - 当代码更新后，开发者工具未同步更新时，尝试关闭 Taro 的缓存或禁用开发者工具的热重载功能。
2. **Tailwind CSS 兼容**
   - `@antmjs/vantui`的组件有时无法正确应用 Tailwind CSS 类名，请确保样式正确覆盖。
3. **真机调试**
   - 最新版微信开发者工具可能存在真机调试问题，推荐切换至「真机调试 2.0」或回退开发者工具版本。
4. **清除缓存**
   - 切换`dev`和`build`命令后，需在微信开发者工具中清除缓存并重新编译。
5. **兼容性**
   - 发布版本时建议将`JS`转为`ES5`，以提高兼容性。
6. **Swiper 组件**
   - 推荐使用 Taro 官方的`Swiper`组件，避免动画效果问题。
7. **Toast 提示**
   - 推荐使用`Taro.showToast()`实现统一的 Toast 提示。
