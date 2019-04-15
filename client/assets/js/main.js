var ax = axios.create({
  baseURL: 'http://localhost:3000'
})

Vue.use(VeeValidate)

new Vue ({
  el: '#app',
  created: function () {
    ax.get('/articles')
      .then(({ data }) => this.articles = data)
      .catch(err => console.log(err))
  },
  data: {
    articles: [],
    article: {},
    main: 'index',
    activeMenu: {
      articles: false,
      profile: false
    },
    isLoggedIn: true,
    user: {
      username: 'afdallismen',
      email: 'afdal.lismen@gmail.com'
    }
  },
  watch: {
    main: function () {
      if (this.main === 'index') {
        this.activeMenu = { articles: false, profile: false }
      }
    }
  },
  components: {
    ValidationProvider: VeeValidate.ValidationProvider
  },
  computed: {
    isIndex: function () {
      return this.main === 'index'
    },
    isLogin: function () {
      return this.main === 'login-form'
    },
    isRegister: function () {
      return this.main === 'register-form'
    },
    isArticleList: function () {
      return this.main === 'article-list'
    },
    isArticleCreate: function () {
      return this.main === 'article-create'
    },
    isArticleDetail: function () {
      return this.main === 'article-detail'
    },
    isArticle: function () {
      return this.isArticleList || this.isArticleCreate || this.isArticleDetail
    },
    isProfileEdit: function () {
      return this.main === 'profile-edit'
    },
    isProfileChangePassword: function () {
      return this.main === 'profile-change-password'
    },
    isProfile: function () {
      return this.isProfileEdit || this.isProfileChangePassword
    }
  },
  methods: {
    setMain: function (component) {
      this.main = component
    },
    toggleMenu: function (menu) {
      this.activeMenu = { ...this.activeMenu, [menu]: !this.activeMenu[menu] }
    },
    handleDetailClick: function (article) {
      this.article = article
      this.setMain('article-detail')
    }
  }
})
