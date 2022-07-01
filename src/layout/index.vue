<template>
  <div
    class="app-wrapper"
    :class="[appStore.sidebarOpened ? 'openSidebar' : 'hideSidebar']"
  >
    <!-- 左侧 menu -->
    <Sidebar
      id="guide-sidebar"
      class="sidebar-container"
      :style="{ backgroundColor: themeStore.cssVar.menuBg }"
    />
    <!-- 右侧 顶部导航、内容区 -->
    <div class="main-container">
      <div class="fixed-header">
        <!-- 顶部的 navbar -->
        <Navbar />
        <!-- tags -->
        <TagsView />
      </div>
      <!-- 内容区 -->
      <AppMain />
    </div>
  </div>
</template>

<script setup>
import Navbar from './components/Navbar'
import Sidebar from './components/Siderbar'
import AppMain from './components/AppMain'
import TagsView from '@/components/TagsView'
import useThemeStore from '@/stores/theme'
import useApptore from '@/stores/app'

const themeStore = useThemeStore()
const appStore = useApptore()
</script>

<style lang="scss" scoped>
@import '~@/styles/variables.module.scss';

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width #{$sideBarDuration};
}

.hideSidebar .fixed-header {
  width: calc(100% - #{$hideSideBarWidth});
}
</style>
