<template>
  <div class="recently-purchase d-md-flex d-none" :style="{ bottom: showPurchased }" v-if="visiblePurchase">
    <img src="/images/fashion/instagram/3.jpg" class="img-fluid" alt="" />
    <div class="media-body">
      <div>
        <h4>Some recently purchase this item</h4>
        <a href="javascript:void(0)">
          <span class="product-name"> Floral Dress </span>
        </a>
        <small class="timeAgo">50 minutes ago</small>
      </div>
    </div>
    <a href="javascript:void(0)" class="close-popup fa fa-times" @click="(showPurchased = '-200px'), (show = false)"></a>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showPurchased: "-200px",
      show: false,
      windowScroll: 0,
      visiblePurchase: true,
    };
  },
  watch: {
    windowScroll: function () {
      this.setShowPurchased();
    },
  },
  methods: {
    handleScroll() {
      this.windowScroll = window.scrollY;
    },
    setShowPurchased() {
      if (this.show) {
        if (this.windowScroll > 500) {
          this.showPurchased = "100px";
        } else {
          this.showPurchased = "10px";
        }
      }
    },
  },
  mounted() {
    setInterval(() => {
      if (this.showPurchased != "-200px") {
        this.showPurchased = "-200px";
        this.show = false;
      } else {
        this.show = true;
        this.setShowPurchased();
      }
    }, 5465465465465465465);
    window.addEventListener("scroll", this.handleScroll);
  },
};
</script>