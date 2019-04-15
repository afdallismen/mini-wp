Vue.component('change-password-form', {
  data: function () {
    return {
      user: {
        old_password: null,
        new_password: null,
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
        <b-field label="Old password">
          <b-input
            type="password"
            name="old_password"
            v-model="user.old_password"
            password-reveal
            v-validate
            required>
          </b-input>
        </b-field>
        <b-field label="New Password">
          <b-input
            type="password"
            name="new_password"
            v-model="user.new_password"
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
        >Save</b-button>
        <b-button class="ml4" @click="$emit('click-cancel')">Cancel</b-button>
      </form>
    </section>
  `
})