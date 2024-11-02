'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Box, Cloud, Lock, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function MagicButtonOnePagerComponent() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-primary-100 p-8 flex flex-col items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl w-full bg-white rounded-lg shadow-xl overflow-hidden"
      >
        <header className="bg-primary text-white p-6 text-center">
          <h1 className="text-3xl font-bold mb-2">Beyond Off-the-Shelf</h1>
          <p className="text-xl">Unlocking Enterprise Potential with a Touch of Magic</p>
        </header>

        <div className="p-6 space-y-6">
          <section>
            <p className="text-lg text-gray-700 leading-relaxed">
              Commercial off-the-shelf (COTS) solutions often fall short for growing enterprises.
              Enter the &ldquo;Magic Button&ldquo; and its associated framework - an innovative solution to bridge the gap between COTS limitations and your organization&lsquo;s unique needs.
            </p>
          </section>

          <section className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-primary">COTS Limitations</h2>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>Inability to fully address unique enterprise challenges</li>
                <li>Lack of customization for specific organizational needs</li>
                <li>Difficulty in ensuring compliance (e.g., GDPR)</li>
              </ul>
            </div>
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-primary">The Magic Button Alternative</h2>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>User-friendly interface integrated within existing tools</li>
                <li>Access to customized solutions tailored to your needs</li>
                <li>Powered by the comprehensive &ldquo;Magic Box&ldquo; framework</li>
              </ul>
            </div>
          </section>

          <section className="bg-gray-100 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold text-primary mb-4">The Magic Box Framework</h2>
            <div className="flex flex-wrap justify-center gap-4">
              {[
                { icon: <Cloud className="w-8 h-8" />, text: "Kubernetes Cluster" },
                { icon: <Lock className="w-8 h-8" />, text: "PostgreSQL Database" },
                { icon: <Box className="w-8 h-8" />, text: "GitHub Repositories" },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className="flex flex-col items-center p-4 bg-white rounded-lg shadow-md w-40"
                >
                  {item.icon}
                  <p className="mt-2 text-center text-sm">{item.text}</p>
                </motion.div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mb-4">Benefits & Real-World Impact</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                "Reduce reliance on 3rd party licenses",
                "Increase efficiency with context-aware tools",
                "Improve data security and privacy",
              ].map((benefit, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.03 }}
                  className="p-4 bg-primary-50 rounded-lg flex items-start"
                >
                  <Zap className="w-5 h-5 text-primary mr-2 flex-shrink-0 mt-1" />
                  <p className="text-sm">{benefit}</p>
                </motion.div>
              ))}
            </div>
          </section>

          <section className="text-center">
            <Button className="bg-primary text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-primary-600 transition-colors">
              Learn More About Magic Button
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </section>
        </div>
      </motion.div>
    </div>
  )
}