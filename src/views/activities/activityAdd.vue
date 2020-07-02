<template>
    <div class="editActivity">
        <el-dialog :visible="dialogInfo.show" width="80%" @close="closeDialog" @open="openDialog"
            :close-on-click-modal="false" :title="title">
            <el-form ref="editActivityForm" v-loading="pageLoading" label-position="left" label-width="15cnpm0px" :rules="rules" :model="info">
                <el-form-item label="活动标题:" prop="activityTitle">
                    <el-input v-model="info.activityTitle"></el-input>
                </el-form-item>
                <el-form-item label="活动简介:" prop="activityBriefIntroduction">
                    <el-input v-model="info.activityBriefIntroduction"></el-input>
                </el-form-item>
                  <el-form-item label="活动图片" prop="activityPictureUrls">
                    <template v-show="info.activityPictureUrls.length>0">
                        <div class="imageList" v-for="(item,index) in info.activityPictureUrls" :key="index">
                            <el-image 
                                style="width: 150px; height: 150px"
                                :src="item" 
                                :preview-src-list="info.activityPictureUrls">
                            </el-image>
                            <div class="delImg" @click="delShopImage(index)"><i class="el-icon-delete"></i></div>
                        </div>
                    </template>
                    <el-upload v-show="6-info.activityPictureUrls.length>0" ref="uploadShopListUrlsForm" class='image-uploader' :multiple='true' :auto-upload='false' list-type='picture-card' :show-file-list='true'
                        :before-upload="beforeUpload" :drag='true' action='aaa' :limit="6-info.activityPictureUrls.length" :on-exceed="handleLogo"
                        :on-change="getShopListUrls" :on-remove="getShopListUrls"
                        :http-request="uploadShopListUrls" accept=".jpg,.png,.jpeg" :file-list="shopListUrls">
                        <i class="el-icon-upload"></i>
                    </el-upload>
                </el-form-item>
                <!-- <el-form-item label="活动图片(最多4张):" prop="activityPictureUrls">
                    <template v-if="info.activityPictureUrls">
                        <div class="demo-image__preview">
                            <el-image class="logoPanel"
                                style="width: 150px; height: 150px"
                                :src="info.activityPictureUrls" 
                                :preview-src-list="showLogoUrl">
                            </el-image>
                        </div>
                        <div class="delImg" @click="info.activityPictureUrls=''"><i class="el-icon-delete"></i></div>
                    </template>
                    <el-upload v-show="!info.activityPictureUrls" ref="uploadLogoForm" class='upload-demo' :multiple='false' :auto-upload='false' list-type='picture-card' :show-file-list='true'
                        :before-upload="beforeUpload" :drag='true' action='aaa' :limit="4" :on-exceed="handleLogo"
                        :on-change="getLogoFileList" :on-remove="getLogoFileList"
                        :http-request="uploadLogo" accept=".jpg,.png,.jpeg" :file-list="logoUrl">
                        <i class="el-icon-upload"></i>
                    </el-upload>      
                </el-form-item> -->
                <el-form-item label="活动金额(元):" prop="activityCost">
                    <el-input v-model="info.activityCost" onkeyup="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}" 
onafterpaste="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}"></el-input>
                </el-form-item>
              
                <el-form-item label="活动总人数(个):" prop="activityJoinPerson">
                    <el-input v-model="info.activityJoinPerson" onkeyup="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}" 
