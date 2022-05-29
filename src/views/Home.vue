<template>
  <div class="container home">
    <section class="hero is-warning is-bold mb-6">
      <div class="hero-body has-text-centered">
        <p class="title has-text-success has-text-centered mb-6">
          Welcome to Django Shop
        </p>
        <p class="subtitle">
          Let's choose your favorite product and start shopping!
        </p>
      </div>
    </section>

    <div class="columns is-multiline mb-6">
      <div class="column is-12">
        <h2 class="title has-text-primary is-uppercase has-text-centered mb-6">
          Products
          </h2>
      </div>

      <ProductBox v-for="product in lastestProducts" v-bind:key="product.id"
        v-bind:product="product" />

    </div>
  </div>
</template>

<script>
import axios from 'axios'
import ProductBox from '@/components/ProductBox'

export default {
  name: 'Home',
  data () {
    return {
      lastestProducts: []
    }
  },
  components: {
    ProductBox,
  },
  mounted () {
    this.getLastestProducts()
    document.title = `Home | Django Shop`;

  },
  methods: {
    async getLastestProducts () {
      this.$store.commit('setIsLoading', true)

      await axios.get('/api/v1/latest-products/')
        .then(response => {
          this.lastestProducts = response.data
        })
        .catch(error => {
          console.log(error)
        })
      this.$store.commit('setIsLoading', false)

    }
  },
}
</script>
