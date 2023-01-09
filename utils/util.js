const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}

/**
 * map转对象形式
 * @param {*} map 
 * @param {*} list 
 */
const typeforMap = (map, list) => {
  let list = []
  list.forEach((item, index) => {
    list.push({
      name: map[item],
      value: item,
      key: index + Date.now()
    })
  })
  return list
}
/**
 * @returns statusBarHeight
 */
function GetStatusBarHeight() {
  let statusBarHeight = 0;
  wx.getSystemInfo({
    success: function (res) {
      statusBarHeight = res.statusBarHeight;
    },
  });
  return statusBarHeight
}

module.exports = {
  formatTime,
  GetStatusBarHeight,
  typeforMap
}