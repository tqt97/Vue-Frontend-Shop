<template>
    <div class="page-cart">
        <div class="columns is-multiline">
            <div class="column is-12">

                <div
                    class="is-flex is-align-items-center is-align-content-center is-justify-content-space-between mb-6">
                    <h1
                        class="is-size-3 has-text-weight-medium has-text-primary">
                        Cart
                    </h1>
                    <a class="button is-dark" @click="$router.go(-1)">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20"
                            height="20" class="mr-4" fill="currentColor"
                            viewBox="0 0 1792 1792">
                            <path
                                d="M1792 800v192q0 14-9 23t-23 9h-1248v224q0 21-19 29t-35-5l-384-350q-10-10-10-23 0-14 10-24l384-354q16-14 35-6 19 9 19 29v224h1248q14 0 23 9t9 23z">
                            </path>
                        </svg>
                        Back
                        </a>
                </div>
            </div>
            <div class="column is-12 box" v-if="cartTotalLength">
                <table class="table is-fullwidth">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Product</th>
                            <th class="has-text-centered">Price</th>
                            <th class="has-text-centered">Quantity</th>
                            <th class="has-text-centered">Total</th>
                            <th class="has-text-centered"></th>
                        </tr>
                    </thead>

                    <tbody>
                        <CartItem v-for="item in cart.items"
                            v-bind:key="item.product.id"
                            v-bind:initialItem="item"
                            v-on:removeFromCart="removeFromCart" />
                    </tbody>
                </table>
            </div>
            <div v-else>
                <p class="has-text-weight-bold">
                    You don't have any products in your cart...
                </p>
                <router-link to='/' class="button is-primary mt-3" href="">
                    <i class="fas fa-shopping-basket mr-2"></i>
                    Shopping now
                </router-link>
            </div>

            <div class="column is-12 box" v-if="cartTotalLength">
                <h2 class="subtitle has-text-weight-medium">Summary</h2>

                <strong>Total : </strong> ${{ cartTotalPrice.toFixed(2)}} (
                {{ cartTotalLength}} items )

                <hr>

                <router-link to="/cart/checkout" class="button is-success mr-5">
                    Checkout
                </router-link>
                <router-link to='/' class="button is-light" href="">
                    <i class="fas fa-shopping-basket mr-2"></i>
                   Continue shopping
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import CartItem from '@/components/CartItem.vue'
import {toast} from 'bulma-toast'

export default {
    name: 'Cart',
    components: {
        CartItem
    },
    data () {
        return {
            cart: {
                items: []
            }
        }
    },
    mounted () {
        this.cart = this.$store.state.cart
        document.title = `Cart | Django Shop`;

    },
    methods: {
        removeFromCart (item) {
            this.cart.items = this.cart.items.filter(i => i.product.id !== item.product.id)
            toast({
                message: 'The product was remove from the cart',
                type: 'is-danger',
                dismissible: true,
                pauseOnHover: true,
                duration: 2000,
                position: 'bottom-right',
            })
        }
    },
    computed: {
        cartTotalLength () {
            // return this.cart.items.reduce((acc, curVal) => {
            //     return acc += curVal.quantity
            // }, 0)
            return this.cart.items.length
        },
        cartTotalPrice () {
            return this.cart.items.reduce((acc, curVal) => {
                return acc += curVal.product.price * curVal.quantity
            }, 0)
        },
    }
}
</script>
