<template>
  <div class="orderManager">
    <el-row :gutter="5">
      <el-col :span="3">
        <el-input type="text" v-model="searchQuery.realName" placeholder="用户真实名字" clearable />
      </el-col>
      <el-col :span="3">
        <el-input type="text" v-model="searchQuery.phone" placeholder="用户电话" clearable />
      </el-col>

      <el-col :span="3">
          <el-select v-model="searchQuery.gender" placeholder="性别">
              <el-option  v-for="item in genders"   :key="item.value"  :label="item.label"  :value="item.value">
              </el-option>
          </el-select>
      </el-col>

      <el-col :span="3">
        <el-input type="text" v-model="searchQuery.area" placeholder="用户居住地" clearable />
      </el-col>

      <el-col :span="2">
          <el-select v-model="searchQuery.flag" placeholder="支付状态">
              <el-option  v-for="item in flags"   :key="item.value"  :label="item.label"  :value="item.value">
              </el-option>
          </el-select>
      </el-col>

      <el-col :span="2">
        <el-input type="text" v-model="searchQuery.price" placeholder="支付金额" clearable />
      </el-col>
      
    </el-row>

    <el-row :gutter="5">

      <el-col :span="3">
          <el-select v-model="searchQuery.type" placeholder="商品类型">
              <el-option  v-for="item in types"   :key="item.value"  :label="item.label"  :value="item.value">
              </el-option>
          </el-select>
      </el-col>
      <el-col :span="7">
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
        <el-table-column prop="area" label="地区"></el-table-column>
        <el-table-column prop="price" label="金额" width="100"></el-table-column>
        <el-table-column prop="flag" :formatter = "setFlag" label="支付状态"></el-table-column>
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
                <el-dropdown-item @click.native="viewRow(scope.$index, scope.row)">详情</el-dropdown-item>
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
        area:'',
        gender:'',
        flag:null,
        price:null,
        type:null,
        date:[],
        currPage: 1,
        pageSize: 10
      },
      genders: [{
          value: '男',
          label: '男'
        }, {
          value: '女',
          label: '女'
      }],
      flags: [{
          value: 1,
          label: '已支付'
        }, {
          value: 2,
          label: '已退款'
        },{
          value: 0,
          label: '未支付'
        }
      ],
      types: [{
          value: 1,
          label: '会员'
        }, {
          value: 2,
          label: '红娘'
        },{
          value: 3,
          label: '活动'
        }
      ],
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
    setFlag(row, column) {
      if (row.flag === 2) { 
        return '已退款'
      } else if (row.flag === 1) {
        return '已支付'　　
      } else {
        return '未支付'
      }
    },
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
        gender: this.gender,
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
        debugger;
        if(res.errCode == 200){
          let data = res.data;
          if(data.total>0){
            this.total = data.total
            let dataRet = data.list
            this.dataList = dataRet
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