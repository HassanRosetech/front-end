<template>
  <div class="
      tab-pane
      fade
      table-dashboard
      dashboard
      wish-list-section
      show
      active
    " id="order">
    <div class="box-head mb-3">
      <h3>My Order</h3>
    </div>
    <div class="table-responsive">
      <table class="table cart-table">
        <thead>
          <tr class="table-head">
            <th scope="col">image</th>
            <th scope="col">Order Id</th>
            <th scope="col">Product Details</th>
            <th scope="col">Status</th>
            <th scope="col">Price</th>
            <th scope="col">View</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(order, index) in orders" :key="index">
            <td>
              <a href="javascript:void(0)" @click.prevent="$router.push('/product/product_left_sidebar')">
                <img :src="getImageUrl(order.image)" alt="" />
              </a>
            </td>
            <td>
              <p class="mt-0">{{ order.orderId }}</p>
            </td>
            <td>
              <p class="fs-6 m-0">{{ order.product }}</p>
            </td>
            <td>
              <p class="success-button btn btn-sm">{{ order.status }}</p>
            </td>
            <td>
              <p class="theme-color fs-6">{{ order.price }}</p>
            </td>
            <td>
              <a href="javascript:void(0)">
                <i class="far fa-eye"></i>
              </a>
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
      orders: [
        {
          image: 'fashion/product/front/1.jpg',
          orderId: '#125021',
          product: 'Outwear & Coats',
          status: 'Shipped',
          price: '$49.54',
        },
        {
          image: 'fashion/product/front/2.jpg',
          orderId: '#125367',
          product: 'Outwear & Coats',
          status: 'Pending',
          price: '$49.54',
        },
        {
          image: 'fashion/product/front/3.jpg',
          orderId: '#125948',
          product: "Men's Sweatshirt",
          status: 'Shipped',
          price: '$49.54',
        },
        {
          image: 'fashion/product/front/4.jpg',
          orderId: '#127569',
          product: "Men's Hoodie t-shirt",
          status: 'Shipped',
          price: '$49.54',
        },
        {
          image: 'fashion/product/front/5.jpg',
          orderId: '#125753',
          product: "Men's Hoodie t-shirt",
          status: 'Canceled',
          price: '$49.54',
        },
        {
          image: 'fashion/product/front/6.jpg',
          orderId: '#125021',
          product: "Men's Sweatshirt",
          status: 'Canceled',
          price: '$49.54',
        },
      ]
    }
  }
};
</script>