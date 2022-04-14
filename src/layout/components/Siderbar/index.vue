<template>
  <div>
    <div class="logo-container">
      <el-avatar :size="44" shape="square" :src="Logo" />
      <h1 class="logo-title" v-if="$store.getters.sidebarOpened">
        vue3-admin
      </h1>
    </div>
    <el-scrollbar>
      <SiderbarMenu />
    </el-scrollbar>
  </div>
</template>

<script setup>
import SiderbarMenu from './Menu'
import Logo from '@/assets/logo.png'
</script>

<style lang="scss" scoped>
.logo-container {
  height: 44px;
  padding: 10px 0 22px 0;
  display: flex;
  align-items: center;
  justify-content: center;

  .el-avatar {
    --el-avatar-background-color: none;
  }

  .logo-title {
    margin-left: 10px;
    color: #fff;
    font-weight: 600;
    line-height: 50px;
    font-size: 16px;
    white-space: nowrap;
  }
}
</style>
