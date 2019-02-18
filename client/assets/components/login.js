Vue.component(`login`, {
  data: function() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    loginSuccess() {
      axios.post(`${server}/user/login`, {
        email: this.email,
        password: this.password
      })
        .then(({data}) => {
          localStorage.setItem('token', data)
          console.log(`login successful`, data)
          this.$emit(`page_status`, '')
        })
        .catch(err => {
          this.$swal('Oops!', err, 'error')
        })
    }
  },
  template: `
  <!-- Default form login -->
  <div class="row d-flex justify-content-center mt-5">
  <div class="col-md-6">
  <form class="text-center border border-light p-5 mt-5">
  
      <p class="h4 mb-4">SIGN IN</p>

      <!-- Email -->
      <input type="email" id="defaultLoginFormEmail" class="form-control mb-4" placeholder="E-mail" v-model="email" required>
  
      <!-- Password -->
      <input type="password" id="defaultLoginFormPassword" class="form-control mb-4" placeholder="Password" v-model="password" required>
  
      <div class="d-flex justify-content-around">
          <div>
              <!-- Remember me -->
              <div class="custom-control custom-checkbox">
                  <input type="checkbox" class="custom-control-input" id="defaultLoginFormRemember">
                  <label class="custom-control-label" for="defaultLoginFormRemember">Remember me</label>
              </div>
          </div>
      </div>
  
      <!-- Sign up button -->
      <button class="btn btn-info btn-block my-4" type="button" @click.prevent="loginSuccess">Login</button>
      
      <!-- Social login -->
  </form>
  <br>
  </div>
  </div>
  <!-- Default form login -->
  `
})