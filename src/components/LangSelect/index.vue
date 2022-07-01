<template>
  <el-dropdown trigger="hover" @command="handleSetLanguage">
    <div>
      <svg-icon icon="language" />
    </div>

    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item :disabled="language === 'zh'" command="zh"
          >中文</el-dropdown-item
        >
        <el-dropdown-item :disabled="language === 'en'" command="en"
          >English</el-dropdown-item
        >
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import useAppStore from '@/stores/app'

const appStore = useAppStore()
const language = computed(() => appStore.language)

// 切换语言方法
const i18n = useI18n()
const handleSetLanguage = (lang) => {
  i18n.locale.value = lang
  appStore.setLanguage(lang)
  ElMessage.success(i18n.t('toast.switchLangSuccess'))
}
</script>

<style></style>
