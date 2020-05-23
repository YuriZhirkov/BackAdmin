<template>
    <div class="editBusiness">
        <el-dialog :visible="dialogInfo.show" width="80%" @close="closeDialog" @open="openDialog"
            :close-on-click-modal="false" title="订单详情">
            <el-form ref="orderInfo" v-loading="pageLoading" label-position="left" label-width="80px" :model="info">
                <el-form-item label="订单id" prop="id">
                    <el-input v-model="info.id" readonly></el-input>
                </el-form-item>

                <el-form-item label="用户真名" prop="nickName">
                    <el-input v-model="info.nickName" readonly></el-input>
                </el-form-item>

                <el-form-item label="电话" prop="phone">
                    <el-input v-model="info.phone" readonly></el-input>
                </el-form-item>

                <el-form-item label="性别" prop="gender">
                    <el-input v-model="info.gender" readonly></el-input>
                </el-form-item>

                <el-form-item label="qq号" prop="qq">
                    <el-input v-model="info.qq" readonly></el-input>
                </el-form-item>

                <el-form-item label="微信号" prop="weChat">
                    <el-input v-model="info.weChat" readonly></el-input>
                </el-form-item>

                <el-form-item label="学历" prop="weeducationalBackgroundChat">
                    <el-input v-model="info.educationalBackground" readonly></el-input>
                </el-form-item>

                <el-form-item label="年龄" prop="age">
                    <el-input v-model="info.age" readonly></el-input>
                </el-form-item>

                <el-form-item label="身高" prop="stature">
                    <el-input v-model="info.stature" readonly></el-input>
                </el-form-item>

                <el-form-item label="结婚状态" prop="marriedStatus">
                    <el-input v-model="info.marriedStatus" readonly></el-input>
                </el-form-item>

                <el-form-item label="居住地" prop="area">
                    <el-input v-model="info.area" readonly></el-input>
                </el-form-item>

                <el-form-item label="行业" prop="industry">
                    <el-input v-model="info.industry" readonly></el-input>
                </el-form-item>

                <el-form-item label="月薪" prop="salary">
                    <el-input v-model="info.salary" readonly></el-input>
                </el-form-item>

                <el-form-item label="支付状态" prop="flag">
                    <el-input v-model="info.flag"></el-input>
                </el-form-item>


               <el-form-item label="商品价格" prop="price">
                    <el-input v-model="info.price" readonly></el-input>
                </el-form-item>

                <el-form-item label="支付时间" prop="createTime">
                    <el-input v-model="info.createTime" readonly></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogInfo.show = false">取 消</el-button>
                <el-button type="primary" @click="payRefund" v-if="info.flag=='已支付'">退 款</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import {payRefund,getOrderById} from "../../api/api"
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
        return {
            pageLoading: false,
            info:{
                id:'',
                nickName:'',
                phone:'',
                gender:'',
                qq:'',
                weChat:'',
                educationalBackground:'',
                age:0,
                stature: 0,
                marriedStatus: '',
                area: '',
                industry: '',
                salary: 0,
                flag: '',
                price: 0.0,
                createTime:''

            },

        
        }
    },
    watch:{
    },
    methods:{
        openDialog(){   
          this.getOrderById()
        },
        closeDialog(){
            this.$refs["orderInfo"].clearValidate();
            this.info.id='',
            this.info.nickName='',
            this.info.phone='',
            this.info.gender='',
            this.info.qq='',
            this.info.weChat='',
            this.info.educationalBackground='',
            this.info.age=0,
            this.info.stature= 0,
            this.info.marriedStatus= '',
            this.info.area= '',
            this.info.industry= '',
            this.info.salary= 0,
            this.info.flag= '',
            this.info.price= 0.0,
            this.info.createTime=''
            this.dialogInfo.show = false
        },
        getOrderById(){
            this.pageLoading = true
            getOrderById({id:this.dialogInfo.id}).then(res=>{
                debugger
                if(res.errCode==200){
                    this.info = res.data;
                    let flag = res.data.flag;
                    if(flag) {
                        if(flag===1){
                            this.info.flag = '已支付'
                        } else if (flag == 2) {
                            this.info.flag = '已退款'
                        } else {
                            this.info.flag = '未支付'
                        }
                    }
                }else{
                    that.$message("error","获取订单详情失败")
                }
                this.pageLoading = false
            })
        },
        payRefund(){
            payRefund({id:this.dialogInfo.id}).then(res=>{
                if(res.errCode==200){
                    this.info.flag = '已退款'
                }else{
                    that.$message("error","退款失败")
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