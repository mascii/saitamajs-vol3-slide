<!--
  Referred to the following article:
  https://zenn.dev/hiroko_ino/articles/hackable-slidev-play-lt
-->

<template>
  <div class="absolute z-50 bottom-5 left-0 right-0 flex justify-center">
    <div class="w-50 relative h-1 bg-green-500/75 rounded-full overflow-hidden">
      <span
        class="absolute h-full bg-gray-700 transition-all duration-300"
        :style="style"
      ></span>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "Progress",
  props: {
    current: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
  },
  computed: {
    style() {
      return {
        width: `${100 / (this.total - 1)}%`,
        left: `${(100 / (this.total - 1)) * (this.current - 2)}%`,
      };
    },
  },
};
</script>
