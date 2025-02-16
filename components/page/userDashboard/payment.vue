<template>
  <div class="tab-pane fade dashboard show active" id="pay">
    <div class="box-head">
      <h3>Card & Payment</h3>
      <button class="btn btn-solid-default btn-sm fw-bold ms-auto" data-bs-toggle="modal" data-bs-target="#addPayment">
        <i class="fas fa-plus"></i> Add New Card
      </button>
    </div>

    <div class="card-details-section">
      <div class="row g-4">
        <div class="col-xl-4 col-sm-6" v-for="(payment, index) in paymentOptions" :key="index">
          <div class="payment-card-detail">
            <div class="card-details" :class="payment.class">
              <div class="card-number">
                <h4>{{ payment.cardNumber }}</h4>
              </div>

              <div class="valid-detail">
                <div class="title">
                  <span>valid</span>
                  <span>thru</span>
                </div>
                <div class="date">
                  <h3>{{ payment.validTill }}</h3>
                </div>
                <div class="primary">
                  <span class="badge bg-pill badge-light">{{
                    payment.type
                  }}</span>
                </div>
              </div>

              <div class="name-detail">
                <div class="name">
                  <h5>{{ payment.name }}</h5>
                </div>
                <div class="card-img">
                  <img :src="getImageUrl(payment.image)" class="img-fluid ed" alt="" />
                </div>
              </div>
            </div>

            <div class="edit-card">
              <a data-bs-toggle="modal" data-bs-target="#addPayment" href="javascript:void(0)"><i
                  class="far fa-edit"></i> edit</a>
              <a href="javascript:void(0)"><i class="far fa-minus-square"></i> delete</a>
            </div>
          </div>

          <div class="edit-card-mobile">
            <a data-bs-toggle="modal" data-bs-target="#addPayment" href="javascript:void(0)"><i class="far fa-edit"></i>
              edit</a>
            <a href="javascript:void(0)"><i class="far fa-minus-square"></i> delete</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useUserDashboardStore } from "@/store/userDashboard"
export default {
  computed: {
    paymentOptions() {
      return useUserDashboardStore().data.paymentOptions;
    },
  },
};
</script>