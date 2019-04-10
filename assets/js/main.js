var ax = axios.create({
  baseURL: 'http://localhost:3000'
})

var app = new Vue({
  el: '#app',
  data: {
    articles: [],
    q: '',
    article: {},
    editor: ClassicEditor,
    editorConfig: {
      heading: {
        options: [
          { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
          { model: 'heading1', view: { name: 'p', classes: 'is-size-1' }, title: 'Heading 1', class: 'ck-heading_heading1' },
          { model: 'heading2', view: { name: 'p', classes: 'is-size-2' }, title: 'Heading 2', class: 'ck-heading_heading2' },
          { model: 'heading3', view: { name: 'p', classes: 'is-size-3' }, title: 'Heading 3', class: 'ck-heading_heading3' },
          { model: 'heading4', view: { name: 'p', classes: 'is-size-4' }, title: 'Heading 4', class: 'ck-heading_heading4' },
          { model: 'heading5', view: { name: 'p', classes: 'is-size-5' }, title: 'Heading 5', class: 'ck-heading_heading5' },
          { model: 'heading6', view: { name: 'p', classes: 'is-size-6' }, title: 'Heading 6', class: 'ck-heading_heading6' },
          { model: 'heading7', view: { name: 'p', classes: 'is-size-7' }, title: 'Heading 7', class: 'ck-heading_heading7' }
        ]
      }
    },
    mainComponent: 'article-list'
  },
  components: {
    ckeditor: CKEditor.component,
  },
  watch: {
    q: function (val) {
      ax.get('/articles', { params: { title: this.q }})
        .then(({ data }) => this.articles = data)
        .catch(err => console.log(err))
    }
  },
  created: function () {
    ax.get('/articles')
      .then(({ data }) => {
        this.articles = data
      })
      .catch(err => console.log(err))
  },
  computed: {
    coverFilename: function () {
      return this.article.cover_img ? this.article.cover_img : ''
    },
    imageUrl: function () {
      if (this.article.cover_img) {
        return 'http://localhost:3000/images/uploads/' + this.article.cover_img
      } else {
        return ''
      }
    }
  },
  methods: {
    setMainComponent: function (component) {
      if (component === 'article-create') {
        this.resetArticle()
      }
      this.mainComponent = component
    },
    isActive: function (component) {
      return this.mainComponent === component
    },
    createArticle: function () {
      let formData = new FormData()
      
      Object.keys(this.article).forEach(key => formData.append(key, this.article[key]))
      formData.append('cover_img_file', this.$refs.cover_img.files[0])

      ax.post('/articles', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
        .then(article => {
          this.articles.push(article)
          this.resetArticle()
          this.setMainComponent('article-list')
        })
        .catch(err => console.log(err))
    },
    articleDetail: function (article_id) {
      this.article = this.articles.find(a => a._id === article_id)
      this.setMainComponent('article-detail')
    },
    articleEdit: function (article_id) {
      this.article = this.articles.find(a => a._id === article_id)
      this.mainComponent = 'article-create'
    },
    deleteArticle: function (article_id) {
      ax.delete(`/articles/${article_id}`)
        .then(_ => {
          this.articles = this.articles.filter(a => a._id !== article_id)
        })
        .catch(err => console.log(err))
    },
    editArticle: function () {
      let formData = new FormData()

      Object.keys(this.article).forEach(key => formData.append(key, this.article[key]))
      
      if (this.$refs.cover_img.files[0]) {
        formData.append('cover_img_file', this.$refs.cover_img.files[0])
      }

      ax.put(`/articles/${this.article._id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
        .then(({ data }) => {
          this.articles.splice(this.articles.findIndex(a => a._id === this.article_id), 1, data)
          this.article = data
          this.setMainComponent('article-list')
        })
    },
    resetArticle: function () {
      this.article = {}
    },
    coverChange: function () {
      this.article = { ...this.article, cover_img: this.$refs.cover_img.files[0].name }
    }
  }
})