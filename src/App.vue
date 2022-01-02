<template>
  <div>
  <Header />  
  <router-view />    
  <Footer />
  </div>
</template>

<script>
  import CartIndicator from "@/components/CartIndicator";
  import Header from "./components/Header.vue";
  import Footer from "@/components/Footer";
  import { mapActions, mapMutations } from 'vuex';
  
  export default {
    components: { CartIndicator, Header, Footer },
    created() {
      const userAccessKey = localStorage.getItem('userAccessKey');
      if(userAccessKey) {
        this.updateUserAccessKey(userAccessKey);
      }
      this.loadCart();
    },
    methods: {
      ...mapActions(['loadCart']),
      ...mapMutations(['updateUserAccessKey'])
    }
  }
</script>
