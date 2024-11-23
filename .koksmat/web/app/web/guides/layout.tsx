import LayoutGuides from '@/components/layout-guides'
import React from 'react'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <LayoutGuides>
      {children}
    </LayoutGuides>
  )
}
