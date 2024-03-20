<template>
  <div v-if="isVisible" class="dialog-overlay" @click.self="closeDialog">
    <div class="dialog-box">
      <header class="dialog-header">
        <h2 style="margin: unset">{{ title }}</h2>
        <button class="custom-dialog__close-button" @click="closeDialog">x</button>
      </header>
      <div class="dialog-body">
        <slot />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  },
  title: {
    type: String,
    default: 'Dialog'
  }
})

const emits = defineEmits(['update:modelValue'])

const isVisible = ref(props.modelValue)

const closeDialog = () => {
  isVisible.value = false
  emits('update:modelValue', false)
}

watch(
  () => props.modelValue,
  (newVal) => {
    isVisible.value = newVal
  }
)

const handleEscKey = (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
    closeDialog()
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleEscKey)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleEscKey)
})
</script>

<style scoped>
.dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.dialog-box {
  background: white;
  padding: 1rem;
  max-width: 80vw;
  border-radius: 8px;
}

.custom-dialog__close-button {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.5rem;
  padding-left: 1rem;
}

.dialog-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.dialog-body {
  margin: 1rem 0;
}

.dialog-footer {
  text-align: right;
}
</style>
