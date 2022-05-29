<template>
    <div class="column is-full-mobile is-4-tablet is-4-desktop ">
        <div class="box">
            <figure class="image mb-4">
                <img :src="post.get_thumbnail" alt="thumbnail">
            </figure>
            <router-link v-bind:to="post.get_absolute_url">
                <h3
                    class="is-size-5 has-text-centered has-text-weight-medium">
                    {{ post.get_title }}
                </h3>
            </router-link>
            <p class="is-size-6 has-text-centered mt-2">{{ post.get_description}}
            </p>
            <p class="has-text-centered p-3">                
                <router-link v-bind:to="post.get_absolute_url">
                   <button class="button is-success">Read more</button>
                </router-link>
            </p>
        </div>
    </div>
</template>
<script>

export default {

    name: 'PostBox',
    props: {
        post: {
            type: Object,
            required: true,
        },
    },
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