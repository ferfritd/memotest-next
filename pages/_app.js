// import '../styles/globals.css'

import Header from 'shared/Navigation/Header'

import 'styles/normalize.css'
import 'styles/Box.css'
import 'styles/Button.css'


function MyApp({ Component, pageProps }) {
  return (
    <>
      <Header/>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
