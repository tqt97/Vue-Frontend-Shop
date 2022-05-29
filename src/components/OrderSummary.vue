<template>
    <div class="box mb-4">
        <h3 class="is-size-4 mb-6">Order #{{ order.id}} - {{ order.get_date}}</h3>

        <h4 class="is-size-5">Products</h4>

        <table class="table is-fullwidth">
            <thead>
                <tr>
                    <th class="w-10"></th>
                    <th class="w-50">Product</th>
                    <th class="w-10">Price</th>
                    <th class="has-text-centered w-10">Quantity</th>
                    <th class="w-20">Total</th>
                </tr>
            </thead>

            <tbody>
                <tr v-for="item in order.items" v-bind:key="item.product.id">
                    <td>
                        <img :src="item.product.get_image" alt="{{ item.product.name}}" class="image-thumb">
                    </td>
                    <td>{{ item.product.name}}</td>
                    <td>${{ item.product.price}}</td>
                    <td class="has-text-centered">{{ item.quantity}}</td>
                    <td>${{ getItemTotal(item).toFixed(2)}}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    name: 'OrderSummary',
    props: {
        order: Object
    },
    methods: {
        getItemTotal (item) {
            return item.quantity * item.product.price
        },
        orderTotalLength (order) {
            return order.items.reduce((acc, curVal) => {
                return acc += curVal.quantity
            }, 0)
        },
    }
}
</script>

<style>
.image-thumb {
    width: 50%;
    height: auto;
}

.w-10 {
    width: 10%;
}

.w-50 {
    width: 50%;
}

.w-20 {
    width: 20%;
}
</style>