import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Meta Ads Strategy Advisor | Campagne Noël',
  description: 'Conseiller stratégique pour optimiser votre campagne Meta Ads de Noël',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 min-h-screen">
        {children}
      </body>
    </html>
  )
}
