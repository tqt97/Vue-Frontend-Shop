<template>
    <section class="hero">
        <div class="hero-body">
            <div class="page-log-in">
                <div class="columns">
                    <div class="column is-half is-offset-one-quarter">
                        <h1 class="title has-text-primary is-uppercase has-text-centered mb-6">
                            LOGIN
                        </h1>
                        <h5 class="has-text-centered mb-6">
                            Login to the website to manage your orders and
                            products.
                        </h5>
                        <div class="notification is-danger"
                            v-if="errors.length">
                            <p v-for="error in errors" v-bind:key="error">
                                {{ error}}</p>
                        </div>

                        <form @submit.prevent="submitForm" class="box">
                            <div class="field">
                                <label class="label">Username</label>
                                <div class="control has-icons-left">
                                    <input type="text" class="input"
                                        v-model="username" placeholder="e.g. david">
                                    <span class="icon is-small is-left">
                                        <i class="fa fa-user"></i>
                                    </span>
                                </div>
                            </div>

                            <div class="field">
                                <label class="label">Password</label>
                                <div class="control has-icons-left">
                                    <input type="password" class="input"
                                        v-model="password" placeholder="*******">
                                    <span class="icon is-small is-left">
                                        <i class="fa fa-lock"></i>
                                    </span>
                                </div>
                            </div>

                            <div class="field">
                                <div class="control">
                                    <button class="button is-primary">Log
                                        in</button>
                                </div>
                            </div>

                            <hr>

                            Or <router-link to="/sign-up">click here
                            </router-link> to
                            sign up!
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import axios from 'axios'

export default {
    name: 'LogIn',
    data () {
        return {
            username: '',
            password: '',
            errors: []
        }
    },
    mounted () {
        document.title = `Log in | Django Shop`;

    },
    methods: {
        async submitForm () {
            axios.defaults.headers.common["Authorization"] = ""

            localStorage.removeItem("token")

            const formData = {
                username: this.username,
                password: this.password
            }

            await axios
                .post("/api/v1/token/login/", formData)
                .then(response => {
                    const token = response.data.auth_token

                    this.$store.commit('setToken', token)

                    axios.defaults.headers.common["Authorization"] = "Token " + token

                    localStorage.setItem("token", token)

                    const toPath = this.$route.query.to || '/cart'

                    this.$router.push(toPath)
                })
                .catch(error => {
                    if (error.response) {
                        for (const property in error.response.data) {
                            this.errors.push(`${property}: ${error.response.data[property]}`)
                        }
                    } else {
                        this.errors.push('Something went wrong. Please try again')

                        console.log(JSON.stringify(error))
                    }
                })
        }
    }
}
</script>

<style scoped>
</style>