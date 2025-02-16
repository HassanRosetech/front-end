<template>
  <div class="share-icons">
    {{ useRuntimeConfig().public.const.sharewith }}

    <ul class="share-icons p-0">
      <li>
        <a target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=#url">
          <img :src="getImageUrl('social-icon/4.png')" class="img-fluid" alt="social icon" />
        </a>
      </li>
      <li>
        <a href="https://www.google.co.in/">
          <img :src="getImageUrl('social-icon/5.png')" class="img-fluid" alt="social icon" />
        </a>
      </li>
      <li>
        <a href="http://www.twitter.com/share">
          <img :src="getImageUrl('social-icon/6.png')" class="img-fluid" alt="social icon" />
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {};
</script>
