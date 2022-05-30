<template>
    <div class="page-product">
        <div class="columns is-multiline">
            <div class="column is-7">
                <figure class="image">
                    <img v-bind:src="product.image" />
                </figure>
            </div>
            <div class="column is-5">
                <!-- <h2 class="subtitle">Information</h2> -->
                <h3 class="title">{{ product.name}}</h3>
                <h3 class="subtitle is-5 mt-5"><strong>Rating:</strong>
                    {{ product.get_rating}}</h3>
                <h3 class="subtitle is-5 mt-5"><strong>Price:
                    </strong>${{ product.price}}</h3>
                <div class="field has-addons mt-6">
                    <div class="control">
                        <input type="number" class="input" min="1"
                            v-model="quantity" />
                    </div>
                    <div class="control">
                        <a class="button is-success" @click="addToCart()">
                            <i class="fas fa-shopping-cart mr-2"></i>
                            Add to cart
                        </a>
                    </div>
                </div>
            </div>
            <div class="column is-12">
                <hr>
                <h1 class="title">Description</h1>
                <div class="has-text-justified" v-html="product.description">
                </div>
            </div>
            <hr>
            <hr>
            <div class="column is-12 mt-4 has-background-default">
                <div class="box" v-for="review in this.reviews"
                    v-bind:key="review.id">
                    <p>
                        <i class="fas fa-user"></i> {{ review.get_user}} -
                        <i class="fas fa-clock"></i> {{ review.get_date}}

                    </p>
                    <p>
                        {{ review.content}}
                        {{ review.rating}} <i
                            class="fas fa-star star-review"></i>
                    </p>

                </div>

            </div>
            <template v-if="$store.state.isAuthenticated">
                <div class="column is-12 mt-2">
                    <h1 class="title">Comment</h1>
                    <form @submit.prevent="submitForm" class="box">
                        <div class="field">
                            <label class="label">Rating</label>
                            <div class="select">
                                <select name="rating" v-model="rating">
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3" selected>3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </select>
                            </div>

                        </div>
                        <div class="field">
                            <label class="label">Content</label>
                            <div class="control has-icons-left">
                                <textarea v-model="content" class="textarea"
                                    name="content" cols="30" rows="5">
                            </textarea>
                            </div>
                        </div>

                        <div class="field">
                            <div class="control">
                                <button class="button is-primary">
                                    Submit
                                </button>
                            </div>
                        </div>

                    </form>
                </div>
            </template>
            <template v-else>
                <div class="column is-12 mt-2">
                    <h1 class="title">Comment</h1>
                    Login <router-link to="/log-in">here</router-link>
                </div>
            </template>
        </div>
    </div>
</template>
<script>
import axios from "axios";
import {toast} from 'bulma-toast';


export default {
    name: "Product",
    data () {
        return {
            product: {},
            quantity: 1,
            rating: 3,
            content: '',
            reviews: {}
        };
    },
    mounted () {
        this.getProduct();
        this.getReviews();
    },
    methods: {
        async getProduct () {
            this.$store.commit('setIsLoading', true)
            const category_slug = this.$route.params.category_slug
            const product_slug = this.$route.params.product_slug
            await axios
                .get(`/api/v1/products/${category_slug}/${product_slug}`)
                .then((response) => {
                    this.product = response.data;
                    console.log(this.product)
                    document.title = this.product.name + ` | Django Rest Ecommerce`;
                })
                .catch((error) => {
                    console.log(error);
                });
            this.$store.commit('setIsLoading', false)
        },
        async getReviews () {
            this.$store.commit('setIsLoading', true)
            const product_slug = this.$route.params.product_slug
            await axios
                .get(`/api/v1/products/${product_slug}/reviews`)
                .then((response) => {
                    this.reviews = response.data;
                    console.log(this.reviews)
                })
                .catch((error) => {
                    console.log(error);
                });
            this.$store.commit('setIsLoading', false)
        },
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
        submitForm () {
            if (this.content === '') {
                toast({
                    message: 'The content is required',
                    type: 'is-danger',
                    dismissible: true,
                    pauseOnHover: true,
                    duration: 2000,
                    position: 'bottom-right',
                })
            } else {
                this.$store.commit('setIsLoading', true)
                const category_slug = this.$route.params.category_slug
                const product_slug = this.$route.params.product_slug

                axios
                    .post(`/api/v1/products/${category_slug}/${product_slug}/comment/`, {
                        rating: this.rating,
                        content: this.content,
                    })
                    .then((response) => {
                        this.product = response.data;
                        document.title = this.product.name + ` | Django Shop`;
                        this.content = '';
                        this.rating = 3;
                        toast({
                            message: 'The comment was added successfully',
                            type: 'is-success',
                            dismissible: true,
                            pauseOnHover: true,
                            duration: 2000,
                            position: 'bottom-right',
                        })
                    })
                    .catch((error) => {
                        console.log(error);
                    });
                this.$store.commit('setIsLoading', false)


            }
        },
    },
};
</script>
<style scoped>
.star-review {
    color: #fd0;
}
</style>
