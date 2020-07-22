<template>
  <el-container>
        <el-header>
          <el-menu :collapse-transition="false"  mode="horizontal" :router="true" :default-active="$route.path" class="el-menu-demo"  v-show="!isLeft">
                        <el-menu-item index="/">笔记管理</el-menu-item>
                        <el-menu-item index="/adminList">管理员列表</el-menu-item>
                        <el-menu-item index="/changePassWord">修改密码</el-menu-item>
                </el-menu>
            <el-row v-show="isLeft">
                <el-col class="logo" :span="8" >
                    <strong>{{isCollapse?'高':'小屋后台'}}</strong>
                </el-col>
                <el-col :span="8" class="adminInfo">
                    <el-dropdown trigger="click">
                        <span class="el-dropdown-link" @click="logout">
                            <span></span> <img src="../assets/logo.png" alt="">
                        </span>
                        <el-dropdown-menu  slot="dropdown">
                            <el-dropdown-item >退出登</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </el-col>
            </el-row>
        </el-header>
        <el-container>
            <el-aside v-show="isLeft">
                <el-menu :collapse-transition="false" :router="true" :default-active="$route.path" class="el-menu-vertical-demo" >
                        <el-menu-item index="/docs">日志管理</el-menu-item>
                        <el-menu-item index="/pics">图片管理</el-menu-item>
                        <el-menu-item index="/videos">视频管理</el-menu-item>
                </el-menu>
            </el-aside>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>
<script>
export default {
  data(){
    return{
      isCollapse:false,
      isLeft:true,
    }
  },
  methods:{
    logout(){
      console.log(123)
      this.$cookies.remove('token')
      sessionStorage.removeItem('token')
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
