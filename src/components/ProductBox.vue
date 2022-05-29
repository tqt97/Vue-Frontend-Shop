<template>
    <div class="column is-full-mobile is-4-tablet is-3-desktop ">
        <div class="box">
            <router-link v-bind:to="product.get_absolute_url">
                <figure class="image mb-4">
                    <img :src="product.get_thumbnail" alt="thumbnail">
                </figure>
            </router-link>

            <router-link v-bind:to="product.get_absolute_url">
                <h5 class="is-size-5 has-text-centered has-text-weight-medium">
                    {{ product.get_name}}
                </h5>
            </router-link>
            <p class="is-size-6 has-text-centered mt-2 has-text-weight-medium">${{ product.price}}
            </p>
            <p class="has-text-centered p-3">
                <a @click="addToCart()" class="">
                    <i class="fas fa-cart-plus has-text-primary fa-2x"></i>
                </a>
                <!-- <router-link v-bind:to="product.get_absolute_url"
                    class="button1 has-text-info is-size-4 mt-4">
                    <i class="fas fa-info-circle is-1"></i>
                </router-link> -->
            </p>
        </div>
    </div>
</template>
<script>
import {toast} from 'bulma-toast';

export default {
    name: 'ProductBox',
    props: {
        product: {
            type: Object,
            required: true,
        },
    },
    methods: {
        addToCart () {
            if (isNaN(this.quantity) || this.quantity < 1) {
                this.quantity = 1;
            }
            const item = {
                product: this.product,
                quantity: this.quantity,
            }
            this.$store.commit("addToCart", item);

            toast({
                message: 'The product was added to the cart',
                type: 'is-success',
                dismissible: true,
                pauseOnHover: true,
                duration: 2000,
                position: 'bottom-right',
            })
        },
    }
}
</script>
<style scoped>
.image {
    margin: -1.25rem -1.25rem 0 -1.25rem;
    border-radius: 6px;
}

.image img {
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
}
</style>