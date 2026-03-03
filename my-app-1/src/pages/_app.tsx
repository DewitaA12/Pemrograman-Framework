import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Navbar from '@/components/layouts/Navbar'
import AppShell from '@/components/layouts/Appshell'

export default function App({ Component, pageProps }: AppProps) {
  return <div><AppShell><Component {...pageProps} /></AppShell></div>
}
