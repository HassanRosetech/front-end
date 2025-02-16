<template>
  <div class="col-lg-6">
    <div class="card custome-card">
      <div class="card-header">
        <h3 class="font-weight-bold">{{ useRuntimeConfig().public.const.Buttongroups }}</h3>
      </div>
      <div class="card-body">
        <div class="btn-group">
          <button class="btn btn-primary active" aria-current="page">
            {{ useRuntimeConfig().public.const.Activelink }}
          </button>
          <button class="btn btn-primary">{{ useRuntimeConfig().public.const.Links }}</button>
          <button class="btn btn-primary">{{ useRuntimeConfig().public.const.Links }}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>