onafterpaste="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}"></el-input>
                </el-form-item>
                <el-form-item label="活动开始时间:" prop="activityTime">
                    <el-date-picker
                      v-model="activityTime"
                      type="datetimerange"
                      range-separator="至"
                      start-placeholder="开始日期"
                      format="yyyy-MM-dd HH:mm:ss"
                      value-format="yyyy-MM-dd HH:mm:ss"
                      end-placeholder="结束日期">
                    </el-date-picker>
                </el-form-item>
                <!-- <el-form-item label="活动结束时间:" prop="activityEndTime">
                    <el-input v-model="info.activityEndTime"></el-input>
                </el-form-item> -->
                <el-form-item label="发布地址:" prop="publishAddress">
                    <el-input v-model="info.publishAddress"></el-input>
                </el-form-item>
                <el-form-item label="活动地址:" prop="activityAddress">
                    <el-input v-model="info.activityAddress"></el-input>
                </el-form-item>
                 <el-form-item label="活动详情:" prop="activityDetails">
                   <div class="w100 edit flexs fmiddle">
                     <editor class="relative w100" @change="editChange" :content="info.activityDetails">
                      </editor>
                    </div>
                </el-form-item>
                <el-form-item label="活动提示:" prop="activityTips">
                    <el-input v-model="info.activityTips"></el-input>
                </el-form-item>
                <el-form-item label="活动说明:" prop="activitySpecification">
                    <el-input v-model="info.activitySpecification"></el-input>
                </el-form-item>
                <el-form-item label="活动特色:" prop="activityFeature">
                    <el-input v-model="info.activityFeature"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogInfo.show = false">取 消</el-button>
                <el-button type="primary" @click="saveInfo">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import {activityPublish,getActivityList,getBasicInfoActivity} from "../../api/api"
// import editor from "../component/editor"
import VueHtml5Editor from 'vue-html5-editor'
const options = {
   visibleModules: [
      "text",
      "color",
      "font",
      // "image",
      "hr",
      "eraser",
      "undo",
      ],
      // config image module
      image: {
          // 文件最大体积，单位字节  max file size
          sizeLimit:1024 * 1024 *10,
          // 上传参数,默认把图片转为base64而不上传
          upload: {
              url: 'https://www.ygtqzhang.cn/file/upload',
              headers: {},
              params: {},
              fieldName:'file'
          },
          // 压缩参数,默认使用localResizeIMG进行压缩,设置为null禁止压缩
          compress: {
              width: 1000,
              height: 1000,
              quality: 80
          },
          // 响应数据处理,最终返回图片链接
          uploadHandler(responseText){
              var json = JSON.parse(responseText)
              if (json.errCode != 200) {
                  alert(json.errMsg)
              } else {
                  imgs.push(json.data)
                  console.log(imgs);
                  return json.data
              }
          }
      },
  language: "zh-cn",
  i18n: {
    "zh-cn": {
      "align": "对齐方式",
      "image": "图片",
      "list": "列表",
      "link": "链接",
      "unlink": "去除链接",
      "table": "表格",
      "font": "文字",
      "full screen": "全屏",
      "text": "排版",
      "eraser": "格式清除",
      "info": "关于",
      "color": "颜色",
      "please enter a url": "请输入地址",
      "create link": "创建链接",
      "bold": "加粗",
      "italic": "倾斜",
      "underline": "下划线",
      "strike through": "删除线",
      "subscript": "上标",
      "superscript": "下标",
      "heading": "标题",
      "font name": "字体",
      "font size": "文字大小",
      "left justify": "左对齐",
      "center justify": "居中",
      "right justify": "右对齐",
      "ordered list": "有序列表",
      "unordered list": "无序列表",
      "fore color": "前景色",
      "background color": "背景色",
      "row count": "行数",
      "column count": "列数",
      "save": "确定",
      "upload": "上传",
      "progress": "进度",
      "unknown": "未知",
      "please wait": "请稍等",
      "error": "错误",
      "abort": "中断",
      "reset": "重置"
    }
  }
}

