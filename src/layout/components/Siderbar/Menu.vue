<template>
  <!-- 一级菜单 -->
  <el-menu
    :collapse="!$store.getters.sidebarOpened"
    :default-active="$store.getters.activatedMenuItem"
    :background-color="$store.getters.cssVar.menuBg"
    :text-color="$store.getters.cssVar.menuText"
    :active-text-color="$store.getters.cssVar.menuActiveText"
    :router="true"
  >
    <template v-for="route in routes" :key="route.path">
      <!-- 支持渲染二级菜单 -->
      <el-submenu v-if="route.children.length > 0" :index="route.path">
        <!-- 二级菜单标题 -->
        <template #title>
          <MenuTitle
            :title="route.meta.title"
            :icon="route.meta.icon"
          ></MenuTitle>
        </template>
        <!-- 循环渲染菜单项 -->
        <el-menu-item
          v-for="subRoute in route.children"
          :key="subRoute.path"
          :index="subRoute.path"
        >
          <!-- 菜单项标题 -->
          <template #title>
            <MenuTitle
              :title="subRoute.meta.title"
              :icon="subRoute.meta.icon"
            ></MenuTitle>
          </template>
        </el-menu-item>
      </el-submenu>

      <!-- 渲染 item 项 -->
      <el-menu-item v-else :index="route.path">
        <MenuTitle
          :title="route.meta.title"
          :icon="route.meta.icon"
        ></MenuTitle>
      </el-menu-item>
    </template>
  </el-menu>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { filterRouters, generateMenus } from '@/utils/route'
import MenuTitle from './Title'

const router = useRouter()

// 根据路由表生成符合挂载的菜单
const routes = computed(() => {
  const filterRoutes = filterRouters(router.getRoutes())
  return generateMenus(filterRoutes)
})
</script>

<style lang="scss" scoped></style>
