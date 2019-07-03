import Vue from 'vue'
import axios from 'axios'

/*注册Axios*/
const instance = axios.create({
  baseURL: '/',
  transformRequest: [/*将JSON字符串转换成FormData*/
    function (data) {
      let ret = '';
      for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&';
      }
      return ret;
    }
  ]
})
// http response 拦截器
const res = response => {
  if (response.data.code === -2) {
    window.$Vue.$router.push({path:'/login'})
    window.$Vue.$message.error(response.data.msg)
  } else if (response.data.code !== 1) {
    window.$Vue.$message.error(response.data.msg)
  }
  return response;
}
const err = error => {
  if (error.response) {
    window.$Vue.$message.error(error)
  }
  return Promise.reject(error.response.data)   // 返回接口返回的错误信息
}
instance.interceptors.response.use(res, err);

Vue.prototype.$ajax = instance
