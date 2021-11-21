<template>
  <component :is="currentPageComponent" :page-params="currentPageParams" 
            @gotoPage="(pageName, pageParams) => gotoPage(pageName, pageParams)" />  
</template>

<script>
  import MainPage from "./pages/MainPage";
  import ProductPage from "./pages/ProductPage";
  import NotFoundPage from "./pages/NotFoundPage";
  import eventBus from "./eventBus";

  const routes = {
    main: 'MainPage',
    product: 'ProductPage'
  }

  export default {
    name: 'App',
    data() {
      return {
        currentPage: 'main',
        currentPageParams: {}
      }
    },
    methods: {
      gotoPage(pageName, pageParams) {
        this.currentPage = pageName;
        this.currentPageParams = pageParams || {};
      }
    },
    components: {MainPage, ProductPage, NotFoundPage},
    created() {
      eventBus.$on('gotoPage', (pageName, pageParams) => this.gotoPage(pageName, pageParams))
    },
    computed: {
      currentPageComponent() {
        return routes[this.currentPage] || 'NotFoundPage';
      }
    }
  }
</script>
