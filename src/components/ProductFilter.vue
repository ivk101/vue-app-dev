<template>
  <aside class="filter">
        <h2 class="filter__title">Фильтры</h2>

        <form class="filter__form form" action="#" method="get" @submit.prevent="submit">
          <fieldset class="form__block">
            <legend class="form__legend">Цена</legend>
            <label class="form__label form__label--price">
              <input class="form__input" type="text" name="min-price" v-model.number="currentPriceFrom">
              <span class="form__value">От</span>
            </label>
            <label class="form__label form__label--price">
              <input class="form__input" type="text" name="max-price" v-model.number="currentPriceTo">
              <span class="form__value">До</span>
            </label>
          </fieldset>

          <fieldset class="form__block">
            <legend class="form__legend">Категория</legend>
            <label class="form__label form__label--select">
              <select class="form__select" type="text" name="category" v-model.number="currentCategoryId">
                <option value="0">Все категории</option>
                <option :value="category.id" v-for="category in categories" 
                        :key="category.id"> {{ category.title }}</option>
              </select>
            </label>
          </fieldset>

          <fieldset class="form__block">
            <legend class="form__legend">Цвет</legend>
            <ul class="colors">
                <li class="colors__item" 
                    v-for="color in colors" 
                    :key="color.title + color.id" 
                    >
                 <label class="colors__label">
                   <input class="colors__radio sr-only" type="radio" name="color" 
                      :value="color.code"
                      v-model="currentColorId">
                   <span class="colors__value" :style="{'background-color': color.code}">
                   </span>
                 </label>
                </li>                
            </ul>
          </fieldset>

          <button class="filter__submit button button--primery" type="submit">
            Применить
          </button>
          <button class="filter__reset button button--second" type="button" @click.prevent="reset">
            Сбросить
          </button>
        </form>
      </aside>
</template>
<script>
  import categories from "./../data/categories";
  import colors from "./../data/colors";

  export default {
  	data() {
  		return {
  			currentPriceFrom: 0,
  			currentPriceTo: 0,
  			currentCategoryId: 0,
  			currentColorId: ''
  		}
  	},
  	props: ['priceFrom', 'priceTo', 'categoryId', 'colorId'],
  	methods: {
  		submit() {
  			this.$emit('update:priceFrom', this.currentPriceFrom);
  			this.$emit('update:priceTo', this.currentPriceTo);
  			this.$emit('update:categoryId', this.currentCategoryId);
  			this.$emit('update:colorId', this.currentColorId);
  		},
  		reset() {
  			this.$emit('update:priceFrom', 0);
  			this.$emit('update:priceTo', 0);
  			this.$emit('update:categoryId', 0);
  			this.$emit('update:colorId', 0);
  		}
  	},
  	computed: {  		
  		categories() {
  			return categories;
  		},
  		colors() {
  			return colors;
  		}
  	},
  	watch: {
  		priceFrom(value) {
  			this.currentPriceFrom = value;
  		},
  		priceTo(value) {
  			this.currentPriceTo = value;
  		},
  		categoryId(value) {
  			this.currentCategoryId = value;
  		},
  		colorId(value) {
  			this.currentColorId = value;
  		},
  	}
  }
</script>
