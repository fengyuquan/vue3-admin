<template>
  <el-dropdown trigger="click" @command="handleClick" placement="bottom-start">
    <el-input
      v-model="search"
      placeholder="search"
      clearable
      @input="querySearch"
    >
      <template #prepend>
        <svg-icon icon="search" />
      </template>
    </el-input>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item
          v-for="item in options"
          :key="item.path"
          :command="item.path"
          >{{ item.title }}</el-dropdown-item
        >
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { debounce } from 'lodash'
import { generateTitle } from '@/utils/i18n'
import useAppStore from '@/stores/app'

const appStore = useAppStore()
const router = useRouter()

const options = ref([
  {
    name: 'profile',
    path: '/profile',
    title: generateTitle('profile')
  }
])

// search 搜索逻辑相关
const search = ref('')
const originData = JSON.parse(appStore.siderbarMenus)
const querySearch = debounce(() => {
  // 获取当前菜单项的值，如果包含search内容，则保留该路由
  options.value = originData.filter((item) => {
    const title = generateTitle(item.name)
    item.title = title
    return (
      search.value && title.toLowerCase().includes(search.value.toLowerCase())
    )
  })
}, 300)

// 点击跳转对应路由
const handleClick = (command) => {
  router.push(command)
}
</script>

<style lang="scss" scoped></style>
