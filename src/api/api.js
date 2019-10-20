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
export const  getUserInfo=(params)=>post('/user/baseInfo/moreInfo',params).then(res=>res.data);


// export const 

