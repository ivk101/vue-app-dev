<template>
<main class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{name: 'main'}">
            Каталог
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{name: 'cart'}">
            Корзина
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            Оформление заказа
          </a>
        </li>
      </ul>

      <h1 class="content__title">
        Корзина
      </h1>
      <span class="content__info">
        {{ totalPosition }} товара
      </span>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST" @submit.prevent="order">
        <div class="cart__field">
          <div class="cart__data">
            <BaseFormText v-model="formData.name"
                          :error="formError.name"
                          title="ФИО"
                          placeholder="Введите ваше полное имя"
            />                        

            <label class="form__label">
              <input class="form__input" v-model="formData.address" type="text" name="address" placeholder="Введите ваш адрес">
              <span class="form__value">Адрес доставки</span>
              <span class="form__error" v-if="formError.address">{{ formError.address }}</span>
            </label>

            <label class="form__label">
              <input class="form__input" v-model="formData.phone" type="tel" name="phone" placeholder="Введите ваш телефон">
              <span class="form__value">Телефон</span>
              <span class="form__error" v-if="formError.phone">{{ formError.phone }}</span>
            </label>

            <label class="form__label">
              <input class="form__input" v-model="formData.email" type="email" name="email" placeholder="Введи ваш Email">
              <span class="form__value">Email</span>
              <span class="form__error" v-if="formError.email">{{ formError.email }}</span>
            </label>

            <BaseFormTextarea title="Комментарий к заказу"
                              v-model="formData.comment"
                              :error="formError.comment"
                              placeholder="Ваши пожелания"
            />

          </div>

          <div class="cart__options">
            <h3 class="cart__title">Доставка</h3>
            <ul class="cart__options options">
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="delivery" value="0" checked="">
                  <span class="options__value">
                    Самовывоз <b>бесплатно</b>
                  </span>
                </label>
              </li>
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="delivery" value="500">
                  <span class="options__value">
                    Курьером <b>500 ₽</b>
                  </span>
                </label>
              </li>
            </ul>

            <h3 class="cart__title">Оплата</h3>
            <ul class="cart__options options">
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="pay" value="card">
                  <span class="options__value">
                    Картой при получении
                  </span>
                </label>
              </li>
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="pay" value="cash">
                  <span class="options__value">
                    Наличными при получении
                  </span>
                </label>
              </li>
            </ul>
          </div>
        </div>

        <div class="cart__block">
          <ul class="cart__orders">
            <li class="cart__order" v-for="item in products">
              <h3>{{ item.product.title }}</h3>
              <b>{{ (item.amount * item.product.price) | numberFormat }} &#8381;</b>
              <span>Артикул: {{ item.product.id || numberFormat }}</span>
            </li>        
          </ul>
          
          <div class="cart__total">
            <p>Доставка: <b>500 &#8381;</b></p>
            <p>Итого: <b>{{ totalPosition }}</b> товара на сумму <b>{{ (totalPrice + 500) | numberFormat }} &#8381;</b></p>
          </div>

          <button class="cart__button button button--primery" type="submit">
            Оформить заказ
          </button>
          <div class="loader" v-if="formSending">Отправляем данные...</div>
        </div>
        <div class="cart__error form__error-block" v-if="formErrorMessage">
          <h4>Заявка не отправлена!</h4>
          <p>
            {{ formErrorMessage }}
          </p>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
import axios from 'axios';
import { API_BASE_URL } from '../config';
import { mapGetters } from "vuex";
import BaseFormText from "@/components/BaseFormText";
import BaseFormTextarea from "@/components/BaseFormTextarea";
import numberFormat from "@/helpers/numberFormat";

export default {

  data() {
    return { 
      formData: {},
      formError: {},
      formSending: false,
      formErrorMessage: ''
    }
  },
  filters: { numberFormat },
  components: { BaseFormText, BaseFormTextarea },
  computed: {
      ...mapGetters({products: 'cartDetailProducts', totalPrice: 'cartTotalPrice', totalPosition: 'cartTotalPosition'})
  },
  methods: {
    order() {
      this.formError = {};
      this.formErrorMessage = ''; 
      this.formSending = true;

      axios
        .post(API_BASE_URL + '/api/orders', {
          ...this.formData
        }, {
          params: {
            userAccessKey: this.$store.state.userAccessKey
          }
        })
        .then(response => {
          this.$store.commit('resetCart');
          this.$store.commit('updateOrderInfo', response.data);
          this.$router.push({name:'orderInfo', params: {id: response.data.id }});
        })
        .catch(error => {
          this.formError = error.response.data.error.request || {};
          this.formErrorMessage = error.response.data.error.message;
        })
        .then(() => this.formSending = false)
    }
  }  
}
</script>

<style>
.loader,
.loader:after {
  border-radius: 50%;
  width: 30px;
  height: 30px;
}
.loader {
  margin: auto;
  margin-top: 20px;
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

