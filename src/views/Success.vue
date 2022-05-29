<template>
    <div class="page-success">
        <div class="columns is-multiline">
            <div class="column is-12 has-text-centered">
                <h1
                    class="title has-text-primary is-uppercase has-text-centered mb-6">
                    Thank you</h1>

                <p class="title is-4">
                    Your order will be processed within 48 hours
                </p>
                <p>
                    Go to account page to check your order status.
                </p>
                <router-link to='/' class="button is-primary mt-3  mr-4"
                    href="">
                    <!-- <i class="fas fa-shopping-basket mr-2"></i> -->
                    <svg xmlns="http://www.w3.org/2000/svg" width="20"
                        height="20" class="mr-4" fill="currentColor"
                        viewBox="0 0 1792 1792">
                        <path
                            d="M1792 800v192q0 14-9 23t-23 9h-1248v224q0 21-19 29t-35-5l-384-350q-10-10-10-23 0-14 10-24l384-354q16-14 35-6 19 9 19 29v224h1248q14 0 23 9t9 23z">
                        </path>
                    </svg>
                    Continue shopping
                </router-link>
                <router-link to="/my-account" class="button is-warning mt-3">
                    <i class="fas fa-user mr-2"></i>
                    Account
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Success',
    mounted () {
        document.title = `Success | Django Shop`;

    },
}
</script>