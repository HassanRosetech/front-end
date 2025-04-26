<script setup lang="ts">
const hanko = useHanko();
function logout() {
  hanko!.user.logout();
}
</script>
<template>
  <button @click="logout">Log me out</button>
  <br />
  <br />
  <br />
  <br />
  <NuxtLink to="/">Back To Home </NuxtLink>
</template>
<style>
body {
  text-align: -webkit-center;
}
</style>
