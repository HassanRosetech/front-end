<template>
  <div class="col-12">
    <div class="cloth-review">
      <nav>
        <div class="nav nav-tabs" id="nav-tab">
          <button class="nav-link" :class="tabActive['description'] ? 'active' : ''" id="nav-home-tab" type="button"
            @click="setActive('description')">
            Description
          </button>

          <button class="nav-link" id="nav-speci-tab" :class="tabActive['Specifications'] ? 'active' : ''" type="button"
            @click="setActive('Specifications')">
            Specifications
          </button>

          <button class="nav-link" id="nav-size-tab" :class="tabActive['sizingGuide'] ? 'active' : ''" type="button"
            @click="setActive('sizingGuide')">
            Sizing Guide
          </button>

          <button class="nav-link" id="nav-question-tab" :class="tabActive['q&a'] ? 'active' : ''" type="button"
            @click="setActive('q&a')">
            Q & A
          </button>

          <button class="nav-link" id="nav-contact-tab" :class="tabActive['review'] ? 'active' : ''" type="button"
            @click="setActive('review')">
            Review
          </button>
        </div>
      </nav>

      <div class="tab-content" id="nav-tabContent">
        <transition>
          <div class="tab-pane show active" id="desc" v-if="tabActive['description']">
            <div class="shipping-chart">
              <div class="part">
                <h4 class="inner-title mb-2">
                  {{ useRuntimeConfig().public.const.ProductQuestion1 }}
                </h4>
                <p class="font-light">
                  {{ useRuntimeConfig().public.const.ProductDescription1 }}
                </p>
              </div>

              <div class="row g-3 align-items-center">
                <div class="col-lg-8">
                  <p class="font-light">
                    {{ useRuntimeConfig().public.const.ProductDescription2 }}
                  </p>

                  <div class="part mt-3">
                    <h5 class="inner-title mb-2">{{ useRuntimeConfig().public.const.fabric }}:</h5>
                    <p class="font-light">
                      Art silk is manufactured by synthetic fibres like rayon.
                      It's light in weight and is soft on the skin for comfort
                      in summers.Art silk is manufactured by synthetic fibres
                      like rayon. It's light in weight and is soft on the skin
                      for comfort in summers.
                    </p>
                    <p class="font-light">
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever since the 1500s
                    </p>
                  </div>
                </div>

                <div class="col-lg-4">
                  <img src="@/assets/images/fashion/slider/1.jpg" class="img-fluid rounded" alt="" />
                </div>

                <div class="col-lg-8 order-lg-2 mt-4">
                  <p class="font-light">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Ab, autem nemo? Tempora vitae assumenda laudantium unde
                    magni, soluta repudiandae quam, neque voluptate deleniti
                    consequatur laboriosam veritatis? Tempore dolor molestias
                    voluptatum! Minima possimus, pariatur sed, quasi provident
                    dolorum unde molestias, assumenda consequuntur odit magni
                    blanditiis obcaecati? Ea corporis odit dolorem fuga, fugiat
                    soluta consequuntur magni.
                  </p>
                  <div class="part mt-3">
                    <p class="font-light">
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                      Odio repellat numquam perspiciatis eum quis ab, sed dicta
                      tenetur fugit culpa, aut distinctio deserunt quisquam
                      ipsam reprehenderit iure? Adipisci, optio enim? Voluptates
                      voluptatum neque id ad commodi quisquam dolorem vitae
                      inventore quasi! Officiis facere, iusto tempore atque
                      magnam voluptas. Architecto laboriosam deleniti hic
                      veritatis nesciunt. Aut officia quasi inventore et.
                      Debitis.
                    </p>
                  </div>
                </div>

                <div class="col-lg-4 order-lg-0 mt-4">
                  <img src="@/assets/images/fashion/slider/2.jpg" class="img-fluid rounded" alt="" />
                </div>
              </div>
            </div>
          </div>
          <div class="tab-pane show active" id="speci" v-else-if="tabActive['Specifications']">
            <div class="pro mb-4">
              <p class="font-light">
                {{ useRuntimeConfig().public.const.SpecifyDescription }}
              </p>
              <div class="table-responsive">
                <table class="table table-part">
                  <tr>
                    <th>Product Dimensions</th>
                    <td>15 x 15 x 3 cm; 250 Grams</td>
                  </tr>
                  <tr>
                    <th>{{ useRuntimeConfig().public.const.DateFirstAvailable }}</th>
                    <td>5 April 2021</td>
                  </tr>
                  <tr>
                    <th>Manufacturer</th>
                    <td>Aditya Birla Fashion and Retail Limited</td>
                  </tr>
                  <tr>
                    <th>ASIN</th>
                    <td>B06Y28LCDN</td>
                  </tr>
                  <tr>
                    <th>Item model number</th>
                    <td>AMKP317G04244</td>
                  </tr>
                  <tr>
                    <th>{{ useRuntimeConfig().public.const.Department }}</th>
                    <td>Men</td>
                  </tr>
                  <tr>
                    <th>Item Weight</th>
                    <td>250 G</td>
                  </tr>
                  <tr>
                    <th>Item Dimensions LxWxH</th>
                    <td>15 x 15 x 3 Centimeters</td>
                  </tr>
                  <tr>
                    <th>Net Quantity</th>
                    <td>1 U</td>
                  </tr>
                  <tr>
                    <th>Included Components‏</th>
                    <td>1-T-shirt</td>
                  </tr>
                  <tr>
                    <th>{{ useRuntimeConfig().public.const.GenericName }}</th>
                    <td>T-shirt</td>
                  </tr>
                </table>
              </div>
            </div>
          </div>

          <div class="tab-pane overflow-auto show active" id="nav-guide" v-else-if="tabActive['sizingGuide']">
            <div class="table-responsive">
              <table class="table table-pane mb-0">
                <tbody>
                  <tr class="bg-color">
                    <th class="my-2">US Sizes</th>
                    <td>6</td>
                    <td>6.5</td>
                    <td>7</td>
                    <td>8</td>
                    <td>8.5</td>
                    <td>9</td>
                    <td>9.5</td>
                    <td>10</td>
                    <td>10.5</td>
                    <td>11</td>
                  </tr>

                  <tr>
                    <th>Euro Sizes</th>
                    <td>39</td>
                    <td>39</td>
                    <td>40</td>
                    <td>40-41</td>
                    <td>41</td>
                    <td>41-42</td>
                    <td>42</td>
                    <td>42-43</td>
                    <td>43</td>
                    <td>43-44</td>
                  </tr>

                  <tr class="bg-color">
                    <th>UK Sizes</th>
                    <td>5.5</td>
                    <td>6</td>
                    <td>6.5</td>
                    <td>7</td>
                    <td>7.5</td>
                    <td>8</td>
                    <td>8.5</td>
                    <td>9</td>
                    <td>10.5</td>
                    <td>11</td>
                  </tr>

                  <tr>
                    <th>Inches</th>
                    <td>9.25"</td>
                    <td>9.5"</td>
                    <td>9.625"</td>
                    <td>9.75"</td>
                    <td>9.9735"</td>
                    <td>10.125"</td>
                    <td>10.25"</td>
                    <td>10.5"</td>
                    <td>10.765"</td>
                    <td>10.85</td>
                  </tr>

                  <tr class="bg-color">
                    <th>CM</th>
                    <td>23.5</td>
                    <td>24.1</td>
                    <td>24.4</td>
                    <td>25.4</td>
                    <td>25.7</td>
                    <td>26</td>
                    <td>26.7</td>
                    <td>27</td>
                    <td>27.3</td>
                    <td>27.5</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div class="tab-pane show active" id="question" v-else-if="tabActive['q&a']">
            <div class="question-answer">
              <ul>
                <li>
                  <div class="que">
                    <i class="fas fa-question"></i>
                    <div class="que-details">
                      <h6>Is it compatible with all WordPress themes?</h6>
                      <p class="font-light">
                        If you want to see a demonstration version of the
                        premium plugin, you can see that in this page. If you
                        want to see a demonstration version of the premium
                        plugin, you can see that in this page. If you want to
                        see a demonstration version of the premium plugin, you
                        can see that in this page.
                      </p>
                    </div>
                  </div>
                </li>

                <li>
                  <div class="que">
                    <i class="fas fa-question"></i>
                    <div class="que-details">
                      <h6>How can I try the full-featured plugin?</h6>
                      <p class="font-light">
                        Compatibility with all themes is impossible, because
                        they are too many, but generally if themes are developed
                        according to WordPress and WooCommerce guidelines, YITH
                        plugins are compatible with them. Compatibility with all
                        themes is impossible, because they are too many, but
                        generally if themes are developed according to WordPress
                        and WooCommerce guidelines, YITH plugins are compatible
                        with them.
                      </p>
                    </div>
                  </div>
                </li>

                <li>
                  <div class="que">
                    <i class="fas fa-question"></i>
                    <div class="que-details">
                      <h6>Is it compatible with all WordPress themes?</h6>
                      <p class="font-light">
                        If you want to see a demonstration version of the
                        premium plugin, you can see that in this page. If you
                        want to see a demonstration version of the premium
                        plugin, you can see that in this page. If you want to
                        see a demonstration version of the premium plugin, you
                        can see that in this page.
                      </p>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div class="tab-pane show active" id="review" v-else-if="tabActive['review']">
            <div class="row g-4">
              <div class="col-lg-4">
                <div class="customer-rating">
                  <h2>Customer reviews</h2>
                  <ul class="rating my-2 d-inline-block">
                    <li>
                      <i class="fas fa-star theme-color"></i>
                    </li>
                    <li>
                      <i class="fas fa-star theme-color"></i>
                    </li>
                    <li>
                      <i class="fas fa-star theme-color"></i>
                    </li>
                    <li>
                      <i class="fas fa-star"></i>
                    </li>
                    <li>
                      <i class="fas fa-star"></i>
                    </li>
                  </ul>

                  <div class="global-rating">
                    <h5 class="font-light">{{ useRuntimeConfig().public.const.numRatings }}</h5>
                  </div>

                  <ul class="rating-progess">
                    <li>
                      <h5 class="me-3">5 Star</h5>
                      <div class="progress">
                        <div class="progress-bar" role="progressbar" style="width: 78%" aria-valuenow="50"
                          aria-valuemin="0" aria-valuemax="100"></div>
                      </div>
                      <h5 class="ms-3">78%</h5>
                    </li>
                    <li>
                      <h5 class="me-3">4 Star</h5>
                      <div class="progress">
                        <div class="progress-bar" role="progressbar" style="width: 62%" aria-valuenow="50"
                          aria-valuemin="0" aria-valuemax="100"></div>
                      </div>
                      <h5 class="ms-3">62%</h5>
                    </li>
                    <li>
                      <h5 class="me-3">3 Star</h5>
                      <div class="progress">
                        <div class="progress-bar" role="progressbar" style="width: 44%" aria-valuenow="50"
                          aria-valuemin="0" aria-valuemax="100"></div>
                      </div>
                      <h5 class="ms-3">44%</h5>
                    </li>
                    <li>
                      <h5 class="me-3">2 Star</h5>
                      <div class="progress">
                        <div class="progress-bar" role="progressbar" style="width: 30%" aria-valuenow="50"
                          aria-valuemin="0" aria-valuemax="100"></div>
                      </div>
                      <h5 class="ms-3">30%</h5>
                    </li>
                    <li>
                      <h5 class="me-3">1 Star</h5>
                      <div class="progress">
                        <div class="progress-bar" role="progressbar" style="width: 18%" aria-valuenow="50"
                          aria-valuemin="0" aria-valuemax="100"></div>
                      </div>
                      <h5 class="ms-3">18%</h5>
                    </li>
                  </ul>
                </div>
              </div>

              <div class="col-lg-8">
                <p class="d-inline-block me-2">{{ useRuntimeConfig().public.const.Rating }}</p>
                <ul class="rating mb-3 d-inline-block">
                  <li>
                    <i class="fas fa-star theme-color"></i>
                  </li>
                  <li>
                    <i class="fas fa-star theme-color"></i>
                  </li>
                  <li>
                    <i class="fas fa-star theme-color"></i>
                  </li>
                  <li>
                    <i class="fas fa-star"></i>
                  </li>
                  <li>
                    <i class="fas fa-star"></i>
                  </li>
                </ul>
                <div class="review-box">
                  <form class="row g-4">
                    <div class="col-12 col-md-6">
                      <label class="mb-1" for="name">Name</label>
                      <input type="text" class="form-control" id="name" placeholder="Enter your name" required />
                    </div>

                    <div class="col-12 col-md-6">
                      <label class="mb-1" for="id">Email Address</label>
                      <input type="email" class="form-control" id="id" placeholder="Email Address" required />
                    </div>

                    <div class="col-12">
                      <label class="mb-1" for="comments">{{
                        useRuntimeConfig().public.const.Comments
                      }}</label>
                      <textarea class="form-control" placeholder="Leave a comment here" id="comments"
                        style="height: 100px" required></textarea>
                    </div>

                    <div class="col-12">
                      <button type="submit" class="btn default-light-theme default-theme default-theme-2">
                        {{ useRuntimeConfig().public.const.Submit }}
                      </button>
                    </div>
                  </form>
                </div>
              </div>

              <div class="col-12 mt-4">
                <div class="customer-review-box">
                  <h4>{{ useRuntimeConfig().public.const.Customerreviews }}</h4>

                  <div class="customer-section">
                    <div class="customer-profile">
                      <img src="@/assets/images/inner-page/review-image/1.jpg" class="img-fluid" alt="" />
                    </div>

                    <div class="customer-details">
                      <h5>Mike K</h5>
                      <ul class="rating my-2 d-inline-block">
                        <li>
                          <i class="fas fa-star theme-color"></i>
                        </li>
                        <li>
                          <i class="fas fa-star theme-color"></i>
                        </li>
                        <li>
                          <i class="fas fa-star theme-color"></i>
                        </li>
                        <li>
                          <i class="fas fa-star"></i>
                        </li>
                        <li>
                          <i class="fas fa-star"></i>
                        </li>
                      </ul>
                      <p class="font-light">
                        I purchased my Tab S2 at Best Buy but I wanted to share
                        my thoughts on Amazon. I'm not going to go over specs
                        and such since you can read those in a hundred other
                        places. Though I will say that the "new" version is
                        preloaded with Marshmallow and now uses a Qualcomm
                        octacore processor in place of the Exynos that shipped
                        with the first gen.
                      </p>

                      <p class="date-custo font-light">
                        - Sep 08, 2021 <span></span>
                      </p>
                    </div>
                  </div>

                  <div class="customer-section">
                    <div class="customer-profile">
                      <img src="@/assets/images/inner-page/review-image/2.jpg" class="img-fluid" alt="" />
                    </div>

                    <div class="customer-details">
                      <h5>Norwalker</h5>
                      <ul class="rating my-2 d-inline-block">
                        <li>
                          <i class="fas fa-star theme-color"></i>
                        </li>
                        <li>
                          <i class="fas fa-star theme-color"></i>
                        </li>
                        <li>
                          <i class="fas fa-star theme-color"></i>
                        </li>
                        <li>
                          <i class="fas fa-star"></i>
                        </li>
                        <li>
                          <i class="fas fa-star"></i>
                        </li>
                      </ul>
                      <p class="font-light">
                        Pros: Nice large(9.7") screen. Bright colors. Easy to
                        setup and get started. Arrived on time. Cons: a bit slow
                        on response, but expected as tablet is 2 generations
                        old. But works fine and good value for the money.
                      </p>

                      <p class="date-custo font-light">
                        - Sep 08, 2021 <span></span>
                      </p>
                    </div>
                  </div>

                  <div class="customer-section">
                    <div class="customer-profile">
                      <img src="@/assets/images/inner-page/review-image/3.jpg" class="img-fluid" alt="" />
                    </div>

                    <div class="customer-details">
                      <h5>B. Perdue</h5>
                      <ul class="rating my-2 d-inline-block">
                        <li>
                          <i class="fas fa-star theme-color"></i>
                        </li>
                        <li>
                          <i class="fas fa-star theme-color"></i>
                        </li>
                        <li>
                          <i class="fas fa-star theme-color"></i>
                        </li>
                        <li>
                          <i class="fas fa-star"></i>
                        </li>
                        <li>
                          <i class="fas fa-star"></i>
                        </li>
                      </ul>
                      <p class="font-light">
                        Love the processor speed and the sensitivity of the
                        touch screen.
                      </p>

                      <p class="date-custo font-light">
                        - Sep 08, 2021 <span></span>
                      </p>
                    </div>
                  </div>

                  <div class="customer-section">
                    <div class="customer-profile">
                      <img src="@/assets/images/inner-page/review-image/4.jpg" class="img-fluid" alt="" />
                    </div>

                    <div class="customer-details">
                      <h5>MSL</h5>
                      <ul class="rating my-2 d-inline-block">
                        <li>
                          <i class="fas fa-star theme-color"></i>
                        </li>
                        <li>
                          <i class="fas fa-star theme-color"></i>
                        </li>
                        <li>
                          <i class="fas fa-star theme-color"></i>
                        </li>
                        <li>
                          <i class="fas fa-star"></i>
                        </li>
                        <li>
                          <i class="fas fa-star"></i>
                        </li>
                      </ul>
                      <p class="font-light">
                        I purchased the Tablet May 2017 and now April 2019 I
                        have to charge it everyday. I don't watch movies on
                        it..just play a game or two while on lunch. I guess now
                        I need to power it down for future use.
                      </p>

                      <p class="date-custo font-light">
                        - Sep 08, 2021 <span></span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tabActive: { description: true },
    };
  },
  methods: {
    setActive(tab) {
      this.tabActive = {};
      this.tabActive[tab] = true;
    },
  },
};
</script>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: all 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
