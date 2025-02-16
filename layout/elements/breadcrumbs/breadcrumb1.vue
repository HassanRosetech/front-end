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
        <div class="col-12">
          <h3>{{ parent }}</h3>
          <nav>
            <ol class="breadcrumb">
              <li class="breadcrumb-item">
                <nuxt-link to="/home/fashion_demo">
                  <i class="fas fa-home"></i>
                </nuxt-link>
              </li>
              <li class="breadcrumb-item active" aria-current="page">
                {{ pageName }}
              </li>
            </ol>
          </nav>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    pageName: {
      type: String,
      default: "",
    },
    parent: {
      type: String,
      default: "Parent",
    },
  },
};
</script>

<style lang="scss" scoped>

</style>