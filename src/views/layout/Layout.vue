<template>
  <div>
    <el-container>
      <el-header>
        <div class="logo"><b>LOGO</b></div>
        <div>
          <div class="point" @click="fullScreen">
            <i class="el-icon-full-screen"></i>
          </div>
          <el-dropdown @command="lang">
            <span class="el-dropdown-link">{{ $t(`header.HeadMenu.lang`) }}</span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="zh_CN">简体中文</el-dropdown-item>
              <el-dropdown-item command="en_US">English</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <el-dropdown @command="loginOut">
          <span class="el-dropdown-link">
            {{ $t(`header.HeadMenu.${getTimes()}`) }},{{userName}}<i
            class="el-icon-arrow-down el-icon&#45;&#45;right"></i>
          </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="loginOut">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-header>
      <el-container>
        <el-aside width="150px" class="nav-box" style="background-color:rgb(45,44,42)">
          <el-menu class="el-menu-vertical-demo" :default-active="$route.path"
                   style="width:150px;overflow: hidden;"
                   :default-openeds="[$route.path.split('/')[1]]" router
                   unique-opened
                   background-color="rgb(45,44,42)" text-color="#f1f1f1"
                   active-text-color="rgb(233,193,142)">
            <template v-for="item of menuData">
              <el-submenu :index="item.name" v-if="item.name" :key="item.name">
                <template slot="title">
                  <i :class="item.icon"></i>
                  <span>{{$t(`routerName.${item.name}`) }}</span>
                </template>
                <template v-for="item_c of item.children">
                  <el-menu-item :index="`/${item.name}/${item_c.name}`" :key="item_c.name">
                    {{$t(`routerName.${item_c.name}`) }}
                  </el-menu-item>
                </template>
              </el-submenu>
              <el-menu-item v-else :index="`/${item.children[0].name}`" :key="item.children[0].name">
                <i :class="item.icon"></i>
                <span slot="title">{{$t(`routerName.${item.children[0].name}`) }}</span>
              </el-menu-item>
            </template>
          </el-menu>
        </el-aside>
        <el-container :style="{background:'rgb(247,243,235)'}">
          <el-breadcrumb :style="{padding:'20px'}" separator="/">
            <el-breadcrumb-item>{{ $t(`routerName.Home`) }}</el-breadcrumb-item>
            <template v-if="$route.path.split('/').length>2">
              <el-breadcrumb-item>{{ $t(`routerName.${$route.path.split('/')[1]}`) }}</el-breadcrumb-item>
              <el-breadcrumb-item>{{ $t(`routerName.${$route.path.split('/')[2]}`) }}</el-breadcrumb-item>
            </template>
          </el-breadcrumb>
          <el-main :style="{background: '#fff',margin:' 0 20px'}">
            <transition name="main" mode="out-in" enter-active-class="animated bounceIn"
                        leave-active-class="animated bounceOut" :duration="200">
              <router-view/>
            </transition>
          </el-main>
          <el-footer :style="{background:'rgb(247,243,235)'}">Copyright © 2019 由 石家庄智莱云信息技术有限公司 强力驱动</el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import screenfull from 'screenfull'
  import {menuData} from "../../router";

  export default {
    name: "Layout",
    data() {
      return {
        userName: window.sessionStorage.getItem("userName"),
        isFullscreen: false,
        menuData
      };
    },
    mounted() {
      this.getTimes()
      this.getAllAccess()
    },
    methods: {
      getAllAccess() {
        if (!sessionStorage.getItem('access')) {
          this.$ajax.post('/listAllPermissions.action')
            .then((res) => {
              if (res.data.code === 1) {
                sessionStorage.setItem('access', JSON.stringify(res.data.data))
              }
            })
        }
      },
      lang(key) {
        this.$i18n.locale = key
      },
      loginOut(key) {
        if (key === 'loginOut') {
          this.$confirm('真的要注销登录吗 ?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            sessionStorage.clear()
            this.$router.push({path: "/login"})
          }).catch(() => {
            this.$message.info('已取消')
          });
        }
      },
      getTimes() {
        const time = new Date();
        const hour = time.getHours();
        return hour < 9 ? "a" : hour <= 11 ? "b" : hour <= 13 ? "c" : hour < 20 ? "d" : "e";
      },
      fullScreen() {
        if (!screenfull.enabled) { // 如果不允许进入全屏，发出不允许提示
          this.$message.error('不支持全屏')
          return false
        }
        screenfull.toggle()
        this.$message.success('切换全屏成功！')
      }
    }
  };
</script>

<style>
  .el-submenu__title:focus, .el-submenu__title:hover {
    outline: 0 !important;
    color: rgb(233, 193, 142) !important;
    background: #54524d !important;
  }

  .el-menu-item:hover {
    outline: 0 !important;
    color: rgb(233, 193, 142) !important;
    background: #54524d !important;
  }

  .el-dropdown {
    color: #f1f1f1
  }
</style>

<style lang="scss" scoped>
  .el-header, .el-footer {
    background-color: rgb(45, 44, 42);
    color: #f1f1f1;
    line-height: 60px;
  }

  .el-header {
    display: flex;
    justify-content: space-between;
    padding-left: 0;

    .point {
      display: inline-block;
      cursor: pointer;
      padding: 0 10px;

      i {
        font-size: 20px;
      }

      &:first-child {
        padding: 0 20px;
      }

      &:hover {
        background: #4e4940;
      }
    }

    .logo {
      width: 150px;
      text-align: center;
      font-size: 30px;
    }

    .el-dropdown {
      cursor: pointer;
      margin: 0 10px;
    }
  }

  .el-footer {
    color: #999;
    font-size: 12px;
    background: #f0f0f0;
  }

  .el-aside {
    background-color: #545c64;

    .el-menu {
      border-right: none;
    }

    .el-menu-vertical-demo:not(.el-menu--collapse) {
      width: 200px;
      min-height: 400px;
    }
  }

  .el-main {
    height: calc(100vh - 174px);
    overflow: scroll;

    &::-webkit-scrollbar {
      display: none;
    }
  }
</style>
