<template>
  <div class="col-xl-9 col-lg-8 order-lg-1 ratio_square">
    <div class="row g-4">
      <div class="col-12">
        <div class="blog-details">
          <!-- <div class="blog-image-box">
                    <img
                      src="/images/inner-page/product/10.jpg"
                      alt=""
                      class="card-img-top"
                    />
                    <div class="blog-title">
                      <div>
                        <div class="social-media media-center">
                          <a href="https://www.facebook.com/" target="new">
                            <div class="social-icon-box social-color">
                              <i class="fab fa-facebook-f"></i>
                            </div>
                          </a>
                          <a href="https://twitter.com/" target="new">
                            <div class="social-icon-box social-color">
                              <i class="fab fa-twitter"></i>
                            </div>
                          </a>
                          <a href="https://in.pinterest.com/" target="new">
                            <div class="social-icon-box social-color">
                              <i class="fab fa-pinterest-p"></i>
                            </div>
                          </a>
                        </div>
                      </div>
                    </div> 
                  </div>-->
          <div class="blog-detail-contain">
            <span class="font-light">June 04 2024</span>
            <h2 class="card-title">Olika Klasser av Elsparkcyklar</h2>
            <p class="font-light first-latter">Hi hassan Xiaoflasher</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { useBlogDataStore } from "~~/store/blogData";
export default {
  computed: {
    blogData() {
      return useBlogDataStore().data;
    },
  },
};
</script>
