<script lang="ts" setup>
import { ref } from "vue";

const touched = ref(false);

const onFocusoutHandler = () => {
  touched.value = true;
};
</script>

<template>
  <fieldset @focusout="onFocusoutHandler">
    <slot :touched="touched" />
  </fieldset>
</template>
