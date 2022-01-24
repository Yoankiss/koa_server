/**
 * @function formatDate 毫秒数转成需要的格式
 * @param  {[Number]} type      1: yyyy-mm-dd. 2: yyyy-mm-dd hh:mm:ss
 * @param  {[String]} separator 分隔符
 * @param  {[Number]} time      毫秒数
 * @return {[type]}
 */
const format = (type, separator, time) => {
  let formatdate = new Date(time),
      year = formatdate.getFullYear(),
      month = formatdate.getMonth(),
      day = formatdate.getDate(),
      hours = formatdate.getHours(),
      minute = formatdate.getMinutes(),
      second = formatdate.getSeconds();

  month = (month + 1) < 10 ? ('0' + (month + 1)) : (month + 1);
  day = day < 10 ? ('0' + day) : day;
  hours = hours < 10 ? ('0' + hours) : hours;
  minute = minute < 10 ? ('0' + minute) : minute;
  second = second < 10 ? ('0' + second) : second;

  if (type == 1) {
    return year + separator + month + separator + day;
  } else if (type == 2) {
    return year + separator + month + separator + day + ' ' + hours + ':' + minute + ':' + second;
  } else {
    return time;
  }
}
module.exports = {format}
