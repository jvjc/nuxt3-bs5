<template>
  <div>
    <div class="offset-9 col-3">
      <div class="mb-3 row" v-if="searchIn">
        <label class="col text-end col-form-label">Buscar:</label>
        <div class="col-9">
          <input type="text" class="form-control" v-model="search" />
        </div>
      </div>
    </div>
    <table class="table" :class="tableClass">
      <thead>
        <tr>
          <th
            v-for="(header, index) in headers"
            :key="index"
            class="text-center"
          >
            <FontAwesomeIcon
              v-if="searchIn.includes(header.key)"
              size="xs"
              icon="search"
              class="searchable text-muted"
            />
            {{ header.title }}
            <NXButton
              v-if="sortFields.includes(header.key)"
              class="btn-sm btn-link text-dark"
              @click="changeSortColumn(header.key)"
              :icon="sortIcon(header.key)"
            />
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in tableData" :key="row.id">
          <td
            class="align-middle"
            v-for="(header, index) in headers"
            :key="index"
          >
            <template v-if="$slots[header.key]">
              <slot :name="header.key" :row="row"></slot>
            </template>
            <template v-else>
              {{ row[header.key] }}
            </template>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import { useNuxtApp } from "#app";
import { debounce } from "lodash";

export default {
  props: {
    tableClass: {
      type: String,
      default: "",
    },
    headers: {
      type: Array,
      required: true,
      default: [],
    },
    ajax: {
      type: String,
      default: "",
    },
    pageSize: {
      type: Number,
      default: 50,
    },
    data: {
      type: Array,
      default: [],
    },
  },
  setup(props) {
    const search = ref("");
    const searchValue = ref("");
    const fetchedData = ref([]);
    const sortBy = ref("");
    const sortOrder = ref("asc");

    const sortIcon = (field) => {
      if (!sortBy.value || sortBy.value != field) {
        return "sort";
      }
      return sortOrder.value === "asc" ? "sort-up" : "sort-down";
    };

    const searchIn = computed(() =>
      props.headers
        .filter((header) => header.searchable)
        .map((header) => header.key)
    );

    const sortFields = computed(() =>
      props.headers
        .filter((header) => header.sortable)
        .map((header) => header.key)
    );

    const currentData = computed(() => {
      if (props.ajax) {
        return fetchedData.value;
      } else {
        return props.data;
      }
    });

    const tableData = computed(() => {
      const toSearch = searchValue.value.toLowerCase();
      if (toSearch && !props.ajax) {
        return currentData.value.filter((row) => {
          return searchIn.value.some((key) => {
            return row[key].toLowerCase().includes(toSearch);
          });
        });
      }
      return currentData.value;
    });

    const nuxtApp = useNuxtApp();

    const fetchData = () => {
      nuxtApp.$axios
        .get(props.ajax, {
          params: {
            page_size: props.pageSize,
            fields: searchIn.value.join(","),
            search: searchValue.value,
            sort_by: sortBy.value,
            sort_order: sortOrder.value,
          },
        })
        .then((response) => {
          if (response.data instanceof Object) {
            fetchedData.value = response.data;
          }
        });
    };

    watch(
      search,
      debounce((val) => {
        searchValue.value = val;
        if (props.ajax) {
          fetchData();
        }
      }, 500)
    );

    if (props.ajax) {
      fetchData();
    }

    const changeSortColumn = (field) => {
      if (sortBy.value === field) {
        if (sortOrder.value === "desc") {
          sortBy.value = "";
          sortOrder.value = "asc";
        }
        sortOrder.value = sortOrder.value === "" ? "asc" : "desc";
      } else {
        sortBy.value = field;
        sortOrder.value = "asc";
      }
      if (props.ajax) {
        fetchData();
      }
    };

    return {
      search,
      sortIcon,
      searchIn,
      sortFields,
      tableData,
      changeSortColumn,
    };
  },
};
</script>
<style lang="scss" scoped>
thead th {
  position: relative;
}
.searchable {
  position: absolute;
  top: 4px;
  left: 4px;
}
</style>
