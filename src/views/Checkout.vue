<template>
    <div class="page-checkout">
        <div class="columns is-multiline">
            <div class="column is-12">
                <h1
                    class="title has-text-primary is-uppercase has-text-centered mb-6">
                    Checkout</h1>
            </div>

            <div class="column is-5">
                <div class="box">
                    <h1 class="subtitle is-4 has-text-weight-bold">Product cart
                    </h1>
                    <hr>

                    <table class="table is-fullwidth">
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Price</th>
                                <th class="has-text-centered">Quantity</th>
                                <th>Total</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr v-for="item in cart.items"
                                v-bind:key="item.product.id">
                                <td>
                                    <router-link
                                        v-bind:to="item.product.get_absolute_url">
                                        {{ item.product.name.substring(0, 20) + " ..."}}
                                    </router-link>

                                </td>
                                <td>${{ item.product.price}}</td>
                                <td class="has-text-centered">{{ item.quantity}}</td>
                                <td>${{ getItemTotal(item).toFixed(2)}}</td>
                            </tr>
                        </tbody>

                        <tfoot>
                            <tr>
                                <td colspan="2" class="has-text-weight-bold">
                                    Total</td>
                                <td class="has-text-weight-medium has-text-centered">
                                    {{ cartTotalLength}}</td>
                                <td class="has-text-weight-medium">
                                    ${{ cartTotalPrice.toFixed(2)}}</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>

            </div>

            <div class="column is-7">
                <div class="box">

                    <h1 class="subtitle is-4 has-text-weight-bold">
                        Shipping details
                    </h1>
                    <hr>
                    <p class="has-text-grey mb-4">
                        <strong>(*) All fields are required </strong>
                    </p>

                    <div class="columns is-multiline">
                        <div class="column is-6">
                            <div class="field">
                                <label class="label">First name*</label>
                                <div class="control">
                                    <input type="text" class="input"
                                        v-model="first_name">
                                </div>
                            </div>
                        </div>
                        <div class="column is-6">
                            <div class="field">
                                <label class="label">Last name*</label>
                                <div class="control">
                                    <input type="text" class="input"
                                        v-model="last_name">
                                </div>
                            </div>

                        </div>
                        <div class="column is-6">
                            <div class="field">
                                <label class="label">E-mail*</label>
                                <div class="control">
                                    <input type="email" class="input"
                                        v-model="email">
                                </div>
                            </div>
                        </div>
                        <div class="column is-6">
                            <div class="field">
                                <label class="label">Phone*</label>
                                <div class="control">
                                    <input type="text" class="input"
                                        v-model="phone"> 
                                </div>
                            </div>
                        </div>
                        <div class="column is-6">
                            <div class="field">
                                <label class="label">Place*</label>
                                <div class="control">
                                    <input type="text" class="input"
                                        v-model="place">
                                </div>
                            </div>
                        </div>
                        <div class="column is-6">
                            <div class="field">
                                <label class="label">Zip code*</label>
                                <div class="control">
                                    <input type="text" class="input"
                                        v-model="zipcode">
                                </div>
                            </div>
                        </div>
                        <div class="column is-12">
                            <div class="field">
                                <label class="label">Address*</label>
                                <div class="control">
                                    <input type="text" class="input"
                                        v-model="address">
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="notification is-danger mt-4"
                        v-if="errors.length">
                        <p v-for="error in errors" v-bind:key="error">
                            {{ error}}</p>
                    </div>

                    <hr>

                    <div id="card-element" class="mb-5"></div>

                    <template v-if="cartTotalLength">
                        <hr>

                        <button class="button is-success"
                            @click="submitForm">Pay
                            with Stripe</button>
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'Checkout',
    data () {
        return {
            cart: {
                items: []
            },
            stripe: {},
            card: {},
            first_name: '',
            last_name: '',
            email: '',
            phone: '',
            address: '',
            zipcode: '',
            place: '',
            errors: []
        }
    },
    mounted () {
        document.title = 'Checkout | Django Shop'

        this.cart = this.$store.state.cart

        if (this.cartTotalLength > 0) {
            this.stripe = Stripe('pk_test_51L3IEXGA7goTPkXedBqZ0Z3Ox7AzZtBklgodVOR9K1UAAhsHfA13ZIzLKD3q2oFGSsRB7YlRxcd70LrNe09Exar300to2hmROh')
            const elements = this.stripe.elements();
            this.card = elements.create('card', {hidePostalCode: true})

            this.card.mount('#card-element')
        }
    },
    methods: {
        getItemTotal (item) {
            return item.quantity * item.product.price
        },
        submitForm () {
            this.errors = []

            if (this.first_name === '') {
                this.errors.push('The first name field is missing!')
            }

            if (this.last_name === '') {
                this.errors.push('The last name field is missing!')
            }

            if (this.email === '') {
                this.errors.push('The email field is missing!')
            }

            if (this.phone === '') {
                this.errors.push('The phone field is missing!')
            }

            if (this.address === '') {
                this.errors.push('The address field is missing!')
            }

            if (this.zipcode === '') {
                this.errors.push('The zip code field is missing!')
            }

            if (this.place === '') {
                this.errors.push('The place field is missing!')
            }

            if (!this.errors.length) {
                this.$store.commit('setIsLoading', true)

                this.stripe.createToken(this.card).then(result => {
                    if (result.error) {
                        this.$store.commit('setIsLoading', false)

                        this.errors.push('Something went wrong with Stripe. Please try again')

                        console.log(result.error.message)
                    } else {
                        this.stripeTokenHandler(result.token)
                    }
                })
            }
        },
        async stripeTokenHandler (token) {
            const items = []

            for (let i = 0;i < this.cart.items.length;i++) {
                const item = this.cart.items[i]
                const obj = {
                    product: item.product.id,
                    quantity: item.quantity,
                    price: item.product.price * item.quantity
                }

                items.push(obj)
            }

            const data = {
                'first_name': this.first_name,
                'last_name': this.last_name,
                'email': this.email,
                'address': this.address,
                'zipcode': this.zipcode,
                'place': this.place,
                'phone': this.phone,
                'items': items,
                'stripe_token': token.id
            }

            await axios
                .post('/api/v1/checkout/', data)
                .then(response => {
                    this.$store.commit('clearCart')
                    this.$router.push('/cart/success')
                })
                .catch(error => {
                    this.errors.push('Something went wrong. Please try again')

                    console.log(error)
                })

            this.$store.commit('setIsLoading', false)
        }
    },
    computed: {
        cartTotalPrice () {
            return this.cart.items.reduce((acc, curVal) => {
                return acc += curVal.product.price * curVal.quantity
            }, 0)
        },
        cartTotalLength () {
            return this.cart.items.reduce((acc, curVal) => {
                return acc += curVal.quantity
            }, 0)
        }
    }
}
</script>