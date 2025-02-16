<template>
  <Teleport to="body">
    <div class="modal fade video-play-modal" id="product-modal" tabindex="-1" role="dialog" aria-label="myModalLabel"
      aria-hidden="true">
      <div class="modal-dialog modal-lg modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>

          <div class="modal-body location-map">
            <iframe src="https://www.youtube.com/embed/3xDTtv22G-s" title="YouTube video player"
              allowfullscreen=""></iframe>
          </div>
        </div>
      </div>
    </div>

  </Teleport>
</template>

<script></script>
