<template>
  <div class="product-count">
    <ul>
      <li>
        <img src="/images/gif/fire.gif" class="img-fluid" alt="image" />
        <span class="p-counter">37 &nbsp;</span>
        <span class="lang">{{ useRuntimeConfig().public.const.orderIn }}</span>
      </li>
      <li>
        <img src="/images/gif/person.gif" class="img-fluid user_img" alt="image" />
        <span class="p-counter">44 &nbsp;</span>
        <span class="lang">{{ useRuntimeConfig().public.const.activeView }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {};
</script>
