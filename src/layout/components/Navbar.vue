<template>
  <div class="navbar">
    <!-- 折叠按钮 -->
    <div class="hamburger-container" @click="toggleClick">
      <svg-icon :icon="icon"></svg-icon>
    </div>
    <!-- 面包屑导航 -->
    <el-breadcrumb class="breadcrumb">
      <transition-group name="breadcrumb" mode="out-in">
        <el-breadcrumb-item
          v-for="item in breadcrumbData"
          :key="item.path"
          :to="{ path: item.path }"
          >{{ generateTitle(item.meta.title) }}</el-breadcrumb-item
        >
      </transition-group>
    </el-breadcrumb>
    <div class="right-menu">
      <Screenfull class="right-menu-item hover-effect" />
      <ThemePicker class="right-menu-item hover-effect" />
      <LangSelect class="right-menu-item hover-effect" />
      <!-- 头像 -->
      <el-dropdown trigger="hover" class="avatar-container">
        <div class="avatar-wrapper">
          <el-avatar
            v-if="$store.getters.userInfo.avatar"
            :size="40"
            shape="circle"
            :src="$store.getters.userInfo.avatar"
          ></el-avatar>
          <el-avatar v-else>user</el-avatar>
        </div>
        <template #dropdown>
          <el-dropdown-menu class="user-dropdown">
            <router-link to="/">
              <el-dropdown-item> {{ $t('navBar.home') }} </el-dropdown-item>
            </router-link>
            <el-dropdown-item divided @click="logout">
              {{ $t('navBar.logout') }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { generateTitle } from '@/utils/i18n'
import LangSelect from '@/components/LangSelect'
import ThemePicker from '@/components/ThemePicker'
import Screenfull from '@/components/Screenfull'

const store = useStore()
const route = useRoute()

// 登出逻辑
const logout = () => {
  store.dispatch('user/logout')
}

// 折叠侧边菜单栏按钮事件
const toggleClick = () => {
  store.commit('app/triggerSidebarOpened')
}
// 折叠侧边菜单栏按钮图标
const icon = computed(() =>
  store.getters.sidebarOpened ? 'hamburger-opened' : 'hamburger-closed'
)

// 面包屑导航数据
const breadcrumbData = ref([])
const getBreadcrumbData = () => {
  // console.log(route.matched)
  breadcrumbData.value = route.matched.filter((item) => item?.meta?.title)
}
// 面包屑导航hover颜色
const linkHoverColor = ref(store.getters.cssVar.menuActiveText)

// 监听路由的变化，路由变化后则立即更新当前激活的菜单项为当前路由的path
watch(
  route,
  () => {
    getBreadcrumbData()
    store.commit('app/changeActivatedMenuItem', route.path)
  },
  {
    immediate: true
  }
)
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    padding: 0 16px;
    cursor: pointer;
    transition: background 0.5s;
    display: flex;
    align-items: center;
    &:hover {
      background: rgba(0, 0, 0, 0.1);
    }
  }

  .breadcrumb {
    display: inline-block;
    font-size: 14px;
    line-height: 50px;
    margin-left: 8px;

    ::v-deep .is-link:hover {
      color: v-bind(linkHoverColor) !important;
    }

    ::v-deep .no-redirect {
      color: #97a8be;
      cursor: text;
    }
  }

  .right-menu {
    display: flex;
    align-items: center;
    float: right;
    padding-right: 16px;

    ::v-deep .avatar-container {
      cursor: pointer;
      .avatar-wrapper {
        margin-top: 5px;
        position: relative;
        .el-avatar {
          margin-right: 12px;
        }
      }
    }

    ::v-deep .right-menu-item {
      display: inline-block;
      padding: 0 18px 0 0;
      font-size: 24px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
      }
    }
  }
}
</style>
