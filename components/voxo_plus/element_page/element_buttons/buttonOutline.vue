<template>
  <div class="col-sm-12">
    <div class="card custome-card">
      <div class="card-header">
        <h3 class="font-weight-bold">{{ useRuntimeConfig().public.const.ButtonOutlines }}</h3>
      </div>
      <div class="card-body">
        <div class="btn-group-showcase">
          <button type="button" class="btn btn-outline-primary">Primary</button>
          <button type="button" class="btn btn-outline-secondary">
            Secondary
          </button>
          <button type="button" class="btn btn-outline-success">Success</button>
          <button type="button" class="btn btn-outline-danger">Danger</button>
          <button type="button" class="btn btn-outline-warning">Warning</button>
          <button type="button" class="btn btn-outline-info">Info</button>
          <button type="button" class="btn btn-outline-dark">Dark</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>
