<template>
  <div class="pics">
     <el-button type="primary" @click="visible=true">发图片</el-button>
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
      label="图片名"
      width="200">
      <template slot-scope="scope">
         <span style="margin-left: 10px">{{ scope.row.title }}</span>
      </template>
    </el-table-column>
     <el-table-column
      label="拍摄地点"
      width="200">
      <template slot-scope="scope">
         <span style="margin-left: 10px">{{ scope.row.place }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="图片">
      <template slot-scope="scope">
         <span style="margin-left: 10px"><img style="width:200px" :src="scope.row.picurl" alt=""></span>
      </template>
    </el-table-column>
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
 <PicDialog v-if="visible"  :visible.sync="visible" :edit.sync="edit" :id.sync="id" ></PicDialog>
  </div>
</template>

<script>
import PicDialog from '../components/PicDialog'
import {getPic,deleteOne} from '../api/index'

export default {
  name: 'pics',
  components:{
    PicDialog,
  },
   data() {
      return {
        visible:false,
        tableData: [],
        currentPage:1,
        pageSize:3,
        total:100,
        edit:false,
        id:null,
      }
   },
   
   created(){
     this.getPic()
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
     getPic(){
       getPic({
        currentPage:this.currentPage,
        pageSize:this.pageSize
      }).then(res => {
        this.tableData = res.data.data;
        this.total = res.data.total
      });
     },
     handleCurrentChange(val){
      this.currentPage = val
      this.getPic()
    },
     handleDelete(index,row){
        this.$confirm('此操作将永久删除该笔记, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteOne({listName:'picList',id:row._id}).then(res => {
         if(res.data.ok === 1){
           this.$message({
              message: '删除成功',
              type: 'success'
           })
           this.getPic()
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
.pics_content{
  img{
    display: none
  }
}
</style>
