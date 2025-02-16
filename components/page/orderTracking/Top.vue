<template>
  <div class="col-12 overflow-hidden">
    <div class="order-left-image ratio_asos">
      <div class="tracking-product-image sliderBackground bg-size" :style="{
        'background-image': `url(${getImageUrl('fashion/banner/3.jpg')})`,
      }">
        <img src="/images/fashion/banner/3.jpg" class="img-fluid bg-img d-none" alt="" />
      </div>

      <div class="order-image-contain">
        <h4>Van Heusen Men's Solid Regular Fit Polo</h4>

        <div class="tracker-number">
          <p class="font-light">Order Number : <span>W765EWR8568871</span></p>
          <p class="font-light">Brand : <span>Van Heusen</span></p>
          <p class="font-light mb-0">
            Order Placed : <span>June 25, 2021</span>
          </p>
        </div>
        <ol class="progtrckr">
          <li class="progtrckr-done">
            <h5>Order Processing</h5>
            <h6>05:43 AM</h6>
          </li>
          <li class="progtrckr-done">
            <h5>Pre-Production</h5>
            <h6>01:21 PM</h6>
          </li>
          <li class="progtrckr-done">
            <h5>In Production</h5>
            <h6>Processing</h6>
          </li>
          <li class="progtrckr-todo">
            <h5>Shipped</h5>
            <h6>Pending</h6>
          </li>
          <li class="progtrckr-todo">
            <h5>Delivered</h5>
            <h6>Pending</h6>
          </li>
        </ol>

        <h5 class="font-light">
          Your items is on the way. Tracking information will be available
          within 24 hours.
        </h5>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>
