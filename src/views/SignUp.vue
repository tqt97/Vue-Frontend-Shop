<template>
    <section class="hero">
        <div class="hero-body">
            <div class="page-sign-up">
                <div class="columns">
                    <div class="column is-half is-offset-one-quarter">
                        <h1 class="title has-text-primary is-uppercase has-text-centered mb-6">
                            SIGN UP
                        </h1>
                        <h5 class="has-text-centered mb-6">
                            Sign up to the website to manage your orders and
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
                                        v-model="username"
                                        placeholder="e.g. david">
                                    <span class="icon is-small is-left">
                                        <i class="fa fa-user"></i>
                                    </span>
                                </div>
                            </div>

                            <div class="field">
                                <label class="label">Password</label>
                                <div class="control has-icons-left">
                                    <input type="password" class="input"
                                        v-model="password"
                                        placeholder="*******">
                                    <span class="icon is-small is-left">
                                        <i class="fa fa-lock"></i>
                                    </span>
                                </div>
                            </div>

                            <div class="field">
                                <label class="label">Repeat password</label>
                                <div class="control has-icons-left">
                                    <input type="password" class="input"
                                        v-model="password2"
                                        placeholder="*******">
                                    <span class="icon is-small is-left">
                                        <i class="fa fa-lock"></i>
                                    </span>
                                </div>
                            </div>

                            <div class="field">
                                <div class="control">
                                    <button class="button is-primary">
                                        Sign up
                                    </button>
                                </div>
                            </div>

                            <hr>

                            Or <router-link to="/log-in">click here
                            </router-link> to log
                            in!
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import axios from 'axios'
import {toast} from 'bulma-toast'

export default {
    name: 'SignUp',
    data () {
        return {
            username: '',
            password: '',
            password2: '',
            errors: []
        }
    },
    mounted () {
        document.title = `Sign up | Django Shop`;

    },
    methods: {
        submitForm () {
            this.errors = []

            if (this.username === '') {
                this.errors.push('The username is missing')
            }

            if (this.password === '') {
                this.errors.push('The password is too short')
            }

            if (this.password !== this.password2) {
                this.errors.push('The passwords doesn\'t match')
            }

            if (!this.errors.length) {
                const formData = {
                    username: this.username,
                    password: this.password
                }

                axios
                    .post("/api/v1/users/", formData)
                    .then(response => {
                        toast({
                            message: 'Account created, please log in!',
                            type: 'is-success',
                            dismissible: true,
                            pauseOnHover: true,
                            duration: 2000,
                            position: 'bottom-right',
                        })

                        this.$router.push('/log-in')
                    })
                    .catch(error => {
                        if (error.response) {
                            for (const property in error.response.data) {
                                this.errors.push(`${property}: ${error.response.data[property]}`)
                            }

                            console.log(JSON.stringify(error.response.data))
                        } else if (error.message) {
                            this.errors.push('Something went wrong. Please try again')

                            console.log(JSON.stringify(error))
                        }
                    })
            }
        }
    }
}
</script>