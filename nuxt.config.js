module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'nem钱包',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'demo' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** CSS of the page
  */
  css: [
    'element-ui/lib/theme-chalk/index.css'
  ],
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend(config) {
      if (process.server && process.browser) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        });
      }
      config.node = {
        fs: 'empty',
        net: 'empty',
        tls: 'empty'
      }
    },
    vendor: [
      'nem2-sdk',
      'rxjs/operators',
      'js-joda',
      'js-sha3',
      'element-ui'
    ],
  },
  mode: 'spa',
  modules: [
    '@nuxtjs/vuetify'
  ],
  vuetify: {
    theme: {
      primary: '#3f51b5',
      secondary: '#b0bec5',
      accent: '#8c9eff',
      error: '#b71c1c'
    }
  },
  plugins: [{
    src: '~plugins/ElementUI',
    ssr: true,
  }
  ],
}

