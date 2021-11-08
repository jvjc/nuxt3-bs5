<template>
  <NuxtLink
    v-if="toRelative || to"
    :to="toRelative ? currentPath + '/' + toRelative : to"
    class="btn"
  >
    <FontAwesomeIcon v-if="icon" :icon="icon" />
    <slot />
  </NuxtLink>
  <button v-else type="button" class="btn">
    <FontAwesomeIcon v-if="icon" :icon="icon" />
    <slot />
  </button>
</template>
<script>
import { useNuxtApp } from "#app";

export default {
  props: {
    icon: {
      type: [String, null],
      default: null,
    },
    to: {
      type: [String, Object, null],
      default: null,
    },
    toRelative: {
      type: [String, Number, null],
      default: null,
    },
  },
  setup() {
    const nuxtApp = useNuxtApp();
    const { $router } = nuxtApp;

    const currentPath = $router.currentRoute.value.path;
    return {
      currentPath,
    };
  },
};
</script>
