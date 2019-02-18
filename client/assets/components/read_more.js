Vue.component(`read_more`, {
  props: ['article'],
  data: function() {
    return {

    }
  },
  mounted: function() {
  },
  methods: {

  }, 
  template: `
    <div class="my-5 m-5 w-75">
      <h1> {{article.title}}</h1>
      <hr class="my-5">
      <img :src="article.featured_image" class="m-5 w-75">
      <h4 v-html="article.content"> </h4>
      <br><br>
    </div>
  `
})