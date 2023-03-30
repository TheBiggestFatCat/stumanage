// 日期转时间戳
const getUnixTime = (dateStr) => {
  let newstr = dateStr.replace(/-/g, '/')
  let date = new Date(newstr)
  let time_str = date.getTime().toString()
  return time_str.substring(0, 10)
}

// 时间戳转日期,falg:true表示只要年月日,part: year month date
const toDate = (number, flag, part) => {
  let n = number
  let date = new Date(parseInt(n) * 1000)
  let y = date.getFullYear()
  let m = date.getMonth() + 1
  m = m < 10 ? ('0' + m) : m
  let d = date.getDate()
  d = d < 10 ? ('0' + d) : d
  let h = date.getHours()
  h = h < 10 ? ('0' + h) : h
  let minute = date.getMinutes()
  let second = date.getSeconds()
  minute = minute < 10 ? ('0' + minute) : minute
  second = second < 10 ? ('0' + second) : second
  if (flag) {
    if (part == 'year') {
      return y
    } else if (part == 'month') {
      return m
    } else if (part == 'date') {
      return n
    }
    return y + '-' + m + '-' + d
  }
  return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second
}


// 判断两个日期时间戳相差多少天,参数为时间戳
const dateCompare = (dateTimeStamp1, dateTimeStamp2) => {
  let dayNum = 0
  if (dateTimeStamp1 > dateTimeStamp2) {
    dayNum = Math.floor((dateTimeStamp1 - dateTimeStamp2) / 86400)
  } else {
    dayNum = Math.floor((dateTimeStamp2 - dateTimeStamp1) / 86400)
  }
  return dayNum
}


// 判断过去某个时间点到当前时间是否达到多少天,可以用来定期清理缓存
const datePassDays = (dateTimeStamp, days) => {
  let now = getUnixTime(formatDateThis(new Date()))
  let diffValue = now - dateTimeStamp
  let limitTime = days * 86400
  if (diffValue >= limitTime) {
    return true
  }
  return false
}


// 当前日期加减天数,falg:true表示只要年月日
const mathChangeDate = (date, method, days, flag) => {
  // method:'+' || '-'
  // ios不解析带'-'的日期格式，要转成'/'，不然Nan，切记
  let dateVal = date.replace(/-/g, '/')
  let timestamp = Date.parse(dateVal)
  if (method == '+') {
    timestamp = timestamp / 1000 + 24 * 60 * 60 * days
  } else if (method == '-') {
    timestamp = timestamp / 1000 - 24 * 60 * 60 * days
  }
  return toDate(timestamp, flag)
}


// 时间戳转换具体时间描述(传入数值型时间戳)
const getDateDiff = (dateTimeStamp) => {
  let result = ''
  let minute = 1 * 60
  let hour = minute * 60
  let day = hour * 24
  let halfamonth = day * 15
  let month = day * 30
  let now = getUnixTime(formatDateThis(new Date())) // 有些特殊 不能使用 new Date()
  let diffValue = now - dateTimeStamp
  if (diffValue < 0) {
    return
  }
  let monthC = diffValue / month
  let weekC = diffValue / (7 * day)
  let dayC = diffValue / day
  let hourC = diffValue / hour
  let minC = diffValue / minute


  if (monthC >= 1) {
    result = '' + parseInt(monthC) + '月前'
  } else if (weekC >= 1) {
    result = '' + parseInt(weekC) + '周前'
  } else if (dayC >= 1) {
    result = '' + parseInt(dayC) + '天前'
  } else if (hourC >= 1) {
    result = '' + parseInt(hourC) + '小时前'
  } else if (minC >= 1) {
    result = '' + parseInt(minC) + '分钟前'
  } else { result = '刚刚' }
  return result
}


// 获取当前年份，月份， 例： getCurrentTime("year")
const getCurrentTime = (method, date = new Date()) => {
  if (method == 'year') {
    return date.getFullYear()
  } else if (method == 'month') {
    return date.getMonth() + 1
  }
  return date
}


// 获取当前服务器时间,参数直接用 new Date() 就可以了
const formatDateThis = (date, lab = '-') => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  return [year, month, day].map(formatNumber).join(lab) + ' ' + [hour, minute, second].map(formatNumber).join(':')
}


// 当前年月日
const formatTime = (date, lab = '-') => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  return [year, month, day].map(formatNumber).join(lab)
}
// 当前时分秒
const formatTimes = time => {
  const hour = time.getHours()
  const minute = time.getMinutes()
  const second = time.getSeconds()
  return [hour, minute, second].map(formatNumber).join(':')
}
// 补0
const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}


// 比较两个时间大小(格式参考yyyy-mm-dd hh:mm:ss)
const compareTime = (startTime, endTime) => {
  // 结束时间大于开始时间就是true  ， 反之则为 false
  let sn = getUnixTime(startTime) * 1
  let en = getUnixTime(endTime) * 1
  if (en > sn) {
    return true
  }
  return false
}


export {
  dateCompare,
  getCurrentTime,
  getUnixTime,
  formatDateThis,
  formatTime,
  formatTimes,
  toDate,
  getDateDiff,
  mathChangeDate,
  compareTime,
  datePassDays
}