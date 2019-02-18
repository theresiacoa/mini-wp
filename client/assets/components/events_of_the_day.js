Vue.component(`events_of_the_day`, {
  props: ['all_articles'],
  data: function() {
    return {
      
    }
  },
  mounted() {

  },
  methods: {
    readFullArticle(id) {
      axios.get(`${server}/articles/${id}`, {
        headers: {'token': localStorage.getItem('token')}
      })
        .then(({data}) => {
          this.$emit(`event`, {
            article: data,
            page_status: 'read_more'
          })
        })  
        .catch(err => {
          console.log(err)
          swal('Oops!', `You need to sign in`, 'error')
        })
    }
  },
  template: `
  <section class="my-5 m-5">

  <h2 class="h3-responsive font-weight-thin my-5">Recent Posts</h2>

  <div v-for="article in all_articles">
  <!-- Grid row -->
  <div class="row">
    <!-- Grid column -->
    <div class="col-lg-5 col-xl-4">
      <!-- Featured image -->
      <div class="view overlay rounded z-depth-1-half mb-lg-0 mb-4" v-if="article.featured_image">
        <img class="img-fluid" :src="article.featured_image" alt="image">
        <a>
          <div class="mask rgba-white-slight"></div>
        </a>
      </div>

    </div>
    <!-- Grid column -->
    <!-- Grid column -->
    <div class="col-lg-7 col-xl-8">

      <!-- Post title -->
      <h3 class="font-weight-bold mb-3"><strong>{{ article.title }}</strong></h3>
      <!-- Excerpt -->
      <p class="dark-grey-text text-truncate" style="max-width: 500px;" v-html="article.content"></p>
      <!-- Post data -->
      <p>By <a class="font-weight-bold">{{ article.author }}</a>, {{ article.created_at }}</p>
      <!-- Read more button -->
      <a class="btn btn-primary btn-md" @click.prevent="readFullArticle(article._id)">Read more</a>
    </div>
    <!-- Grid column -->
  </div>
  <!-- Grid row -->
  <hr class="my-5">
</div>
  <!-- Grid row -->
</section>
<!-- Section: Blog v.3 -->
  `

})