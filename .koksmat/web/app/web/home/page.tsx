import HomePage from '@/components/home-page';
import KoksmatWelcome from '@/components/koksmat-welcome';

import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
  title: "Home"

};
export default function Page() {
  return (
    <KoksmatWelcome />
  )
}
