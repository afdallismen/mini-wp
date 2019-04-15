Vue.component('login-form', {
  data: function () {
    return {
      auth: {
        credential: null,
        password: null,
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
        <b-field label="Username or email">
          <b-input
            name="credential"
            v-model="auth.credential"
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
        >Login</b-button>
        <b-button class="ml4" @click="$emit('click-register')">Register</b-button>
      </form>
    </section>
  `
})