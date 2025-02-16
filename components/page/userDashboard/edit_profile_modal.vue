<template>
  <div class="modal fade add-address-modal" id="addAddress">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
        <div class="modal-body">
          <form>
            <div class="mb-3">
              <label for="name" class="form-label font-light">Email Address</label>
              <input type="email" class="form-control" id="editname" placeholder="full name" />
            </div>
            <div class="mb-3">
              <label for="address" class="form-label font-light">Confirm Email Address</label>
              <input type="email" class="form-control" id="editaddress" placeholder="123, abcd, xyz" />
            </div>
            <div>
              <label for="number" class="form-label font-light">password</label>
              <input type="password" class="form-control" id="editnumber" placeholder="+1-123-456-7890" />
            </div>
          </form>
        </div>
        <div class="modal-footer pt-0 text-end d-block">
          <button type="button" class="btn bg-secondary text-white rounded-1 modal-close-button"
            data-bs-dismiss="modal">
            {{ useRuntimeConfig().public.const.Close }}
          </button>
          <button class="btn btn-solid-default rounded-1" data-bs-dismiss="modal">
            Save Address
          </button>
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
    closeOverlay() {
      useClickStore().closeOverlay();
    },
  },
};
</script>

<style>

</style>
