<template>
  <section class="faq-section pt-0">
    <div class="container">
      <div class="row g-lg-5 g-4">
        <div class="col-md-4 zi-1">
          <div class="faq-contain">
            <div class="faq-image">
              <img :src="getImageUrl('inner-page/faq/guides.png')" class="img-fluid" alt="" />
            </div>
            <h2>Guides</h2>
            <h5>
              Guides related to buying products, latest trends, upcoming
              products.
            </h5>
          </div>
        </div>

        <div class="col-md-4 zi-1">
          <div class="faq-contain">
            <div class="faq-image">
              <img :src="getImageUrl('inner-page/faq/faq.png')" class="img-fluid" alt="" />
            </div>
            <h2>FAQ</h2>
            <h5>
              Need some help with your order or gor a question that you need
              answered.
            </h5>
          </div>
        </div>

        <div class="col-md-4 zi-1">
          <div class="faq-contain">
            <div class="faq-image">
              <img :src="getImageUrl('inner-page/faq/community.png')" class="img-fluid" alt="" />
            </div>
            <h2>Community</h2>
            <h5>Join our large community who will help you in any query.</h5>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {};
</script>