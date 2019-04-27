// # 3rd Party Library
// If the library doesn't have typings available at `@types/`,
// you can still use it by manually adding typings for it
interface Date {
    /**
     *
     * 日期格式化为字符串
     *
     * y 年
     *
     * M 月
     *
     * D 日
     *
     * H 时
     *
     * m 分
     *
     * 秒 s
     * */
    format: (reg: string) => string;
}