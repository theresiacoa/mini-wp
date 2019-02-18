const server = `35.247.133.126`

new Vue({
  el: '#app',
  created: function () {
    this.getAllArticles()
  },
  data: {
    navbar_status: '',
    page_status: '',
    all_articles: [],
    my_stories: [],
    read_more: {},
    update_article: '',
  },
  mounted() {
    this.navbarStatus()
  },
  methods: {
    getAllArticles() {
      axios.get(`${server}/articles`)
        .then(({ data }) => {
          this.all_articles = data
        })
        .catch(err => {
          swal(`Oops`, `${err}`, 'error')
        })
    },
    editArticle(data) {
      if (data.status === `update`) {
        this.update_article = data.data
      } else if (data.status === `delete`) {
        swal({
          title: "Are you sure?",
          text: "Once deleted, you will not be able to recover this imaginary file!",
          icon: "warning",
          buttons: true,
          dangerMode: true,
        })
          .then((willDelete) => {
            if (willDelete) {
              console.log(data, `----- will delete`)
              console.log(localStorage.getItem(`token`))
              axios.delete(`${server}/articles/${data.data._id}`,
                {
                  headers: {
                    'token': localStorage.getItem(`token`),
                    'UserId': data.data.UserId
                  }
                })
                .then(({ data }) => {
                  swal("Poof! file has been deleted!", {
                    icon: "success",
                  });
                  this.renderPage('stories')
                })
                .catch(err => {
                  console.log(err)
                  swal('Oops!', `${err}`, "error")
                })
            }
          });
      }
      this.renderPage(data.status)
    },
    navbarStatus() {
      if (localStorage.getItem('token')) {
        this.navbar_status = 'private'
      } else {
        this.navbar_status = 'public'
      }
    },
    pageStats(stat) {
      this.page_status = stat
    },
    renderPage(status) {
      this.pageStats(status)
      if (status === 'stories') {
        this.allMyStories()
      }
      if (status === 'logout') {
        this.pageStats('');
        localStorage.removeItem('token')
        this.navbarStatus()
        var auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then(function () {
          localStorage.removeItem('token');
          console.log('User signed out.');
        });
      }
    },
    onSignIn(googleUser) {
      const profile = googleUser.getBasicProfile();
      const id_token = googleUser.getAuthResponse().id_token;

      axios.post(`${server}/googleSignIn`, {
        username: profile.getName(),
        email: profile.getEmail(),
        token: id_token
      })
        .then(({ data }) => {
          this.renderPage('')
          localStorage.setItem('token', data);
          console.log(data)
        })
        .catch(err => {
          console.log(err)
          swal(`Oops`, `${err}`, 'error')
        })
    },
    allMyStories() {
      axios.get(`${server}/articles/stories`, {
        headers: { "token": localStorage.getItem(`token`) }
      })
        .then(({ data }) => {
          this.my_stories = data
          console.log(data)
        })
        .catch((err) => {
          console.log(err)
          swal(`Oops`, `${err}`, 'error')    
        })
    },
    readMore(data) {
      console.log(`--------------------`)
      this.read_more = data.article
      this.renderPage(data.page_status)
      console.log(this.my_stories)
    },

  },
})