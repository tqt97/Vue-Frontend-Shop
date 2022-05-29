<template>
    <div class="container blog">
        <div class="columns is-multiline mb-6">
            <div class="column is-12">
                <h2
                    class="title has-text-primary is-uppercase has-text-centered mb-6">
                    Blogs
                </h2>
            </div>           
            <PostBox v-for="post in lastestPosts" v-bind:key="post.id"
                v-bind:post="post" />
            
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import PostBox from '@/components/PostBox'

export default {
    name: 'Blog',
    data () {
        return {
            lastestPosts: [],
        }
    },
    components: {
        PostBox,
    },
    mounted () {
        this.getPosts()
        document.title = `Blog page | Django Shop`;

    },
    methods: {
        async getPosts () {
            this.$store.commit('setIsLoading', true)

            await axios.get('/api/v1/latest-blogs/')
                .then(response => {
                    this.lastestPosts = response.data
                    // console.log(this.lastestPosts);
                })
                .catch(error => {
                    console.log(error)
                })
            this.$store.commit('setIsLoading', false)

        },
    },
}
</script>
