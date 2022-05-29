<template>
    <div class="page-category">
        <div class="columns is-multiline">
            <div class="column is-12">
                <h1 class="title has-text-primary is-uppercase has-text-centered mb-6">{{ category.name}}</h1>
            </div>

            <ProductBox v-for="product in category.products"
                v-bind:key="product.id" v-bind:product="product" />
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import {toast} from 'bulma-toast';
import ProductBox from '@/components/ProductBox'

export default {
    name: 'Category',
    data () {
        return {
            category: {
                products: [],
            },
        }
    },
    components: {
        ProductBox,
    },
    mounted () {
        this.getCategory()
    },
    watch: {
        $route (to, from) {
            if (to.name === 'Category') {
                this.getCategory()
            }
        }
    },
    methods: {
        async getCategory () {
            const categorySlug = this.$route.params.category_slug
            this.$store.commit('setIsLoading', true)
            axios.get(`/api/v1/products/${categorySlug}/`).then(response => {
                this.category = response.data
                document.title = this.category.name + ` | Django Shop`;

            }).catch(error => {
                console.log(error)
                toast({
                    message: 'Error: ' + error.response.data.detail,
                    type: 'is-danger',
                    duration: 4000,
                    position: 'top-center',
                    dismissible: true,
                });
            })
            this.$store.commit('setIsLoading', false)
        }
    }
}
</script>