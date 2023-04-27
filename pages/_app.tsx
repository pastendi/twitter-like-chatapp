import Layout from '@/components/Layout'
import LoginModel from '@/components/LoginModel'
import RegisterModel from '@/components/RegisterModel'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <RegisterModel />
      <LoginModel />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}
