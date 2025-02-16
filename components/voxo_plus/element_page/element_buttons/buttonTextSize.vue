<template>
  <div class="col-sm-12">
    <div class="card custome-card">
      <div class="card-header">
        <h3 class="font-weight-bold">{{ useRuntimeConfig().public.const.ButtontextSizes }}</h3>
      </div>
      <div class="card-body">
        <div class="btn-group-showcase">
          <button type="button" class="btn btn-solid-default btn-lg">
            Large button
          </button>
          <button type="button" class="btn btn-solid-default btn-lg">
            Large button
          </button>
          <button type="button" class="btn btn-solid-default btn-sm">
            Small button
          </button>
          <button type="button" class="btn btn-solid-default btn-sm">
            Small button
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>
