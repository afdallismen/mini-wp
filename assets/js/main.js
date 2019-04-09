
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
      if (this.q) {
        axios.get(`http://localhost:3000/articles?q=${this.q}`)
          .then(({ data }) => this.articles = data)
          .catch(err => console.log(err))
      } else {
        axios.get(`http://localhost:3000/articles`)
          .then(({ data }) => this.articles = data)
          .catch(err => console.log(err))
      }
    }
  },
  created: function () {
    axios.get('http://localhost:3000/articles')
      .then(({ data }) => this.articles = data)
      .catch(err => console.log(err))
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
      axios.post('http://localhost:3000/articles', { ...this.article, created_at: new Date() })
        .then(article => {
          this.articles.push(article)
          this.resetArticle()
          this.setMainComponent('article-list')
        })
        .catch(err => console.log(err))
    },
    articleDetail: function (article_id) {
      this.article = this.articles.find(a => a.id === article_id)
      this.setMainComponent('article-detail')
    },
    articleEdit: function (article_id) {
      this.article = this.articles.find(a => a.id === article_id)
      this.mainComponent = 'article-create'
    },
    deleteArticle: function (article_id) {
      axios.delete(`http://localhost:3000/articles/${article_id}`)
        .then(_ => {
          this.articles = this.articles.filter(a => a.id !== article_id)
        })
        .catch(err => console.log(err))
    },
    resetArticle: function () {
      this.article = {}
    },
  }
})