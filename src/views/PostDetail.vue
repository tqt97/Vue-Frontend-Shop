<template>
    <div class="page-product">
        <div class="columns is-multiline">
            <div class="column is-12">
                <!-- <figure class="image mb-6">
                    <img v-bind:src="post.get_image" />
                </figure> -->
                <h1 class="title has-text-centered has-text-primary">{{ post.title}}</h1>
                <p>{{ post.description}}</p>
            </div>
            
        </div>
    </div>
</template>
<script>
import axios from "axios";

export default {
    name: "PostDetail",
    data () {
        return {
            post: {},
            
        };
    },
    mounted () {
        this.getPost();
    },
    methods: {
        async getPost () {
            this.$store.commit('setIsLoading', true)
            const post_slug = this.$route.params.post_slug
            // console.log(post_slug);
            await axios
                .get(`/api/v1/blog/${post_slug}`)
                .then((response) => {
                    this.post = response.data;
                    document.title = this.post.title + ` | Django Shop`;
                })
                .catch((error) => {
                    console.log(error);
                });
            this.$store.commit('setIsLoading', false)
        },
       
    },
};
</script>
