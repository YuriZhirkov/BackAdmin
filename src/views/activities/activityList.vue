<template>
  <div class="businessManager">
    <el-row :gutter="5">
      <el-col :span="5">
        <el-input type="text" v-model="searchQuery.theme" placeholder="活动主题" clearable />
      </el-col>
      <el-col :span="5">
        <el-input type="text" v-model="searchQuery.address" placeholder="活动地址" clearable />
      </el-col>
      <el-col :span="5">
        <el-date-picker
          v-model="searchQuery.date"
          type="daterange"
          range-separator="至"
          value-format=" yyyy-MM-dd HH:mm:ss" 
          format="yyyy-MM-dd HH:mm:ss"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>      
      </el-col>
      <el-col :span="7">
        <el-button type="primary" @click="getList(1)">查询</el-button>
        <el-button @click="reset">重置</el-button>
        <el-button @click="addRow">添加活动</el-button>
      </el-col>
    </el-row>
    <el-row v-loading="pageLoading">
      <el-table
        :data="dataList"
        show-header
        stripe
        border
        highlight-current-row
        style="width: 100%"
        empty-text="暂无数据"
      >
        <el-table-column type="index" label="序号" width="55"></el-table-column>
        <el-table-column prop="activityTheme" label="活动主题"></el-table-column>
        <el-table-column label="活动图片">
          <template slot-scope="scope">
            <div class="demo-image__preview">
              <el-image 
                style="width: 50px; height: 50px"
                :src="scope.row.activityPictureUrl" 
                :preview-src-list="scope.row.showLogoList">
              </el-image>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="activityAddress" label="活动地址" ></el-table-column>
        <el-table-column prop="activityBriefIntroduction" label="活动简介"></el-table-column>
        <!-- <el-table-column prop="labels" label="商圈标签"></el-table-column> -->
        <el-table-column prop="activityStartTime" label="活动开始时间" width="100"></el-table-column>
        <el-table-column prop="activityEndTime" label="活动结束时间" width="160"></el-table-column>
        <el-table-column prop="isEnable" label="是否结束" width="160"></el-table-column>
        <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <el-dropdown>
              <span class="el-dropdown-link">
                操作
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="delRow(scope.$index, scope.row)">删除</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="searchQuery.currPage"
        :page-sizes="[5, 10, 20, 30, 40]"
        :page-size="searchQuery.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-row>
    <activityAdd :dialogInfo="dialogInfo" @refresh="getList"></activityAdd>
  </div>
</template>
<script>
import {getActivityList,deteleActivity} from "../../api/api"
import activityAdd from "./activityAdd";
export default {
  components: {
    activityAdd
  },
  data() {
    return {
      pageLoading: false,
      searchQuery: {
        theme:'',
        address:'',
        date:[],
        currPage: 1,
        pageSize: 10
      },
      dataList: [],
      total: 0,
      dialogInfo:{
        show: false,
        id: ''
      }
    };
  },
  beforeCreate() {},
  created() {
  },
  computed: {},
  mounted() {
    this.total = 1
    this.getList();
  },
  methods: {
    getList(val){
      if(val==1){
        this.currPage = 1
      }
      this.pageLoading = true
      let params = {
        count: 10,
        offset: 1,
        type: 1,
        userId: "",
        pageNumber: this.searchQuery.currPage,
        pageSize: this.searchQuery.pageSize
      }
      getActivityList(params).then(res=>{
        if(res.errCode == 200){
            // console.log("看看",res);
          if(res.total>0){
            this.total = res.total
            let data = res.data
            data.forEach(item=>{
              item.showLogoList = []
              if(item.activityPictureUrl){
                item.showLogoList.push(item.activityPictureUrl);
              }
               //处理是否结束
               item.isEnable=(item.isEnable==1?'进行中':'已结束');  
             
            })
           console.log(data);
            this.dataList = data
          }else{
            this.total = 0
            this.dataList = []
          }
        }else{
          this.$message("error",res.errMsg)
        }
        this.pageLoading =false
      })
    },
    reset(){
      this.searchQuery.theme = '',
      this.searchQuery.address='',
      this.searchQuery.date = []
      this.searchQuery.currPage = 1
      this.searchQuery.pageSize = 10
    },
    delRow(index,row){
        let params = {
            id: row.id,
            userId:sessionStorage.getItem("userId")
          }
          deteleActivity(params).then(res=>{
            this.pageLoading = false
            if(res.errCode == 200){
            this.$message("success",'删除成功！')
            this.getList()
            }else{
            this.$message("error",'删除失败！')
            }
          })
    },
    viewRow(index,row){
      this.dialogInfo.id = row.id
      this.dialogInfo.show = true
    },
    addRow(){
      this.dialogInfo.id = null
      this.dialogInfo.show = true
    },
    handleSizeChange(pageSize) {
      this.currPage = 1;
      this.pageSize = pageSize;
      this.getList();
    },
    handleCurrentChange(page) {
      this.currPage = page;
      this.getList();
    }
  }
};
</script>
<style lang="scss" scoped>
.businessManager{
  padding: 20px;
  text-align: left;
  /deep/.el-row {
    margin: 10px 0;
  }
  /deep/.el-date-editor--daterange.el-input,
  .el-date-editor--daterange.el-input__inner,
  .el-date-editor--timerange.el-input,
  .el-date-editor--timerange.el-input__inner {
    width: 100%;
  }
  /deep/.el-select {
    width: 100%;
  }
  .alignRight {
    text-align: right;
  }
}
</style>