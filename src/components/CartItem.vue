<template>
  <li class="cart__item product">            
              <div class="product__pic">
                <img :src="item.product.image" width="120" height="120" srcset="img/phone-square-3@2x.jpg 2x" :alt="item.product.title">
              </div>
              <h3 class="product__title">
                {{ item.product.title }}
              </h3>              
              <span class="product__code">
                Артикул: {{ item.product.id }}
              </span>

              <div class="product__counter form__counter">
                <button type="button" aria-label="Убрать один товар" @click="decrementAmount">
                  <svg width="10" height="10" fill="currentColor">
                    <use xlink:href="#icon-minus"></use>
                  </svg>
                </button>

                <input type="text" v-model.number="amount" name="count">

                <button type="button" aria-label="Добавить один товар" @click="incrementAmount">
                  <svg width="10" height="10" fill="currentColor">
                    <use xlink:href="#icon-plus"></use>
                  </svg>
                </button>
              </div>

              <b class="product__price">
                <p>{{ (item.amount * item.product.price) | numberFormat }} &#8381;</p>
              </b>

              <button class="product__del button-del" type="button" aria-label="Удалить товар из корзины"
                      @click.prevent="deleteCartProduct(item.productId)">
                <svg width="20" height="20" fill="currentColor">
                  <use xlink:href="#icon-close"></use>
                </svg>
              </button>
            </li>
</template> 

<script>
    import numberFormat from "@/helpers/numberFormat";
    import { mapMutations, mapActions } from 'vuex';

    export default {
    	props: ['item'], 
    	filters: { numberFormat },
    	computed: {
    		amount: {
    			get() { 
    				return this.item.amount;  
    			},
    			set(value) {
    				this.$store.dispatch('updateCartProductAmount', {
    					productId: this.item.productId,
    					amount: value
    				})
    			}
    		}    		
    	},
    	methods: {
        ...mapActions(['deleteCartProduct']),
        
    		incrementAmount() {
    			this.$store.commit('updateCartProductAmount', {
    					productId: this.item.productId,
    					amount: ++this.amount
    				})
    		},
    		decrementAmount() {
    			if(this.amount > 1) {
    			this.$store.commit('updateCartProductAmount', {
    					productId: this.item.productId,
    					amount: --this.amount
    				})
    		    }
    		}
    	}
    }
</script>