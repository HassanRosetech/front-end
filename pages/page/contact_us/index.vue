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
                  <input
                    v-model="firstName"
                    type="text"
                    class="form-control"
                    id="first"
                    placeholder="Enter Your First Name"
                    required
                  />
                </div>
                <div class="col-md-6">
                  <label for="last" class="form-label">Last Name</label>
                  <input
                    v-model="lastName"
                    type="text"
                    class="form-control"
                    id="last"
                    placeholder="Enter Your Last Name"
                    required
                  />
                </div>
                <div class="col-md-6">
                  <label for="email" class="form-label">{{
                    useRuntimeConfig().public.const.Email
                  }}</label>
                  <input
                    v-model="email"
                    type="email"
                    class="form-control"
                    id="email"
                    placeholder="Enter Your Email Address"
                    required
                  />
                </div>
                <div class="col-md-6">
                  <label for="subject" class="form-label">
                    <!-- {{
                    useRuntimeConfig().public.const.Submit
                  }} -->
                    Subject
                  </label>
                  <input
                    v-model="subject"
                    type="text"
                    class="form-control"
                    id="subject"
                    placeholder="Enter Your Subject"
                  />
                </div>
                <div class="col-12">
                  <label for="comment" class="form-label">{{
                    useRuntimeConfig().public.const.Comment
                  }}</label>
                  <textarea
                    v-model="comment"
                    class="form-control"
                    id="comment"
                    rows="5"
                    required
                  ></textarea>
                </div>

                <div class="col-auto">
                  <button
                    class="btn btn-solid-default"
                    type="button"
                    @click="submitForm"
                    :disabled="isSubmitting"
                  >
                    {{
                      isSubmitting
                        ? "Submitting..."
                        : useRuntimeConfig().public.const.Submit
                    }}
                  </button>
                  <div v-if="successMessage" class="alert alert-success mt-3">
                    {{ successMessage }}
                  </div>
                  <div v-if="errorMessage" class="alert alert-danger mt-3">
                    {{ errorMessage }}
                  </div>
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
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  </layout5>
</template>

<script setup>
import { ref } from "vue";
import layout5 from "~/layout/layouts/layout5.vue";

const firstName = ref("");
const lastName = ref("");
const email = ref("");
const subject = ref("");
const comment = ref("");
const isSubmitting = ref(false);
const successMessage = ref("");
const errorMessage = ref("");

const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email.toLowerCase());
};

const submitForm = async () => {
  errorMessage.value = "";
  successMessage.value = "";

  // Simple field validation
  if (!firstName.value.trim()) {
    errorMessage.value = "First name is required.";
    return;
  }

  if (!lastName.value.trim()) {
    errorMessage.value = "Last name is required.";
    return;
  }

  if (!email.value.trim()) {
    errorMessage.value = "Email is required.";
    return;
  }
  if (!subject.value.trim()) {
    errorMessage.value = "Subject is required.";
    return;
  }

  if (!validateEmail(email.value)) {
    errorMessage.value = "Please enter a valid email address.";
    return;
  }

  if (!comment.value.trim()) {
    errorMessage.value = "Comment is required.";
    return;
  }

  isSubmitting.value = true;

  try {
    const { data, error } = await useFetch("/api/contactus/contact", {
      method: "POST",
      body: {
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value,
        subject: subject.value,
        comment: comment.value,
      },
    });

    if (error.value) {
      errorMessage.value = error.value.statusMessage || "Submission failed.";
    } else {
      successMessage.value = "Your message has been sent!";
      firstName.value = "";
      lastName.value = "";
      email.value = "";
      subject.value = "";
      comment.value = "";
    }
  } catch (e) {
    errorMessage.value = "Something went wrong.";
  } finally {
    isSubmitting.value = false;
  }
};
</script>
