<template>
    <div class="page-my-account">
        <div class="columns is-multiline">
            <div class="column is-12">
                <h1
                    class="title has-text-primary is-uppercase has-text-centered mb-6">
                    My account
                </h1>
            </div>

            <div class="column is-12">
                <button @click="logout()" class="button is-danger">
                    <span class="fa fa-sign-out-alt mr-2"></span> Log out
                </button>
            </div>

            <hr>

            <div class="column is-12">
                <div v-if="orders.length > 0">
                    <h2 class="subtitle is-3">My orders</h2>

                    <OrderSummary v-for="order in orders" v-bind:key="order.id"
                        v-bind:order="order" />
                </div>
                <div v-else>
                    <p class="has-text-weight-bold">
                        You don't have any orders...
                    </p>
                    <router-link to='/' class="button is-dark mt-3" href="">
                        <i class="fas fa-shopping-basket mr-2"></i>
                        Continue shopping
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import OrderSummary from '@/components/OrderSummary.vue'

export default {
    name: 'MyAccount',
    components: {
        OrderSummary
    },
    data () {
        return {
            orders: []
        }
    },
    mounted () {
        document.title = `My account | Django Shop`;

        this.getMyOrders()
    },
    methods: {
        logout () {
            axios.defaults.headers.common["Authorization"] = ""

            localStorage.removeItem("token")
            localStorage.removeItem("username")
            localStorage.removeItem("userid")

            this.$store.commit('removeToken')

            this.$router.push('/')
        },
        async getMyOrders () {
            this.$store.commit('setIsLoading', true)

            await axios
                .get('/api/v1/orders/')
                .then(response => {
                    this.orders = response.data
                })
                .catch(error => {
                    console.log(error)
                })

            this.$store.commit('setIsLoading', false)
        }
    }
}
</script>