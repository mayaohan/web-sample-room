import request from '@/utils/request';

/**
 * 登录API
 *
 * @param data {LoginData}
 * @returns
 */
export function loginApi(data){
  return request({
    url: '/api/api',
    method: 'post',
    params: data
  });
}

/**
 * 获取用户信息
 *
 * @param data {UserInfo}
 * @returns
 */
export function getUserInfoApi(accessToken) {
  return request({
    url: '/api/userInfo',
    method: 'get',
    params: {
      accessToken: accessToken
    }
  });
}