Vue.component(`navbar_af_login`, {
  data: function() {
    return {
      sidenav_status: false
    }
  },
  methods: {
    renderPage(status) {
      this.$emit(`page_status`, status)
    },
  },

  template: `
    <header>
        <!-- Navbar -->
        <nav class="navbar fixed-top navbar-toggleable-md navbar-expand-lg scrolling-navbar">
            <!-- Breadcrumb-->
            <div class="navbar-brand">
                <a @click.prevent="renderPage('')"><h4>JURVIO</h4></a>
            </div>

            <ul class="nav justify-content-center">
              <li class="nav-item">
              <a class="nav-link waves-effect waves-light" @click.prevent="renderPage('stories')"><span class="clearfix d-none d-sm-inline-block">Stories</span></a>
              </li>
            </ul>

            <ul class="nav navbar-nav nav-flex-icons ml-auto">
              <form class="form-inline active-cyan-3 active-cyan-4">
                <i class="fas fa-search" aria-hidden="true"></i>
                <input class="form-control form-control-sm ml-3 w-75" type="text" placeholder="Search" aria-label="Search">
              </form>
                <li class="nav-item border border-white">
                    <a class="nav-link waves-effect waves-light" @click.prevent="renderPage('write')"><i class="far fa-edit"></i> <span class="clearfix d-none d-sm-inline-block">Write</span></a>
                </li>
                <li class="nav-item border border-white ml-2">
                    <a class="nav-link waves-effect waves-light" @click.prevent="renderPage('logout')"><span class="clearfix d-none d-sm-inline-block">Logout</span></a>
                </li>
            </ul>  
        </nav>
        <!-- /.Navbar -->
    </header>
`
})