<script setup lang="ts">
function afterLogin() {
  navigateTo("/page/user_dashboard");
}
</script>
<template>
  <hanko-auth />
  <hanko-events @onSessionCreated="afterLogin()" />
</template>
<style>
body {
  text-align: -webkit-center;
}
</style>
