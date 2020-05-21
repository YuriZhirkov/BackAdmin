<template>
    <div class="editBusiness">
        <el-dialog :visible="dialogInfo.show" width="80%" @close="closeDialog" @open="openDialog"
            :close-on-click-modal="false" :title="title">
            <el-form ref="editBusinessForm" v-loading="pageLoading" label-position="left" label-width="80px" :rules="rules" :model="info">
                <el-form-item label="商圈名称" prop="districtName">
                    <el-input v-model="info.districtName"></el-input>
                </el-form-item>
                <el-form-item label="商圈简介" prop="briefIntroduction">
                    <el-input v-model="info.briefIntroduction"></el-input>
                </el-form-item>
                <el-form-item label="商圈图标" prop="logo">
                    <template v-if="info.logo">
                        <div class="demo-image__preview">
                            <el-image class="logoPanel"
                                style="width: 150px; height: 150px"
                                :src="info.logo" 
                                :preview-src-list="showLogoUrl">
                            </el-image>
                        </div>
                        <div class="delImg" @click="info.logo=''"><i class="el-icon-delete"></i></div>
                    </template>
                    <el-upload v-show="!info.logo" ref="uploadLogoForm" class='upload-demo' :multiple='false' :auto-upload='false' list-type='picture-card' :show-file-list='true'
                        :before-upload="beforeUpload" :drag='true' action='aaa' :limit="1" :on-exceed="handleLogo"
                        :on-change="getLogoFileList" :on-remove="getLogoFileList"
                        :http-request="uploadLogo" accept=".jpg,.png,.jpeg" :file-list="logoUrl">
                        <i class="el-icon-upload"></i>
                    </el-upload>      
                </el-form-item>
                <el-form-item label="商圈地址" prop="address">
                    <el-input v-model="info.address"></el-input>
                </el-form-item>
                <el-form-item label="商家照片" prop="logo">
                    <template v-show="info.shopListUrls.length>0">
                        <div class="imageList" v-for="(item,index) in info.shopListUrls" :key="index">
                            <el-image 
                                style="width: 150px; height: 150px"
                                :src="item" 
                                :preview-src-list="info.shopListUrls">
                            </el-image>
                            <div class="delImg" @click="delShopImage(index)"><i class="el-icon-delete"></i></div>
                        </div>
                    </template>
                    <el-upload v-show="6-info.shopListUrls.length>0" ref="uploadShopListUrlsForm" class='image-uploader' :multiple='true' :auto-upload='false' list-type='picture-card' :show-file-list='true'
                        :before-upload="beforeUpload" :drag='true' action='aaa' :limit="6-info.shopListUrls.length" :on-exceed="handleLogo"
                        :on-change="getShopListUrls" :on-remove="getShopListUrls"
                        :http-request="uploadShopListUrls" accept=".jpg,.png,.jpeg" :file-list="shopListUrls">
                        <i class="el-icon-upload"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="商圈标签" prop="labels">
                    <el-input v-model="info.labels"></el-input>
                </el-form-item>
                <el-form-item label="优惠活动说明" prop="activityDesc">
                    <el-input v-model="info.activityDesc"></el-input>
                </el-form-item>
                <el-form-item label="优惠标题" prop="activityTitle">
                    <el-input v-model="info.activityTitle"></el-input>
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
import {addOrUpdate,getBusinessDistrictById} from "../../api/api"
export default {
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
        const validateString = (rule, value, callback) => {
            if (value.split(" ").join("").length == 0) {
                callback(new Error("不允许输入空字符"));
            } else {
                callback();
            }
        };
        return {
            title: '编辑商圈信息',
            pageLoading: false,
            info:{
                activityDesc:'',//string 优惠活动说明 非必填
                activityTitle:'',//string 优惠标题 非必填
                address:'',//string 商圈地址 必填
                briefIntroduction:'',//	string 商圈简介 必填
                districtName:'',//string 商圈名字 必填
                flag:'',//string1 优惠广场 2. xxx 非必填
                id:'',//string约会商圈id 添加不需要 更新需要 非必填
                labels:'',//string 商圈的标签比如: 逛吃圣地;大众品牌 必填
                logo:'',//string 商圈图标 必填
                shopListUrls:[]
            },
            showLogoUrl :[],
            logoUrl: [],
            shopListUrls: [],
            rules:{
                districtName: [
                    { required: true, message: "必填", trigger: "blur" },
                    { validator: validateString, trigger: "blur" }
                ],
                briefIntroduction: [
                    { required: true, message: "必填", trigger: "blur" },
                    { validator: validateString, trigger: "blur" }
                ],
                activityDesc: [
                    { required: true, message: "必填", trigger: "blur" },
                    { validator: validateString, trigger: "blur" }
                ],
                activityTitle: [
                    { required: true, message: "必填", trigger: "blur" },
                    { validator: validateString, trigger: "blur" }
                ],
                address: [
                    { required: true, message: "必填", trigger: "blur" },
                    { validator: validateString, trigger: "blur" }
                ],
                labels: [
                    { required: true, message: "必填", trigger: "blur" },
                    { validator: validateString, trigger: "blur" }
                ]
            },
        }
    },
    watch:{
    },
    methods:{
        getLogoFileList(file, fileList){
            this.logoUrl = fileList
        },
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
            this.$message.warning(`当前限制选择 1 个文件，请删除后继续上传`)
        },
        clearLogoAllitems(){
            this.logoUrl = []
            this.$refs.uploadLogoForm.clearFiles()
            this.$refs.uploadLogoForm.value=""
        },
        clearShopUrlAllitems(){
            this.shopListUrls = []
            this.$refs.uploadShopListUrlsForm.clearFiles()
            this.$refs.uploadShopListUrlsForm.value=""
        },
        uploadLogo(){
            if(this.logoUrl.length==0){
                return ''
            }
            let that = this
            return new Promise(function(resolve) {
                let file = that.logoUrl[0].raw
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
                        that.$message("error","商圈图标文件上传失败，请仔细核对数据以及格式！")
                        return ;
                    }
                })
            })
        },
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
                this.getBusinessDistrictById()
                this.title = "编辑商圈信息"
            }else{
                this.title = "添加商圈信息"
            }
        },
        closeDialog(){
            this.showLogoUrl = []
            this.$refs["editBusinessForm"].clearValidate();
            this.clearLogoAllitems()
            this.clearShopUrlAllitems()
            this.showLogoUrl = []
            this.info.activityDesc =''//string 优惠活动说明 非必填
            this.info.activityTitle =''//string 优惠标题 非必填
            this.info.address =''//string 商圈地址 必填
            this.info.briefIntroduction =''//	string 商圈简介 必填
            this.info.districtName =''//string 商圈名字 必填
            this.info.flag =''//string1 优惠广场 2. xxx 非必填
            this.info.id =''//string约会商圈id 添加不需要 更新需要 非必填
            this.info.labels =''//string 商圈的标签比如 = 逛圣地;大众品牌 必填
            this.info.logo =''//string 商圈图标 必填
            this.info.shopListUrls =[]
            this.dialogInfo.show = false
        },
        getBusinessDistrictById(){
            this.pageLoading = true
            getBusinessDistrictById({id:this.dialogInfo.id}).then(res=>{
                if(res.errCode==200){
                    this.info = res.data
                    if(this.info.logo){
                        this.showLogoUrl = [this.info.logo]
                    }
                }else{
                    that.$message("error","获取商圈详情失败")
                }
                this.pageLoading = false
            })
        },
        delShopImage(index){
            this.info.shopListUrls.splice(index,1);
        },
        saveInfo(){
            if(!this.info.logo && this.logoUrl.length==0){
                this.$message("warning","必须上传商标以及商家图片信息")
                return
            }
            if(this.info.shopListUrls.length==0 && this.shopListUrls.length==0){
                this.$message("warning","必须上传商标以及商家图片信息")
                return
            }
            this.$refs["editBusinessForm"].validate(valid => {
                if (valid) {
                    this.pageLoading = true
                    const a = this.uploadLogo()
                    const b = this.uploadShopListUrls()
                    const c = Promise.all([a, b])
                    let that = this
                    c.then(function(val) {
                        if(val[0]){
                            that.info.logo = val[0]
                        }
                        that.info.shopListUrls = that.info.shopListUrls.concat(val[1])
                        addOrUpdate(that.info).then(res=>{
                            if(res.errCode==200){
                                that.dialogInfo.show = false
                                that.$emit("refresh")
                                that.$message("success","保存商圈成功！")
                            }else{
                                that.$message("error","商家图标文件上传失败，请仔细核对数据以及格式！")
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
.editBusiness{
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