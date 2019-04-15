Vue.component('article-detail', {
  props: ['article'],
  data: function () {
    return {
      mode: 'preview',
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
    }
  },
  components: {
    ckeditor: CKEditor.component
  },
  computed: {
    isPreview: function () {
      return this.mode === 'preview'
    },
    isEdit: function () {
      return this.mode === 'edit'
    }
  },
  methods: {
    setMode: function (mode) {
      this.mode = mode
    }
  },
  template: `
    <section class="article mtm2">
      <div class="control buttons mt24">
        <b-dropdown aria-role="list" position="is-bottom-left" custom paddingless>
          <b-button icon-right="menu" slot="trigger" type="is-danger"></b-button>

          <b-dropdown-item aria-role="listitem" @click="setMode('edit')">Edit Mode</b-dropdown-item>
          <b-dropdown-item aria-role="listitem" @click="setMode('preview')">Preview Mode</b-dropdown-item>
          <b-dropdown-item aria-role="listitem" :disabled="isPreview">Cancel edit</b-dropdown-item>
          <b-dropdown-item aria-role="listitem" :disabled="isPreview">Save changes</b-dropdown-item>
          <b-dropdown-item aria-role="listitem" :disabled="isPreview">Delete this article</b-dropdown-item>
        </b-dropdown>

      </div>
      <figure class="image mlm20 mrm20 featured-image has-text-centered">
        <img :src="article.featured_image" alt="article-featured-image">
        <b-field class="file" v-if="isEdit">
          <b-upload>
            <a class="button is-primary">
              <b-icon icon="upload"></b-icon>
              <span>Replace image</span>
            </a>
          </b-upload>
        </b-field>
      </figure>
      <div class="ml24 mr24 mt32">
        <p class="title has-text-centered" v-if="isPreview">{{ article.title }}</p>
        <b-field label="Title" v-else-if="isEdit">
          <b-input v-model="article.title"></b-input>
        </b-field>
        <div
          class="is-divider"
          :data-content="new Date(article.created_at).toLocaleDateString('id-ID')">
        </div>
      </div>
      <div class="ml24 mr24 content" v-html="article.content" v-if="isPreview"></div>
      <ckeditor :editor="editor" :config="editorConfig" tag-name="textarea" v-model="article.content" v-if="isEdit"></ckeditor>
    </section>
  `
})