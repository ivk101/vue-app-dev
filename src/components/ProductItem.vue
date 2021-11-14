<template>
<li class="catalog__item">
            <a class="catalog__pic" href="#">
              <img :src="product.image" :alt="product.title">
            </a>

            <h3 class="catalog__title">
              <a href="#">
                {{ product.title }}
              </a>
            </h3>

            <span class="catalog__price">
              {{ product.price + ' &#8381;'}}
            </span>

            <ul class="colors colors--black">
              <li class="colors__item" v-for="col in product.colors" :key="col">
                <label class="colors__label">
                  <input class="colors__radio sr-only" type="radio"
                         :value="col" v-model="color">
                  <span class="colors__value" :style="{'background-color': col}">
                  </span>
                </label>
              </li>
            </ul>
          </li>
</template>

<script>
export default {
  data() {
    return {
      color: '#73B6EA'
    };
  },
	props: ['product']
}
</script>