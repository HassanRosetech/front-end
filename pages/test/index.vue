<template>
  <h1>Test2</h1>
  <button @click="startPayment">Pay Now</button>
</template>

<script setup>
const startPayment = async () => {
  const res = await fetch("/api/initiate-payment");
  const data = await res.json();
  if (data && data.operations) {
    const redirectUrl = data.operations.find(
      (op) => op.rel === "redirect-authorization"
    ).href;
    window.location.href = redirectUrl;
  }
};
</script>
