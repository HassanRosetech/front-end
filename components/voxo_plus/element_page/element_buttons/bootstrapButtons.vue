<template>
  <div class="col-sm-12">
    <div class="card custome-card">
      <div class="card-header">
        <h3 class="font-weight-bold">{{ useRuntimeConfig().public.const.Bootstrapbutton }}</h3>
      </div>
      <div class="card-body">
        <div class="btn-group-showcase">
          <button type="button" class="btn btn-primary">Primary</button>
          <button type="button" class="btn btn-secondary">Secondary</button>
          <button type="button" class="btn btn-success">Success</button>
          <button type="button" class="btn btn-danger">Danger</button>
          <button type="button" class="btn btn-warning">Warning</button>
          <button type="button" class="btn btn-info">Info</button>
          <button type="button" class="btn btn-dark">Dark</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>
