import axios from "axios";
import { ElMessage, ElMessageBox } from "element-plus";

// 创建 axios 实例
const service = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 50000,
  headers: { "Content-Type": "application/json;charset=utf-8" },
});

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    // todo 可以在请求头中补充一些参数 例如：token

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    const { status, statusText } = response;
    // console.log(response)
    if (status === 200) {
      // 响应数据为二进制流处理(Excel导出)
      if (response.data instanceof ArrayBuffer) {
        return response;
      }
      return response.data;
    }
    

    // ElMessage.error(statusText || '系统出错');
    return Promise.reject(new Error(statusText || "Error"));
  },
  (error) => {
    if (error.response) {
      // console.log(error)
      const { status, statusText } = error.response;
      // token 过期,重新登录
      if (status === 403) {
        ElMessageBox.confirm("当前页面已失效，请重新登录", "提示", {
          confirmButtonText: "确定",
          type: "warning",
        }).then(() => {
          localStorage.clear();
          window.location.href = "/";
        });
      } else {
        ElMessage.error(statusText || "系统出错");
      }
    }
    return Promise.reject(error.message);
  }
);

// 导出 axios 实例
export default service;
