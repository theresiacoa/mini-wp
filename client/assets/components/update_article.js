Vue.component(`update_article`, {
  props: ['article'],
  data: function () {
    return {
      post: Object.assign({}, this.article )
    }
  }, 
  created: function() {
    
  },
  components: {
    wysiwyg: vueWysiwyg.default.component,
  },
  mounted: function() {
    // console.log(this.article)
  },
  methods: {
    getFile(e) {
      this.featured_image = e.target.files[0]
    },
    updateArticle() {
      if (this.article.featured_image === this.post.featured_image) {
        var newData = {
          title: this.post.title,
          content: this.post.content
        }
      } else {
        newData = new FormData()
        newData.append(`title`, this.title)
        newData.append(`content`, this.content)
        newData.append(`image`, this.featured_image)
      }

      axios.post(`${server}/articles/${this.post._id}`, newData, {
        headers: {
          'token': localStorage.getItem(`token`), 
          'UserId': this.post.UserId
        }
      })
        .then(({data}) => {
          console.log(data)
          swal(`Success!`, `you have updated the article`, 'success')
          this.$emit(`page_status`, 'stories')
        })
        .catch(err => {
          console.log(err)
          swal(`Oops!`, `${err}`, 'error')
        })
    }
  },
  template: `
  <div id="create" class="mt-5 mt-5 w-70">
    <form v-on:submit.prevent="updateArticle">
      <div class="form-group">
        <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Title" v-model="post.title">
      </div>
    </form>
    <div>
      <wysiwyg v-model="post.content"  />
    </div>
    <br>
    <img :src="post.featured_image">
    <input type="file" class="btn btn-elegant" name="avatar" @change="getFile" required/>
    <br>
    <button type="submit" class="btn btn-success" v-on:click.prevent="updateArticle">Update</button>
  </div>
  `
})