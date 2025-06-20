<script setup>
const createPayment = async () => {
  const response = await $fetch("/api/payment");
  const redirectUrl = response.operations.find(
    (op) => op.rel === "redirect-authorization"
  ).href;
  window.location.href = redirectUrl; // Redirect user to Swedbank payment UI
};
</script>

<template>
  <button @click="createPayment">Pay with Swedbank (Test)</button>
</template>
