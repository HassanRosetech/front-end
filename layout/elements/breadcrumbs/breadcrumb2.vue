<template>
  <section class="breadcrumb-section section-b-space">
    <ul class="circles">
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
    </ul>
    <div class="container">
      <div class="row">
        <div class="col-12 search-section">
          <h3>{{ useRuntimeConfig().public.const.Howhelp }}</h3>
          <div class="search-bar">
            <div class="input-group search-bar">
              <input type="search" class="form-control" placeholder="Search" />
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

<script>
export default {};
</script>
