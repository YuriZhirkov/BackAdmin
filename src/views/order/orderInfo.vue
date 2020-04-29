<template>
    <div class="editBusiness">
        <el-dialog :visible="dialogInfo.show" width="50%" @close="closeDialog" @open="openDialog"
            :close-on-click-modal="true" :title="title">
            <el-form ref="editBusinessForm" label-position="left" label-width="80px" :rules="rules" :model="info">
                <el-form-item label="商圈名称" prop="name">
                    <el-input v-model="info.name"></el-input>
                </el-form-item>
                <el-form-item label="商圈简介" prop="desc">
                    <el-input v-model="info.desc"></el-input>
                </el-form-item>
                <el-form-item label="商圈图标" prop="icon">
                    <el-upload
                    class="avatar-uploader"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload">
                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>                
                </el-form-item>
                <el-form-item label="商圈地址" prop="address">
                    <el-input v-model="info.address"></el-input>
                </el-form-item>
                <el-form-item label="商家照片" prop="pic">
                    <el-upload
                    class="avatar-uploader"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload">
                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>               
                </el-form-item>
                <el-form-item label="商圈标签" prop="tag">
                    <el-input v-model="info.tag"></el-input>
                </el-form-item>
                <el-form-item label="优惠活动说明" prop="activity">
                    <el-input v-model="info.activityDesc"></el-input>
                </el-form-item>
                <el-form-item label="优惠标题" prop="title">
                    <el-input v-model="info.title"></el-input>
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
import {addOrUpdate} from "../../api/api"
export default {
    props:{
        dialogInfo:{
            type: Object,
            default: function(){
                return {
                    show: false,
                    info: {}
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
            info:{
                activityDesc:"",
                activityTitle: "",
                address: "",
                briefIntroduction: "",
                districtName: "",
                flag: "",
                id: "",
                labels: "",
                logo: "",
                shopListUrls: []
            },
            rules:{
                name: [
                    { required: true, message: "必填", trigger: "blur" },
                    { validator: validateString, trigger: "blur" }
                ],
                address: [
                    { required: true, message: "必填", trigger: "blur" },
                    { validator: validateString, trigger: "blur" }
                ]
            },
        }
    },
    watch:{
    },
    methods:{
        openDialog(){
            if(this.dialogInfo.info){
                this.info.activityDesc = this.dialogInfo.activityDesc
                this.info.activityTitle = this.dialogInfo.activityTitle
                this.info.address = this.dialogInfo.address
                this.info.briefIntroduction = this.dialogInfo.briefIntroduction
                this.info.districtName = this.dialogInfo.districtName
                this.info.flag = this.dialogInfo.flag
                this.info.id = this.dialogInfo.id
                this.info.labels = this.dialogInfo.labels
                this.info.logo = this.dialogInfo.logo
                this.info.shopListUrls = this.dialogInfo.shopListUrls
            }
            if(this.info.id){
                this.title = "编辑商圈信息"
            }else{
                this.title = "添加商圈信息"
            }
        },
        closeDialog(){
            this.$refs["editBusinessForm"].clearValidate();
            this.dialogInfo.show = false
        },
        saveInfo(){
            this.$refs["editBusinessForm"].validate(valid => {
                if (valid) {
                    addOrUpdate(this.info).then(res=>{

                    })
                }else{
                    this.$message.info("请检查输入项");
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
}
</style>