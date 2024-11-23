import LayoutHome from '@/components/layout-home'
import React from 'react'


export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <LayoutHome>
      {children}
    </LayoutHome>
  )
}
