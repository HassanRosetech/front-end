<template>
  <section class="search-section">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <div class="title title1 text-center">
            <h2>{{ useRuntimeConfig().public.const.SearchForProducts }}</h2>
          </div>
        </div>
        <div class="col-lg-6 col-md-8 mx-auto">
          <div class="search-bar">
            <div class="input-group search-bar w-100">
              <input type="text" class="form-control" :value="modelValue" @input="handleChange" placeholder="Search" />
              <button class="input-group-text" id="basic-addon3">
                <i class="fas fa-search"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
let props = defineProps({
  modelValue: {
    default: '',
    type: String
  }
}), emit = defineEmits(['update:modelValue']);
const handleChange = (event) => {
  emit('update:modelValue', event.target.value)
}
</script>
