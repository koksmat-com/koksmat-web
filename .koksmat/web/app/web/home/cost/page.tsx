import FromHeroToZero from '@/components/hero-to-zero'
import React from 'react'
import type { Metadata } from "next";
import { DynamicSolutionCoverageCostComparison } from '@/components/dynamic-solution-coverage-cost-comparison';
import BusinessRiskAssessment from '@/components/business-risk-assessment';

export const metadata: Metadata = {
  title: "The Hidden Dangers of Business-Critical Spreadsheets",
  description: "Business-critical spreadsheets often become single points of failure. When key resources retire or are suddenly unavailable, years of accumulated knowledge and complex processes can vanish, leaving operations vulnerable.",

};
export default function Page() {
  return (
    <div className='container content-center '>
      <BusinessRiskAssessment />
      <DynamicSolutionCoverageCostComparison />
    </div>)
}
