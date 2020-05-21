<template>
  <div class="orderManager">
    <el-row :gutter="5">
      <el-col :span="3">
        <el-input type="text" v-model="searchQuery.realName" placeholder="用户真实名字" clearable />
      </el-col>
      <el-col :span="3">
        <el-input type="text" v-model="searchQuery.phone" placeholder="用户电话" clearable />
      </el-col>
      <el-col :span="4">
        <el-input type="text" v-model="searchQuery.area" placeholder="用户居住地" clearable />
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
        <el-table-column prop="id" label="订单号"></el-table-column>
        <el-table-column prop="nickName" label="姓名"></el-table-column>
        <el-table-column prop="phone" label="手机" ></el-table-column>
        <el-table-column prop="gender" label="性别"></el-table-column>
        <el-table-column prop="qq" label="qq号"></el-table-column>
        <el-table-column prop="weChat" label="微信号" width="100"></el-table-column>
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
      let beginDate = null;
      let endDate = null;
      if(!!this.searchQuery.data) {
         beginDate = this.searchQuery.date[0];
         endDate = this.searchQuery.date[1];
      }
      let params = {
        realName: this.searchQuery.realName,
        phone: this.searchQuery.phone,
        gender: this.searchQuery.gender,
        area: this.searchQuery.area,
        flag: this.searchQuery.flag,
        price: this.searchQuery.price,
        type: this.searchQuery.type,
        endDate: endDate,
        endDate: endDate,
        pageNumber: this.searchQuery.currPage,
        pageSize: this.searchQuery.pageSize
      }
      getOrderList(params).then(res=>{
        if(res.errCode == 200){
          if(res.total>0){
            this.total = res.total
            let data = res.data
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
      this.searchQuery.realName = ''
      this.searchQuery.phone = ''
      this.searchQuery.gender = null
      this.searchQuery.area = ''
      this.searchQuery.flag = null
      this.searchQuery.price = null
      this.searchQuery.type = null
      this.searchQuery.date = []
      this.searchQuery.currPage = 1
      this.searchQuery.pageSize = 10
    },
    viewRow(index,row){
      this.dialogInfo.id = row.id
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