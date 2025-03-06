<template>
  <Head>
    <Title>Search</Title>
  </Head>
  <layout3 pageName="Search" parent="Search">
    <PageSearchTopBar v-model="search" />
    <PageSearchProductSlider :productsList="dataToShow" />
  </layout3>
</template>

<script setup>
import layout3 from "~/layout/layouts/layout3.vue";
import { useProductStore } from "~~/store/iphone";

let productList = computed(() =>
  useProductStore().data.filter((item) => item.type === "iphone")
);
let search = ref(""),
  dataToShow = ref();
dataToShow.value = productList.value;
watch(
  () => search,
  () => {
    if (search.value == "") {
      dataToShow.value = productList.value;
    } else {
      dataToShow.value = productList.value.filter((item) => {
        return item.name
          .toLocaleLowerCase()
          .includes(search.value.toLocaleLowerCase());
      });
    }
  },
  { deep: true }
);
</script>
<style>
.search-section .search-bar .input-group {
  width: 50%;
  margin: 26px auto 0px;
}
</style>
