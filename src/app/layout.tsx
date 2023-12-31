
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { AnimateComponent } from '@/utils/Animate'
import { GlobalContextProvider } from '@/context/Context'
const inter = Inter({ subsets: ['latin'] })



export const metadata: Metadata = {
  title: 'Global Clock',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (


    <AnimateComponent>
      <GlobalContextProvider>

        <html lang="en">
          <body className={inter.className}>{children}</body>
        </html>
      </GlobalContextProvider>
    </AnimateComponent>

  )
}
