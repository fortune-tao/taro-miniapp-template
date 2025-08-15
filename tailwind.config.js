/** @type {import('tailwindcss').Config} */
module.exports = {
    important: true,
    theme: {
        colors: {
            primary: '#E33923',
            subText: '#999999',
            border: '#EBEBEB',
            pageBg: '#F4F5FA'
        },
        // 内边距
        padding: Array.from({ length: 1000 }).reduce((map, _, index) => {
            map[index] = `${index}px`
            return map
        }, {}),
        // 外边距
        spacing: Array.from({ length: 1000 }).reduce((map, _, index) => {
            map[index] = `${index}px`
            return map
        }, {}),
        // 圆角
        borderRadius: Array.from({ length: 100 }).reduce((map, _, index) => {
            map[index] = `${index}px`
            return map
        }, {}),
        extend: {
            // 宽度
            width: Array.from({ length: 1000 }).reduce((map, _, index) => {
                map[index] = `${index}px`
                return map
            }, {}),
            // 高度
            height: Array.from({ length: 1000 }).reduce((map, _, index) => {
                map[index] = `${index}px`
                return map
            }, {}),
            // 字体大小
            fontSize: Array.from({ length: 100 }).reduce((map, _, index) => {
                map[index] = `${index}px`
                return map
            }, {}),
            // 行高
            lineHeight: Array.from({ length: 1000 }).reduce((map, _, index) => {
                map[index] = `${index}px`
                return map
            }, {}),
        },
        // 不在 content 包括的文件内，你编写的 class，是不会生成对应的css工具类的
        content: ['./public/index.html', './src/**/*.{html,js,ts,jsx,tsx}'],
        // 其他配置项
        // ...
        corePlugins: {
            // 小程序不需要 preflight，因为这主要是给 h5 的，如果你要同时开发小程序和 h5 端，你应该使用环境变量来控制它
            preflight: false
        }
    }
}
