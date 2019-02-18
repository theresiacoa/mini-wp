Vue.component(`stories`, {
  props: ['my_stories'],
  data: function() {
    return {
    
    } 
  },
  mounted:  function() {
    console.log(this.my_stories)
  },
  methods: {  
    renderPage(stat, article) {
      this.$emit(`page_status`, {
        status: stat,
        data: article
      })
    }
  },
  template: `
  <div class="my-5 m-5">
  <div v-for="article in my_stories">
    <!-- Grid row -->
    <div class="row">
      <!-- Grid column -->
      <div class="col-lg-4 col-xl-3">
        <!-- Featured image -->
        <div class="view overlay rounded z-depth-1-half mb-lg-0 mb-4 w-50" v-if="article.featured_image">
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
        <p class="dark-grey-text text-truncate" style="max-width: 1000px;" v-html="article.content"></p>
        <!-- Post data -->
        <p>Created: <a class="font-weight-bold">{{ article.created_at }}</a></p>
      </div>
      <!-- Grid column -->

      <!-- Icons -->
      <a href="" @click.prevent="renderPage('update', article)"><i class="fas fa-pen-square fa-xs fa-sm fa-lg fa-2x mr-3"></i></a>
      <a href="" @click.prevent="renderPage('delete', article)"><i class="fas fa-trash-alt fa-xs fa-sm fa-lg fa-2x"></i></a>
    
    </div>
    <!-- Grid row -->
    <hr class="my-5">
  </div>
  <!-- Grid row -->
</div>
<!-- Section: Blog v.3 -->
  `
})