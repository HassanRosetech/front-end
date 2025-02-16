<template>
  <Head>
    <Title>Search</Title>
  </Head>
  <layout5 pageName="Search" parent="Search">
    <PageSearchTopBar v-model="search" />
    <PageSearchProductSlider :productsList="dataToShow" />
  </layout5>
</template>

<script setup>
import layout5 from "~/layout/layouts/layout5.vue";
import { useProductStore } from "~~/store/products";

let productList = computed(() => useProductStore().data.filter((item) => item.type === "fashion"))
let search = ref(''), dataToShow = ref();
dataToShow.value = productList.value
watch(() => search, () => {
  if (search.value == '') {
    dataToShow.value = productList.value;
  } else {
    dataToShow.value = productList.value.filter(item => {
      return item.name.toLocaleLowerCase().includes(search.value.toLocaleLowerCase())
    }
    );
  }
}, { deep: true })



</script>