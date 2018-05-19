import axios from 'axios';

// ajax请求
axios.defaults.baseURL = window.location.origin;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';


// 请求json数据的 动态添加时间戳
const cacheTime = function () {
  let nowDate = new Date();
  let getTime;
  getTime = '' + nowDate.getFullYear() + (nowDate.getMonth() + 1) + nowDate.getDate();
  return getTime;
};

// 广告位
export const getData = () => axios({
  method: 'get',
  url: 'http://lyyzch.club/easylife/json/data.json?' + cacheTime()
});
