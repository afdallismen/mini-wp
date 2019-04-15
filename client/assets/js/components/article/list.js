Vue.component('article-list', {
  props: ['articles'],
  computed: {
    isEmpty: function () {
      return this.articles.length === 0
    }
  },
  methods: {
    handleDetailClick: function (article) {
      this.$emit('detail-click', { ...article })
    },
    handleDeleteClick: function () {}
  },
  template: `
    <b-table :data="isEmpty ? [] : articles" hoverable>
      <template slot-scope="props">
        <b-table-column
          field="title"
          label="Title">
          {{ props.row.title }}
        </b-table-column>

        <b-table-column
          field="created_at"
          label="Created At"
          centered>
          <div class="tag">
            {{ new Date(props.row.created_at).toLocaleString('id-ID') }}
          </div>
        </b-table-column>

        <b-table-column>
          <div class="buttons has-addons">
            <b-button type="is-text" @click="handleDetailClick(props.row)">
              <b-icon type="is-info" icon="square-edit-outline"></b-icon>
            </b-button>
            <b-button type="is-text">
              <b-icon type="is-danger" icon="delete" @click="handleDeleteClick"></b-icon>
            </b-button>
          </div>
        </b-table-column>
      </template>
    </b-table>
  `
})