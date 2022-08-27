<template>
  <div class="slidev-layout flex items-center">
    <div class="flex items-center">
      <figure class="w-2/5 px-12">
        <img
          :src="imageSrc"
          class="rounded-full p-2 bg-gradient-to-r bg-white"
        />
      </figure>
      <div class="w-1/2">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { resolveAssetUrl } from "@slidev/client/layoutHelper";

const props = defineProps({
  introImage: {
    type: String,
    required: true,
  },
});

const imageSrc = computed(() => resolveAssetUrl(props.introImage));
</script>
