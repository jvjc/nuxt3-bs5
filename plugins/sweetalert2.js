import { defineNuxtPlugin } from '#app';
import Swal from 'sweetalert2';

// Register the component globally
export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.provide('swal', Swal);
});
