<template>
  <div class="
      tab-pane
      fade
      table-dashboard
      dashboard
      wish-list-section
      show
      active
    " id="wishlist">
    <div class="box-head mb-3">
      <h3>My Wishlish</h3>
    </div>
    <div class="table-responsive">
      <table class="table cart-table">
        <thead>
          <tr class="table-head">
            <th scope="col">image</th>
            <th scope="col">Order Id</th>
            <th scope="col">Product Details</th>
            <th scope="col">Price</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(product, index) in wishlistData">
            <td>
              <a href="javascript:void(0)" @click.prevent="$router.push('/product/product_left_sidebar')">
                <img :src="getImageUrl(product.image)" alt="" />
              </a>
            </td>
            <td>
              <p class="m-0">{{ product.id }}</p>
            </td>
            <td>
              <p class="fs-6 m-0">{{ product.name }}</p>
            </td>
            <td>
              <p class="theme-color fs-6">{{ product.price }}</p>
            </td>
            <td>
              <a @click.prevent="$router.push('/page/cart')" class="btn btn-solid-default btn-sm fw-bold">Move to
                Cart</a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      wishlistData: [
        {
          image: 'fashion/product/front/1.jpg',
          id: '#125021',
          name: "Outwear & Coats",
          price: '$49.54'
        },
        {
          image: 'fashion/product/front/2.jpg',
          id: '#125367',
          name: "Outwear & Coats",
          price: '$49.54'
        },
        {
          image: 'fashion/product/front/3.jpg',
          id: '#125948',
          name: "Men's Sweatshirt",
          price: '$49.54'
        },
        {
          image: 'fashion/product/front/4.jpg',
          id: '#127569',
          name: "Men's Hoodie t-shirt",
          price: '$49.54'
        },
        {
          image: 'fashion/product/front/5.jpg',
          id: '#127569',
          name: "Men's Hoodie t-shirt",
          price: '$49.54'
        },
        {
          image: 'fashion/product/front/6.jpg',
          id: '#125021',
          name: "Men's Sweatshirt",
          price: '$49.54'
        },
      ]
    }
  }
};
</script>