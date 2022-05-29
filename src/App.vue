<template>
  <div>
    <div class="lds-spinner"
      v-bind:class="{'is-loading': $store.state.isLoading}">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>

    </div>
    <header>
      <nav class="navbar is-dark is-fixed-top">

        <div class="navbar-brand">
          <router-link to="/" class="navbar-item">Django Shop</router-link>
          <a class="navbar-burger" aria-label="menu" aria-expanded="false"
            data-target="navbar-menu" @click="showMobileMenu = !showMobileMenu">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div class="navbar-menu" id="navbar-menu"
          v-bind:class="{'is-active': showMobileMenu}">

          <div class="navbar-start">
            <div class="navbar-item">
              <form method="get" action="/search">
                <div class="field has-addons">
                  <div class="control">
                    <input type="text" class="input"
                      placeholder="Search here..." name="query" required>
                  </div>

                  <div class="control">
                    <button class="button is-secondary">
                      <span class="icon">
                        <i class="fas fa-search"></i>
                      </span>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>

          <div class="navbar-end">
            <router-link to="/card" class="navbar-item">Cards</router-link>
            <router-link to="/book" class="navbar-item">Books</router-link>
            <router-link to="/blog" class="navbar-item">Blog</router-link>
            <div class="navbar-item">
              <div class="buttons">
                <template v-if="$store.state.isAuthenticated">
                  <router-link to="/my-account" class="button is-dark">
                    <i class="fas fa-user mr-2"></i>
                    Account
                  </router-link>
                </template>
                <template v-else>
                  <router-link to="/log-in" class="button is-dark">
                    <i class="fas fa-sign-in-alt mr-2"></i>
                    Log in
                  </router-link>
                </template>

                <router-link to="/cart" class="button is-dark cart-button">
                  <span class="icon">
                    <i class="fas fa-shopping-cart"></i>
                    <span class="count">{{ cartTotalLength}}</span>
                  </span>
                </router-link>
              </div>
            </div>
          </div>

        </div>
      </nav>
    </header>
    <main>
      <div class="section">
        <div class="container">
          <router-view />
        </div>
      </div>
    </main>
    <footer class="footer">
      <div class="footer-img" role="presentation">
        <img
          src="https://s3-media0.fl.yelpcdn.com/assets/public/footer_cityscape.yji-573fa19c843556eac5a998fc6d1f80f8.png"
          alt="">
      </div>
      <div class="container copyright">
        <div class="has-text-centered">
          <span>© 2022 TuQuocTuan. All Rights Reserved.</span>
        </div>
      </div>
    </footer>
  </div>

</template>

<script>
import axios from "axios"

