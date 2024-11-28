'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { ArrowRight, AlertTriangle, TrendingUp, Users } from 'lucide-react'

export default function BusinessRiskAssessment() {
  return (
    <div className="container mx-auto p-4 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-bold">The Hidden Dangers of Business-Critical Spreadsheets</CardTitle>
            <CardDescription>Addressing the risks in the era of citizen development</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Risk Alert</AlertTitle>
              <AlertDescription>
                Critical business data and processes are at risk when key personnel depart or face unexpected absences.
              </AlertDescription>
            </Alert>

            <div className="grid md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">The Spreadsheet Dilemma</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Business-critical spreadsheets often become single points of failure. When key resources retire or are suddenly unavailable, years of accumulated knowledge and complex processes can vanish, leaving operations vulnerable.</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">The Rise of Citizen Development</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>As citizen development evolves, we&apos;re seeing the emergence of &quot;Excel files on steroids&quot; - powerful tools created by non-IT professionals that drive crucial business processes.</p>
                </CardContent>
              </Card>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <Card className="bg-primary text-primary-foreground">
                <CardHeader>
                  <CardTitle className="text-2xl">The Evolution of Citizen Development</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p>1. Empowerment of non-technical staff to create business solutions</p>
                  <p>2. Rapid prototyping and deployment of departmental tools</p>
                  <p>3. Increased productivity but potential governance challenges</p>
                  <p>4. The need for a balanced approach: innovation vs. control</p>
                </CardContent>
              </Card>
            </motion.div>

            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5" />
                <span>Empower your team responsibly</span>
              </div>
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5" />
                <span>Drive innovation safely</span>
              </div>
            </div>

            <Button className="w-full">
              Learn More About Mitigating Spreadsheet Risks
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

