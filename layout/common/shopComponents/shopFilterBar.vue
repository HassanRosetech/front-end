<template>
  <div class="col-lg-3 col-md-4" :class="filterBarClasses">
    <div class="category-option">
      <div class="button-close mb-3">
        <button class="btn p-0">
          <i data-feather="arrow-left"></i> {{ useRuntimeConfig().public.const.Close }}
        </button>
      </div>
      <div class="accordion category-name" id="accordionExample">
        <div class="accordion-item category-rating">
          <h2 class="accordion-header" id="headingTwo">
            <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo">
              {{ useRuntimeConfig().public.const.Brand }}
            </button>
          </h2>
          <div id="collapseTwo" class="accordion-collapse collapse show" data-bs-parent="#accordionExample">
            <div class="accordion-body category-scroll">
              <ul class="category-list">
                <li>
                  <div class="form-check ps-0 custome-form-check">
                    <input class="checkbox_animated check-it" type="checkbox" id="flexCheckDefault1" />
                    <label class="form-check-label" for="flexCheckDefault1">Zara</label>
                    <p class="font-light">(25)</p>
                  </div>
                </li>
                <li>
                  <div class="form-check ps-0 custome-form-check">
                    <input class="checkbox_animated check-it" type="checkbox" id="flexCheckDefault2" />
                    <label class="form-check-label" for="flexCheckDefault2">Allen Solly</label>
                    <p class="font-light">(25)</p>
                  </div>
                </li>
                <li>
                  <div class="form-check ps-0 custome-form-check">
                    <input class="checkbox_animated check-it" type="checkbox" id="flexCheckDefault3" />
                    <label class="form-check-label" for="flexCheckDefault3">Louis Philippe</label>
                    <p class="font-light">(25)</p>
                  </div>
                </li>
                <li>
                  <div class="form-check ps-0 custome-form-check">
                    <input class="checkbox_animated check-it" type="checkbox" id="flexCheckDefault4" />
                    <label class="form-check-label" for="flexCheckDefault4">Louis Philippe Sport</label>
                    <p class="font-light">(25)</p>
                  </div>
                </li>
                <li>
                  <div class="form-check ps-0 custome-form-check">
                    <input class="checkbox_animated check-it" type="checkbox" id="flexCheckDefault5" />
                    <label class="form-check-label" for="flexCheckDefault5">H&M</label>
                    <p class="font-light">(25)</p>
                  </div>
                </li>
                <li>
                  <div class="form-check ps-0 custome-form-check">
                    <input class="checkbox_animated check-it" type="checkbox" id="flexCheckDefault6" />
                    <label class="form-check-label" for="flexCheckDefault6">Fila</label>
                    <p class="font-light">(25)</p>
                  </div>
                </li>
                <li>
                  <div class="form-check ps-0 custome-form-check">
                    <input class="checkbox_animated check-it" type="checkbox" id="flexCheckDefault7" />
                    <label class="form-check-label" for="flexCheckDefault7">Puma</label>
                    <p class="font-light">(25)</p>
                  </div>
                </li>
                <li>
                  <div class="form-check ps-0 custome-form-check">
                    <input class="checkbox_animated check-it" type="checkbox" id="flexCheckDefault8" />
                    <label class="form-check-label" for="flexCheckDefault8">Nike</label>
                    <p class="font-light">(25)</p>
                  </div>
                </li>
                <li>
                  <div class="form-check ps-0 custome-form-check">
                    <input class="checkbox_animated check-it" type="checkbox" id="flexCheckDefault9" />
                    <label class="form-check-label" for="flexCheckDefault9">HRX</label>
                    <p class="font-light">(25)</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div class="accordion-item category-color">
          <h2 class="accordion-header" id="headingThree">
            <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree">
              Color
            </button>
          </h2>
          <div id="collapseThree" class="accordion-collapse collapse show" aria-labelledby="headingThree"
            data-bs-parent="#accordionExample">
            <div class="accordion-body">
              <ul class="category-list">
                <li>
                  <a href="javascript:void(0)">
                    <i class="fas fa-check"></i>
                  </a>
                </li>
                <li>
                  <a href="javascript:void(0)">
                    <i class="fas fa-check"></i>
                  </a>
                </li>
                <li>
                  <a href="javascript:void(0)">
                    <i class="fas fa-check"></i>
                  </a>
                </li>
                <li>
                  <a href="javascript:void(0)">
                    <i class="fas fa-check"></i>
                  </a>
                </li>
                <li>
                  <a href="javascript:void(0)">
                    <i class="fas fa-check"></i>
                  </a>
                </li>
                <li>
                  <a href="javascript:void(0)">
                    <i class="fas fa-check"></i>
                  </a>
                </li>
                <li>
                  <a href="javascript:void(0)">
                    <i class="fas fa-check"></i>
                  </a>
                </li>
                <li>
                  <a href="javascript:void(0)">
                    <i class="fas fa-check"></i>
                  </a>
                </li>
                <li>
                  <a href="javascript:void(0)">
                    <i class="fas fa-check"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div class="accordion-item category-price">
          <h2 class="accordion-header" id="headingFour">
            <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour">
              {{ useRuntimeConfig().public.const.Prices }}
            </button>
          </h2>
          <div id="collapseFour" class="accordion-collapse collapse show" aria-labelledby="headingFour"
            data-bs-parent="#accordionExample">
            <div class="accordion-body">
              <ul class="category-list">
                <li>
                  <a href="javascript:void(0)">$55 - $75</a>
                </li>
                <li>
                  <a href="javascript:void(0)">$75 - $88</a>
                </li>
                <li>
                  <a href="javascript:void(0)">$88 - $92</a>
                </li>
                <li>
                  <a href="javascript:void(0)">$92 - $110</a>
                </li>
                <li>
                  <a href="javascript:void(0)">$110 - $150</a>
                </li>
                <li>
                  <a href="javascript:void(0)">$150 - $175</a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div class="accordion-item category-price">
          <h2 class="accordion-header" id="headingFive">
            <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFive">
              Size
            </button>
          </h2>

          <div id="collapseFive" class="accordion-collapse collapse show" aria-labelledby="headingFive"
            data-bs-parent="#accordionExample">
            <div class="accordion-body">
              <ul class="category-list">
                <li>
                  <a href="javascript:void(0)">xs</a>
                </li>
                <li>
                  <a href="javascript:void(0)">sm</a>
                </li>
                <li>
                  <a href="javascript:void(0)">md</a>
                </li>
                <li>
                  <a href="javascript:void(0)">lg</a>
                </li>
                <li>
                  <a href="javascript:void(0)">xl</a>
                </li>
                <li>
                  <a href="javascript:void(0)">xxl</a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div class="accordion-item category-rating">
          <h2 class="accordion-header" id="headingOne">
            <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSix">
              {{ useRuntimeConfig().public.const.Category }}
            </button>
          </h2>
          <div id="collapseSix" class="accordion-collapse collapse show" aria-labelledby="headingOne">
            <div class="accordion-body category-scroll">
              <ul class="category-list">
                <li>
                  <div class="form-check ps-0 custome-form-check">
                    <input class="checkbox_animated check-it" type="checkbox" id="flexCheckDefault10" />
                    <label class="form-check-label" for="flexCheckDefault10">Shirts</label>
                    <p class="font-light">(25)</p>
                  </div>
                </li>
                <li>
                  <div class="form-check ps-0 custome-form-check">
                    <input class="checkbox_animated check-it" type="checkbox" id="flexCheckDefault11" />
                    <label class="form-check-label" for="flexCheckDefault11">T-shirts Solly</label>
                    <p class="font-light">(25)</p>
                  </div>
                </li>
                <li>
                  <div class="form-check ps-0 custome-form-check">
                    <input class="checkbox_animated check-it" type="checkbox" id="flexCheckDefault12" />
                    <label class="form-check-label" for="flexCheckDefault12">Kurtas</label>
                    <p class="font-light">(25)</p>
                  </div>
                </li>
                <li>
                  <div class="form-check ps-0 custome-form-check">
                    <div class="form-check ps-0 custome-form-check">
                      <input class="checkbox_animated check-it" type="checkbox" id="flexCheckDefault13" />
                      <label class="form-check-label" for="flexCheckDefault13">Sweatshirts</label>
                      <p class="font-light">(25)</p>
                    </div>
                  </div>
                </li>
                <li>
                  <div class="form-check ps-0 custome-form-check">
                    <input class="checkbox_animated check-it" type="checkbox" id="flexCheckDefault14" />
                    <label class="form-check-label" for="flexCheckDefault14">Jackets</label>
                    <p class="font-light">(25)</p>
                  </div>
                </li>
                <li>
                  <div class="form-check ps-0 custome-form-check">
                    <input class="checkbox_animated check-it" type="checkbox" id="flexCheckDefault15" />
                    <label class="form-check-label" for="flexCheckDefault15">Blazers</label>
                    <p class="font-light">(25)</p>
                  </div>
                </li>
                <li>
                  <div class="form-check ps-0 custome-form-check">
                    <input class="checkbox_animated check-it" type="checkbox" id="flexCheckDefault16" />
                    <label class="form-check-label" for="flexCheckDefault16">Puma</label>
                    <p class="font-light">(25)</p>
                  </div>
                </li>
                <li>
                  <div class="form-check ps-0 custome-form-check">
                    <input class="checkbox_animated check-it" type="checkbox" id="flexCheckDefault17" />
                    <label class="form-check-label" for="flexCheckDefault17">Nike</label>
                    <p class="font-light">(25)</p>
                  </div>
                </li>
                <li>
                  <div class="form-check ps-0 custome-form-check">
                    <input class="checkbox_animated check-it" type="checkbox" id="flexCheckDefault18" />
                    <label class="form-check-label" for="flexCheckDefault18">HRX</label>
                    <p class="font-light">(25)</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div class="accordion-item">
          <h2 class="accordion-header" id="headingSeven">
            <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSeven">
              {{ useRuntimeConfig().public.const.DiscountRange }}
            </button>
          </h2>
          <div id="collapseSeven" class="accordion-collapse collapse show" aria-labelledby="headingSeven"
            data-bs-parent="#accordionExample">
            <div class="accordion-body">
              <ul class="category-list">
                <li>
                  <div class="form-check ps-0 custome-form-check">
                    <input class="checkbox_animated check-it" type="checkbox" id="flexCheckDefault19" />
                    <label class="form-check-label" for="flexCheckDefault19">5% and above</label>
                  </div>
                </li>
                <li>
                  <div class="form-check ps-0 custome-form-check">
                    <input class="checkbox_animated check-it" type="checkbox" id="flexCheckDefault20" />
                    <label class="form-check-label" for="flexCheckDefault20">10% and above</label>
                  </div>
                </li>
                <li>
                  <div class="form-check ps-0 custome-form-check">
                    <input class="checkbox_animated check-it" type="checkbox" id="flexCheckDefault21" />
                    <label class="form-check-label" for="flexCheckDefault21">20% and above</label>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["filterBarClasses"],
};
</script>

<style lang="scss" scoped>

</style>
