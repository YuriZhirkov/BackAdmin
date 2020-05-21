<template>
  <div class="orderManager">
    <el-row :gutter="5">
      <el-col :span="10">
        <el-input type="text" v-model="searchQuery.keyWord" placeholder="商圈名称/商圈简介/商圈地址/商圈标签/活动描述/活动标题" clearable />
      </el-col>
      <el-col :span="5">
        <el-date-picker
          v-model="searchQuery.date"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>      
      </el-col>
      <el-col :span="7">
        <el-button type="primary" @click="getList(1)">查询</el-button>
        <el-button @click="reset">重置</el-button>
        <el-button @click="addRow">添加商圈</el-button>
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
        <el-table-column prop="districtName" label="商圈名称"></el-table-column>
        <el-table-column label="商圈图标">
          <template slot-scope="scope">
            <div class="demo-image__preview">
              <el-image 
                style="width: 50px; height: 50px"
                :src="scope.row.logo" 
                :preview-src-list="scope.row.showLogoList">
              </el-image>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="商圈地址" ></el-table-column>
        <el-table-column prop="briefIntroduction" label="商圈简介"></el-table-column>
        <el-table-column prop="labels" label="商圈标签"></el-table-column>
        <el-table-column prop="activityDesc" label="优惠活动" width="100"></el-table-column>
        <el-table-column prop="createTime" label="创建时间" width="160"></el-table-column>
        <el-table-column prop="updateTime" label="更新时间" width="160"></el-table-column>
        <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <el-dropdown>
              <span class="el-dropdown-link">
                操作
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="viewRow(scope.$index, scope.row)">编辑</el-dropdown-item>
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
    <orderInfo :dialogInfo="dialogInfo" @refresh="getList"></orderInfo>
  </div>
</template>
<script>
import {getOrderList} from "../../api/api"
import orderInfo from "./orderInfo";
export default {
  components: {
    orderInfo
  },
  data() {
    return {
      pageLoading: false,
      searchQuery: {
        realName:'',
        phone:'',
        gender:null,
        area:'',
        flag:null,
        price:null,
        type:null,
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
    this.getList()
  },
  methods: {
    getList(val){
      if(val==1){
        this.currPage = 1
      }
      this.pageLoading = true
      let params = {
        keyWord: this.searchQuery.keyWord,
        pageNumber: this.searchQuery.currPage,
        pageSize: this.searchQuery.pageSize
      }
      searchBusinessDistrict(params).then(res=>{
        if(res.errCode == 200){
          if(res.total>0){
            this.total = res.total
            let data = res.data
            data.forEach(item=>{
              item.showLogoList = []
              if(item.logo){
                item.showLogoList.push(item.logo)
              }
            })
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
      this.searchQuery.keyWord = ''
      this.searchQuery.date = []
      this.searchQuery.currPage = 1
      this.searchQuery.pageSize = 10
    },
    delRow(index,row){
        this.$confirm('是否确定删除此条信息', {
            confirmButtonText: '确定',
            cancelButtonText: '取消'
        }).then(() => {
          this.pageLoading = true
          let params = {
            id: row.id
          }
          deleteBusinessDistrict(params).then(res=>{
            this.pageLoading = false
            if(res.errCode == 200){
            this.$message("success",'删除成功！')
            this.getList()
            }else{
            this.$message("error",'删除失败！')
            }
          })
        }).catch(() => {})
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
.orderManager{
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