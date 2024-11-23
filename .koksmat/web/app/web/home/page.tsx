import HomePage from '@/components/home-page';

import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
  title: "Home"

};
export default function Page() {
  return (
    <HomePage />
  )
}
