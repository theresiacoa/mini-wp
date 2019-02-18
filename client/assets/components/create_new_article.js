Vue.component(`new_article`, {
  data: function () {
    return {
      title: '',
      content: '',
      featured_image: '',
    }
  },
  components: {
    wysiwyg: vueWysiwyg.default.component,
  },
  methods: {
    getFile(e) {
      this.featured_image = e.target.files[0]
    },
    createArticle() {
      let newData = new FormData()
      newData.append(`title`, this.title)
      newData.append(`content`, this.content)
      newData.append(`image`, this.featured_image)

      axios.post(`${server}/articles`, newData, {
        headers: {'token': localStorage.getItem(`token`)}
      })
        .then(({data}) => {
          console.log(data)
        })
        .catch(err => {
          console.log(err)
          swal('Oops!', err, 'error')
        })
    }
  },
  template: `
  <div id="create" class="mt-5 mt-5 w-70">
    <form v-on:submit.prevent="createArticle">
      <div class="form-group">
        <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Title" v-model="title">
      </div>
    </form>
    <div>
      <wysiwyg v-model="content"  />
    </div>
    <br>
    <input type="file" class="btn btn-elegant" name="avatar" @change="getFile" required/>
    <br>
    <button type="submit" class="btn btn-success" v-on:click.prevent="createArticle">Save</button>
  </div>
  `
})