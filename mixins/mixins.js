import { useCartStore } from "~~/store/cart";
import { useClickStore } from "~~/store/clickEvents";
import { useCompareStore } from "~~/store/compare";
import { useProductStore } from "~~/store/products";

export default{
  methods: {
    async addToWishlist(product) {
      var isPresentInWishlist = false;
      await
      (useProductStore().addToWishlist(product)).then((res) => {
          isPresentInWishlist = res;
        });
      if (isPresentInWishlist)
      useClickStore().toggleSuccessfulModal( {image: product.images[0].src,
        message: "Already in Wishlist",
        link: useRuntimeConfig().public.const.wishlistPagePath,});
      
      else
      useClickStore().toggleSuccessfulModal({
        image: product.images[0].src,
        message: "Added to Wishlist",
        link: useRuntimeConfig().public.const.wishlistPagePath,
      })
    },
    toggleCartModal(product) {
      var item = { product: product, quantity: 1 };
      useClickStore().changeProductId(product.id)
      useCartStore().addToCart(item)
    },

    changeQuantityMixin(event, product) {
      let payload = {
        productId: product.id,
        quantity:
          parseInt(event.target.value) > product.inStock
            ? product.inStock
            : parseInt(event.target.value),
      };
      useCartStore().changeQuantityTo(payload)
    },

    addTocompareMixin(product) {
      let payload = {
        image: product.images[0].src,
        message: "Added To compare",
      };
    
      useCompareStore().addToCompare(product.id)
      useClickStore().toggleSuccessfulModal(payload)
    },
  },
};
