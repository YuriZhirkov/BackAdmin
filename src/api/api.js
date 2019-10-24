import {get,post} from './request';
// let api_pro="dfsfdasdf"
// let api_dev="http://127.0.0.1:8852";
// let api=api_dev;

//注册//登陆
export const  register=(params)=>post('/user/baseInfo/back/register',params).then(res=>res.data);

// export const  login= (params)=>post('/api/post/user/login',params)
//上传
export const  upload=(params)=>get('/api/get/upload',params)
//获取手机验证码
export const  getPhoneValidateCode=(params)=>get('/user/baseInfo/getPhoneValidateCode',params).then(res=>res.data);

//获取用户信息
export const  getUserInfo=(params)=>get('/back/user/getUserInfo',params).then(res=>res.data);


// 统计用户数量和在线的用户

export const  userStatistics=(params)=>get('/back/user/statistics').then(res=>res.data);


// 获取用户个人页面的二维码
export const  baseInfoZXing=(params)=>post('/user/baseInfo/zXing',params).then(res=>res.data);

// export const 

//4. 获取身份认证信息
export const  getIdentityAuthentication=(params)=>get('/back/user/getIdentityAuthentication',params).then(res=>res.data);

//5. 获取用户的学历信息
export const  getEducationBackgroundAuthentication=(params)=>get('/back/user/getEducationBackgroundAuthentication',params).then(res=>res.data);


// 6. 认证用户
export const  authentication=(params)=>post('/back/user/authentication',params).then(res=>res.data);

// 6. 认证用户
export const  generateZXing=(params)=>get('/user/baseInfo/generateZXing',params).then(res=>res.data);

