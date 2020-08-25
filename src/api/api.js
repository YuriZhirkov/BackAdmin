import {get,post} from './request';
// let api_pro="dfsfdasdf"
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

//6. 查看用户信息
export const  getUserInfoDetail=(params)=>get('/user/baseInfo/getBack',params).then(res=>res.data);

// 6. 认证用户
export const  authentication=(params)=>post('/back/user/authentication',params).then(res=>res.data);

// 6. 认证用户
export const  generateZXing=(params)=>get('/user/baseInfo/generateZXing',params).then(res=>res.data);


//添加活动人员
export const  userBaseInfoAdd=(params)=>post('/user/baseInfo/add',params).then(res=>res.data);

// 搜索商圈
export const  searchBusinessDistrict=(params)=>post('/dateBusinessDistrict/searchBusinessDistrict',params).then(res=>res.data);

// 添加商圈
export const  addOrUpdate=(params)=>post('/dateBusinessDistrict/addOrUpdate',params).then(res=>res.data);

// 删除商圈
export const  deleteBusinessDistrict=(params)=>post('/dateBusinessDistrict/deleteBusinessDistrictById',params).then(res=>res.data);

// 根据id查询商圈详情
export const  getBusinessDistrictById=(params)=>get('/dateBusinessDistrict/getBusinessDistrictById',params).then(res=>res.data);

// 根据id查询订单详情
export const  getOrderById=(params)=>get('/order/get',params).then(res=>res.data);

// 搜索订单
export const  getOrderList=(params)=>post('/order/list',params).then(res=>res.data);

// 退单操作
export const  payRefund=(params)=>get('/pay/refund',params).then(res=>res.data);

//活动列表
export const getActivityList=(params)=>post('activity/search',params).then(res=>res.data);

//添加活动
export const activityPublish=(params)=>post('activity/publish',params).then(res=>res.data);

//获取活动的基本信息
export const getBasicInfoActivity=(params)=>get('activity/getBasicInfo',params).then(res=>res.data);

export const deteleActivity=(params)=>post('activity/delete',params).then(res=>res.data);

