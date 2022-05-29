<template>
    <tr class="is-align-items-center is-align-content-center">
        <td class="w-10"> <img :src="item.product.get_thumbnail" alt="thumbnail"
                class="image-thumb"></td>
        <td lass="w-50">
            <router-link :to="item.product.get_absolute_url">
                <span class="has-text-weight-medium has-text-primary">
                    {{ item.product.name.substring(0, 40) + " ..." }}
                </span>
            </router-link>
        </td>
        <td class="has-text-centered w-10">${{ item.product.price}}</td>
        <td class="has-text-centered w-20">
            <a @click="decrementQuantity(item)"
                class="button is-small is-light mr-2">-</a>
            {{ item.quantity}}
            <a @click="incrementQuantity(item)"
                class="button is-small is-light ml-2">+</a>
        </td>
        <td class="has-text-centered w-10">${{ getItemTotal(item).toFixed(2)}}</td>
        <td class="has-text-centered w-10">
            <a class="delete1 button1 is-small has-text-danger"
                @click="removeFromCart(item)">
                <i class="fas fa-trash-alt"></i>
            </a>
        </td>
    </tr>
</template>

<script>
import {toast} from 'bulma-toast'
export default {
    name: 'CartItem',
    props: {
        initialItem: Object
    },
    data () {
        return {
            item: this.initialItem
        }
    },
    methods: {
        getItemTotal (item) {
            return item.quantity * item.product.price
        },
        decrementQuantity (item) {
            item.quantity -= 1

            if (item.quantity === 0) {
                this.$emit('removeFromCart', item)

            }

            this.updateCart()

        },
        incrementQuantity (item) {
            item.quantity += 1

            this.updateCart()
        },
        updateCart () {
            localStorage.setItem('cart', JSON.stringify(this.$store.state.cart))
        },
        removeFromCart (item) {
            this.$emit('removeFromCart', item)

            this.updateCart()
        },
    },
}
</script>
<style>
.image-thumb {
    width: 50%;
    height: auto;
}
.w-10{
    width: 10%;
}
.w-50{
    width: 50%;
}
.w-20{
    width: 20%;
}
</style>