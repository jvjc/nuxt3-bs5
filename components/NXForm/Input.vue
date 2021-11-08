<template>
  <div>
    <label :for="id" class="form-label">Email address</label>
    <input
      type="email"
      class="form-control"
      :id="id"
      placeholder="name@example.com"
    />
  </div>
</template>
<script>
import { uniqueId } from "lodash";

export default {
  setup() {
    const id = uniqueId("input-");

    return {
      id,
    };
  },
};
</script>
