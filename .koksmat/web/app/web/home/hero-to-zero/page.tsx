import FromHeroToZero from '@/components/hero-to-zero'
import React from 'react'
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "From Hero To Zero",
  description: "Welcome to the Nexi Digital Workspace story—a journey to revolutionize productivity and workflow management. At 61, Niels transitioned from a Microsoft 365 expert to embracing the challenges of the Cloud-Native ecosystem. Diagnosed with autism and ADHD, this shift reflects the power of neurodiversity in driving innovation.",

};
export default function Page() {
  return (
    <div>

      <FromHeroToZero />
    </div>)
}
