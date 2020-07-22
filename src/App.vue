<template>
                <router-view></router-view>
</template>
<script>
export default {
  data(){
    return{
      isCollapse:false,
      isLeft:true,
    }
  },
  mounted(){
    window.onresize = () => {
      return (() => {
          this.screenWidth = document.body.clientWidth;
          if(this.screenWidth < 1024){
            this.isLeft = false
          }else{
            this.isLeft = true
          }
        })();
      };
    }
  
}
</script>
<style lang="less">
*{
        padding:0;
        margin:0;
    }
    .el-aside{
      width: 250px!important;
    }
    .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 240px;
        min-height: 800px;
    }
    .el-header {
        padding: 0px!important;
        background: #409EFF;
        color: #ffffff;
        .info{
            font-size:30px;
            line-height: 60px;
        }
        .logo {
            text-align:center;
            width: 240px;
            font-size: 25px;
            line-height: 60px;
            border-right: 1px solid rgba(238, 241, 146, 0.3);
        }
        .adminInfo {
            float: right;
            text-align: right;
            padding-right: 20px;
            line-height: 60px;
            .el-dropdown-link {
                span {
                    color: #fff;
                }
                img {
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    vertical-align: middle;
                }
            }
        }
    }
    .toolbar {
        background:#f4f4f4;
        padding:10px;
        margin:20px 0!important;
    }
    .el-table th,.el-table td{
        text-align:center!important;
    }
    .toolbar .el-form-item{
        margin-bottom:0px;
    }
</style>
