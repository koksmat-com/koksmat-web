"use client"
import { useState, useEffect, useCallback } from 'react'
import Link from "next/link"
import { ChefHat, Code2, Copy, ExternalLink, Github, Users, Cog, Wand2, Lightbulb, ArrowUp, Menu, X, Search, Globe, Sun, Moon, Bot } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"


type SupportedLanguage = 'en' | 'da';

const translations: Record<SupportedLanguage, {
  search: string;
  docs: string;
  about: string;
  blog: string;
  github: string;
  getStarted: string;
  chefInDigitalKitchen: string;
  koksmatHelps: string;
  openSource: string;
  empoweringDigitalChefs: string;
  fromDevAdms: string;
  readMore: string;
  whyKoksmat: string;
  digitalDishesDeserve: string;
  roleSpecificRecipes: string;
  contents: string;
  openSourceOpenKitchen: string;
  koksmatIsOpenSource: string;
  viewOnGitHub: string;
  joinOurCommunity: string;
  readyToStartCooking: string;
  getStartedWithKoksmat: string;
  viewDocumentation: string;
  allRightsReserved: string;
  scrollToTop: string;
  lightMode: string;
  darkMode: string;
  devAdms: string;
  devAdmsDesc: string;
  administrators: string;

  citizenDevelopers: string;

  teamManagers: string;

  tableOfContents: string;
  welcomeToKoksmat: string;
  whatIsKoksmat: string;
  koksmatDescription: string;
  whyChooseKoksmat: string;
  aiEnhancedTools: string;
  userFriendly: string;
  customizable: string;
  collaborative: string;
  openSourceDesc: string;
  whoCanBenefit: string;
  devAdminsTitle: string;
  devAdminsDesc: string;
  administratorsTitle: string;
  administratorsDesc: string;
  citizenDevelopersTitle: string;
  citizenDevelopersDesc: string;
  teamManagersTitle: string;
  teamManagersDesc: string;
  getTheMostOutOfAI: string;
  startYourAIJourney: string;
  haveQuestions: string;
  contactUs: string;
  joinKoksmat: string;
}> = {
  en: {
    search: "Search...",
    docs: "Docs",
    about: "About",
    blog: "Blog",
    github: "GitHub",
    getStarted: "Get Started",
    chefInDigitalKitchen: "Your Neuro-Powered Digital Kitchen",
    koksmatHelps: "Koksmat is here to help you manage your digital tasks with Neuro-enhanced precision.",
    openSource: "100% Open Source - Cook, Customize, and Contribute with Neuro diverse power",
    empoweringDigitalChefs: "Empowering Digital Chefs with Neuro power",
    fromDevAdms: "From DevAdms to citizen developers, Koksmat serves up Neuro-powered tools for your digital kitchen.",
    readMore: "Read More",
    whyKoksmat: "Why Koksmat?",
    digitalDishesDeserve: "Your digital tasks deserve an Neuro-powered touch. Koksmat provides the open-source tools and Neuro-enhanced recipes you need.",
    roleSpecificRecipes: "AI-Enhanced Role-Specific Solutions",
    contents: "Contents",
    openSourceOpenKitchen: "Open Source, Neuro-Powered Kitchen",
    koksmatIsOpenSource: "Koksmat is 100% open-source and AI-powered. Customize your tools, contribute your own AI-enhanced recipes, and join our community of digital chefs.",
    viewOnGitHub: "View on GitHub",
    joinOurCommunity: "Join Our Community",
    readyToStartCooking: "Ready to start cooking with AI?",
    getStartedWithKoksmat: "Get started with Koksmat today and transform your digital kitchen into an AI-powered, Michelin-star operation.",
    viewDocumentation: "View Documentation",
    allRightsReserved: "All rights reserved.",
    scrollToTop: "Scroll to top",
    lightMode: "Light Mode",
    darkMode: "Dark Mode",
    devAdms: "DevAdms",
    devAdmsDesc: "Craft AI-powered automation recipes",
    administrators: "Administrators",
    administratorsDesc: "Manage your digital pantry with AI",
    citizenDevelopers: "Citizen Developers",
    citizenDevelopersDesc: "Build AI-enhanced solutions",
    teamManagers: "Team Managers",
    teamManagersDesc: "Boost team efficiency with AI insights",
    tableOfContents: "Table of Contents",
    welcomeToKoksmat: "Welcome to Koksmat—Your Gateway to Neuro-Powered Productivity",
    whatIsKoksmat: "What is Koksmat?",
    koksmatDescription: "In a world increasingly driven by Artificial Intelligence, Koksmat is a 100% open-source platform built using AI technologies. It's designed to help you harness the power of AI in your daily digital tasks, acting as your personal assistant in the digital kitchen to help you &quote;cook up&quote; solutions more efficiently and effectively.",
    whyChooseKoksmat: "Why Choose Koksmat?",
    aiEnhancedTools: "AI-Enhanced Signage: Leverage AI to simplify complex tasks and boost productivity.",
    userFriendly: "User-Friendly: Easy to navigate, whether you're a tech guru or just starting out.",
    customizable: "Customizable: Adapt the platform to meet your specific needs and workflows.",
    collaborative: "Collaborative: Share ideas and work seamlessly with your team.",
    openSourceDesc: "Open Source: Free to use, modify, and contribute to—be part of our growing community.",
    whoCanBenefit: "Who Can Benefit from Koksmat?",
    devAdminsTitle: "DevAdmins: Craft Your Automation Recipes with AI",
    devAdminsDesc: "Are you someone who writes scripts or automates tasks? Koksmat provides AI-powered tools to help you create, manage, and share your finest automation &quote;recipes&quote; with precision and speed.",
    administratorsTitle: "Administrators: Organize Your Digital Resources Using AI",
    citizenDevelopersTitle: "Citizen Developers (Super Users): Bridge to Advanced Solutions with AI Support",
    teamManagersTitle: "Team Managers: Boost Team Productivity with AI Insights",
    getTheMostOutOfAI: "Get the Most Out of AI with Koksmat",
    startYourAIJourney: "Start Your AI Journey Now",
    haveQuestions: "Have Questions?",
    contactUs: "Feel free to contact us or explore our community forums to learn more about how Koksmat can help you make the most of AI.",
    joinKoksmat: "Join Koksmat today and step into the future with AI at your side.",
  },
  da: {
    search: "Søg...",
    docs: "Dokumentation",
    about: "Om os",
    blog: "Blog",
    github: "GitHub",
    getStarted: "Kom i gang",
    chefInDigitalKitchen: "Dit AI-drevne digitale køkken",
    koksmatHelps: "Koksmat er her for at hjælpe dig med at styre dine digitale opgaver med AI-forbedret præcision.",
    openSource: "100% Open Source - Kog, tilpas og bidrag med AI",
    empoweringDigitalChefs: "Styrker digitale kokke med AI",
    fromDevAdms: "Fra DevAdms til borgerudviklere, serverer Koksmat AI-drevne værktøjer til dit digitale køkken.",
    readMore: "Læs mere",
    whyKoksmat: "Hvorfor Koksmat?",
    digitalDishesDeserve: "Dine digitale opgaver fortjener et AI-drevet touch. Koksmat giver dig de open source-værktøjer og AI-forbedrede opskrifter, du har brug for.",
    roleSpecificRecipes: "AI-forbedrede rollespecifikke løsninger",
    contents: "Indhold",
    openSourceOpenKitchen: "Open Source, AI-drevet køkken",
    koksmatIsOpenSource: "Koksmat er 100% open source og AI-drevet. Tilpas dine værktøjer, bidrag med dine egne AI-forbedrede opskrifter, og bliv en del af vores fællesskab af digitale kokke.",
    viewOnGitHub: "Se på GitHub",
    joinOurCommunity: "Bliv en del af vores fællesskab",
    readyToStartCooking: "Klar til at begynde at lave mad med AI?",
    getStartedWithKoksmat: "Kom i gang med Koksmat i dag og forvandl dit digitale køkken til en AI-drevet Michelin-stjerne operation.",
    viewDocumentation: "Se dokumentation",
    allRightsReserved: "Alle rettigheder forbeholdes.",
    scrollToTop: "Rul til toppen",
    lightMode: "Lys tilstand",
    darkMode: "Mørk tilstand",
    devAdms: "DevAdms",
    devAdmsDesc: "Lav AI-drevne automatiseringsopskrifter",
    administrators: "Administratorer",
    administratorsDesc: "Administrer dit digitale spisekammer med AI",
    citizenDevelopers: "Borgerudviklere",
    citizenDevelopersDesc: "Byg AI-forbedrede løsninger",
    teamManagers: "Teamledere",
    teamManagersDesc: "Boost teameffektivitet med AI-indsigter",
    tableOfContents: "Indholdsfortegnelse",
    welcomeToKoksmat: "Velkommen til Koksmat—Din indgang til AI-drevet produktivitet",
    whatIsKoksmat: "Hvad er Koksmat?",
    koksmatDescription: "I en verden, der i stigende grad drives af kunstig intelligens, er Koksmat en 100% open source-platform bygget med AI-teknologier. Den er designet til at hjælpe dig med at udnytte kraften i AI i dine daglige digitale opgaver og fungerer som din personlige assistent i det digitale køkken for at hjælpe dig med at 'lave' løsninger mere effektivt.",
    whyChooseKoksmat: "Hvorfor vælge Koksmat?",
    aiEnhancedTools: "AI-forbedrede værktøjer: Udnyt AI til at forenkle komplekse opgaver og øge produktiviteten.",
    userFriendly: "Brugervenlig: Nem at navigere, uanset om du er tech-guru eller lige er begyndt.",
    customizable: "Tilpasningsvenlig: Tilpas platformen til at imødekomme dine specifikke behov og arbejdsgange.",
    collaborative: "Samarbejdsvenlig: Del ideer og arbejd problemfrit med dit team.",
    openSourceDesc: "Open Source: Gratis at bruge, modificere og bidrage til—vær en del af vores voksende fællesskab.",
    whoCanBenefit: "Hvem kan drage fordel af Koksmat?",
    devAdminsTitle: "DevAdmins: Lav dine automatiseringsopskrifter med AI",
    devAdminsDesc: "Er du en, der skriver scripts eller automatiserer opgaver? Koksmat giver AI-drevne værktøjer til at hjælpe dig med at oprette, administrere og dele dine fineste automatiserings 'opskrifter' med præcision og hastighed.",
    administratorsTitle: "Administratorer: Organiser dine digitale ressourcer ved hjælp af AI",
    citizenDevelopersTitle: "Borgerudviklere (Superbrugere): Bro til avancerede løsninger med AI-support",
    teamManagersTitle: "Teamledere: Boost teamproduktivitet med AI-indsigter",
    getTheMostOutOfAI: "Få det meste ud af AI med Koksmat",
    startYourAIJourney: "Start din AI-rejse nu",
    haveQuestions: "Har du spørgsmål?",
    contactUs: "Du er velkommen til at kontakte os eller udforske vores community-fora for at lære mere om, hvordan Koksmat kan hjælpe dig med at få mest muligt ud af AI.",
    joinKoksmat: "Tilmeld dig Koksmat i dag og træd ind i fremtiden med AI ved din side.",
  }
}



