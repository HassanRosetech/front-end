<template>
  <div class="added-notification cursor-pointer" role="button" @click.prevent="$router.push(successfulModalLink)"
    :class="[{ show: successfulModal }]">
    <img :src="getImageUrl(successfulModalImage)" v-if="successfulModalImage" class="img-fluid" alt="" />
    <h3>{{ successfulModalMessage }}</h3>
  </div>
</template>

<script>
import { mapState } from "pinia";
import { useClickStore } from '~~/store/clickEvents';
export default {
  computed: {
    ...mapState(useClickStore, {
      successfulModal: 'successfulModal',
      successfulModalImage: 'successfulModalImage',
      successfulModalLink: 'successfulModalLink',
      successfulModalMessage: 'successfulModalMessage',
    }),
  },
  watch: {
    successfulModal: function () {
      if (this.successfulModal) {
        setTimeout(() => {
          useClickStore().toggleSuccessfulModal()
        }, 3000);
      }
    },
  },
  methods: {
    getImageUrl(path) {
      return ("/images/" + path)
    }
  },
};
</script>
