<template>
  <div class="login-container">
    <vue-particles color="#fff" :particlesNumber='60' :moveSpeed='1.5' :lineOpacity='0.5' class="bg"></vue-particles>
    <div class="login-form">
    <el-row >
      <el-col :lg="9" :sm="12" class="aa">
          <h3>{{$t('login.system')}}</h3>
          <el-form
            :model="userBackRegister"
            status-icon
            :rules="rules2"
            ref="userBackRegister"
            label-width="100px"
            class="login-ruleForm"
          >
            <el-form-item label="用户名" prop="username" >
              <el-input v-model="userBackRegister.username" placeholder="用户名以字母开头，长度为5-16，允许字母数字下划线"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password1">
              <el-input type="password" placeholder="密码以字母开头，长度为5-16，允许字母数字下划线" autocomplete="off"  v-model="userBackRegister.password1"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="password2" v-if="!loginFlag">
              <el-input type="password"  autocomplete="off" placeholder="密码以字母开头，长度为5-16，允许字母数字下划线"  v-model="userBackRegister.password2"></el-input>
            </el-form-item>
            <el-form-item label="手机号" prop="phone" v-if="!loginFlag">
              <el-input  v-model="userBackRegister.phone" autocomplete="off" ></el-input>
            </el-form-item>
            <el-form-item label="验证码" prop="valideCode" v-if="!loginFlag">
              <el-input  v-model="userBackRegister.valideCode" autocomplete="off" style="width:26%;float:left"></el-input>
              <el-button type="primary" style="float:left;margin-left:30px;" @click="getValidateCode">获取验证码</el-button>
            </el-form-item>
             <el-form-item label="角色" prop="valideRole" v-if="!loginFlag">
             <el-select v-model="userBackRegister.role" placeholder="请选择角色" style="float:left">
                <el-option
                  v-for="item in userBackRegister.roleList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
           </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('userBackRegister')">{{loginFlag?'登录':'注册'}}</el-button>
              <!-- <el-button @click="resetForm('userBackRegister')">重置</el-button> -->
            </el-form-item>
            <el-form-item>
              <span @click="loginFlag=false" v-show="loginFlag">注册</span>
               <span  @click="loginFlag=true"  v-show="!loginFlag">登录</span>
            </el-form-item>
          </el-form>
         
      </el-col>
    </el-row>
    </div>
    
  </div>
</template>
<script>
import { login,register,getPhoneValidateCode } from "@api";
import { messages } from "@assets/js/common.js";
export default {
  name: "login",
  data() {
    var validatePass = (rule, value, callback) => {
      let reg=/^[a-zA-Z][a-zA-Z0-9_]{5,9}$/;
      if (value === "") {
        callback(new Error("请输入密码"));
      }
      else if(!reg.test(value)){
        callback(new Error("密码格式有误"));
      }
       callback();
    };
    var validateName = (rule, value, callback) => {
       let reg=/^[a-zA-Z][a-zA-Z0-9_]{5,9}$/;
      if (value === "") {
        callback(new Error("请输入用户名"));
      }
      else if(!reg.test(value)){
        callback(new Error("用户名格式有误"));
      }
       callback();
    };
    var validatePhone = (rule,value,callback) => {
      let reg = /^1[3-9][0-9]{9}$/;
       if (value === "") {
        callback(new Error("请输入手机号"));
       } 
       else if(!reg.test(value)){
          callback(new Error("手机格式有误"));
       }
        callback();
    }
    var validateCode=(rule,value,callback)=>{
       if (value === "") {
        callback(new Error("请输入验证码"));
       } 
        callback();
    }

    var validateRole=(value,rule,callback)=>{
       if(value===""||value<2){
         callback(new Error("请输入验证码"));
       }
       callback();
    }
    return {
      userBackRegister: {
        password1: "",
        username: "",
        password2:"",
        phone:"",
        valideCode:"",
        role:"",
       // 2.红娘 3. 主持人 4.运营人员 5.开发人员
        roleList:[{
          value: 2,
          label: '红娘'
        }, {
          value: 3,
          label: '主持人'
        },
         {
          value: 4,
          label: '运营人员'
        },
         {
          value: 5,
          label: '开发人员'
        }]
      },

      loginFlag:true,
      rules2: {
        password1: [{ validator: validatePass, trigger: "blur" }],
        password2: [{ validator: validatePass, trigger: "blur" }],
        username: [{ validator: validateName, trigger: "blur" }],
        phone: [{validator:validatePhone,trigger:"blur"}],
        valideCode:[{validator:validateCode,trigger:"blur"}],
        valideRole:[{validator:validateRole,trigger:"blur"}],
      }

    };
  },
  methods: {
     submitForm(formName) {
       let that=this;
     
      this.$refs[formName].validate(valid => {
        
        if (valid) {
         
          let params={};
          params.userName = that.userBackRegister.username;
          params.password1 = that.userBackRegister.password1;
          if(that.loginFlag){
            
             params.flag=2;

          }
          else{
        
            params.flag=1;
            params.validateCode = that.userBackRegister.valideCode;
            params.phone = that.userBackRegister.phone;
            params.password2 = that.userBackRegister.password2;
            params.role = that.userBackRegister.role;
            
          }
          
          register(params).then(res => {
              
              if(res.errCode==200){
                that.$router.push({
                  path: "/home"
                });
               // that.$store.commit("COMMIT_USERID",res.data);
              } 
              else{
                that.$message('error',res.errMsg);
              }
            })
            .catch(err => {
              console.log(err);
              this.$message("error", err.errMsg);
            });
        } else {
          return false;
        }
      });
    },
    getValidateCode(){
      let that=this;
      let params={};
      if(that.userBackRegister.phone != ''){
          params.phone=that.userBackRegister.phone;
          getPhoneValidateCode(params).then(res=>{
        
          console.log(res)
          if(res.errCode==200){
            that.$message("success",res.errMsg);
          }
        
      })
      } else {
         this.$message("error",'手机号不能为空');
      }
     
    },

    
    // resetForm(formName) {
    //   this.$refs[formName].resetFields();
    // }
  }
};
</script>
<style lang="scss" scoped>
.bg{
  position: fixed;
  z-index: -1;
  width: 100%;
  height: 100%;
}
.login-container {
  background: #2d3a4b;
  width: 100%;
  height: 100%;
  position: fixed;
  display: table;
  .login-form {
    display: table-cell;
    vertical-align: middle;
    text-align: center;
    color: white;
    font-size: 18px;
    .aa{
      margin: auto;
      float: none;
    }
    h3{
      line-height: 60px;
      margin-left: 100px
    }
    .acount{
      text-align: left
    }
  }
}
</style>

