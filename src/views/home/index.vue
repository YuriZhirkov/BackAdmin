<template>
  <div class="home">
    <el-row :gutter="40">
      <el-col :lg="6" :sm="12">
        <div class="grid-content bg-white">
          <el-row>
            <el-col :span="12">
              <div class="grid-content">
                <div class="icons">
                  <i class="iconfont icon-yonghu"></i>
                </div>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content">
                <ul class="icons-right">
                  <li class="chain">用户</li>
                  <li>
                     <span> {{userNum}}</span>
                  </li>
                </ul>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-col>
      <el-col :lg="6" :sm="12">
        <div class="grid-content bg-white">
          <el-row>
            <el-col :span="12">
              <div class="grid-content">
                <div class="icons icons1">
                  <i class="iconfont icon-yonghu"></i>
                </div>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content">
                <ul class="icons-right">
                  <li class="chain">会员</li>
                  <li>
                      <span> {{userNumMember}}</span>
                   </li>
                </ul>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-col>
      <el-col :lg="6" :sm="12">
        <div class="grid-content bg-white">
          <el-row>
            <el-col :span="12">
              <div class="grid-content">
                <div class="icons icons2">
                  <i class="iconfont icon-liuliang"></i>
                </div>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content">
                <ul class="icons-right">
                  <li class="chain">今日访问</li>
                  <li>
                    <span> {{userNumOnLine}}</span>
                  </li>
                </ul>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-col>
    </el-row >
    <el-row :gutter="40" class="userListRow"> 
      <span class="userList">用户列表</span>
    </el-row>
    <el-row :gutter="40">
      <el-table
    :data="tableData"
    border
    style="width: 100%">
    <el-table-column
      fixed
      prop="userId"
      label="id"
      width="150">
    </el-table-column>
    <el-table-column
      prop="userNum"
      label="编号"
      width="120">
    </el-table-column>
    <el-table-column
      prop="nickName"
      label="昵称"
      width="120">
    </el-table-column>
    <el-table-column
      prop="area"
      label="居住地"
      width="120">
    </el-table-column>
    <el-table-column
      prop="age"
      label="年纪"
      width="300">
    </el-table-column>
    <el-table-column
      prop="salary"
      label="月薪"
      width="120">
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      width="100">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
        <el-button type="text" size="small">编辑</el-button>
      </template>
    </el-table-column>
  </el-table>
    </el-row>
    <el-row :gutter="40" class="userListPagination">
       <el-pagination background layout="prev, pager, next" :total="1000">
       </el-pagination>
    </el-row>
  </div>
</template>
<script>
import { userStatistics,baseInfoZXing } from "@api";
export default {
  name: "home",
  data() {
    return {
      userNum:0,
      userNumOnLine:0,
      userNumMember:0,
       tableData: []
      
    };
  },
  mounted() {
    let that=this;
    that.statistics();
    that.baseInfoZXing();
  },
  destroyed(){
    window.onresize=null
  },
  methods: {
    statistics(){
       let that=this;
       userStatistics().then(res => {
          if(res.errCode==200){
                let backUserStatisticsOutput = res.data;
                that.userNum = backUserStatisticsOutput.userNum;
                that.userNumOnLine = backUserStatisticsOutput.userNumOnLine;
                that.userNumMember = backUserStatisticsOutput.userNumMember;
          } else{
                that.$message('error',res.errMsg);
          }
        }).catch(err => {
              this.$message("error", err.errMsg);
        });
    },

    baseInfoZXing(){
       console.info("进入了...")
       let that=this;
       let params = {};
       params.pageNumber = 1;
       params.pageSize = 10;
       baseInfoZXing(params).then(res => {
          console.info("请求数据...")
          if(res.errCode==200){
              this.tableData = res.data;
          } else{
              that.$message('error',res.errMsg);
          }
        }).catch(err => {
              this.$message("error", err.errMsg);
        });
    }
  }
};
</script>
<style lang="scss" scoped>
.home {
  padding: 40px;
  background: $base-gray1;  
  .userList{
    font-size: 18px;
  }
  .userListPagination{
    margin-top: 20px
  }
  .userListRow{
    margin-bottom: 20px
  }
  .bg-white {
    background: $base-white;
    -webkit-box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
    box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
    border-color: rgba(0, 0, 0, 0.05);
    margin-bottom: 20px;
    cursor: pointer;
    .icons {
      text-align: left;
      width: 86px;
      height: 86px;
      margin: 10px;
      padding: 13px;
      transition: 0.3s ease-in-out;
      border-radius: 3px;
      &:hover {
        background: $base-bule1;
        .icon-yonghu {
          color: $base-white;
        }
      }
      .iconfont {
        font-size: 60px;
      }
      .icon-yonghu {
        font-size: 60px;
        color: $base-bule1;
      }
    }
    .icons1 {
      &:hover {
        background: $base-ye;
        .icon-xiaoxi {
          color: $base-white;
        }
      }
      .icon-xiaoxi {
        color: $base-ye;
      }
    }
    .icons2 {
      &:hover {
        background: $base-green;
        .icon-liuliang {
          color: $base-white;
        }
      }
      .icon-liuliang {
        color: $base-green;
      }
    }
    .icons3 {
      &:hover {
        background: $base-pink;
        .icon-yanjing {
          color: $base-white;
        }
      }
      .icon-yanjing {
        color: $base-pink;
      }
    }
    .icons-right {
      font-size: 24px;
      margin-top: 16px;
      margin-right: 16px;
      li {
        margin: 10px 0;
      }
    }
    .chain {
      color: rgba(0, 0, 0, 0.45);
      font-size: 18px;
    }
  }

}
</style>

