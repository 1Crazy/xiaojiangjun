const localData = require('./data')
const dev = 'http://xiaojiangjun.cduxj.com/app/ewei_shopv2_api.php?i=2&r=' // 修改接口请求地址
const prodev = ''
const local = 'local'
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}
const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
module.exports = {
  formatTime: formatTime
}
/**
 * 数组累加
 * 传入 3,5,1 返回 [3,4,5]
 */
const Accumulate = (start, end, num) => {
  let arr = []
  for (let i = start; i <= end; i += num) {
    arr.push(i)
  }
  return arr
}
const getKey = (key) => {
  return uni.getStorageSync(key)
}
const setKey = (key, data) => {
  return uni.setStorageSync(key, data)
}
/**
 * 时间格式化
 */
const FormateTime = (date, dataType) => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  if (dataType == '-') {
    return `${year}-${month}-${day}`
  }
}
function getCurrentTime() {
  let keep = ''
  let date = new Date()
  let y = date.getFullYear()
  let m = date.getMonth() + 1
  m = m < 10 ? '0' + m : m
  let d = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
  let h = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
  let f = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
  let s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
  keep = y + '-' + m + '-' + d + ' ' + h + '：' + f + '：' + s
  return keep // 20160614134947
}
const payUrl = dev
const Request = (url, data, method = 'GET', title = '加载中', baseUrl = dev , dataType = 'json') => {
  let src = ''
  if (baseUrl == local) {
    src = localData.local(url)
  }else{
    src = `${baseUrl}${url}`
  }
  if (uni.getStorageSync('userInfo').token) {
    data.token = uni.getStorageSync('userInfo').token
  }
  data.timetemp = new Date().valueOf()
  data.clientType = 'shijiangCloud'
  data.sign = ''
  uni.showLoading({
    title,
    mask: true
  })
  return new Promise((resolve, reject) => {
    uni.request({
      url: src,
      data,
      method,
      dataType,
      responseType: 'text',
      success: function (res) {
        resolve(res)
      },
      fail: function (res) {
        reject(res)
      },
      complete: function (res) {
        uni.hideLoading()
      }
    })
  })
}
/**
 * delete model
 */
const DeleteModal = (title = "提示", content = '', f) => {
  return (
    uni.showModal({
      title,
      content,
      success: function (sm) {
        if (sm.confirm) {
          f()
        }
        else if (sm.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  )
};

/**
 * totast
 */
const Totast = (title='请稍等', icon = 'none', duration = 1000) => {
  if (title == '请稍等') return false
  return new Promise((resolve, reject) => {
    uni.showToast({
      title,
      icon,
      duration,
    });
    setTimeout(function () {
      resolve('foo');
    }, duration);
    // reject()
  })
};
/**
 * 验证
 */
const VerifyPhoneNumber = str => /^1\d{10}$/.test(str)
const VerifyIdentityCard = str => /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(str)
const VerifyMoney = str => /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/.test(str)
const VerifyPositive = str => /^[0-9]+$/.test(str) 
/**
 * 数组查重
 */
const CheckRepeat = ary => {
  const s = ary.join(",") + ",";
  for (var i = 0; i < ary.length; i++) {
    if (s.replace(ary[i] + ",", "").indexOf(ary[i] + ",") > -1) {
      return true
      break;
    }
  }
  return false
}
module.exports = {
  Request,
  FormateTime,
  VerifyPhoneNumber,
  VerifyIdentityCard,
  Accumulate,
  VerifyMoney,
  CheckRepeat,
  VerifyPositive,
  DeleteModal,
  Totast,
  getKey,
  setKey,
  getCurrentTime,
  payUrl,
}