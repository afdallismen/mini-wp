Vue.component('register-form', {
  data: function () {
    return {
      auth: {
        username: null,
        email: null,
        password: null
      },
      loading: false
    }
  },
  methods: {
    handleSubmit: function () {
      this.$validator.validateAll().then(isValid => {
        this.loading = true
        this.$toast.open()
      })
      .catch(err => console.log(err))
    },
    login: function () {
    }
  },
  template:`
    <section>
      <form @submit.prevent="handleSubmit">
        <b-field label="Username">
          <b-input
            name="username"
            v-model="auth.username"
            v-validate
            required>
          </b-input>
        </b-field>
        <b-field label="Email">
          <b-input
            type="email"
            name="email"
            v-model="auth.email"
            v-validate
            required>
          </b-input>
        </b-field>
        <b-field label="Password">
          <b-input
            type="password"
            name="password"
            v-model="auth.password"
            password-reveal
            v-validate
            required>
          </b-input>
        </b-field>
        <div class="is-divider"></div>
        <b-button
          native-type="submit"
          type="is-primary"
          v-bind:loading="loading"
        >Register</b-button>
        <b-button class="ml4" @click="$emit('click-login')">Login</b-button>
      </form>
    </section>
  `
})