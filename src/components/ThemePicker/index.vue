<template>
  <el-dropdown
    v-bind="$attrs"
    trigger="hover"
    class="theme"
    @command="handleSetTheme"
  >
    <div>
      <svg-icon icon="change-theme" />
    </div>

    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item command="reset">
          {{ $t('theme.themeColorReset') }}
        </el-dropdown-item>
        <el-dropdown-item command="color">
          {{ $t('theme.themeColorChange') }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
  <!-- 展示弹出层 -->
  <div>
    <SelectColor v-model="selectColorVisible" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'
import SelectColor from '@/components/SelectColor'

const store = useStore()
const selectColorVisible = ref(false)

const handleSetTheme = (command) => {
  if (command === 'reset') {
    store.commit('theme/resetMainColor')
    return
  }
  selectColorVisible.value = true
}
</script>

<style lang="scss" scoped></style>
