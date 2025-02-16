<template>
  <div class="tab-pane fade dashboard show active" id="save">
    <div class="box-head">
      <h3>Save Address</h3>
      <button class="btn btn-solid-default btn-sm fw-bold ms-auto" data-bs-toggle="modal" data-bs-target="#addAddress">
        <i class="fas fa-plus"></i> Add New Address
      </button>
    </div>
    <div class="save-details-box">
      <div class="row g-3">
        <div class="col-xl-4 col-md-6" v-for="(address, index) in savedAddresses" :key="index">
          <div class="save-details">
            <div class="save-name">
              <h5>{{ address.name }}</h5>
              <div class="save-position">
                <h6>{{ address.addressType }}</h6>
              </div>
            </div>

            <div class="save-address">
              <p class="font-light">{{ address.address1 }}</p>
              <p class="font-light">{{ address.address2 }}</p>
              <p class="font-light">{{ address.aipCade }}</p>
            </div>

            <div class="mobile">
              <p class="font-light mobile">
                Mobile No. {{ address.mobileNumber }}
              </p>
            </div>

            <div class="button-group">
              <button class="btn btn-sm">Edit</button>
              <button class="btn btn-sm">Remove</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useUserDashboardStore } from '~~/store/userDashboard';
export default {
  computed: {
    savedAddresses() {
      return useUserDashboardStore().data.userAddresses
    },
  },
};
</script>