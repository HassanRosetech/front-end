<template>
  <div class="modal fade newletter-modal" id="newsletter">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <button
            type="button"
            class="btn-close"
            aria-label="Close"
            data-bs-dismiss="modal"
          ></button>
        </div>
        <div class="modal-body">
          <img
            :src="getImageUrl('newletter-icon.png')"
            class="img-fluid blur-up lazyload"
            alt=""
          />
          <div class="modal-title">
            <h2 class="tt-title">Sign up for our Newsletter!</h2>
            <p class="font-light">
              Never miss any new updates or products we reveal, stay up to date.
            </p>
            <p class="font-light">Oh, and it's free!</p>

            <div class="input-group mb-3">
              <input
                placeholder="Email"
                v-model="userEmail"
                class="form-control"
                type="email"
              />
            </div>
            <p class="text-success" v-if="isValid && submitted">
              Thanks for subscribing!
            </p>
            <p class="text-danger" v-if="submitted && !isValid">
              Email is Invalid!
            </p>

            <div class="cancel-button text-center">
              <button
                v-if="!isValid"
                class="btn btn-solid-default w-100"
                type="submit"
                @click.prevent="submitted = true"
              >
                {{ useRuntimeConfig().public.const.Submit }}
              </button>
              <button
                v-else
                @click="setLocalNewsLetter"
                class="btn btn-solid-default w-100"
                data-bs-dismiss="modal"
                type="submit"
              >
                {{ useRuntimeConfig().public.const.Submit }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userEmail: "",
      isValid: false,
      submitted: false,
    };
  },
  computed: {
    showNewsLetterModal() {
      return useClickStore().showNewsLetterModal;
    },
  },
  watch: {
    userEmail(email) {
      var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (email.match(mailformat)) {
        this.isValid = true;
      } else {
        this.isValid = false;
      }
    },
  },
  methods: {
    async setLocalNewsLetter() {
      this.submitted = true;

      if (!this.isValid) return;

      try {
        const response = await $fetch("/api/newsletter/subscribe", {
          method: "POST",
          body: { email: this.userEmail },
        });

        if (response.success) {
          useCookie("newsLetterSet").value = true;
          // Optionally show a success message here
          console.log("Subscribed successfully:", response.data);
          alert("Thanks for subscribing!");
        } else {
          // Handle unexpected response
          console.error("Unexpected response:", response);
        }
      } catch (error) {
        console.error("Subscription error:", error);
        // Optionally show error to user
      }
    },
  },
};
</script>

<style></style>
