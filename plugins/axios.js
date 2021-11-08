import axios from 'axios';
import { defineNuxtPlugin, useRuntimeConfig } from '#app';

// Register the component globally
export default defineNuxtPlugin(nuxtApp => {
  const config = useRuntimeConfig();

  nuxtApp.provide('axios', axios.create(config.axios));
});
