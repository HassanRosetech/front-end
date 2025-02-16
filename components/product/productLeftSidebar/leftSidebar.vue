<template>
  <div class="accordion category-name" id="accordionExample">
    <div class="accordion-item category-rating">
      <h2 class="accordion-header" id="headingThree">
        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree">
          {{ useRuntimeConfig().public.const.Brand }}
        </button>
      </h2>
      <div id="collapseThree" class="accordion-collapse collapse show" aria-labelledby="headingThree"
        data-bs-parent="#accordionExample">
        <div class="accordion-body category-scroll">
          <ul class="category-list">
            <li>
              <div class="form-check ps-0">
                <div class="form-check user-checkbox ps-0">
                  <input class="checkbox_animated check-it" type="checkbox" value="" id="flexCheckDefault1" />
                  <label class="form-check-label" for="flexCheckDefault1">Zara <span class="font-light">(25)</span>
                  </label>
                </div>
              </div>
            </li>
            <li>
              <div class="form-check ps-0">
                <div class="form-check user-checkbox ps-0">
                  <input class="checkbox_animated check-it" type="checkbox" value="" id="flexCheckDefault2" />
                  <label class="form-check-label" for="flexCheckDefault2">Allen Solly <span
                      class="font-light">(25)</span>
                  </label>
                </div>
              </div>
            </li>
            <li>
              <div class="form-check ps-0">
                <div class="form-check user-checkbox ps-0">
                  <input class="checkbox_animated check-it" type="checkbox" value="" id="flexCheckDefault3" />
                  <label class="form-check-label" for="flexCheckDefault3">Louis Philippe
                    <span class="font-light">(25)</span>
                  </label>
                </div>
              </div>
            </li>
            <li>
              <div class="form-check ps-0">
                <div class="form-check user-checkbox ps-0">
                  <input class="checkbox_animated check-it" type="checkbox" value="" id="flexCheckDefault4" />
                  <label class="form-check-label" for="flexCheckDefault4">Louis Philippe Sport
                    <span class="font-light">(25)</span>
                  </label>
                </div>
              </div>
            </li>
            <li>
              <div class="form-check ps-0">
                <div class="form-check user-checkbox ps-0">
                  <input class="checkbox_animated check-it" type="checkbox" value="" id="flexCheckDefault5" />
                  <label class="form-check-label" for="flexCheckDefault5">H&M <span class="font-light">(25)</span>
                  </label>
                </div>
              </div>
            </li>
            <li>
              <div class="form-check ps-0">
                <div class="form-check user-checkbox ps-0">
                  <input class="checkbox_animated check-it" type="checkbox" value="" id="flexCheckDefault6" />
                  <label class="form-check-label" for="flexCheckDefault6">Fila <span class="font-light">(25)</span>
                  </label>
                </div>
              </div>
            </li>
            <li class="mb-0">
              <div class="form-check ps-0">
                <div class="form-check user-checkbox ps-0">
                  <input class="checkbox_animated check-it" type="checkbox" value="" id="flexCheckDefault7" />
                  <label class="form-check-label" for="flexCheckDefault7">Puma <span class="font-light">(25)</span>
                  </label>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="accordion-item service-accorion">
      <div id="collapseFour" class="accordion-collapse " data-bs-parent="#accordionExample">
        <div class="accordion-body">
          <ul class="category-list">
            <li>
              <div class="service-wrap">
                <div class="service-icon">
                  <svg>
                    <use xlink:href="/svg/icons.svg#customer"></use>
                  </svg>
                </div>
                <div class="service-content">
                  <h3>Customer Servcies</h3>
                  <span class="font-light">Top notch customer service.</span>
                </div>
              </div>
            </li>

            <li>
              <div class="service-wrap">
                <div class="service-icon">
                  <svg>
                    <use xlink:href="/svg/icons.svg#shop"></use>
                  </svg>
                </div>
                <div class="service-content">
                  <h3>Pickup At Any Store</h3>
                  <span class="font-light">Free shipping on orders over $65.</span>
                </div>
              </div>
            </li>

            <li>
              <div class="service-wrap">
                <div class="service-icon">
                  <svg>
                    <use xlink:href="/svg/icons.svg#secure-payment"></use>
                  </svg>
                </div>
                <div class="service-content">
                  <h3>Secured Payment</h3>
                  <span class="font-light">We accept all major credit cards.</span>
                </div>
              </div>
            </li>

            <li>
              <div class="service-wrap">
                <div class="service-icon">
                  <svg>
                    <use xlink:href="/svg/icons.svg#return"></use>
                  </svg>
                </div>
                <div class="service-content">
                  <h3>Free Returns</h3>
                  <span class="font-light">30-days free return policy.</span>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>
