<template>
  <div @click="handleToggle">
    <svg-icon :icon="isFullscreen ? 'exit-fullscreen' : 'fullscreen'" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import screenfull from 'screenfull'

const isFullscreen = ref(false)

// 点击方法
const handleToggle = () => {
  screenfull.toggle()
  isFullscreen.value = !screenfull.isFullscreen
}
</script>

<style lang="scss" scoped></style>
