<template>
  <div class="col-lg-6">
    <div class="card custome-card">
      <div class="card-header">
        <h3 class="font-weight-bold">{{ useRuntimeConfig().public.const.Buttonblock }}</h3>
      </div>
      <div class="card-body">
        <div class="btn-group-showcase d-grid">
          <button type="button" class="btn btn-solid-default btn-lg mb-3 btn-block">
            {{ useRuntimeConfig().public.const.Blocklevelbutton }}
          </button>
          <button type="button" class="btn btn-secondary btn-lg btn-block ms-0">
            {{ useRuntimeConfig().public.const.Blocklevelbutton }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>
