<template>
  <div class="home">
     <el-button type="primary" @click="visible=true">写笔记</el-button>
      <el-table
    :data="tableData"
    style="width: 100%">
    <el-table-column
      label="日期"
      width="200">
      <template slot-scope="scope">
        <i class="el-icon-time"></i>
        <span style="margin-left: 10px">{{ scope.row.date | timeFilter }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="最后修改"
      width="200">
      <template slot-scope="scope">
        <i class="el-icon-time"></i>
        <span style="margin-left: 10px">{{ scope.row.updateDate | timeFilter}}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="标题">
      <template slot-scope="scope">
         <span style="margin-left: 10px">{{ scope.row.title }}</span>
      </template>
    </el-table-column>
     <!-- <el-table-column
     :show-overflow-tooltip="true"
      label="内容">
      <template slot-scope="scope">
        <span style="margin-left: 10px" class="home_content" v-html="scope.row.content"></span>
      </template>
    </el-table-column> -->
    <el-table-column label="操作" width="300">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
     
  </el-table>
  <el-pagination
      style="float:right"
      background
      :pager-count="5"
      layout="prev, pager, next"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-size="pageSize"
      :total="total">
    </el-pagination>
 <Dialog v-if="visible"  :visible.sync="visible" :edit.sync="edit" :id.sync="id" ></Dialog>
  </div>
</template>

<script>
import Dialog from '../components/Dialog'
import {getDailyTitle,deleteOne} from '../api/index'

export default {
  name: 'docs',
  components:{
    Dialog,
  },
   data() {
      return {
        visible:false,
        tableData: [],
        currentPage:1,
        pageSize:10,
        total:100,
        edit:false,
        id:null,
      }
   },
   
   created(){
     this.getDaily()
   },
   filters:{
     timeFilter(val){
       if(val){
         var time = new Date(val);
        var y = time.getFullYear();
        var m = time.getMonth()+1;
        var d = time.getDate();
        var h = time.getHours();
        var mm = time.getMinutes();
        var s = time.getSeconds();
        return y+'-'+(m<10?'0'+m:m)+'-'+(d<10?'0'+d:d)+' '+(h<10?'0'+h:h)+':'+(mm<10?'0'+mm:mm)+':'+(s<10?'0'+s:s);
       }else{
         return '-'
       }
        
     }
   },
   methods:{
     handleEdit(row){
       this.id = row._id
       this.edit = true
       this.visible = true
     },
     getDaily(){
       getDailyTitle({
        currentPage:this.currentPage,
        pageSize:this.pageSize
      }).then(res => {
        this.tableData = res.data.data;
        this.total = res.data.total
      });
     },
     handleCurrentChange(val){
      this.currentPage = val
      this.getDaily()
    },
     handleDelete(index,row){
        this.$confirm('此操作将永久删除该笔记, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteOne({listName:'dailyList',id:row._id}).then(res => {
         if(res.data.ok === 1){
           this.$message({
              message: '删除成功',
              type: 'success'
           })
           this.getDaily()
         }
       })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
       
     }
   }
}
</script>
<style lang="less" >
.home_content{
  img{
    display: none
  }
}
</style>
