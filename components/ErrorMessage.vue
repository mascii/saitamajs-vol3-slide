<script lang="ts" setup>
defineProps({
  error: {
    type: Error,
    required: false,
  },
});
</script>

<template>
  <span v-if="error" style="display: inline-flex; align-items: center"
    ><carbon-warning style="flex-shrink: 0" />{{ error.message }}</span
  >
</template>
