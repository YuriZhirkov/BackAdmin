<template>
  <div class="businessManager">
    <el-row :gutter="5">
      <el-col :span="3">
        <el-input type="text" v-model="searchQuery.name" placeholder="商圈名称" clearable />
      </el-col>
      <el-col :span="3">
        <el-input type="text" v-model="searchQuery.address" placeholder="商圈地址" clearable />
      </el-col>
      <el-col :span="3">
        <el-input type="text" v-model="searchQuery.desc" placeholder="简介" clearable />
      </el-col>
      <el-col :span="3">
        <el-input type="text" v-model="searchQuery.tag" placeholder="商圈标签" clearable />
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
        <el-table-column prop="logo" label="商圈图标"></el-table-column>
        <el-table-column prop="address" label="商圈地址" ></el-table-column>
        <el-table-column prop="desc" label="商圈简介"></el-table-column>
        <el-table-column prop="tag" label="商圈标签"></el-table-column>
        <el-table-column prop="activity" label="优惠活动" width="100"></el-table-column>
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
                <el-dropdown-item @click.native="delRow(scope.$index, scope.row)">删除</el-dropdown-item>
                <el-dropdown-item @click.native="viewRow(scope.$index, scope.row)">查看</el-dropdown-item>
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
    <editBusiness :dialogInfo="dialogInfo"></editBusiness>
  </div>
</template>
<script>
import {searchBusinessDistrict} from "../../api/api"
import editBusiness from "./editBusiness";
export default {
  components: {
    editBusiness
  },
  data() {
    return {
      pageLoading: false,
      searchQuery: {
        name:'',
        address:'',
        desc:'',
        tag:'',
        date:[],
        currPage: 1,
        pageSize: 10
      },
      dataList: [],
      total: 0,
      dialogInfo:{
        show: false,
        info: {}
      }
    };
  },
  beforeCreate() {},
  created() {
  },
  computed: {},
  mounted() {
    // let item = {id:1,name:'rxy',icon:'123',address:'123',desc:'zhangzhiguo',tag:'3344',activity:'0.8',createTime:'2020-02-01 12:32:15',updateTime:'2020-04-01 01:22:05'}
    // this.dataList.push(item)
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
        pageNumber: this.searchQuery.currPage,
        pageSize: this.searchQuery.pageSize
      }
      searchBusinessDistrict(params).then(res=>{
        if(res.errCode){
          this.total = res.total
          this.dataList = res.data
        }else{
          this.$message("error",res.errMsg)
        }
      })
      this.pageLoading =false
    },
    reset(){
      this.searchQuery.name = ''
      this.searchQuery.address = ''
      this.searchQuery.desc = ''
      this.searchQuery.tag = ''
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
        this.pageLoading = false
        this.$message("success",'删除成功！')
      }).catch(() => {
      })
    },
    viewRow(index,row){
      this.dialogInfo.info = row
      this.dialogInfo.show = true
    },
    addRow(){
      this.dialogInfo.info = null
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