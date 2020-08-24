<template>
  <div class="home">
    <el-row :gutter="40">
      <el-col :lg="6" :sm="12">
        <div class="grid-content bg-white">
          <el-row>
            <el-col :span="12">
              <div class="grid-content">
                <div class="icons">
                  <i class="iconfont icon-yonghu"></i>
                </div>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content">
                <ul class="icons-right">
                  <li class="chain">用户</li>
                  <li>
                     <span> {{userNum}}</span>
                  </li>
                </ul>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-col>
      <el-col :lg="6" :sm="12">
        <div class="grid-content bg-white">
          <el-row>
            <el-col :span="12">
              <div class="grid-content">
                <div class="icons icons1">
                  <i class="iconfont icon-yonghu"></i>
                </div>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content">
                <ul class="icons-right">
                  <li class="chain">会员</li>
                  <li>
                      <span> {{userNumMember}}</span>
                   </li>
                </ul>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-col>
      <el-col :lg="6" :sm="12">
        <div class="grid-content bg-white">
          <el-row>
            <el-col :span="12">
              <div class="grid-content">
                <div class="icons icons2">
                  <i class="iconfont icon-liuliang"></i>
                </div>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content">
                <ul class="icons-right">
                  <li class="chain">今日访问</li>
                  <li>
                    <span> {{userNumOnLine}}</span>
                  </li>
                </ul>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-col>
    </el-row >
    <el-row :gutter="40" class="userListRow"> 
      <span class="userList">用户列表</span>
    </el-row>
    <el-row :gutter="40"> 
      <span class="userNumSpan">用户编号:</span><input id="userNum" class="userNumInput" type="text" v-model="userNumInput"/>
      <span class="userNumSpan">昵称:</span><input id = "nickName" class="userNumInput" type="text" v-model="nickName"/>
      <span class="userNumSpan">性别:</span>
      <select class="userNumInput" id = "gender" v-model="gender">
           <option value="1" selected>请选择..</option>
           <option value="男">男</option>
           <option value="女">女</option>
      </select>
      <span class="userNumSpan">居住地:</span><input id = "area" class="userNumInput" type="text" v-model="area"/>
      <span class="userNumSpan">教育背景:</span><input id = "educationalBackground" class="userNumInput" type="text" v-model="educationalBackground"/>
    </el-row>

   
    <el-row :gutter="40">
        <span class="userNumSpan">年纪:</span><input id = "minAge" class="userNumInput" type="text" placeholder="最小年纪" v-model="minAge"/><span style="font-size:20px;float: left;">---</span>
        <input id = "maxAge" class="userNumInput" type="text" placeholder="最大年纪" v-model="maxAge"/>
        <span class="maxSalarySpan">月薪:</span><input id = "minSalary" class="userNumInput" type="text" placeholder="最小月薪" v-model="minSalary"/><span style="font-size:20px;float: left;">---</span>
        <input id = "maxSalary" class="userNumInput" type="text" placeholder="最大月薪" v-model="maxSalary"/>
        <span class="maxSalarySpan">身高:</span><input id = "minStature" class="userNumInput" type="text" placeholder="最小身高" v-model="minStature"/><span style="font-size:20px;float: left;">---</span>
        <input id = "maxStature" class="userNumInput" type="text" placeholder="最大身高" v-model="maxStature"/>
    </el-row>
    <el-row :gutter="40" >
        <el-button type="primary" size="small" class="chaXunButton" @click="searchUserInfo">查询</el-button>
        <el-button type="primary" size="small" class="chaXunButton" @click="reset">重置</el-button>
        <el-button type="primary" size="small" class="chaXunButton" @click="addNewUser">新增用户</el-button>
    </el-row>
    <el-row :gutter="40">
        <el-table
        :data="tableData"
        border
        style="width: 100%">
          <el-table-column prop="headUrl" label="用户头像" min-width="120%" align='center'>
                    <!-- 图片的显示 -->
                    <template   slot-scope="scope">            
                        <img :src="scope.row.headUrl"  min-width="70" height="70" @error="scope.row.headUrl=''" v-if="scope.row.headUrl"/>
                    </template>         
          </el-table-column>
          <el-table-column
          align='center'
          prop="userNum"
          label="编号"
          width="80">
        </el-table-column>
        <el-table-column
          align='center'
          prop="nickName"
          label="昵称"
          width="120">
        </el-table-column>
        <el-table-column
          align='center'
          prop="area"
          label="居住地"
          width="120">
        </el-table-column>
        <el-table-column
          align='center'
          prop="age"
          label="年纪"
          width="60">
        </el-table-column>
        <el-table-column
          align='center'
          prop="phone"
          label="电话号"
          width="120">
        </el-table-column>
        <el-table-column
          align='center'
          prop="salary"
          label="月薪"
          width="100">
        </el-table-column>
            <el-table-column
          align='center'
          prop="stature"
          label="身高"
          width="80">
        </el-table-column>
        <el-table-column
          align='center'
          prop="gender"
          label="性别"
          width="80">
        </el-table-column>
        <el-table-column
          align='center'
          prop="educationalBackground"
          label="教育背景"
          width="80">
        </el-table-column>
        <el-table-column
          align='center'
          prop="userId"
          label="id"
          width="180">
        </el-table-column>
        <el-table-column
          align='center'
          prop="checkTime"
          label="注册日期"
          width="160">

        </el-table-column>
        <el-table-column prop="idFlag" label="身份认证" min-width="120%" align='center'>
            <template   slot-scope="scope">            
                  <el-button type="primary" size="small"
                      @click="getIdentityAuthentication(scope.row.userId)" v-if="scope.row.idFlag!='1'">身份认证
                </el-button>
                <span v-if="scope.row.idFlag=='1'" style="color: red;">已认证</span>
            </template>         
        </el-table-column>
        <el-table-column prop="educationalFlag" label="学历认证" min-width="120%" align='center'>
            <template   slot-scope="scope">            
                  <el-button type="primary" size="small"
                      @click="getEducationBackgroundAuthentication(scope.row.userId)" v-if="scope.row.educationalFlag!='1'">学历认证
                </el-button>
                <span v-if="scope.row.educationalFlag=='1'" style="color: red;">已认证</span>
            </template>         
        </el-table-column>
        <el-table-column prop="zxingUrl" label="二维码" min-width="120%" align='center'>
            <!-- 图片的显示 -->
            <template   slot-scope="scope">            
                <img :src="scope.row.zxingUrl"  min-width="70" height="70" @error="scope.row.zxingUrl=''" v-if="scope.row.zxingUrl"/>
                  <el-button type="primary" size="small"
                      @click="generateZXing(scope.row.userId)" v-if="!scope.row.zxingUrl">生成二维码
                </el-button>
                
            </template>         
        </el-table-column>
        <el-table-column prop="look" label="查看" min-width="120%" align='center'>
            <template   slot-scope="scope">            
                  <el-button type="primary" size="small"
                      @click="lookInfo(scope.row.userId)">查看
                </el-button>
            </template>         
        </el-table-column>
      </el-table>
    </el-row>
    <el-row :gutter="40" class="userListPagination">
       <el-pagination background layout="prev, pager, next" :total="total" :page-size="pageSize" @current-change="handleCurrentChange">
       </el-pagination>
    </el-row>
    <!-- 弹出框  身份认证-->
    <el-dialog title="身份认证" :visible.sync="dialogFormVisibleIdentity">
      <div class="formWrap">
        <el-form :model="formIdentity">
          <el-form-item>
            <p class="lineSpan"><span>姓名:</span><span>{{formIdentity.realName}}</span></p>
            <p class="lineSpan">
              <span>头像:</span>
              <img :src="formIdentity.headUrl"  min-width="70" height="70" @error="formIdentity.headUrl=''" v-if="formIdentity.headUrl"/>
            </p>
            <p class="lineSpan">
              <span>性别:</span><span>{{formIdentity.gender}}</span>
            </p>
            <p class="lineSpan">
              <span>昵称:</span><span>{{formIdentity.nickName}}</span>
            </p>
            <p class="lineSpan">
              <span>手 机 号:</span><span>{{formIdentity.phone}}</span>
            </p>
            <p class="lineSpan">
              <span>微信号:</span><span>{{formIdentity.weChat}}</span>
            </p>
            <p class="lineSpan">
              <span>qq号:</span><span>{{formIdentity.qq}}</span>
            </p>
            <!-- <p class="lineSpan">
              <span>身份证号:</span><span>{{formIdentity.idCare}}</span>
            </p> -->
            <p class="lineSpan">
              <span>出生日期:</span><span>{{formIdentity.dateOfBirth}}</span>
            </p>
            <!-- <p class="lineSpan">
              <span>身份证正面照:</span><img :src="formIdentity.idCareUrl0"  min-width="140" height="90" @error="formIdentity.idCareUrl0=''" v-if="formIdentity.idCareUrl0"/>
            </p>
            <p class="lineSpan">
              <span>身份证反面照:</span><img :src="formIdentity.idCareUrl1"  min-width="140" height="90" @error="formIdentity.idCareUrl1=''" v-if="formIdentity.idCareUrl1"/>
            </p> -->
             <p class="lineSpan">
              <span >认证备注:</span><input type="text" v-model="msg" style="width:60%;"/>
            </p>
            <p class="lineSpan">
              <span >认证状态:</span>
              <select v-model="flag" style="width:70px;">
                <option value=0>认证失败</option>
                <option value=1>认证成功</option>
             </select>
            </p>

          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleIdentity = false">取 消</el-button>
        <el-button type="primary" @click="authentication(1)">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 弹出框  学历认证-->
    <el-dialog title="学历认证" :visible.sync="dialogFormVisibleEducationBackground">
      <div class="formWrap">
        <el-form :model="formEducation">
          <el-form-item>
            <p class="lineSpan"><span>姓名:</span><span>{{formEducation.realName}}</span></p>
            <p class="lineSpan">
              <span>头像:</span>
              <img :src="formEducation.headUrl"  min-width="70" height="70" @error="formEducation.headUrl=''" v-if="formEducation.headUrl"/>
            </p>
            <p class="lineSpan">
              <span>昵称:</span><span>{{formEducation.nickName}}</span>
            </p>
            <p class="lineSpan">
              <span>手 机 号:</span><span>{{formEducation.phone}}</span>
            </p>
            <p class="lineSpan">
              <span>学历:</span><span>{{formEducation.educationalBackground}}</span>
            </p>
            <p class="lineSpan">
              <span>毕业学校:</span><span>{{formEducation.schoolName}}</span>
            </p>
            <!-- <p class="lineSpan">
              <span>学历照片:</span><img :src="formEducation.educationalUrls1"  min-width="140" height="90" @error="formEducation.educationalUrls1=''" v-if="formEducation.educationalUrls1"/>
            </p>
            <p class="lineSpan">
              <span>学位照片:</span><img :src="formEducation.educationalUrls0"  min-width="140" height="90" @error="formEducation.educationalUrls0=''" v-if="formEducation.educationalUrls0"/>
            </p> -->
             <p class="lineSpan">
              <span >认证备注:</span><input type="text" v-model="msg" style="width:60%;"/>
            </p>
            <p class="lineSpan">
              <span >认证状态:</span>
              <select v-model="flag" style="width:70px;">
                <option value=0>认证失败</option>
                <option value=1>认证成功</option>
             </select>
            </p>

          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleEducationBackground = false">取 消</el-button>
        <el-button type="primary" @click="authentication(2)">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 弹出框  新增用户信息-->
    <el-dialog title="新增用户信息" :visible.sync="dialogFormVisibleAddUserInfo">
      <div class="formWrap">
        <el-form :model="formAddUserInfo" label-position="left">
          <!-- <el-form-item>
            <p class="lineSpan">
              <span>头像:</span>
              <img :src="formAddUserInfo.headUrl"  min-width="70" height="70" @error="formAddUserInfo.headUrl=''" v-if="formAddUserInfo.headUrl"/>
            </p>
          </el-form-item> -->
          <el-form-item label="头像" prop="headUrl">
                    <template v-if="formAddUserInfo.headUrl">
                        <div style="text-align:center">
                            <el-image class="logoPanel"
                               style="width: 150px; height: 150px"
                                :src="formAddUserInfo.headUrl" 
                                :preview-src-list="showLogoUrl">
                            </el-image>
                        </div>
                        <div class="delImg" @click="formAddUserInfo.headUrl=''"><i class="el-icon-delete"></i></div>
                    </template>
                    <el-upload v-show="!formAddUserInfo.headUrl" ref="uploadLogoForm" class='upload-demo' :multiple='false' :auto-upload='false' list-type='picture-card' :show-file-list='true'
                        :before-upload="beforeUpload" :drag='true' action='aaa' :limit="1" :on-exceed="handleLogo"
                        :on-change="getLogoFileList" :on-remove="clearLogoAllitems"
                        :http-request="uploadLogo" accept=".jpg,.png,.jpeg" :file-list="logoUrl">
                        <i class="el-icon-upload"></i>
                    </el-upload>      
                </el-form-item>
          <el-form-item>   
            <p class="lineSpan"><span>姓名:</span><span><el-input v-model="formAddUserInfo.realName"></el-input></span></p>
            <p class="lineSpan"><span>性别:</span><span><el-input v-model="formAddUserInfo.gender"></el-input></span></p>
            <p class="lineSpan"><span>年龄:</span><span><el-input v-model="formAddUserInfo.age"></el-input></span></p>
            <p class="lineSpan"><span>体重:</span><span><el-input v-model="formAddUserInfo.weight"></el-input></span><span class="leftMargin">公斤</span></p>
            <p class="lineSpan"><span>身高:</span><span><el-input v-model="formAddUserInfo.stature"></el-input></span><span class="leftMargin">cm</span></p>
            <p class="lineSpan"><span>婚姻状态:</span><span><el-input v-model="formAddUserInfo.marriedStatus"></el-input></span></p>
            <p class="lineSpan"><span>老家所在地:</span><span><el-input v-model="formAddUserInfo.nativePlace"></el-input></span></p>
            <p class="lineSpan"><span>现居生活地:</span><span><el-input v-model="formAddUserInfo.area" placeholder="XX省 XX市"></el-input></span></p>
            <p class="lineSpan"><span>学历:</span><span><el-input v-model="formAddUserInfo.educationalBackground"></el-input></span></p>
            <p class="lineSpan"><span>公司名:</span><span><el-input v-model="formAddUserInfo.company"></el-input></span></p>            
            <p class="lineSpan"><span>心动对象:</span><span><el-input v-model="formAddUserInfo.heartBeatObject"></el-input></span></p>
            <p class="lineSpan"><span>微信号:</span><span><el-input v-model="formAddUserInfo.weChat"></el-input></span></p>
            <p class="lineSpan"><span>qq号:</span><span><el-input v-model="formAddUserInfo.qq"></el-input></span></p>
            <p class="lineSpan"><span>手机:</span><span><el-input v-model="formAddUserInfo.phone"></el-input></span></p>
            <p class="lineSpan"><span>月薪:</span><span><el-input v-model="formAddUserInfo.salary"></el-input></span><span class="leftMargin">元</span></p>
            <p class="lineSpan"><span>毕业学校:</span><span><el-input v-model="formAddUserInfo.schoolName"></el-input></span></p>
            <p class="lineSpan"><span>自我介绍:</span><span><el-input v-model="formAddUserInfo.selfIntroduction"></el-input></span></p>
            <p class="lineSpan"><span>操作人:</span><span><el-input v-model="formAddUserInfo.opId"></el-input></span></p>
            <p class="lineSpan"><span>个人生活照:</span>
            <template v-show="formAddUserInfo.otherUrls.length>0">
                        <div class="imageList" v-for="(item,index) in formAddUserInfo.otherUrls" :key="index">
                            <el-image 
                               style="width: 100px; height: 100px"
                                :src="item" 
                                :preview-src-list="formAddUserInfo.otherUrls">
                            </el-image>
                            <div class="delImg" @click="delPersonImage(index)"><i class="el-icon-delete"></i></div>
                        </div>
                    </template>
                    <el-upload v-show="4-formAddUserInfo.otherUrls.length>0" ref="uploadPersonListUrlsForm" class='image-uploader' :multiple='true' :auto-upload='false' list-type='picture-card' :show-file-list='true'
                        :before-upload="beforeUpload" :drag='true' action='aaa' :limit="4-formAddUserInfo.otherUrls.length" :on-exceed="handleLogo"
                        :on-change="getPersonListUrls" :on-remove="clearPersonUrlAllitems"
                        :http-request="uploadPersonListUrls" accept=".jpg,.png,.jpeg" :file-list="PersonListUrls">
                        <i class="el-icon-upload"></i>
                    </el-upload>
            </p>

          </el-form-item>
          <!-- <el-form-item>
                    
                      
            </el-form-item> -->

        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleAddUserInfo = false">取 消</el-button>
        <el-button type="primary" @click="addNewUserInfo()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  userStatistics,
  baseInfoZXing,
  getIdentityAuthentication,
  authentication,
  getEducationBackgroundAuthentication,
  generateZXing,
  userBaseInfoAdd,
  getUserInfoDetail
} from "@api";
import { exists } from "fs";
export default {
  name: "home",
  data() {
    return {
      userNum: 0,
      userNumOnLine: 0,
      userNumMember: 0,
      tableData: [],
      userNumInput: null,
      nickName: null,
      gender: null,
      area: null,
      minAge: null,
      maxAge: null,
      minSalary: null,
      maxSalary: null,
      minStature: null,
      maxStature: null,
      educationalBackground: null,
      total: 0,
      pageSize: 10,
      pageNumber: 1,
      dialogFormVisibleIdentity: false,
      dialogFormVisibleEducationBackground: false,
      dialogFormVisibleAddUserInfo:false,
      flag: null,
      formIdentity: {
        userId: null,
        phone: null,
        realName: null,
        nickName: null,
        idCare: null,
        idCareUrl0: null,
        idCareUrl1: null,
        headUrl: null,
        dateOfBirth: null,
        idFlag: null
      },
      formEducation: {
        userId: null,
        phone: null,
        realName: null,
        nickName: null,
        headUrl: null,
        educationalBackground: null,
        educationalNum: null,
        educationalUrls0: null,
        educationalUrls1: null,
        schoolName: null,
        educationalFlag: null
      },
      formAddUserInfo:{
        age: 12,
	      area: "湖北省 荆州市",
	      company: "前哨基地",
	      educationalBackground: "哈士奇",
	      gender: "男",
	      headUrl: "http://ygtqzhang.cn/ygtqpro/20200213022105/3c92bfb918bb405ca28fc5eab86d2fb5.jpeg",
	      heartBeatObject: "哈士奇",
	      marriedStatus: "未婚",
	      nativePlace: "湖北省 荆州市",
	      opId: "1238766921491542017",
	      otherUrls: [],
	      phone: "15818734678",
	      qq: "2444444422",
	      realName: "张志饿",
	      salary: 100,
	      schoolName: "哈弗",
	      selfIntroduction: "点对点",
	      stature: 134,
	      userId: "",
	      weChat: "zzzg345",
	      weight: 12
      },
      msg: ""
    };
  },
  mounted() {
    let that = this;
    that.statistics();
    that.baseInfoZXing();
  },
  destroyed() {
    window.onresize = null;
  },
  methods: {
    
    //新增用户
    addNewUser(){
      let that=this;
      that.dialogFormVisibleAddUserInfo=true;
    },
    //查看用户信息
    lookInfo(val){
      console.log("ws");
      let that = this;
      let params = {};
      params.userId = val;
      getUserInfoDetail(params).then(res=>{
        console.log(res);
      })
    },
    //点击新增用户的框的确定
    addNewUserInfo(){
      let that=this;
      let params={};
      params=that.formAddUserInfo;
      userBaseInfoAdd(params).then(res=>{
            console.log(res);
      })
    },
     // 上传文件个数超过定义的数量
    handleLogo(files, fileList) {
            this.$message({
                 message: '当前限制选择 4 个文件，请删除后继续上传',
                 type: 'error'
            });
    },
    // 上传文件之前的钩子
      beforeUpload(file) {
          //判断文件格式
          let name = file.name
          if (name.indexOf("png")<-1 && name.indexOf("jpg")<-1 && name.indexOf("jpeg")<-1) {
              return false;
          }
      },
      //获取头像照片
      getLogoFileList(file, fileList){
        console.log("ces",file,fileList);
          this.formAddUserInfo.headUrl = fileList.url;
      },
      //获取生活照片
      getPersonListUrls(file, fileList){
          this.formAddUserInfo.otherUrls = fileList
      },
      delPersonImage(index){
             this.formAddUserInfo.otherUrls.splice(index,1);
        },
        clearLogoAllitems(){
            this.formAddUserInfo.headUrl = "";
            this.$refs.uploadLogoForm.clearFiles();
            this.$refs.uploadLogoForm.value="";
        },
        clearPersonUrlAllitems(){
            this.formAddUserInfo.otherUrls = []
            this.$refs.uploadPersonListUrlsForm.clearFiles()
            this.$refs.uploadPersonListUrlsForm.value=""
        },
        uploadLogo(){
            if(this.logoUrl.length==0){
                return ''
            }
            let that = this
            return new Promise(function(resolve) {
                let file = that.formAddUserInfo.headUrl[0].raw
                const form = new FormData()// FormData 对象
                form.append('file', file)
                let uploadUrl = process.env.VUE_APP_LOGOUT_URL + "/file/upload"
                axios({
                    url: uploadUrl,
                    data: form,
                    method: 'post',
                    // headers: {'x-auth-token': getToken()},
                    contentType: "multipart/form-data",
                    processData: false, //告诉jquery不要对form进行处理
                    contentType: false, //指定为false才能形成正确的Content-Type
                    async: false
                }).then(res=>{
                    if(res.data.errCode==200){
                        resolve(res.data.data)
                    }else{
                        this.pageLoading = false
                        that.$message("error","头像上传失败，请仔细核对数据以及格式！")
                        return ;
                    }
                })
            })
        },
        uploadPersonListUrls(){
            if(this.formAddUserInfo.otherUrls.length==0){
                return []
            }
            let that = this
            return new Promise(function(resolve) {
                const form = new FormData()// FormData 对象
                that.formAddUserInfo.otherUrls.forEach(item=>{
                    form.append('files', item.raw)
                })
                let uploadUrl = process.env.VUE_APP_LOGOUT_URL + "/file/uploadBatch"
                axios({
                    url: uploadUrl,
                    data: form,
                    method: 'post',
                    // headers: {'x-auth-token': getToken()},
                    contentType: "multipart/form-data",
                    processData: false, //告诉jquery不要对form进行处理
                    contentType: false, //指定为false才能形成正确的Content-Type
                    async: false
                }).then(res=>{
                    if(res.data.errCode==200){
                        resolve(res.data.data)
                    }else{
                        this.pageLoading = false
                        that.$message("error","个人照片上传失败，请仔细核对数据以及格式！")
                        return ;
                    }
                })
            })
        },
      statistics() {
       let that = this;
       userStatistics()
         .then(res => {
           if (res.errCode == 200) {
             let backUserStatisticsOutput = res.data;
             that.userNum = backUserStatisticsOutput.userNum;
             that.userNumOnLine = backUserStatisticsOutput.userNumOnLine;
             that.userNumMember = backUserStatisticsOutput.userNumMember;
           } else {
             that.$message("error", res.errMsg);
           }
         })
         .catch(err => {
           this.$message("error", err.errMsg);
         });
     },

    baseInfoZXing() {
      let that = this;
      let params = {};
      params.pageNumber = that.pageNumber;
      params.pageSize = that.pageSize;
      baseInfoZXing(params)
        .then(res => {
          if (res.errCode == 200) {
            that.tableData = res.data;
            that.total = res.total;
          } else {
            that.$message("error", res.errMsg);
          }
        })
        .catch(err => {
          this.$message("error", err.errMsg);
        });
    },
    reset() {
      let that = this;
      that.userNumInput = null;
      that.nickName = null;
      that.gender = null;
      that.area = null;
      that.minAge = null;
      that.maxAge = null;
      that.minSalary = null;
      that.maxSalary = null;
      that.minStature = null;
      that.maxStature = null;
      that.educationalBackground = null;
    },
    handleCurrentChange(val) {
      let that = this;
      that.pageNumber = val;
      that.searchUserInfo();
    },
    getIdentityAuthentication(val) {
      let that = this;
      that.dialogFormVisibleIdentity = true;
      let params = {};
      params.userId = val;
      getIdentityAuthentication(params)
        .then(res => {
          if (res.errCode == 200) {
            console.info(res.data);
            this.formIdentity = res.data;
          } else {
            that.$message("error", res.errMsg);
          }
        })
        .catch(err => {
          this.$message("error", err.errMsg);
        });
    },
    searchUserInfo() {
      let that = this;
      let params = {};
      params.pageNumber = that.pageNumber;
      params.pageSize = that.pageSize;
      if (that.userNumInput) {
        params.userNum = that.userNumInput;
      }
      if (that.nickName) {
        params.nickName = that.nickName;
      }
      if (that.gender) {
        params.gender = that.gender;
      }
      if (that.area) {
        params.area = that.area;
      }
      if (that.minAge) {
        params.minAge = that.minAge;
      }
      if (that.maxAge) {
        params.maxAge = that.maxAge;
      }
      if (that.minSalary) {
        params.minSalary = that.minSalary;
      }
      if (that.maxSalary) {
        params.maxSalary = that.maxSalary;
      }
      if (that.minStature) {
        params.minStature = that.minStature;
      }
      if (that.maxStature) {
        params.maxStature = that.maxStature;
      }
      if (that.educationalBackground) {
        params.educationalBackground = that.educationalBackground;
      }
      baseInfoZXing(params)
        .then(res => {
          console.info(params);
          if (res.errCode == 200) {
            this.tableData = res.data;
          } else {
            that.$message("error", res.errMsg);
          }
        })
        .catch(err => {
          this.$message("error", err.errMsg);
        });
    },
    authentication(type) {
      let that = this;
      let params = {};
      if (type === 1) {
        params.userId = that.formIdentity.userId;
      } else {
       params.userId = that.formEducation.userId;
      }
      
      params.assessorId = that.$store.state.userId;
      if (that.msg != "") {
        params.msg = that.msg;
      } else {
        that.$message("error", "认证备注不能为空");
      }
      if (that.flag) {
        params.flag = that.flag;
      } else {
        that.$message("error", "认证状态不能为空");
      }
      params.type = type;
      authentication(params)
        .then(res => {
          console.info(params);
          if (res.errCode == 200) {
            that.msg = null;
            that.flag = null;
            that.$message("info", res.errMsg);
            if (type === 1) {
              that.dialogFormVisibleIdentity = false;
            } else {
              that.dialogFormVisibleEducationBackground = false;
            }
            that.searchUserInfo();
          } else {
            that.msg = null;
            that.flag = null;
            that.$message("error", res.errMsg);
          }
        })
        .catch(err => {
          that.msg = null;
          that.flag = null;
          this.$message("error", err.errMsg);
        });
    },
    getEducationBackgroundAuthentication(val) {
      let that = this;
      that.dialogFormVisibleEducationBackground = true;
      let params = {};
      params.userId = val;
      getEducationBackgroundAuthentication(params)
        .then(res => {
          if (res.errCode == 200) {
            this.formEducation = res.data;
          } else {
            that.$message("error", res.errMsg);
          }
        })
        .catch(err => {
          this.$message("error", err.errMsg);
        });
    },
    generateZXing(val) {
      let that = this;
      let params = {};
      params.userId = val;
      
      generateZXing(params)
        .then(res => {
          if (res.errCode == 200) {
            console.info("请求数据...");
            that.searchUserInfo();
          } else {
            that.$message("error", res.errMsg);
          }
        })
        .catch(err => {
          this.$message("error", err.errMsg);
        });
    }
  }
};
</script>
<style lang="scss" scoped>
.home {
  padding: 40px;
  background: $base-gray1;
  .chaXunButton {
    margin-bottom: 20px;
    margin-left: 10px;
  }
  .userList {
    font-size: 18px;
  }
  .userListPagination {
    margin-top: 20px;
  }
  .userListRow {
    margin-bottom: 20px;
  }
  .userNumSpan {
    float: left;
    font-size: 12px;
    margin-bottom: 18px;
  }
  .maxSalarySpan {
    float: left;
    font-size: 12px;
    margin-bottom: 18px;
    margin-left: 18px;
  }
  .userNumInput {
    float: left;
    font-size: 18px;
    margin-bottom: 18px;
    width: 120px;
    margin-left: 7px;
    margin-right: 7px;
  }
  .bg-white {
    background: $base-white;
    -webkit-box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
    box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
    border-color: rgba(0, 0, 0, 0.05);
    margin-bottom: 20px;
    cursor: pointer;
    .icons {
      text-align: left;
      width: 86px;
      height: 86px;
      margin: 10px;
      padding: 13px;
      transition: 0.3s ease-in-out;
      border-radius: 3px;
      &:hover {
        background: $base-bule1;
        .icon-yonghu {
          color: $base-white;
        }
      }
      .iconfont {
        font-size: 60px;
      }
      .icon-yonghu {
        font-size: 60px;
        color: $base-bule1;
      }
    }
    .icons1 {
      &:hover {
        background: $base-ye;
        .icon-xiaoxi {
          color: $base-white;
        }
      }
      .icon-xiaoxi {
        color: $base-ye;
      }
    }
    .icons2 {
      &:hover {
        background: $base-green;
        .icon-liuliang {
          color: $base-white;
        }
      }
      .icon-liuliang {
        color: $base-green;
      }
    }
    .icons3 {
      &:hover {
        background: $base-pink;
        .icon-yanjing {
          color: $base-white;
        }
      }
      .icon-yanjing {
        color: $base-pink;
      }
    }
    .icons-right {
      font-size: 24px;
      margin-top: 16px;
      margin-right: 16px;
      li {
        margin: 10px 0;
      }
    }
    .chain {
      color: rgba(0, 0, 0, 0.45);
      font-size: 18px;
    }
  }
  .formWrap {
    .lineSpan {
      display: flex;
      margin-bottom: 10px;
      span:first-child {
        margin-right: 10px;
      }
      .leftMargin{
      padding-left:20px;
    }
    }
    
  }
 
}
</style>


