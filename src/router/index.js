import Vue from 'vue';
import VueRouter from 'vue-router';
import MainPage from "@/pages/MainPage"; 
import ProductPage from "@/pages/ProductPage";
import CartPage from "@/pages/CartPage";
import OrderPage from "@/pages/OrderPage";
import OrderInfoPage from "@/pages/OrderInfoPage";
import NotFoundPage from "@/pages/NotFoundPage";

Vue.use(VueRouter);

const routes = [
  {
  	name: 'main',
  	component: MainPage,
  	path: '/' 
  },
  {
  	name: 'product',
  	component: ProductPage,
  	path: '/product/:id'
  },
  {
    name: 'cart',
    component: CartPage,
    path: '/cart'
  },
  {
    name: 'order',
    component: OrderPage,
    path: '/order'
  },
  {
    name: 'orderInfo',
    component: OrderInfoPage,
    path: '/order/:id'
  },
  {
  	name: 'notFound',
  	component: NotFoundPage,
  	path: '*'
  }
]
const router = new VueRouter({
	routes
});

export default router;