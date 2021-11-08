<template>
  <div ref="element" class="modal fade" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ title }}</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <slot />
        </div>
        <div class="modal-footer">
          <slot name="footer" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Modal } from "bootstrap";

export default {
  props: {
    title: {
      type: String,
      default: "Modal title",
    },
  },
  setup() {
    const element = ref(null);
    const instance = ref(null);

    const show = () => {
      instance.value.show();
    };

    onMounted(() => {
      instance.value = new Modal(element.value);
    });

    return { element, show };
  },
};
</script>
