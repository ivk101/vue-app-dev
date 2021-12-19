<template>
<li class="catalog__item">
            <router-link class="catalog__pic" :to="{name:'product', params: {id: product.id}}"> 
              <img :src="product.image" :alt="product.title">
            </router-link>

            <h3 class="catalog__title">
              <a href="#">
                {{ product.title }} 
              </a>  
            </h3>

            <span class="catalog__price">
              {{ product.price | numberFormat }} &#8381;
            </span> 

            <ul class="colors colors--black">
              <li class="colors__item" v-for="col in product.colors" :key="col.code">
                <label class="colors__label">
                  <input class="colors__radio sr-only" type="radio"
                         :value="col.code">
                  <span class="colors__value" :style="{'background-color': col.code}">
                  </span>
                </label>
              </li>
            </ul>
          </li>
</template>

<script>
import gotoPage from '@/helpers/gotoPage';
import numberFormat from '@/helpers/numberFormat';

export default {
  filters: {
    numberFormat
  },
	props: ['product'],
  methods: {    
    gotoPage
  }
}
</script>