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
    <el-row :gutter="20"> 
      <el-col :span="3"><el-input placeholder="用户编号" type="text" v-model="userNumInput"/></el-col>
      <el-col :span="3"><el-input placeholder="昵称" type="text" v-model="nickName"/></el-col>
      <el-col :span="3"><el-select v-model="gender" placeholder="性别">
           <el-option value="男">男</el-option>
           <el-option value="女">女</el-option>
      </el-select></el-col>
      <el-col :span="3"><el-input type="text" v-model="area" placeholder="居住地"/></el-col>
      <el-col :span="3"><el-input placeholder="教育背景" type="text" v-model="educationalBackground"/></el-col>
      <el-col :span="3"><el-input type="text" placeholder="最小年纪" v-model="minAge"/></el-col>
      <el-col :span="3"><el-input type="text" placeholder="最大年纪" v-model="maxAge"/></el-col>
    </el-row>
    <el-row :gutter="20">
        <el-col :span="3"><el-input type="text" placeholder="最小月薪" v-model="minSalary"/></el-col>
        <el-col :span="3"><el-input type="text" placeholder="最大月薪" v-model="maxSalary"/></el-col>
        <el-col :span="3"> <el-input type="text" placeholder="最小身高" v-model="minStature"/></el-col>
        <el-col :span="3"><el-input type="text" placeholder="最大身高" v-model="maxStature"/></el-col>
        <el-col :span="10">
          <el-button type="primary" size="small" @click="searchUserInfo">查询</el-button>
          <el-button type="primary" size="small" @click="reset">重置</el-button>
          <el-button type="primary" size="small" @click="addNewUser">新增用户</el-button>
        </el-col>
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
        <!-- <el-table-column
          align='center'
          prop="userId"
          label="id"
          width="180">
        </el-table-column> -->
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

        <el-table-column prop="look" label="删除" min-width="120%" align='center'>
            <template   slot-scope="scope">            
                  <el-button type="primary" size="small"
                      @click="deleteUserId(scope.row.userId)">删除
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
    <el-dialog :title="AddUserInfoTitle" :visible.sync="dialogFormVisibleAddUserInfo">
      <div v-loading="editUserLoading">
      <el-form ref="editUserForm" label-position="right" label-width="100px" :rules="editUserRules" :model="formAddUserInfo">
        <el-form-item label="头像" prop="headUrl">
          <template v-if="formAddUserInfo.headUrl">
            <div class="imageList">
              <el-image class="logoPanel"
                style="width: 150px; height: 150px"
                :src="formAddUserInfo.headUrl" 
                :preview-src-list="showLogoUrl">
              </el-image>
            </div>
            <div class="delImg" @click="formAddUserInfo.headUrl=''"><i class="el-icon-delete"></i></div>
          </template>
          <el-upload v-show="!formAddUserInfo.headUrl" ref="uploadLogoForm" class='upload-demo' :multiple='false' :auto-upload='false' list-type='picture-card' :show-file-list='true'
            :before-upload="beforeUpload" :drag='true' action='aaa' :limit="1" :on-exceed="handleLogo1"
            :on-change="getLogoFileList" :on-remove="getLogoFileList"
            :http-request="uploadLogo" accept=".jpg,.png,.jpeg" :file-list="headUrlTemp">
            <i class="el-icon-upload"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="姓名" prop="realName">
          <el-input v-model="formAddUserInfo.realName"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="gender">
          <el-select v-model="formAddUserInfo.gender" placeholder="性别">
            <el-option value="男">男</el-option>
            <el-option value="女">女</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input placeholder="年龄" v-model="formAddUserInfo.age">
            <template slot="append">岁</template>
          </el-input>
        </el-form-item>
        <el-form-item label="体重" prop="weight">
          <el-input placeholder="体重" v-model="formAddUserInfo.weight">
            <template slot="append">公斤</template>
          </el-input>
        </el-form-item>
        <el-form-item label="身高" prop="stature">
          <el-input placeholder="身高" v-model="formAddUserInfo.stature">
            <template slot="append">cm</template>
          </el-input>
        </el-form-item>
        <el-form-item label="婚姻状态" prop="marriedStatus">
          <el-select v-model="formAddUserInfo.marriedStatus" placeholder="婚姻状态">
            <el-option value="未婚">未婚</el-option>
            <el-option value="已婚">已婚</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="老家所在地" prop="nativePlaceTemp">
          <el-cascader
          v-model="nativePlaceTemp"
          :options="provinceCityData"
          @change="handleChangeNativePlace">
          </el-cascader>
        </el-form-item>
        <el-form-item label="现居生活地" prop="areaTemp">
          <el-cascader
          v-model="areaTemp"
          :options="provinceCityData"
          @change="handleChangeArea">
          </el-cascader>
        </el-form-item>
        <el-form-item label="学历" prop="educationalBackground">
          <el-input v-model="formAddUserInfo.educationalBackground"></el-input>
        </el-form-item>
        <el-form-item label="公司名" prop="company">
          <el-input v-model="formAddUserInfo.company"></el-input>
        </el-form-item>
        <el-form-item label="心动对象" prop="heartBeatObject">
          <el-input type="textarea" :rows="5" v-model="formAddUserInfo.heartBeatObject"></el-input>
        </el-form-item>
        <el-form-item label="微信号" prop="weChat">
          <el-input v-model="formAddUserInfo.weChat"></el-input>
        </el-form-item>
        <el-form-item label="qq号" prop="qq">
          <el-input v-model="formAddUserInfo.qq"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="phone">
          <el-input v-model="formAddUserInfo.phone"></el-input>
        </el-form-item>
        <el-form-item label="月薪" prop="salary">
          <el-input placeholder="月薪" v-model="formAddUserInfo.salary">
            <template slot="append">元</template>
          </el-input>
        </el-form-item>
        <el-form-item label="毕业学校" prop="schoolName">
          <el-input v-model="formAddUserInfo.schoolName"></el-input>
        </el-form-item>
        <el-form-item label="自我介绍" prop="selfIntroduction">
          <el-input type="textarea" :rows="5" v-model="formAddUserInfo.selfIntroduction"></el-input>
        </el-form-item>
        <el-form-item label="个人生活照" prop="otherUrls">
            <template v-show="formAddUserInfo.otherUrls.length>0">
               <div class="imageList" v-for="(item,index) in formAddUserInfo.otherUrls" :key="index">
                  <el-image 
                    style="width: 150px; height: 150px"
                    :src="item" 
                    :preview-src-list="formAddUserInfo.otherUrls">
                  </el-image>
                  <div class="delImg" @click="delPersonImage(index)"><i class="el-icon-delete"></i></div>
              </div>
          </template>
            <el-upload v-show="4-formAddUserInfo.otherUrls.length>0" ref="uploadPersonListUrlsForm" class='image-uploader' :multiple='true' :auto-upload='false' list-type='picture-card' :show-file-list='true'
                :before-upload="beforeUpload" :drag='true' action='aaa' :limit="4-formAddUserInfo.otherUrls.length" :on-exceed="handleLogo"
                :on-change="getPersonListUrls" :on-remove="getPersonListUrls"
                :http-request="uploadPersonListUrls" accept=".jpg,.png,.jpeg" :file-list="otherUrlsTemp">
                <i class="el-icon-upload"></i>
            </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleAddUserInfo = false">取 消</el-button>
        <el-button type="primary" @click="addNewUserInfo()">确 定</el-button>
      </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { provinceAndCityData, CodeToText ,TextToCode} from 'element-china-area-data'
