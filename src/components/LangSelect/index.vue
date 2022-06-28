<template>
  <el-dropdown
    trigger="click"
    @command="handleSetLanguage"
  >
    <div>
      <svg-icon icon="language" />
    </div>

    <template #dropdown>
      <el-dropdown-item :disabled="language === 'zh'" command="zh"
        >中文</el-dropdown-item
      >
      <el-dropdown-item :disabled="language === 'en'" command="en"
        >English</el-dropdown-item
      >
    </template>
  </el-dropdown>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'

const store = useStore()
const language = computed(() => store.getters.language)

// 切换语言方法
const i18n = useI18n()
const handleSetLanguage = (lang) => {
  i18n.locale.value = lang
  store.commit('app/setLanguage', lang)
  ElMessage.success(i18n.t('toast.switchLangSuccess'))
}
</script>

<style></style>
