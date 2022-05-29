<template>
    <div class="page-search">
        <div class="columns is-multiline">
            <div class="column is-12">
                <h1
                    class="title has-text-primary is-uppercase has-text-centered mb-6">
                    Search</h1>

                <h2 class="is-size-5 has-text-grey">
                    <strong>{{ products.length}}</strong> result<span
                        v-if="products.length > 1">s</span> for keyword
                    <i class="has-text-weight-bold has-text-black">{{ query}}</i>
                </h2>
            </div>

            <ProductBox v-for="product in products" v-bind:key="product.id"
                v-bind:product="product" />
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import ProductBox from '@/components/ProductBox.vue'
import {toast} from 'bulma-toast';

export default {
    name: 'Search',
    components: {
        ProductBox
    },
    data () {
        return {
            products: [],
            query: ''
        }
    },
    mounted () {
        document.title = `Search | Django Shop`;

        let uri = window.location.search.substring(1)
        let params = new URLSearchParams(uri)
        if (params.get('query')) {
            this.query = params.get('query')
            this.performSearch()
        }
    },
    methods: {
        async performSearch () {
            this.$store.commit('setIsLoading', true)
            await axios
                .post('/api/v1/products/search/', {'query': this.query}) 
                .then(response => {
                    this.products = response.data
                })
                .catch(error => {
                    console.log(error)
                    toast({
                        message: 'Error: ' + error.response.data.detail,
                        type: 'is-danger',
                        duration: 4000,
                        position: 'top-center',
                        dismissible: true,
                        animate: {in: 'fadeIn', out: 'fadeOut'},
                    });
                })
            this.$store.commit('setIsLoading', false)
        }
    }
}
</script>