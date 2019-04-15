Vue.component('user-edit-form', {
  data: function () {
    return {
      user: {
        username: null,
        email: null,
      },
      loading: false
    }
  },
  created: function () {
    this.user = { ...this.$root.user }
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
    <section class="mt24">
      <form @submit.prevent="handleSubmit">
        <b-field label="Username">
          <b-input
            name="username"
            v-model="user.username"
            v-validate
            required>
          </b-input>
        </b-field>
        <b-field label="Email">
          <b-input
            type="email"
            name="email"
            v-model="user.email"
            v-validate
            required>
          </b-input>
        </b-field>
        <div class="is-divider"></div>
        <b-button
          native-type="submit"
          type="is-primary"
          v-bind:loading="loading"
        >Save</b-button>
        <b-button class="ml4" @click="$emit('click-cancel')">Cancel</b-button>
      </form>
    </section>
  `
})