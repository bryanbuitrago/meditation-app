import connectDB from '../../config/db'
import '@/styles/globals.css'

export default function App({ Component, pageProps }) {
  connectDB()
  return <Component {...pageProps} />
}
