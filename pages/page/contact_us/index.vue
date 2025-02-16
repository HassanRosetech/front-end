<template>
  <Head>
    <Title>Contact Us</Title>
  </Head>
  <layout5 pageName="Contact Us" parent="Contact Us">
    <section class="contact-section">
      <div class="container">
        <div class="row g-4">
          <div class="col-lg-7">
            <div class="materialContainer">
              <div class="material-details">
                <div class="title title1 title-effect mb-1 title-left">
                  <h2>{{ useRuntimeConfig().public.const.Contactus }}</h2>
                  <p class="ms-0 w-100">
                    {{ useRuntimeConfig().public.const.EmailRequired }}
                  </p>
                </div>
              </div>
              <div class="row g-4 mt-md-1 mt-2">
                <div class="col-md-6">
                  <label for="first" class="form-label">First Name</label>
                  <input type="text" class="form-control" id="first" placeholder="Enter Your First Name" required />
                </div>
                <div class="col-md-6">
                  <label for="last" class="form-label">Last Name</label>
                  <input type="text" class="form-control" id="last" placeholder="Enter Your Last Name" required />
                </div>
                <div class="col-md-6">
                  <label for="email" class="form-label">{{
                    useRuntimeConfig().public.const.Email
                  }}</label>
                  <input type="email" class="form-control" id="email" placeholder="Enter Your Email Address" required />
                </div>
                <div class="col-md-6">
                  <label for="email2" class="form-label">{{
                    useRuntimeConfig().public.const.Submit
                  }}</label>
                  <input type="email" class="form-control" id="email2" placeholder="Enter Your Confirm Email Address"
                    required />
                </div>
                <div class="col-12">
                  <label for="comment" class="form-label">{{
                    useRuntimeConfig().public.const.Comment
                  }}</label>
                  <textarea class="form-control" id="comment" rows="5" required></textarea>
                </div>

                <div class="col-auto">
                  <button class="btn btn-solid-default" type="submit">
                    {{ useRuntimeConfig().public.const.Submit }}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <PageContactUsSideSection />
        </div>
      </div>
    </section>
    <section class="contact-section">
      <div class="container-fluid">
        <div class="row gy-4">
          <div class="col-12 p-0">
            <div class="location-map">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7227.225249699896!2d55.17263937326456!3d25.081115462415855!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f43496ad9c645%3A0xbde66e5084295162!2sDubai%20-%20United%20Arab%20Emirates!5e0!3m2!1sen!2sin!4v1632538854272!5m2!1sen!2sin"
                loading="lazy"></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  </layout5>
</template>

<script>
import layout5 from "~/layout/layouts/layout5.vue";
export default {
  components: {
    layout5,
  },
  head() {
    return {
      title: "Contact Us",
    };
  },
};
</script>