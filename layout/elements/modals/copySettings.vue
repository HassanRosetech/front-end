<template>
  <div class="modal theme-modal fade quick-view-modal" id="copySettings">
    <div class="modal-dialog modal-md modal-dialog-centered">
      <div class="modal-content">
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
          @click="toggleCopySettings"></button>
        <div class="modal-body">
          <div class="modal-contain">
            <div>
              <div class="modal-heading mb-sm-5 mb-4">
                <h2>Copy Layout Settings</h2>
              </div>
              <div class="modal-content">
                <div class="modal-contain-img">
                  <p>
                    <span>Dark Mode : &nbsp;</span>
                    <span>{{ darkMode=='dark' }}</span>
                  </p>
                  <p>
                    <span>Layout Type : &nbsp;</span>
                    <span>{{ layoutType }}</span>
                  </p>
                  <p>
                    <span>Layout Color : &nbsp;</span>
                    <span>{{ themeColor }}</span>
                  </p>
                </div>
                <div class="modal-contain-details">
                  <div class="product-total"></div>
                  <div class="shop-cart-button mt-3">
                    <a href="javascript:void(0)" @click.prevent="copySettingsToClipboard"
                      class="btn default-light-theme conti-button default-theme default-theme-2 rounded">Copy
                      Settings</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useClickStore } from '~~/store/clickEvents';
import { useLayout } from '~~/store/layout';
export default {
  props: ["showModal"],
  computed:{
    darkMode(){
      return useLayout().layoutMode
    },
    layoutType(){
      return useLayout().layoutType
    },
    themeColor(){
      return useLayout().primaryColor
    }
  },
  methods: {
    redirectTo(path, productId) {
      this.toggleQuickViewModal();
      if (productId != undefined) this.$router.push(path + productId);
      else this.$router.push(path);
    },
    toggleCopySettings() {
      useClickStore().toggleCopySettings()
    },
    copySettingsToClipboard() {
      let copyJson = `{
            "layout":"${this.layoutType}",
            "primaryColor":"${this.themeColor}",
            "darkMode":${this.darkMode=='dark'},
            "useTheseSettings":${true}
          }`;
      navigator.clipboard.writeText(copyJson);
      let payload = {
        
        message: "Data Has Been Copied",
      };
      useClickStore().toggleSuccessfulModal(payload)
    },
  },
};
</script>