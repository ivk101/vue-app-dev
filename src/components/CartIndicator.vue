<template>
  <router-link class="header__cart" href="cart.html" aria-label="Корзина с товарами" :to="{name: 'cart'}">
        <svg width="30" height="21" fill="currentColor">
          <use xlink:href="#icon-cart"></use>
        </svg>
        
        <span class="header__count" aria-label="Количество товаров">

        <div class="loader" v-if="cartLoading">Loading...</div>
        <span v-if="!cartLoading">{{ $store.state.cartProducts.length }}</span>
        </span>
  </router-link>
</template>
<script>
  import { mapGetters } from "vuex"; 

  export default {
    computed: {
      ...mapGetters({cartLoading: 'cartLoading'})      
    }
  }
</script>
<style>
.loader,
.loader:after {
  border-radius: 50%;
  width: 10px;
  height: 10px;
  border: 1px solid yellow;
}
.loader {
  margin: auto;
  font-size: 10px;
  position: relative;
  text-indent: -9999px;
  border-top: 1.1px solid rgba(16,15,15, 0.2);
  border-right: 1.1px solid rgba(16,15,15, 0.2);
  border-bottom: 1.1px solid rgba(16,15,15, 0.2);
  border-left: 1.1px solid #100f0f;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-animation: load8 1.1s infinite linear;
  animation: load8 1.1s infinite linear;
}
@-webkit-keyframes load8 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes load8 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
</style>