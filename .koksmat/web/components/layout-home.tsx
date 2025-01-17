"use client"
import { useState, useEffect, useCallback } from 'react'
import Link from "next/link"
import { ChefHat, Code2, Copy, ExternalLink, Github, Users, Cog, Wand2, Lightbulb, ArrowUp, Menu, X, Search, Globe, Sun, Moon, Bot } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { APPNAME } from '@/app/global'
import Image from 'next/image'

type SupportedLanguage = 'en' | 'da';

const translations: Record<SupportedLanguage, {
  search: string;
  docs: string;
  about: string;
  herotozero: string;
  home: string;
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
    docs: "Why",
    about: "About",
    blog: "Blog",
    github: "GitHub",
    getStarted: "Get Started",
    home: "Home",
    chefInDigitalKitchen: "Your Neuro-Powered Digital Kitchen",
    koksmatHelps: "Koksmat is here to help you manage your digital tasks with AI-enhanced precision.",
    openSource: "100% Open Source - Cook, Customize, and Contribute with AI",
    empoweringDigitalChefs: "Empowering Digital Chefs with AI",
    fromDevAdms: "From DevAdms to citizen developers, Koksmat serves up AI-powered tools for your digital kitchen.",
    readMore: "Read More",
    herotozero: "How",
    whyKoksmat: "Why Koksmat?",
    digitalDishesDeserve: "Your digital tasks deserve an AI-powered touch. Koksmat provides the open-source tools and AI-enhanced recipes you need.",
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
    herotozero: "Hvordan",
    github: "GitHub",
    home: "Hjem",
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

function ErrorBoundary({ children }: { children: React.ReactNode }) {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const handleError = (error: ErrorEvent) => {
      console.error("Uncaught error:", error);
      setHasError(true);
    };

    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);



  if (hasError) {
    return <div>Something went wrong. Please try refreshing the page.</div>;
  }

  return <>{children}</>;
}

