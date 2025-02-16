<template>
  <div class="modal modal-size fade" :class="showModal ? 'show d-block' : ''" id="sizemodal">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
          @click.prevent="closeSizeChart"></button>
        <div class="modal-body">
          <img :src="('/images/size-chart.jpg')" alt="" class="img-fluid" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useClickStore } from '~~/store/clickEvents';

export default {
  props: ["showModal"],
  methods: {
    closeSizeChart() {
      useClickStore().closeOverlay()
    },
  },
};
</script>