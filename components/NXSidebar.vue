<template>
  <div
    class="sidebar flex-shrink-0 p-2 fixed-top h-100 text-light bg-dark"
    :class="{
      'has-navbar': hasNavbar,
    }"
  >
    <ul class="nav nav-pills flex-column mb-auto w-100">
      <li class="w-100" v-for="entry in entries" :key="entry.id">
        <NuxtLink
          :to="entry.to"
          active-class="active"
          v-bind="entry.attrs"
          class="nav-link text-gray px-2"
          aria-current="page"
        >
          <font-awesome-icon :icon="entry.icon" v-if="entry.icon" />
          <span class="nav-text ms-2">{{ entry.title }}</span>
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  setup() {
    const { hasSidebar, hasNavbar } = useAppState();

    onMounted(() => {
      hasSidebar.value = true;
    });

    const entries = [
      {
        id: "car_make",
        to: "/car_make",
        icon: "car",
        title: "Marcas de autos",
      },
    ];

    return { entries, hasNavbar };
  },
};
</script>
<style lang="scss" scoped>
.nav-pills {
  overflow: hidden;
}
.nav-pills .nav-link {
  border-color: $primary;
  &:not(.active) {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    &:hover {
      border-left: 2px solid $primary;
    }
  }
}
.sidebar {
  width: $sidebar-width;
  z-index: 1031;
  transition: 0.5s width ease;

  &.has-navbar {
    padding-top: calc(49px + 1rem) !important;
  }

  &.is-collapsed {
    width: $sidebar-collapsed-width;

    .nav-text {
      display: none;
    }

    &:hover {
      width: $sidebar-width !important;
      .nav-text {
        display: inline-block;
      }
    }
  }
}
.collapsed-sidebar {
  .sidebar {
    width: $sidebar-collapsed-width;

    .nav-text {
      display: none;
    }

    &:hover {
      width: $sidebar-width !important;
      .nav-text {
        display: inline-block;
      }
    }
  }
}
.nav-link {
  white-space: nowrap;
  font-size: 14px;
  i {
    padding-left: 5px;
  }
}
</style>