export default function LayoutHome({ children }: { children: React.ReactNode }) {
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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    document.documentElement.classList.toggle('dark')
  }

  return (
    <ErrorBoundary>
      <div className={`flex min-h-screen w-full flex-col ${isDarkMode ? 'dark' : ''}`}>
        <div className="sticky top-0 z-50 bg-white dark:bg-gray-800 bg-opacity-95 backdrop-blur-sm shadow-sm">
          <header className="container mx-auto px-4 py-4 flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">


              <Image src="/koksmat-icon.png" alt="Koksmat" width={32} height={32} />

              <span className="text-xl font-bold">Koksmat</span>
              <div className='text-yellow-500'>Preview</div>
            </Link>
            <div className="hidden md:flex items-center space-x-4">
              <div className="relative">
                {/* <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="search"
                  placeholder={t.search}
                  className="pl-8 pr-4 py-2 w-64 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                /> */}


              </div>
              <nav className="flex space-x-6">
                <Link href={"/" + APPNAME + "/home/"} className="text-gray-600 hover:text-orange-500 transition-colors">{t.home}</Link>
                {/* <Link href={"/" + APPNAME + "/home/cost"} className="text-gray-600 hover:text-orange-500 transition-colors">{t.docs}</Link> */}
                {/*<Link href="#" className="text-gray-600 hover:text-orange-500 transition-colors">{t.about}</Link> */}
                {/* <Link href={"/" + APPNAME + "/home/hero-to-zero"} className="text-gray-600 hover:text-orange-500 transition-colors">{t.herotozero}</Link> */}
                {/* <Link href="https://github.com/koksmat-com" target='_blank' className="text-gray-600 hover:text-orange-500 transition-colors">
                  <Github className="h-5 w-5" />
                  <span className="sr-only">{t.github}</span>
                </Link> */}
              </nav>
              {/* <Select onValueChange={(value: SupportedLanguage) => setLanguage(value)} defaultValue={language}>
                <SelectTrigger className="w-[100px]">
                  <Globe className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="da">Dansk</SelectItem>
                </SelectContent>
              </Select> */}
              <Button variant="ghost" size="icon" onClick={toggleDarkMode}>
                {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                <span className="sr-only">Toggle dark mode</span>
              </Button>
            </div>
            <button onClick={toggleMobileMenu} className="md:hidden text-gray-600 hover:text-orange-500 transition-colors">
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </header>
          {mobileMenuOpen && (
            <nav className="md:hidden bg-white dark:bg-gray-800 py-4 px-6 space-y-4">
              {/* <div className="relative mb-4">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="search"
                  placeholder={t.search}
                  className="pl-8 pr-4 py-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div> */}
              {/* <Link href="#" className="block text-gray-600 dark:text-gray-300 hover:text-orange-500 transition-colors">{t.docs}</Link> */}
              {/* <Link href="#" className="block text-gray-600 dark:text-gray-300 hover:text-orange-500 transition-colors">{t.about}</Link>
              <Link href="#" className="block text-gray-600 dark:text-gray-300 hover:text-orange-500 transition-colors">{t.blog}</Link> */}
              <Link href="https://github.com/koksmat-com" className="block text-gray-600 dark:text-gray-300 hover:text-orange-500 transition-colors">
                <Github className="h-5 w-5 inline-block mr-2" />
                <span>{t.github}</span>
              </Link>
              {/* <Select onValueChange={(value: SupportedLanguage) => setLanguage(value)} defaultValue={language}>
                <SelectTrigger className="w-full">
                  <Globe className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="da">Dansk</SelectItem>
                </SelectContent>
              </Select> */}
              <Button variant="ghost" size="sm" onClick={toggleDarkMode} className="w-full justify-start">
                {isDarkMode ? <Sun className="h-5 w-5 mr-2" /> : <Moon className="h-5 w-5 mr-2" />}
                <span>{isDarkMode ? t.lightMode : t.darkMode}</span>
              </Button>
            </nav>
          )}
        </div>
        {children}

        <footer className="bg-gray-800 dark:bg-gray-900 text-white py-8">

          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {/* <div>
                <h3 className="font-semibold mb-4">About Koksmat</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="hover:text-white">Our Vision for 2025</a></li>
                
                </ul>
              </div> */}
              <div>
                <h3 className="font-semibold mb-4">Resources</h3>
                <ul className="space-y-2">
                  <li><a href="https://learn.koksmat.com" className="hover:text-white">Documentation</a></li>
                  {/* <li><a href="#" className="hover:text-white">Tutorials</a></li> */}
                  <li><a href="https://github.com/orgs/koksmat-com" className="hover:text-white">GitHub</a></li>
                </ul>
              </div>
              {/* <div>
                <h3 className="font-semibold mb-4">Features</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="hover:text-white">Zero Trust</a></li>
                  <li><a href="#" className="hover:text-white">Cloud Native</a></li>
                  <li><a href="#" className="hover:text-white">Open Source</a></li>
                </ul>
              </div> */}
              <div>
                <h3 className="font-semibold mb-4">Connect</h3>
                <ul className="space-y-2">
                  <li><a href="https://github.com/orgs/koksmat-com/discussions" className="hover:text-white">GitHub Discussions</a></li>
                  {/* <li><a href="#" className="hover:text-white">Discord</a></li> */}
                  <li><a href="https://bsky.app/profile/koksmat.bsky.social" target='_blank' className="hover:text-white">Bluesky</a></li>
                </ul>
              </div>
            </div>
            <div className="mt-12 pt-8 border-t border-gray-800 text-center">
              <p>© 2024-2025 Koksmat. Open source, built by the community, for the future of cloud-native development in 2025 and beyond.</p>
            </div>
          </div>


        </footer>

        {showScrollTop && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 p-3 bg-orange-500 dark:bg-orange-600 text-white rounded-full shadow-lg hover:bg-orange-600 dark:hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50 transition-all"
            aria-label={t.scrollToTop}
          >
            <ArrowUp className="h-6 w-6" />
          </button>
        )}
      </div>
    </ErrorBoundary>
  )
}