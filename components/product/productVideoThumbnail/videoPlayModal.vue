<template>
  <div class="modal fade video-play-modal" :class="showVideoModal ? 'show' : ''" id="product-modal" tabindex="-1"
    role="dialog" aria-label="myModalLabel" aria-hidden="true" :style="{ display: showVideoModal ? 'block' : 'none' }"
    style="display: block">
    <div class="modal-dialog modal-lg modal-dialog-centered">
      <div class="modal-content">
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
          @click.prevent="closeVideoModal"></button>

        <div class="modal-body location-map">
          <iframe src="https://www.youtube.com/embed/3xDTtv22G-s" title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen=""></iframe>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["showVideoModal"],
  methods: {
    closeVideoModal() {
      this.$emit("closeVideoModal");
    },
  },
};
</script>