import {
  userStatistics,
  baseInfoZXing,
  getIdentityAuthentication,
  authentication,
  getEducationBackgroundAuthentication,
  generateZXing,
  userBaseInfoAdd,
  getUserInfoDetail,
  deleteUserId
} from "@api";
import { exists } from "fs";
import { log } from 'util';
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
      AddUserInfoTitle:"",
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
      headUrlTemp:[],//头像
      otherUrlsTemp:[],//生活照
      nativePlaceTemp:[],//老家所在地
      areaTemp:[],//现居生活地
      editUserLoading:false,
      formAddUserInfo:{
        age: 0,
	      area: null,
	      company: null,
	      educationalBackground: null,
	      gender: null,
	      headUrl: null,
	      heartBeatObject: null,
	      marriedStatus: null,
	      nativePlace: null,
	      opId: null,
	      otherUrls: [],
	      phone: null,
	      qq: null,
	      realName: null,
	      salary: 0,
	      schoolName: null,
	      selfIntroduction: null,
	      stature: 0,
	      userId: null,
	      weChat: null,
	      weight: 0
      },
      editUserRules:{

      },
      provinceCityData:[],
      msg: ""
    };
  },
  mounted() {
    let that = this;
    this.provinceCityData = provinceAndCityData
    that.statistics();
    that.baseInfoZXing();
  },
  destroyed() {
    window.onresize = null;
  },
  methods: {
    
    //新增用户
    addNewUser(){
      this.dialogFormVisibleAddUserInfo=true;
      this.AddUserInfoTitle="新增用户信息";
      this.formAddUserInfo.age=0;
      this.formAddUserInfo.area=null;
      this.formAddUserInfo.company=null,
      this.formAddUserInfo.educationalBackground=null,
      this.formAddUserInfo.gender=null,
      this.formAddUserInfo.headUrl=null,
      this.formAddUserInfo.heartBeatObject=null,
      this.formAddUserInfo.marriedStatus=null,
      this.formAddUserInfo.nativePlace=null,
      this.formAddUserInfo.opId= sessionStorage.getItem("userId"),
      this.formAddUserInfo.otherUrls= [],
      this.formAddUserInfo.phone= null,
      this.formAddUserInfo.qq= null,
      this.formAddUserInfo.realName= null,
      this.formAddUserInfo.salary= 0,
      this.formAddUserInfo.schoolName= null,
      this.formAddUserInfo.selfIntroduction= null,
      this.formAddUserInfo.stature= 0,
      this.formAddUserInfo.userId= null,
      this.formAddUserInfo.weChat= null,
      this.formAddUserInfo.weight= 0
      this.headUrlTemp = []
      this.otherUrlsTemp = []
      this.nativePlaceTemp = []
      this.areaTemp = []
    },
    //查看用户信息
    lookInfo(val){
      this.headUrlTemp = []
      this.otherUrlsTemp = []
      let params = {};
      params.userId = val;
      this.AddUserInfoTitle="编辑用户信息";
      getUserInfoDetail(params).then(res=>{
        if(res.errCode==200){
          this.dialogFormVisibleAddUserInfo = true;
          this.AddUserInfoTitle="查看用户信息";
          this.formAddUserInfo=res.data;
          this.formAddUserInfo.opId= sessionStorage.getItem("userId");
          this.getNativePlaceCode()
          this.getAreaCode()
        }
      })
    },

    deleteUserId(val){
      console.log("看看",val);
       let that = this;
       //删除用户
      this.headUrlTemp = []
      this.otherUrlsTemp = []
      let params = {};
      params.userId = val;
      this.AddUserInfoTitle="删除用户信息";
      deleteUserId(params).then(res=>{
        if(res.errCode==200){
          that.baseInfoZXing();
        }
      })

       

    },
    getNativePlaceCode(){
      this.nativePlaceTemp = []
      let nativePlaceList = []
      if(this.formAddUserInfo.nativePlace){
        nativePlaceList = this.formAddUserInfo.nativePlace.split(",")
      }
      if(nativePlaceList.length>=2){
        let province = TextToCode[nativePlaceList[0]].code
        let city = TextToCode[nativePlaceList[0]][nativePlaceList[1]].code
        if(province && city){
          this.nativePlaceTemp = [province,city]
        }
      }else{
        this.formAddUserInfo.nativePlace = ''
      }
    },
    getAreaCode(){
      this.areaTemp = []
      let areaList = []
      if(this.formAddUserInfo.area){
        areaList = this.formAddUserInfo.area.split(",")
      }
      if(areaList.length>=2){
        let province = TextToCode[areaList[0]].code
        let city = TextToCode[areaList[0]][areaList[1]].code
        if(province && city){
          this.areaTemp = [province,city]
        }
      }else{
        this.formAddUserInfo.area = ''
      }
    },
    handleChangeNativePlace(){
      let province = CodeToText[this.nativePlaceTemp[0]]
      let city = CodeToText[this.nativePlaceTemp[1]]
      this.formAddUserInfo.nativePlace = province+","+city
    },
    handleChangeArea(){
      let province = CodeToText[this.areaTemp[0]]
      let city = CodeToText[this.areaTemp[1]]
      this.formAddUserInfo.area = province+","+city
    },
    //点击新增用户的框的确定
    addNewUserInfo(){
      let params={};
      if (this.formAddUserInfo.age==0) {
        this.$message("error", "年龄不能为空");
        return;
      }
      if (this.formAddUserInfo.area==null) {
        this.$message("error", "居住地不能为空");
        return;
      }
    
      if(this.formAddUserInfo.educationalBackground==null){
        this.$message("error", "教育背景不能为空");
        return;
      }
      if(this.formAddUserInfo.gender==null){
        this.$message("error", "性别不能为空");
        return;
      }
      if(this.formAddUserInfo.headUrl==null){
        this.$message("error", "头像不能为空");
        return;
      } 
    
      if(this.formAddUserInfo.marriedStatus==null){
        this.$message("error", "婚姻状态不能为空");
        return;
      }
      if(this.formAddUserInfo.nativePlace==null){
        this.$message("error", "老家不能为空");
        return;
      }
      if(this.formAddUserInfo.opId==null){
        this.$message("error", "操作员不能为空");
        return;
      }
     
      if(this.formAddUserInfo.phone==null){
        this.$message("error", "手机不能为空");
        return;
      }
      
      if(this.formAddUserInfo.realName==null){
        this.$message("error", "姓名不能为空");
        return;
      }

      if(this.formAddUserInfo.stature==0){
        this.$message("error", "身高不能为空");
        return;
      }
     

      if(this.formAddUserInfo.weChat==null){
        this.$message("error", "微信不能为空");
        return;
      }
      
      if(!this.formAddUserInfo.headUrl && this.headUrlTemp.length==0){
          this.$message("warning","必须上传头像")
          return
      }
     
      params=this.formAddUserInfo;
      this.editUserLoading = true
      this.formAddUserInfo.opId= sessionStorage.getItem("userId")
      const a = this.uploadLogo()
      const b = this.uploadPersonListUrls()
      const c = Promise.all([a, b])
      let that = this
      c.then(function(val) {
        if(val[0]){
          params.headUrl = val[0]
        }
        params.otherUrls = params.otherUrls.concat(val[1])
        userBaseInfoAdd(params).then(res=>{
          that.editUserLoading = false
          if(res.errCode==200){
            that.dialogFormVisibleAddUserInfo = false
            that.$message('success','操作成功')
            that.baseInfoZXing();
          }else{
            that.$message('error',res.errMsg)
          }
        })

      })
      //更新列表数据
      
    },// 上传文件个数超过定义的数量
      handleLogo1(files, fileList) {
        this.$message({
              message: '当前限制选择 1 个文件，请删除后继续上传',
              type: 'error'
        });
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
        // console.log("ces",file,fileList);
          this.headUrlTemp = fileList;
      },
      //获取生活照片
      getPersonListUrls(file, fileList){
          // console.log("ces",file,fileList);
          this.otherUrlsTemp = fileList
      },
      delPersonImage(index){
        this.formAddUserInfo.otherUrls.splice(index,1);
      },
      clearLogoAllitems(){
        this.headUrlTemp = "";
        this.$refs.uploadLogoForm.clearFiles();
        this.$refs.uploadLogoForm.value="";
      },
      clearPersonUrlAllitems(){
        this.otherUrlsTemp = []
        this.$refs.uploadPersonListUrlsForm.clearFiles()
        this.$refs.uploadPersonListUrlsForm.value=""
      },
      uploadLogo(){
        if(this.headUrlTemp.length==0){
            return ''
        }
        let that = this
        return new Promise(function(resolve) {
            let file = that.headUrlTemp[0].raw
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
            if(this.otherUrlsTemp.length==0){
                return []
            }
            let that = this
            return new Promise(function(resolve) {
                const form = new FormData()// FormData 对象
                that.otherUrlsTemp.forEach(item=>{
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
  .el-row{
    margin-bottom:10px;
  }
  .el-col{
    text-align: left;
  }
  /deep/.el-form-item__label{
    color:black !important;
  }
  /deep/.el-form-item__content{
    text-align: left;
  }
  .el-select{
    width:100%!important;
  }
  .el-cascader{
    width:100% !important;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  /deep/.el-upload-dragger{
    width:150px;
    height:150px;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .delImg{
      width: 150px;
      height: 30px;
      text-align: center;
      vertical-align: middle;
      line-height: 30px;
      font-size: 14px;
      background-color: gray;
      opacity: 0.5;
      color: black;
      margin-top:-15px;
      cursor: pointer;
  }
  .imageList{
      display: inline-block;
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


