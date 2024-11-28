'use client'

import React, { useState, useEffect } from 'react'
import { z } from 'zod'
import { ZeroTrust } from '@/components/zero-trust'
import { Button } from '@/components/ui/button'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Clock, Cloud, Code, Database, Lock, Sparkles, Users, User, Github, Calendar, Moon, Sun } from 'lucide-react'
import { ComponentDoc } from './component-documentation-hub'
import MagicExcelTransform from './magic-excel-transform'

const KoksmatWelcomeSchema = z.object({})

type KoksmatWelcomeProps = z.infer<typeof KoksmatWelcomeSchema>

const KoksmatWelcome: React.FC<KoksmatWelcomeProps> = (props) => {
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  const toggleDarkMode = () => setDarkMode(!darkMode)

  return (
    <>
      <ZeroTrust
        schema={KoksmatWelcomeSchema}
        props={{ ...props }}
        actionLevel="error"
        componentName="KoksmatWelcome"
      />
      <button
        onClick={toggleDarkMode}
        className="fixed top-4 right-4 p-2 rounded-full bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
        aria-label="Toggle dark mode"
      >
        {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
      </button>
      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">


        {/* Magic Button Teaser */}
        {/* <section className="py-16 bg-gradient-to-b from-white to-blue-50 dark:from-gray-900 dark:to-blue-900">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center text-blue-600 dark:text-blue-300">Introducing the Magic Button</h2>
            <div className="flex flex-col md:flex-row items-center justify-center gap-8">
              <div className="md:w-1/2">
                <img
                  src="/placeholder.svg?height=300&width=400"
                  alt="Magic Button Concept"
                  className="rounded-lg shadow-lg"
                />
              </div>
              <div className="md:w-1/2 space-y-4">
                <p className="text-lg text-gray-700 dark:text-gray-300">
                  Imagine having a Magic Button that provides instant solutions or allows you to request them in any context within your favorite office productivity apps like Outlook, Word, Excel, PowerPoint, Teams, and SharePoint.
                </p>
                <p className="text-lg text-gray-700 dark:text-gray-300">
                  Koksmat is dedicated to supporting you in building these solutions and fostering collaboration, with a special focus on harnessing neuro-power.
                </p>
                <p className="text-lg font-semibold text-blue-600 dark:text-blue-400">
                  Coming in 2025: Your personal AI assistant, seamlessly integrated into your workflow.
                </p>
              </div>
            </div>
          </div>
        </section> */}
        {/* Hero Section */}
        <section className="h-screen relative bg-gradient-to-b from-blue-50 to-white dark:from-blue-900 dark:to-gray-900 py-20">
          <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 lg:pr-12">
              <h1 className="text-5xl font-bold leading-tight mb-8">
                <div>Transform Your Spreadsheets into Secure, Actionable Magic Buttons</div>

              </h1>
              <h2 className="text-xl font-bold leading-tight mb-4">
                Convert business-critical spreadsheets into zero-trust microservices, seamlessly integrated into Office apps and beyond.
              </h2>
              <div className=" space-y-4">
                {/* <p className="text-lg text-gray-700 dark:text-gray-300">
                  Imagine having a Magic Button that provides instant solutions or allows you to request them in any context within your favorite office productivity apps like Outlook, Word, Excel, PowerPoint, Teams, and SharePoint.
                </p> */}
                <p className="text-lg text-gray-700 dark:text-gray-300">
                  Imagine turning your most important spreadsheet into a secure, zero-trust microservice. With Koksmat, this transformation empowers you to create child Magic Buttons that integrate effortlessly into your favorite productivity tools like Outlook, Word, Excel, Teams, and SharePoint—or any browser-based app. Koksmat helps you build and deploy these solutions, enhancing collaboration and unleashing the full potential of your workflows.
                </p>

              </div>

              <div className="flex gap-4 max-w-md mt-5">
                <Button className="flex-grow">

                  Learn more
                </Button>
              </div>
            </div>
            <div className="lg:w-1/2 mt-12 lg:mt-0">
              <div className="relative mx-auto w-full max-w-md">
                <div className="rounded-3xl overflow-hidden shadow-2xl">
                  {/* <img
                    src="/placeholder.svg?height=600&width=300"
                    alt="Koksmat Dashboard Preview"
                    className="w-full"
                  /> */}
                  <MagicExcelTransform />
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* Hero Section */}
        <section className="relative bg-gradient-to-b from-blue-50 to-white dark:from-blue-900 dark:to-gray-900 py-20">
          <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 lg:pr-12">
              <h1 className="text-5xl font-bold leading-tight mb-8">
                <div>Designed for Zero Trust.</div>
                <div>Built for Cloud Native.</div>
                <div>Powered by Community.</div>
              </h1>
              <p className="text-xl text-gray-600 mb-4 dark:text-gray-400">
                Join the Koksmat open-source revolution - shaping the future of secure, cloud-native development together.
              </p>
              {/* <p className="text-2xl font-semibold text-blue-600 dark:text-blue-400 mb-8">
                Coming in 2025
              </p> */}
              <div className="flex gap-4 max-w-md">
                <Button className="flex-grow">
                  <Github className="w-5 h-5 mr-2" />
                  View on GitHub
                </Button>
              </div>
            </div>
            <div className="lg:w-1/2 mt-12 lg:mt-0">
              <div className="relative mx-auto w-full max-w-md">
                <div className="rounded-3xl border-8 border-black overflow-hidden shadow-2xl">
                  <img
                    src="/chef-logo.svg"
                    alt="Koksmat Dashboard Preview"
                    className="w-full"
                  />
                </div>
                {/* <div className="absolute top-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-full font-semibold">
                  <Calendar className="inline-block w-5 h-5 mr-2" />
                  2025 Release
                </div> */}
              </div>
            </div>
          </div>
        </section>

        {/* What is Koksmat */}
        <section className="py-16 bg-white dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 dark:text-gray-200">What is Koksmat</h2>
            <p className="text-lg text-gray-600 max-w-3xl dark:text-gray-400">
              Koksmat is an innovative open-source platform designed for the future of cloud-native development, set to launch in 2025. Built with Zero Trust principles at its core, Koksmat will empower developers and teams to create secure, scalable, and efficient solutions. It&apos;s not just a tool - it&apos;s a community-driven gateway to the next generation of software development.
            </p>
          </div>
        </section>

        {/* Why choose Koksmat */}
        <section className="py-16 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center dark:text-gray-200">Why Choose Koksmat in 2025</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <FeatureCard
                icon={<Lock className="w-8 h-8" />}
                title="Zero Trust Architecture"
                description="Built-in security at every layer, ensuring your applications are secure by design"
              />
              <FeatureCard
                icon={<Cloud className="w-8 h-8" />}
                title="Cloud Native First"
                description="Optimized for modern cloud environments, enabling scalability and flexibility"
              />
              <FeatureCard
                icon={<Code className="w-8 h-8" />}
                title="Open Source Freedom"
                description="Transparent, community-driven development for ultimate customization"
              />
              <FeatureCard
                icon={<Database className="w-8 h-8" />}
                title="Koksmat Store"
                description="Integrated PostgreSQL for both SQL and NoSQL needs"
              />
              <FeatureCard
                icon={<Clock className="w-8 h-8" />}
                title="Koksmat State"
                description="Advanced session management for modern, stateful applications"
              />
              <FeatureCard
                icon={<Sparkles className="w-8 h-8" />}
                title="Koksmat Studio"
                description="Your all-in-one solution builder and deployment assistant"
              />
            </div>
          </div>
        </section>

        {/* Community Section */}
        <section className="py-16 bg-blue-600 text-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-4 text-center">Join the Koksmat Community</h2>
            <p className="text-xl mb-12 text-center">Be part of the revolution starting 2025</p>
            <div className="grid md:grid-cols-2 gap-12">
              <div className="bg-white text-gray-800 p-8 rounded-lg shadow-lg dark:bg-gray-800 dark:text-gray-200">
                <Users className="w-12 h-12 text-blue-600 mb-4 dark:text-blue-400" />
                <h3 className="text-2xl font-semibold mb-4 dark:text-gray-200">For Teams</h3>
                <ul className="space-y-3">
                  <li>• Collaborate on secure, scalable projects</li>
                  <li>• Leverage community-driven innovations</li>
                  <li>• Contribute to cutting-edge cloud-native solutions</li>
                  <li>• Shape the future of open-source development</li>
                </ul>
                <Button className="mt-6">
                  <Github className="w-5 h-5 mr-2" />
                  Fork on GitHub
                </Button>
              </div>
              <div className="bg-white text-gray-800 p-8 rounded-lg shadow-lg dark:bg-gray-800 dark:text-gray-200">
                <User className="w-12 h-12 text-blue-600 mb-4 dark:text-blue-400" />
                <h3 className="text-2xl font-semibold mb-4 dark:text-gray-200">For Individual Developers</h3>
                <ul className="space-y-3">
                  <li>• Learn from a global community of experts</li>
                  <li>• Showcase your skills through contributions</li>
                  <li>• Build your portfolio with future-ready tech</li>
                  <li>• Influence the direction of the 2025 release</li>
                </ul>
                <Button className="mt-6">
                  <Github className="w-5 h-5 mr-2" />
                  Star on GitHub
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* How to Contribute */}
        <section className="py-16 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-4 text-center dark:text-gray-200">How to Contribute to Koksmat</h2>
              <p className="text-xl mb-12 text-center dark:text-gray-400">Help shape the future of cloud-native development for 2025 and beyond</p>
              <div className="grid md:grid-cols-2 gap-12">
                <div>
                  <h3 className="text-xl font-semibold mb-4 dark:text-gray-200">Ways to Contribute</h3>
                  <ul className="space-y-3 text-gray-600 dark:text-gray-400">
                    <li>• Submit pull requests for new features</li>
                    <li>• Report and fix bugs in early versions</li>
                    <li>• Improve documentation for the 2025 release</li>
                    <li>• Share ideas for future enhancements</li>
                    <li>• Help others in the community forums</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-4 dark:text-gray-200">Getting Started</h3>
                  <ul className="space-y-3 text-gray-600 dark:text-gray-400">
                    <li>1. Fork the Koksmat repository</li>
                    <li>2. Set up your local development environment</li>
                    <li>3. Choose an issue to work on from the 2025 roadmap</li>
                    <li>4. Create a branch and make your changes</li>
                    <li>5. Submit a pull request for review</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 bg-white dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center dark:text-gray-200">Frequently Asked Questions</h2>
            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger>When will Koksmat be available?</AccordionTrigger>
                  <AccordionContent>
                    Koksmat is scheduled for release in 2025. However, you can start contributing to its development now and help shape its future.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>How can I contribute to Koksmat before the 2025 release?</AccordionTrigger>
                  <AccordionContent>
                    You can contribute by participating in discussions, providing feedback on proposed features, helping with documentation, and even working on early versions of the codebase. Check our GitHub repository for open issues and contribution guidelines.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>How will Koksmat ensure security in cloud-native applications?</AccordionTrigger>
                  <AccordionContent>
                    Koksmat will implement Zero Trust principles throughout the platform. This means every request will be authenticated and authorized, regardless of where it originates. We&apos;re also developing built-in security features and best practices to help developers create secure applications by default.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                  <AccordionTrigger>What&apos;s the roadmap for Koksmat leading up to 2025?</AccordionTrigger>
                  <AccordionContent>
                    Our roadmap is community-driven and evolves based on user needs and contributions. We&apos;re focusing on core features like Zero Trust implementation, cloud-native optimizations, and developer experience enhancements. You can view and contribute to our roadmap on our GitHub repository.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-gray-300 py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                <h3 className="font-semibold mb-4">About Koksmat</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="hover:text-white">Our Vision for 2025</a></li>
                  <li><a href="#" className="hover:text-white">Community</a></li>
                  <li><a href="#" className="hover:text-white">Contribute</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-4">Resources</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="hover:text-white">Documentation</a></li>
                  <li><a href="#" className="hover:text-white">Tutorials</a></li>
                  <li><a href="#" className="hover:text-white">GitHub</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-4">Features</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="hover:text-white">Zero Trust</a></li>
                  <li><a href="#" className="hover:text-white">Cloud Native</a></li>
                  <li><a href="#" className="hover:text-white">Open Source</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-4">Connect</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="hover:text-white">GitHub Discussions</a></li>
                  <li><a href="#" className="hover:text-white">Discord</a></li>
                  <li><a href="https://bsky.app/profile/koksmat.bsky.social" target='_blank' className="hover:text-white">Bluesky</a></li>
                </ul>
              </div>
            </div>
            <div className="mt-12 pt-8 border-t border-gray-800 text-center">
              <p>© 2024 Koksmat. Open source, built by the community, for the future of cloud-native development in 2025 and beyond.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}

interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
      <div className="mb-4 text-blue-600 dark:text-blue-400">{icon}</div>
      <h3 className="text-xl font-semibold mb-2 dark:text-gray-200">{title}</h3>
      <p className="text-gray-600 dark:text-gray-400">{description}</p>
    </div>
  )
}

export default KoksmatWelcome

export const examplesKoksmatWelcome: ComponentDoc[] = [
  {
    id: 'KoksmatWelcome',
    name: 'KoksmatWelcome',
    description: 'A welcoming page for Koksmat, highlighting its open-source nature, Zero Trust architecture, and cloud-native focus, with emphasis on its 2025 release',
    usage: `
import KoksmatWelcome from '@/components/koksmat-welcome'

export default function Home() {
  return <KoksmatWelcome />
}
`,
    example: <KoksmatWelcome />,
  },
]