const editor = new VueHtml5Editor(options)
export default {
    components: {
        editor
    },
    props:{
        dialogInfo:{
            type: Object,
            default: function(){
                return {
                    show: false,
                    id: ''
                }
            }
        }
    },
    data(){
        //console.log('this.$store = ',this.$store.state.userId) ;
        const validateString = (rule, value, callback) => {
            if (value.split(" ").join("").length == 0) {
                callback(new Error("不允许输入空字符"));
            } else {
                callback();
            }
        };
        const validateArray = (rule,value,callback) => {
            if(value.length==0){
                callback("请选择开始时间和结束时间");
            }else{
                callback();
            }
        };
        return {
            title: '编辑活动信息',
            pageLoading: false,
            info:{
                activityPictureUrls:'',//活动图片 必填
                activitySpecification:'',//string 活动说明 必填
                activityTitle:'',//string 活动标题 必填
                activityBriefIntroduction:'',//string 活动简介 必填
                activityCost:0.0,//	num 活动金额 必填
                activityJoinPerson:0,//num 活动参与人数 必填
                activityStartTime:'',//活动开始时间 必填
                activityEndTime:'',//活动结束时间 必填
                publishAddress:'',//活动发布地址
                activityAddress:'',//活动发布地址
                activityDetails:'',//string 活动详情 必填
                activityTips:'',//string 活动提示 必填
                activitySpecification:'',//string 活动说明 必填
                activityFeature:'',//string 活动特色
                // shopListUrls:[]
            },
            activityTime:[],//活动时间 必填

            // showLogoUrl :[],
            // logoUrl: [],
            shopListUrls: [],
            rules:{
                activityTitle: [
                    { required: true, message: "必填", trigger: "blur" },
                    { validator: validateString, trigger: "blur" }
                ],
                
                activityBriefIntroduction: [
                    { required: true, message: "必填", trigger: "blur" },
                    { validator: validateString, trigger: "blur" }
                ],
                
                publishAddress: [
                    { required: true, message: "必填", trigger: "blur" },
                    { validator: validateString, trigger: "blur" }
                ],
                activityAddress: [
                    { required: true, message: "必填", trigger: "blur" },
                    { validator: validateString, trigger: "blur" }
                ],
                // activityTime: [
                //     { required: true, message: "必填", trigger: "blur" },
                //     { validator: validateArray, trigger: "blur" }
                // ],
                activityDetails: [
                    { required: true, message: "必填", trigger: "blur" },
                    { validator: validateString, trigger: "blur" }
                ]
            },
        }
    },
    watch:{
    },
    methods:{
        editChange(e){
            console.log("有没有",e);
            this.info.activityDetails=e;
        },
        // getLogoFileList(file, fileList){
        //     this.logoUrl = fileList
        // },
        getShopListUrls(file,fileList){
            this.shopListUrls = fileList
        },
        // 上传文件之前的钩子
        beforeUpload(file) {
            //判断文件格式
            let name = file.name
            if (name.indexOf("png")<-1 && name.indexOf("jpg")<-1 && name.indexOf("jpeg")<-1) {
                return false;
            }
        },
        // 上传文件个数超过定义的数量
        handleLogo(files, fileList) {
            this.$message({
                 message: '当前限制选择 4 个文件，请删除后继续上传',
                 type: 'error'
            });
        },
        // clearLogoAllitems(){
        //     this.logoUrl = []
        //     this.$refs.uploadLogoForm.clearFiles()
        //     this.$refs.uploadLogoForm.value=""
        // },
        clearShopUrlAllitems(){
            this.shopListUrls = []
            this.$refs.uploadShopListUrlsForm.clearFiles()
            this.$refs.uploadShopListUrlsForm.value=""
        },
        // uploadLogo(){
        //     if(this.logoUrl.length==0){
        //         return ''
        //     }
        //     let that = this
        //     return new Promise(function(resolve) {
        //         // let file = that.logoUrl[0].raw
        //         const form = new FormData()// FormData 对象
        //         // form.append('file', file)
        //         that.logoUrl.forEach(item=>{
        //             form.append('files', item.raw);
        //         })
        //         let uploadUrl = process.env.VUE_APP_LOGOUT_URL + "/file/upload"
        //         axios({
        //             url: uploadUrl,
        //             data: form,
        //             method: 'post',
        //             // headers: {'x-auth-token': getToken()},
        //             contentType: "multipart/form-data",
        //             processData: false, //告诉jquery不要对form进行处理
        //             contentType: false, //指定为false才能形成正确的Content-Type
        //             async: false
        //         }).then(res=>{
        //             if(res.data.errCode==200){
        //                 resolve(res.data.data)
        //             }else{
        //                 this.pageLoading = false
        //                 that.$message("error","活动图片文件上传失败，请仔细核对数据以及格式！")
        //                 return ;
        //             }
        //         })
        //     })
        // },
        uploadShopListUrls(){
            if(this.shopListUrls.length==0){
                return []
            }
            let that = this
            return new Promise(function(resolve) {
                const form = new FormData()// FormData 对象
                that.shopListUrls.forEach(item=>{
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
                        that.$message("error","商家图标文件上传失败，请仔细核对数据以及格式！")
                        return ;
                    }
                })
            })
        },
        openDialog(){   
            if(this.dialogInfo.id){
                this.getActivityList()
                this.title = "编辑活动信息"
            }else{
                this.title = "添加活动信息"
            }
        },
        closeDialog(){
            this.showLogoUrl = []
            this.$refs["editActivityForm"].clearValidate();
            this.clearLogoAllitems()
            // this.clearShopUrlAllitems()
            // this.showLogoUrl = []
            this.info.activitySpecification =''//string 优惠活动说明 非必填
            this.info.activityAddress =''//string 优惠标题 非必填
            this.info.activityDetails =''//string 商圈地址 必填
            this.info.activityTips =''//	string 商圈简介 必填
            this.info.activityFeature =''//string 商圈名字 必填
            this.info.activityTitle =''//string1 优惠广场 2. xxx 非必填
            this.info.activityBriefIntroduction =''//string约会商圈id 添加不需要 更新需要 非必填
            this.info.activityCost =0.0//Double 商圈的标签比如 = 逛圣地;大众品牌 必填
            this.info.activityJoinPerson =0//Integer 商圈图标 必填
            this.activityTime=[],
            this.info.publishAddress='',
            this.dialogInfo.show = false
        },
        getActivityList(){
            this.pageLoading = true
            getBasicInfoActivity({id:this.dialogInfo.id}).then(res=>{
                if(res.errCode==200){
                    this.info = res.data
                    if(this.info.logo){
                        this.showLogoUrl = [this.info.activityPictureUrls]
                    }
                }else{
                    let that=this;
                    that.$message("error","获取活动详情失败")
                }
                this.pageLoading = false
            })
        },
        delShopImage(index){
            this.info.activityPictureUrls.splice(index,1);
        },
        saveInfo(){
            if(!this.info.activityPictureUrls && this.shopListUrls.length==0){
                this.$message("warning","必须上传活动图片");
                return
            }
            // if(this.info.shopListUrls.length==0 && this.shopListUrls.length==0){
            //     this.$message("warning","必须上传商标以及商家图片信息")
            //     return
            // }
            this.$refs["editActivityForm"].validate(valid => {
                if (valid) {
                    this.pageLoading = true
                    // const a = this.uploadLogo()
                    const b = this.uploadShopListUrls()
                    const c = Promise.all([b]);
                    let that = this
                    c.then(function(val) {
                        if(val[0]){
                            that.info.activityPictureUrls = val[0]
                        }
                        debugger;
                        console.log('that.activityTime[0]=',that.activityTime[0]);
                        console.log('that.activityTime[1]=',that.activityTime[1]);
                        that.info.activityStartTime=that.activityTime[0];//活动开始时间
                        that.info.activityEndTime=that.activityTime[1];//活动结束时间
                        activityPublish(that.info).then(res=>{
                            if(res.errCode==200){
                                that.dialogInfo.show = false
                                that.$emit("refresh")
                                that.$message("success","保存成功！")
                            }else{
                                that.$message("error","活动图片上传失败，请仔细核对数据以及格式！")
                            }
                            that.pageLoading = false
                        })
                    })
                }else{
                    this.$message("warning","请检查输入项");
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.editActivity{
    .el-row{
        margin: 10px;
    }
    /deep/.el-form-item__label{
        color: black;
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
}
</style>