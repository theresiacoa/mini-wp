Vue.component(`navbar_bf_login`, {
    data: function () {
        return {
            sidenav_status: false
        }
    },
    mounted: function () {
        gapi.signin2.render('google-signin-btn', {
            onsuccess: this.onSignIn
        })
    },
    methods: {
        renderPage(status) {
            this.$emit(`page_status`, status)
        },
        onSignIn(googleUser) {
            console.log(`----`)
            const profile = googleUser.getBasicProfile();
            const id_token = googleUser.getAuthResponse().id_token;

            axios.post(`${server}/user/googleSignIn`, {
                username: profile.getName(),
                email: profile.getEmail(),
                token: id_token
            })
                .then(({ data }) => {
                    localStorage.setItem('token', data);
                    console.log(data, `========onSingin`)
                    this.renderPage('')
                })
                .catch(err => {
                    console.log(err)
                })
        },
    },
    template: `

    <header>
        <!-- Navbar -->
        <nav class="navbar fixed-top navbar-toggleable-md navbar-expand-lg scrolling-navbar double-nav">
            <!-- SideNav slide-out button -->
            <!-- Breadcrumb-->
            <div class="navbar-brand">
                <a @click.prevent="renderPage('')"><h4>JURVIO</h4></a>
            </div>
            <ul class="nav navbar-nav nav-flex-icons ml-auto">
                <li class="nav-item">
                    <a class="nav-link waves-effect waves-light" @click.prevent="renderPage('login')">
                    <span class="clearfix d-none d-sm-inline-block">Login</span>
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link waves-effect waves-light">
                    <span class="clearfix d-none d-sm-inline-block">|</span></a>
                </li>
                <li class="nav-item">
                    <a class="nav-link waves-effect waves-light" @click.prevent="renderPage('register')">
                    <span class="clearfix d-none d-sm-inline-block">Register</span>
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link waves-effect waves-light">
                    <span class="clearfix d-none d-sm-inline-block">|</span></a>
                </li>
                <div class="g-signin2" id="google-signin-btn" data-onsuccess="onSignIn"></div>
            </ul>  
        </nav>
        <!-- /.Navbar -->
    </header>
`
})