Vue.component('article-create', {
  data: function () {
    return {
      article: {
        title: null,
        content: '',
        created_at: null,
        featured_image: null
      },
      image_preview: 'https://via.placeholder.com/880x300',
      loading: false,
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
      }
    }
  },
  components: {
    ckeditor: CKEditor.component
  },
  computed: {
    getImagePreview: function () {
      return this.article.featured_image || this.image_preview
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
    handleFileInput: function (file) {
      console.log('changed')
      this.article.featured_image = URL.createObjectURL(file)
    },
    login: function () {
    }
  },
  template:`
    <section class="mt24">
      <form @submit.prevent="handleSubmit">
        <b-field label="Title">
          <b-input
            name="title"
            v-model="article.title"
            v-validate
            required>
          </b-input>
        </b-field>
        <b-field class="file is-block" label="Featured Image">
          <img :src="getImagePreview" alt="image-preview">
          <b-upload @input="handleFileInput">
            <a class="button is-block is-primary">
              <b-icon icon="upload"></b-icon>
              <span>Upload image</span>
            </a>
          </b-upload>
        </b-field>
        <b-field label="Content">
          <ckeditor :editor="editor" :config="editorConfig" tag-name="textarea" v-model="article.content"></ckeditor>
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