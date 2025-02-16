<template>
  <div class="image-bundle border-product">
    <h6 class="product-title">Frequently Bought Together</h6>
    <div class="bundle-img">
      <div class="image-contain">
        <a href="javascript:void(0)">
          <img src="/images/fashion/5.jpg" class="img-fluid" alt="" />
        </a>
      </div>
      <span>
        <i class="fas fa-plus"></i>
      </span>
      <div class="image-contain">
        <a href="javascript:void(0)">
          <img src="/images/fashion/6.jpg" class="img-fluid" alt="" />
        </a>
      </div>
      <span>
        <i class="fas fa-plus"></i>
      </span>
      <div class="image-contain">
        <a href="javascript:void(0)">
          <img src="/images/fashion/7.jpg" class="img-fluid" alt="" />
        </a>
      </div>
    </div>

    <ul class="checkbox-details">
      <li class="checkbox-list">
        <div class="form-check user-checkbox ps-0">
          <input class="checkbox_animated check-it" type="checkbox" value="" id="flexCheckDefault3" />
          <label class="form-check-label" for="flexCheckDefault3">This Product: Color Combination Track
            <span class="fw-bolder">$64</span>
          </label>
        </div>
      </li>

      <li class="checkbox-list">
        <div class="form-check user-checkbox ps-0">
          <input class="checkbox_animated check-it" type="checkbox" value="" id="flexCheckDefault1" />
          <label class="form-check-label" for="flexCheckDefault1">This Product: Full Ladies Pants
            <span class="fw-bolder">$24</span>
          </label>
        </div>
      </li>

      <li class="checkbox-list">
        <div class="form-check user-checkbox ps-0">
          <input class="checkbox_animated check-it" type="checkbox" value="" id="flexCheckDefault2" />
          <label class="form-check-label" for="flexCheckDefault2">This Product: Ladies Full Skirt Dress
            <span class="fw-bolder">$85</span>
          </label>
        </div>
      </li>

      <li>
        <a class="
            btn
            default-light-theme default-theme default-theme-2
            outline-button
            rounded
          " @click.prevent="$router.push('/page/cart')">Buy This Bundle</a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {};
</script>