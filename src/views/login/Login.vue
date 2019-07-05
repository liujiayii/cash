<template>
  <div class="page-login">
    <div class="page-login--layer page-login--layer-area">
      <ul class="circles">
        <li v-for="n in 10" :key="n"></li>
      </ul>
    </div>
    <div
      class="page-login--layer page-login--layer-time"
      flex="main:center cross:center">
      {{time}}
    </div>
    <div class="page-login--layer">
      <div class="page-login--content" flex="dir:top main:justify cross:stretch box:justify">
        <div class="page-login--content-header">
          <p class="page-login--content-header-motto">时间是一切财富中最宝贵的财富</p>
        </div>
        <div class="page-login--content-main" flex="dir:top main:center cross:center">
          <div class="login-main">
            <el-form :model="form" :rules="rules" ref="ruleForm" label-width="100px">
              <el-form-item label="用户名" prop="username">
                <el-input v-model="form.username" prefix-icon="el-icon-user-solid"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="form.password" prefix-icon="el-icon-lock"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {mixin} from '../../config/utils'

  export default {
    name: 'Login',
    mixins: [mixin],
    data() {
      return {
        form: {
          username: 'lisi',
          password: '123456'
        },
        rules: {
          username: [
            {required: true, message: '请输入用户名', trigger: 'blur'},
            {min: 1, max: 12, message: '长度在 5 到 12 个字符', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            {min: 1, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur'}
          ]
        },
        time: '00:00:00'
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$ajax.post('/login.action', this.form)
              .then((res) => {
                if (res.data.code === 1) {
                  window.sessionStorage.setItem('userName', this.form.username)
                  this.$router.push({path: '/Home'})
                } else {
                  this.$message.error(res.data.data.message)
                }
              })
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
    },
    mounted() {
      sessionStorage.clear()
      let timer = setInterval(() => {
        this.time = this.formatDate(new Date(), 'hh:mm:ss')
      }, 1000)
    }
  }
</script>
<style lang="scss">
  .login-main {
    .code {
      .el-input__inner {
        padding-left: 120px !important;
      }

      .el-input__prefix {
        left: 0 !important;
      }

      img {
        cursor: pointer;
      }
    }
  }

  .page-login {
    $color-text-normal: #666;
    //@extend %unable-select;
    $backgroundColor: #F0F2F5;
    // ---
    background-color: $backgroundColor;
    height: 100vh;
    position: relative;
    overflow: hidden;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    // 层
    .page-login--layer {
      //@extend %full;
      overflow: auto;
    }

    .page-login--layer-area {
      overflow: hidden;
    }

    // 时间
    .page-login--layer-time {
      position: absolute;
      font-size: 24em;
      font-weight: bold;
      color: rgba(0, 0, 0, 0.03);
      overflow: hidden;
    }

    // 登陆页面控件的容器
    .page-login--content {
      height: 100vh;
      min-height: 500px;
      overflow: hidden;

      .page-login--content-main {
        margin-top: 30vh;
      }
    }

    // header
    .page-login--content-header {
      padding: 1em 0;

      .page-login--content-header-motto {
        margin: 0px;
        padding: 0px;
        color: $color-text-normal;
        text-align: center;
        font-size: 12px;
      }
    }

    // 登录表单
    .page-login--form {
      width: 280px;
      // 卡片
      .el-card {
        margin-bottom: 15px;
      }
    }

    // 背景
    .circles {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      overflow: hidden;
      margin: 0px;
      padding: 0px;

      li {
        position: absolute;
        display: block;
        list-style: none;
        width: 20px;
        height: 20px;
        background: #FFF;
        animation: animate 25s linear infinite;
        bottom: -200px;
        @keyframes animate {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
            border-radius: 0;
          }
          100% {
            transform: translateY(-1000px) rotate(720deg);
            opacity: 0;
            border-radius: 50%;
          }
        }

        &:nth-child(1) {
          left: 15%;
          width: 80px;
          height: 80px;
          animation-delay: 0s;
        }

        &:nth-child(2) {
          left: 5%;
          width: 20px;
          height: 20px;
          animation-delay: 2s;
          animation-duration: 12s;
        }

        &:nth-child(3) {
          left: 70%;
          width: 20px;
          height: 20px;
          animation-delay: 4s;
        }

        &:nth-child(4) {
          left: 40%;
          width: 60px;
          height: 60px;
          animation-delay: 0s;
          animation-duration: 18s;
        }

        &:nth-child(5) {
          left: 65%;
          width: 20px;
          height: 20px;
          animation-delay: 0s;
        }

        &:nth-child(6) {
          left: 75%;
          width: 150px;
          height: 150px;
          animation-delay: 3s;
        }

        &:nth-child(7) {
          left: 35%;
          width: 200px;
          height: 200px;
          animation-delay: 7s;
        }

        &:nth-child(8) {
          left: 50%;
          width: 25px;
          height: 25px;
          animation-delay: 15s;
          animation-duration: 45s;
        }

        &:nth-child(9) {
          left: 20%;
          width: 15px;
          height: 15px;
          animation-delay: 2s;
          animation-duration: 35s;
        }

        &:nth-child(10) {
          left: 85%;
          width: 150px;
          height: 150px;
          animation-delay: 0s;
          animation-duration: 11s;
        }
      }
    }
  }
</style>
