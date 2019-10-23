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
      prop="createTime"
      label="注册日期"
      width="160">

    </el-table-column>
    <el-table-column prop="idFlag" label="身份认证" min-width="120%" align='center'>
        <template   slot-scope="scope">            
              <el-button type="primary" size="small"
                  @click="getIdentityAuthentication(scope.row.userId)" v-if="scope.row.idFlag==0">身份认证
            </el-button>
            <span v-if="scope.row.idFlag!=0" style="color: red;">已认证</span>
        </template>         
    </el-table-column>
    <el-table-column prop="educationalFlag" label="学历认证" min-width="120%" align='center'>
        <template   slot-scope="scope">            
              <el-button type="primary" size="small"
                  @click="getIdentityAuthentication(scope.row.userId)" v-if="scope.row.educationalFlag==0">学历认证
            </el-button>
            <span v-if="scope.row.educationalFlag!=0" style="color: red;">已认证</span>
        </template>         
    </el-table-column>
    <el-table-column prop="zxingUrl" label="二维码" min-width="120%" align='center'>
        <!-- 图片的显示 -->
        <template   slot-scope="scope">            
            <img :src="scope.row.zxingUrl"  min-width="70" height="70" @error="scope.row.zxingUrl=''" v-if="scope.row.zxingUrl"/>
              <el-button type="primary" size="small"
                  @click="generateZXing(scope.row)" v-if="!scope.row.zxingUrl">生成二维码
            </el-button>
        </template>         
    </el-table-column>
  
    <!-- <el-table-column
      fixed="right"
      label="操作"
      width="100">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
        <el-button type="text" size="small">编辑</el-button>
      </template>
    </el-table-column> -->
  </el-table>
    </el-row>
    <el-row :gutter="40" class="userListPagination">
       <el-pagination background layout="prev, pager, next" :total="total" :page-size="pageSize" @current-change="handleCurrentChange">
       </el-pagination>
    </el-row>
    <!-- 弹出框  身份认证-->
    <el-dialog title="身份认证" :visible.sync="dialogFormVisibleIdentity">
  <el-form :model="formIdentity">
    <el-form-item label="姓名" :label-width="formLabelWidth">
      <!-- <el-input v-model="formIdentity.name" autocomplete="off"></el-input> -->
      <span class="realNameSpan">姓名:</span><span class="realNameSpan">{{formIdentity.realName}}</span>
    </el-form-item>
    <el-form-item label="活动区域" :label-width="formLabelWidth">
      <el-select v-model="formIdentity.region" placeholder="请选择活动区域">
        <el-option label="区域一" value="shanghai"></el-option>
        <el-option label="区域二" value="beijing"></el-option>
      </el-select>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisibleIdentity = false">取 消</el-button>
    <el-button type="primary" @click="dialogFormVisibleIdentity = false">确 定</el-button>
  </div>
</el-dialog>

   <!-- 弹出框 学历认证 -->
    <!-- <el-dialog title="收货地址" :visible.sync="dialogFormVisibleIdentity">
  <el-form :model="formIdentity">
    <el-form-item label="活动名称" :label-width="formLabelWidth">
      <el-input v-model="formIdentity.name" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="活动区域" :label-width="formLabelWidth">
      <el-select v-model="formIdentity.region" placeholder="请选择活动区域">
        <el-option label="区域一" value="shanghai"></el-option>
        <el-option label="区域二" value="beijing"></el-option>
      </el-select>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisibleIdentity = false">取 消</el-button>
    <el-button type="primary" @click="dialogFormVisibleIdentity = false">确 定</el-button>
  </div>
</el-dialog> -->
  </div>
</template>
<script>
import { userStatistics, baseInfoZXing } from "@api";
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
      pageSize: 3,
      pageNumber: 1,
      dialogFormVisibleIdentity: false,
      dialogFormVisibleEducationBackground: false,
      formIdentity: {
        userId: "",
        phone: "",
        realName: "张志国",
        nickName: "",
        idCare: "",
        idCareUrl: "",
        headUrl: "",
        dateOfBirth: null,
        idFlag: 0
      },
      formLabelWidth: "120px"
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
    generateZXing(obj) {
      let userInfo = obj;
      console.info(userInfo.nickName);
      this.$message("info", userInfo.nickName);
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
          console.info("请求数据...");
          if (res.errCode == 200) {
            this.tableData = res.data;
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
  .realNameSpan{
    float: left;
    margin-left: 5px;
    margin-bottom: 10px;
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
}
</style>

