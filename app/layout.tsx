import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Footer } from './_components/Footer'
import AuthProvider from './_providers/auth'
import { Toaster } from './_components/ui/sonner'
import { Header } from './_components/Header'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "Carvalho | Agende seu horário",
  description: "Barbearia Carvalho, agende seu horário!",
  keywords: ["cortar cabelo", "barbeiro", "barbearia", "barba"],
  openGraph: {
    title: "Carvalho | Agende seu horário",
    description: "Barbearia Carvalho, agende seu horário!",
    url: "https://seusite.com/gerenciamento",
    images: [
      {
        url: "https://raw.githubusercontent.com/cicerosnt/carvalho-barber/main/public/carvalho-share.png",
        width: 800,
        height: 600,
        alt: "Barbearia Carvalho, agende seu horário!",
      },
    ],
  },
  icons: {
    icon: "favicon.png",
  },
  robots: {
    index: true,
    follow: true,
  },
};


export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en" suppressHydrationWarning={true}>
			<head>
				<link rel="icon" href="/favicon.png" />
			</head>
			<body className={`${inter.className} dark`} suppressHydrationWarning={true}>
				<AuthProvider>
					<div className='flex-1'>
						<Header />
						<div className='mt-[75px]'>
							{children}
						</div>
					</div>
						<Footer />
					<Toaster />
				</AuthProvider>
			</body>
		</html>
	)
}
