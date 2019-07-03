<template>
  <div id="app" class="animated lightSpeedIn">
    <transition name="fade" mode="out-in" enter-active-class="animated bounceIn" leave-active-class="animated hinge">
      <router-view/>
    </transition>
  </div>
</template>

<style lang="scss">
  html, body, #app {
    height: 100%;
    width: 100%;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    margin: 0;
  }

  .page-login .el-input__inner {
    background-color: transparent;
  }

  .el-form .el-input__inner, .el-form .el-textarea__inner {
    width: 202px;
  }

  input[type=number]::-webkit-outer-spin-button,
  input[type=number]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type=number] {
    -moz-appearance: textfield;
  }
</style>
