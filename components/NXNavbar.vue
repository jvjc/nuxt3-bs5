<template>
  <!-- Navbar -->
  <nav
    class="
      navbar navbar-expand-lg
      fixed-top
      main-navbar
      navbar-dark
      bg-primary
      py-1
      shadow
    "
    :class="{ 'has-sidebar': hasSidebar }"
  >
    <!-- Container wrapper -->
    <div class="container-fluid">
      <div class="d-flex navbar-brand-wrapper justify-content-center">
        <!-- Navbar brand -->
        <NuxtLink class="navbar-brand mt-2 mt-lg-0" to="/">
          <span class="full-logo">UXMAL</span>
          <span class="mini-logo fw-bold">U</span>
        </NuxtLink>
      </div>

      <!-- Toggle button -->
      <div class="flex-fill">
        <button
          class="btn btn-primary btn-lg py-0 text-white"
          type="button"
          @click="toggleCollapse"
          v-if="hasSidebar"
        >
          <font-awesome-icon icon="bars" />
        </button>
      </div>

      <!-- Right elements -->
      <ul class="navbar-nav me-auto mb-2 mb-lg-0 align-items-center">
        <button class="btn btn-primary text-white border-0" type="button">
          <font-awesome-icon icon="cogs" />
        </button>
      </ul>
      <!-- Right elements -->
    </div>
    <!-- Container wrapper -->
  </nav>
  <!-- Navbar -->
</template>
<script>
export default {
  setup() {
    const { hasCollapsedSidebar, hasNavbar, hasSidebar } = useAppState();

    const toggleCollapse = () => {
      hasCollapsedSidebar.value = !hasCollapsedSidebar.value;
    };

    hasNavbar.value = true;

    return { hasSidebar, toggleCollapse };
  },
};
</script>
<style lang="scss" scoped>
.navbar-brand {
  margin-right: 0;
}
.navbar-brand-wrapper {
  width: 100%;
  padding-right: 0.75rem;
  max-width: calc(#{$sidebar-width} - 0.75rem);
  transition: 0.5s max-width ease;
  overflow: hidden;
  .mini-logo {
    display: none;
  }
}
.main-navbar.has-sidebar {
  z-index: 1032;
}
.collapsed-sidebar {
  .navbar-brand-wrapper {
    max-width: calc(#{$sidebar-collapsed-width} - 0.75rem);

    .full-logo {
      display: none;
    }
    .mini-logo {
      display: block;
    }
  }
}
</style>
