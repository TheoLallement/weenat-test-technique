import { computed, onMounted, onUnmounted, ref } from 'vue'

export default function useBreakpoints() {
  const width = ref(window.innerWidth)

  const breakpoints = {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280
  }

  const currentBreakpoint = computed(() => {
    if (width.value < breakpoints.sm) return 'xs'
    if (width.value < breakpoints.md) return 'sm'
    if (width.value < breakpoints.lg) return 'md'
    if (width.value < breakpoints.xl) return 'lg'
    return 'xl'
  })

  const onResize = () => {
    width.value = window.innerWidth
  }

  onMounted(() => {
    window.addEventListener('resize', onResize)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', onResize)
  })

  return {
    currentBreakpoint
  }
}