export default {
  data () {
    return {
      showMobileMenu: false,
      cart: {
        items: [],
      }
    }
  },
  beforeCreate () {
    this.$store.commit('initializeStore')
    const token = this.$store.state.token
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Token ${token}`
    } else {
      axios.defaults.headers.common['Authorization'] = ''
    }
  },
  mounted () {
    this.cart = this.$store.state.cart
  },
  computed: {
    cartTotalLength () {
      // let totalLength = 0

      // for (let i = 0;i < this.cart.items.length;i++) {
      //   totalLength += this.cart.items[i].quantity
      // }

      // return totalLength
      return this.cart.items.length
    }
  },
}

</script>

<style lang="scss">
@import '../node_modules/bulma';

body {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
}

main {
  position: relative;
}

#app {
  flex: 1;
  display: flex;
  flex-direction: column;
}

footer {
  margin-top: auto;
}

.footer {
  background-color: hsl(0deg, 0%, 98%);
  padding: 1rem 1.5rem 1rem;
}

.lds-dual-ring {
  display: inline-block;
  width: 80px;
  height: 80px;
}

.lds-dual-ring:after {
  content: " ";
  display: block;
  width: 64px;
  height: 64px;
  margin: 8px;
  border-radius: 50%;
  border: 6px solid #ccc;
  border-color: #ccc transparent #ccc transparent;
  animation: lds-dual-ring 1.2s linear infinite;
}

@keyframes lds-dual-ring {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

.is-loading-bar {
  height: 0;
  overflow: hidden;
  -webkit-transition: all 0.3s;
  transition: all 0.3s;

  &.is-loading {
    height: 80px;
  }
}


.router-link-exact-active {
  background-color: #000000;
}

.footer-group {
  h4 {
    font-size: 1.1rem;
    font-weight: 500;
    margin-bottom: 8px;
    color: $primary;
  }

  a {
    color: #808591;
    font-size: 0.9rem;
    transition: all 0.3s;

    &:hover {
      color: $primary;
    }
  }
}

.footer-img {
  margin: 20px auto 18px;
  height: 140px;
  width: 100%;
  max-width: 640px;

  img {
    display: block;
    max-width: 100%;
    margin: 0 auto;
  }
}

.copyright {
  span {
    color: #808591;
    font-size: 0.9rem;
  }
}


.is-loading-bar {
  position: fixed;
  left: 50%;
  top: 50%;
  z-index: 9999;
}



.lds-spinner {
  height: 0;
  position: fixed;
  left: 50%;
  top: 50%;
  z-index: 9999;
  overflow: hidden;
  -webkit-transition: all 0.3s;
  transition: all 0.3s;

  &.is-loading {
    width: 80px;
    height: 80px;
  }
}


.lds-spinner div {
  transform-origin: 40px 40px;
  animation: lds-spinner 1.2s linear infinite;
}

.lds-spinner div:after {
  content: " ";
  display: block;
  position: absolute;
  top: 3px;
  left: 37px;
  width: 6px;
  height: 18px;
  border-radius: 20%;
  background: rgb(191, 191, 191);
}

.lds-spinner div:nth-child(1) {
  transform: rotate(0deg);
  animation-delay: -1.1s;
}

.lds-spinner div:nth-child(2) {
  transform: rotate(30deg);
  animation-delay: -1s;
}

.lds-spinner div:nth-child(3) {
  transform: rotate(60deg);
  animation-delay: -0.9s;
}

.lds-spinner div:nth-child(4) {
  transform: rotate(90deg);
  animation-delay: -0.8s;
}

.lds-spinner div:nth-child(5) {
  transform: rotate(120deg);
  animation-delay: -0.7s;
}

.lds-spinner div:nth-child(6) {
  transform: rotate(150deg);
  animation-delay: -0.6s;
}

.lds-spinner div:nth-child(7) {
  transform: rotate(180deg);
  animation-delay: -0.5s;
}

.lds-spinner div:nth-child(8) {
  transform: rotate(210deg);
  animation-delay: -0.4s;
}

.lds-spinner div:nth-child(9) {
  transform: rotate(240deg);
  animation-delay: -0.3s;
}

.lds-spinner div:nth-child(10) {
  transform: rotate(270deg);
  animation-delay: -0.2s;
}

.lds-spinner div:nth-child(11) {
  transform: rotate(300deg);
  animation-delay: -0.1s;
}

.lds-spinner div:nth-child(12) {
  transform: rotate(330deg);
  animation-delay: 0s;
}

@keyframes lds-spinner {
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
}


.cart-button {
  position: relative;
  display: block;
  // width: 28px;
  // height: 28px;
  height: auto;
  // overflow: hidden;
}

.cart-button .fa {
  position: relative;
  top: 4px;
  z-index: 1;
  font-size: 24px;
  color: white;
}

.cart-button .count {
  position: absolute;
  top: 4px;
  right: -2px;
  z-index: 2;
  font-size: 11px;
  border-radius: 50%;
  background: hsl(171, 100%, 41%);
  width: 16px;
  height: 16px;
  line-height: 16px;
  display: block;
  text-align: center;
  color: white;
  font-family: "Roboto", sans-serif;
  font-weight: bold;
}
</style>
