/* *
    用途：js中字符串超长作固定长度加省略号（...）处理
    参数说明：
        str:需要进行处理的字符串，可含汉字
        len:需要显示多少个汉字，两个英文字母相当于一个汉字。
    */
export default function (str, len) {
  var reg = /[\u4e00-\u9fa5]/g
  // 专业匹配中文
  var slice = str.substring(0, len)
  var chineseCharNum = ~~(slice.match(reg) && slice.match(reg).length)
  var realen = slice.length * 2 - chineseCharNum
  return str.substr(0, realen) + (realen < str.length ? '...' : '')
}