export default function HomePage() {
  const [activeSection, setActiveSection] = useState('')
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [language, setLanguage] = useState<SupportedLanguage>('en')
  const [isDarkMode, setIsDarkMode] = useState(false)

  const t = translations[language]

  const scrollToSection = useCallback((elementId: string) => {
    const element = document.getElementById(elementId)
    if (element) {
      const offset = 80 // Adjust this value based on your header height
      const bodyRect = document.body.getBoundingClientRect().top
      const elementRect = element.getBoundingClientRect().top
      const elementPosition = elementRect - bodyRect
      const offsetPosition = elementPosition - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }, [])

  useEffect(() => {
    console.log("Component mounted");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
            console.log("Active section changed:", entry.target.id);
          }
        })
      },
      { rootMargin: '-50% 0px -50% 0px' }
    )

    const sections = document.querySelectorAll('.role-section')
    sections.forEach((section) => observer.observe(section))

    const handleScroll = () => {
      setShowScrollTop(window.pageYOffset > 300)
      console.log("Scroll position:", window.pageYOffset);
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      console.log("Component unmounting");
      sections.forEach((section) => observer.unobserve(section))
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])



  return (

    <main className="flex-grow dark:bg-gray-900 dark:text-white">
      <section className="bg-gradient-to-b from-orange-50 to-white dark:from-gray-800 dark:to-gray-900 py-20 md:py-32">
        <div className="container mx-auto px-4  text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            {t.chefInDigitalKitchen}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            {t.koksmatHelps}
          </p>
          <p className="text-orange-500 dark:text-orange-400 font-semibold mb-8">
            {t.openSource}
          </p>
          <div className="max-w-md mx-auto space-y-4">
            <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-lg p-2">
              <Code2 className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-2" />
              <code className="flex-grow text-sm">npx create-koksmat-app@latest</code>
              <Button size="sm" variant="ghost">
                <Copy className="h-4 w-4" />
                <span className="sr-only">Copy code</span>
              </Button>
            </div>
            <Button className="w-full py-2 px-4 bg-orange-500 dark:bg-orange-600 text-white rounded-lg hover:bg-orange-600 dark:hover:bg-orange-700 transition-colors">
              {t.getStarted}
            </Button>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">{t.welcomeToKoksmat}</h2>
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-semibold mb-4">{t.whatIsKoksmat}</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-8">{t.koksmatDescription}</p>

            <h3 className="text-2xl font-semibold mb-4">{t.whyChooseKoksmat}</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-300 mb-8">
              <li>{t.aiEnhancedTools}</li>
              <li>{t.userFriendly}</li>
              <li>{t.customizable}</li>
              <li>{t.collaborative}</li>
              <li>{t.openSourceDesc}</li>
            </ul>

            <h3 className="text-2xl font-semibold mb-4">{t.whoCanBenefit}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="p-6">
                <h4 className="text-xl font-semibold mb-2">{t.devAdminsTitle}</h4>
                <p className="text-gray-600 dark:text-gray-300">{t.devAdmsDesc}</p>
              </Card>
              <Card className="p-6">
                <h4 className="text-xl font-semibold mb-2">{t.administratorsTitle}</h4>
                <p className="text-gray-600 dark:text-gray-300">{t.administratorsDesc}</p>
              </Card>
              <Card className="p-6">
                <h4 className="text-xl font-semibold mb-2">{t.citizenDevelopersTitle}</h4>
                <p className="text-gray-600 dark:text-gray-300">{t.citizenDevelopersDesc}</p>
              </Card>
              <Card className="p-6">
                <h4 className="text-xl font-semibold mb-2">{t.teamManagersTitle}</h4>
                <p className="text-gray-600 dark:text-gray-300">{t.teamManagersDesc}</p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">{t.empoweringDigitalChefs}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="p-6 flex flex-col justify-between">
              <div>
                <Users className="h-12 w-12 text-orange-500 dark:text-orange-400 mb-4" />
                <h3 className="text-xl font-semibold mb-2">{t.devAdms}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{t.devAdmsDesc}</p>
              </div>
              <button onClick={() => scrollToSection('devadms')} className="text-orange-500 dark:text-orange-400 hover:underline">{t.readMore}</button>
            </Card>
            <Card className="p-6 flex flex-col justify-between">
              <div>
                <Cog className="h-12 w-12 text-orange-500 dark:text-orange-400 mb-4" />
                <h3 className="text-xl font-semibold mb-2">{t.administrators}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{t.administratorsDesc}</p>
              </div>
              <button onClick={() => scrollToSection('administrators')} className="text-orange-500 dark:text-orange-400 hover:underline">{t.readMore}</button>
            </Card>
            <Card className="p-6 flex flex-col justify-between">
              <div>
                <Wand2 className="h-12 w-12 text-orange-500 dark:text-orange-400 mb-4" />
                <h3 className="text-xl font-semibold mb-2">{t.citizenDevelopers}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{t.citizenDevelopersDesc}</p>
              </div>
              <button onClick={() => scrollToSection('citizen-developers')} className="text-orange-500 dark:text-orange-400 hover:underline">{t.readMore}</button>
            </Card>
            <Card className="p-6 flex flex-col justify-between">
              <div>
                <Lightbulb className="h-12 w-12 text-orange-500 dark:text-orange-400 mb-4" />
                <h3 className="text-xl font-semibold mb-2">{t.teamManagers}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{t.teamManagersDesc}</p>
              </div>
              <button onClick={() => scrollToSection('team-managers')} className="text-orange-500 dark:text-orange-400 hover:underline">{t.readMore}</button>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">{t.roleSpecificRecipes}</h2>
          <div className="flex flex-col md:flex-row gap-12">
            <nav className="md:w-1/4">
              <div className="sticky top-24">
                <h3 className="text-xl font-semibold mb-4">{t.tableOfContents}</h3>
                <ul className="space-y-2">
                  {['devadms', 'administrators', 'citizen-developers', 'team-managers'].map((role) => (
                    <li key={role}>
                      <button
                        onClick={() => scrollToSection(role)}
                        className={`block w-full text-left p-2 rounded-lg transition-colors ${activeSection === role
                          ? 'bg-orange-100 dark:bg-orange-600 text-orange-800 dark:text-white'
                          : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                          }`}
                      >
                        {t[role as keyof typeof t]}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </nav>
            <div className="md:w-3/4 space-y-12">
              <div id="devadms" className="role-section bg-white dark:bg-gray-700 p-8 rounded-lg shadow-md">
                <h3 className="text-2xl font-semibold mb-4">{t.devAdminsTitle}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">{t.devAdmsDesc}</p>
                <h4 className="text-xl font-semibold mb-4">Key Neuro-Powered Features for DevAdms:</h4>
                <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-300">
                  <li>AI-Enhanced Script Library: Store, version control, and optimize your most valuable scripts</li>
                  <li>Intelligent Collaboration Signage: Share and collaborate on scripts with AI-powered suggestions</li>
                  <li>Advanced AI Automation: Create complex workflows and integrations with AI assistance</li>
                </ul>
              </div>
              <div id="administrators" className="role-section bg-white dark:bg-gray-700 p-8 rounded-lg shadow-md">
                <h3 className="text-2xl font-semibold mb-4">{t.administratorsTitle}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">{t.administratorsDesc}</p>
                <h4 className="text-xl font-semibold mb-4">Key Neuro-Powered Features for Administrators:</h4>
                <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-300">
                  <li>AI-Driven Resource Management: Easily manage and monitor your digital assets with predictive insights</li>
                  <li>Intelligent Automated Workflows: Streamline repetitive tasks and processes with AI optimization</li>
                  <li>AI-Enhanced Reporting Signage: Generate insightful reports on resource usage and performance with AI analysis</li>
                </ul>
              </div>
              <div id="citizen-developers" className="role-section bg-white dark:bg-gray-700 p-8 rounded-lg shadow-md">
                <h3 className="text-2xl font-semibold mb-4">{t.citizenDevelopersTitle}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">{t.citizenDevelopersDesc}</p>
                <h4 className="text-xl font-semibold mb-4">Key Neuro-Powered Features for Citizen Developers:</h4>
                <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-300">
                  <li>AI-Assisted Low-Code Signage: Create advanced solutions with minimal coding required, guided by AI</li>
                  <li>Intelligent Integration Recipes: Easily connect different systems and data sources with AI-suggested configurations</li>
                  <li>Neuro-Powered Learning Resources: Grow your skills with our extensive documentation and AI-tailored tutorials</li>
                </ul>
              </div>
              <div id="team-managers" className="role-section bg-white dark:bg-gray-700 p-8 rounded-lg shadow-md">
                <h3 className="text-2xl font-semibold mb-4">{t.teamManagersTitle}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">{t.teamManagersDesc}</p>
                <h4 className="text-xl font-semibold mb-4">Key Neuro-Powered Features for Team Managers:</h4>
                <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-300">
                  <li>AI-Enhanced Team Collaboration: Foster teamwork with AI-powered shared workspaces and project suggestions</li>
                  <li>Intelligent Performance Metrics: Track and improve team productivity and efficiency with AI-driven insights</li>
                  <li>AI-Optimized Resource Allocation: Optimize resource usage across your digital kitchen with AI recommendations</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-orange-50 dark:bg-gray-800">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">{t.openSourceOpenKitchen}</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
            {t.koksmatIsOpenSource}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 max-w-md mx-auto">
            <Button className="w-full sm:w-auto flex items-center justify-center bg-gray-800 dark:bg-gray-700 text-white hover:bg-gray-900 dark:hover:bg-gray-600 transition-colors">
              <Github className="mr-2 h-5 w-5" />
              {t.viewOnGitHub}
            </Button>
            <Button className="w-full sm:w-auto bg-white dark:bg-gray-600 text-gray-800 dark:text-white border border-gray-300 dark:border-gray-500 hover:bg-gray-100 dark:hover:bg-gray-500 transition-colors">
              {t.joinOurCommunity}
            </Button>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">{t.readyToStartCooking}</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
            {t.getStartedWithKoksmat}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 max-w-md mx-auto">
            <Button className="w-full sm:w-auto bg-orange-500 dark:bg-orange-600 text-white hover:bg-orange-600 dark:hover:bg-orange-700 transition-colors">
              {t.getStarted}
              <ExternalLink className="ml-2 h-5 w-5" />
            </Button>
            <Button className="w-full sm:w-auto bg-white dark:bg-gray-600 text-gray-800 dark:text-white border border-gray-300 dark:border-gray-500 hover:bg-gray-100 dark:hover:bg-gray-500 transition-colors">
              {t.viewDocumentation}
            </Button>
          </div>
        </div>
      </section>
    </main>

  )
}