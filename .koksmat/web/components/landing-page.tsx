"use client"
import { useState, useEffect, useCallback } from 'react'
import Link from "next/link"
import { ChefHat, Code2, Copy, ExternalLink, Github, Users, Cog, Wand2, Lightbulb, ArrowUp, Menu, X, Search, Globe, Sun, Moon } from "lucide-react"

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

type Language = 'en' | 'da';

const translations: Record<Language, { [key: string]: string }> = {
  en: {
    search: "Search...",
    docs: "Docs",
    about: "About",
    blog: "Blog",
    github: "GitHub",
    getStarted: "Get Started",
    chefInDigitalKitchen: "You are the chef in your digital kitchen",
    koksmatHelps: "Koksmat is here to help you manage your digital dishes with the precision of a master chef.",
    openSource: "100% Open Source - Cook, Customize, and Contribute",
    empoweringDigitalChefs: "Empowering Digital Chefs",
    fromDevAdms: "From DevAdms to citizen developers, Koksmat serves up the perfect open-source tools for your digital kitchen.",
    readMore: "Read More",
    whyKoksmat: "Why Koksmat?",
    digitalDishesDeserve: "Your digital dishes deserve a master chef's touch. Koksmat provides the open-source tools and recipes you need.",
    roleSpecificRecipes: "Role-Specific Recipes",
    contents: "Contents",
    openSourceOpenKitchen: "Open Source, Open Kitchen",
    koksmatIsOpenSource: "Koksmat is 100% open-source. Customize your tools, contribute your own recipes, and join our community of digital chefs.",
    viewOnGitHub: "View on GitHub",
    joinOurCommunity: "Join Our Community",
    readyToStartCooking: "Ready to start cooking?",
    getStartedWithKoksmat: "Get started with Koksmat today and transform your digital kitchen into a Michelin-star operation.",
    viewDocumentation: "View Documentation",
    allRightsReserved: "All rights reserved.",
    scrollToTop: "Scroll to top",
    lightMode: "Light Mode",
    darkMode: "Dark Mode",
    // Role-Specific Sections
    devAdmsTitle: "DevAdms: Master Chefs of the Digital Kitchen",
    devAdmsDesc: "As a DevAdm, you're the master chef in the digital kitchen. Koksmat empowers you to create, manage, and share your finest scripts and automation recipes.",
    devAdmsKeyIngredients: "Key Ingredients for DevAdms:",
    devAdmsScripts: "Script Library: Store and version control your most valuable scripts",
    devAdmsCollaboration: "Collaboration Tools: Share and collaborate on scripts with your team",
    devAdmsAutomation: "Advanced Automation: Create complex workflows and integrations",
    administratorsTitle: "Administrators: Keeping the Digital Pantry Stocked",
    administratorsDesc: "Administrators are the backbone of any digital kitchen. Koksmat provides you with the tools to manage your digital resources efficiently and effectively.",
    administratorsKeyIngredients: "Key Ingredients for Administrators:",
    administratorsResource: "Resource Management: Easily manage and monitor your digital assets",
    administratorsWorkflow: "Automated Workflows: Streamline repetitive tasks and processes",
    administratorsReports: "Reporting Tools: Generate insightful reports on resource usage and performance",
    citizenDevelopersTitle: "Citizen Developers: From Sous Chef to Master Chef",
    citizenDevelopersDesc: "Citizen developers, Koksmat is your bridge from no-code to pro-code. We provide the tools and guidance to help you create more complex and powerful solutions.",
    citizenDevelopersKeyIngredients: "Key Ingredients for Citizen Developers:",
    citizenDevelopersLowCode: "Low-Code Tools: Create advanced solutions with minimal coding required",
    citizenDevelopersIntegration: "Integration Recipes: Easily connect different systems and data sources",
    citizenDevelopersLearning: "Learning Resources: Grow your skills with our extensive documentation and tutorials",
    teamManagersTitle: "Team Managers: Orchestrating the Digital Kitchen",
    teamManagersDesc: "As a team manager, you're responsible for the overall performance of your digital kitchen. Koksmat helps you boost efficiency and productivity across your team.",
    teamManagersKeyIngredients: "Key Ingredients for Team Managers:",
    teamManagersCollaboration: "Team Collaboration: Foster teamwork with shared workspaces and projects",
    teamManagersPerformance: "Performance Metrics: Track and improve team productivity and efficiency",
    teamManagersResources: "Resource Allocation: Optimize resource usage across your digital kitchen",
  },
  da: {
    search: "Søg...",
    docs: "Dokumentation",
    about: "Om os",
    blog: "Blog",
    github: "GitHub",
    getStarted: "Kom i gang",
    chefInDigitalKitchen: "Du er kokken i dit digitale køkken",
    koksmatHelps: "Koksmat er her for at hjælpe dig med at styre dine digitale retter med en mesterkoks præcision.",
    openSource: "100% Open Source - Kog, Tilpas og Bidrag",
    empoweringDigitalChefs: "Styrker Digitale Kokke",
    fromDevAdms: "Fra DevAdms til borgerudviklere, serverer Koksmat de perfekte open source-værktøjer til dit digitale køkken.",
    readMore: "Læs mere",
    whyKoksmat: "Hvorfor Koksmat?",
    digitalDishesDeserve: "Dine digitale retter fortjener en mesterkoks touch. Koksmat giver dig de open source-værktøjer og opskrifter, du har brug for.",
    roleSpecificRecipes: "Rollespecifikke Opskrifter",
    contents: "Indhold",
    openSourceOpenKitchen: "Open Source, Åbent Køkken",
    koksmatIsOpenSource: "Koksmat er 100% open source. Tilpas dine værktøjer, bidrag med dine egne opskrifter, og bliv en del af vores fællesskab af digitale kokke.",
    viewOnGitHub: "Se på GitHub",
    joinOurCommunity: "Bliv en del af vores fællesskab",
    readyToStartCooking: "Klar til at begynde at lave mad?",
    getStartedWithKoksmat: "Kom i gang med Koksmat i dag og forvandl dit digitale køkken til en Michelin-stjerne operation.",
    viewDocumentation: "Se dokumentation",
    allRightsReserved: "Alle rettigheder forbeholdes.",
    scrollToTop: "Rul til toppen",
    lightMode: "Lys tilstand",
    darkMode: "Mørk tilstand",
    // Role-Specific Sections
    devAdmsTitle: "DevAdms: Mesterkokke i det digitale køkken",
    devAdmsDesc: "Som DevAdm er du mesterkokken i det digitale køkken. Koksmat giver dig mulighed for at oprette, administrere og dele dine fineste scripts og automatiseringsopskrifter.",
    devAdmsKeyIngredients: "Nøgleingredienser for DevAdms:",
    devAdmsScripts: "Script-bibliotek: Gem og versionsstyr dine mest værdifulde scripts",
    devAdmsCollaboration: "Samarbejdsværktøjer: Del og samarbejd om scripts med dit team",
    devAdmsAutomation: "Avanceret automatisering: Skab komplekse workflows og integrationer",
    administratorsTitle: "Administratorer: Holder det digitale spisekammer fyldt",
    administratorsDesc: "Administratorer er rygraden i ethvert digitalt køkken. Koksmat giver dig værktøjerne til effektivt og hensigtsmæssigt at administrere dine digitale ressourcer.",
    administratorsKeyIngredients: "Nøgleingredienser for Administratorer:",
    administratorsResource: "Ressourceadministration: Administrer og overvåg nemt dine digitale aktiver",
    administratorsWorkflow: "Automatiserede workflows: Effektiviser gentagne opgaver og processer",
    administratorsReports: "Rapporteringsværktøjer: Generer indsigtsfulde rapporter om ressourceforbrug og ydeevne",
    citizenDevelopersTitle: "Borgerudviklere: Fra Sous Chef til Mesterkok",
    citizenDevelopersDesc: "Borgerudviklere, Koksmat er din bro fra no-code til pro-code. Vi giver dig værktøjerne og vejledningen til at skabe mere komplekse og kraftfulde løsninger.",
    citizenDevelopersKeyIngredients: "Nøgleingredienser for Borgerudviklere:",
    citizenDevelopersLowCode: "Lavkodeværktøjer: Skab avancerede løsninger med minimal kodning",
    citizenDevelopersIntegration: "Integrationsopskrifter: Forbind nemt forskellige systemer og datakilder",
    citizenDevelopersLearning: "Læringsressourcer: Udvid dine færdigheder med vores omfattende dokumentation og tutorials",
    teamManagersTitle: "Teamledere: Orkestrering af det digitale køkken",
    teamManagersDesc: "Som teamleder er du ansvarlig for dit digitale køkkens overordnede ydeevne. Koksmat hjælper dig med at øge effektiviteten og produktiviteten på tværs af dit team.",
    teamManagersKeyIngredients: "Nøgleingredienser for Teamledere:",
    teamManagersCollaboration: "Team samarbejde: Frem samarbejde med delte arbejdsområder og projekter",
    teamManagersPerformance: "Ydelsesmålinger: Spor og forbedr teamets produktivitet og effektivitet",
    teamManagersResources: "Ressourceallokering: Optimer ressourceforbruget i dit digitale køkken",
  }
}

export default function Component() {
  const [activeSection, setActiveSection] = useState('')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [language, setLanguage] = useState<Language>('en')
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [showScrollTop, setShowScrollTop] = useState(false)

  const t = translations[language]

  const scrollToSection = useCallback((elementId: string) => {
    const element = document.getElementById(elementId)
    if (element) {
      const offset = 80
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
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { rootMargin: '-50% 0px -50% 0px' }
    )

    const sections = document.querySelectorAll('.role-section')
    sections.forEach((section) => observer.observe(section))

    const handleScroll = () => {
      setShowScrollTop(window.pageYOffset > 300)
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
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
    <div className={`flex min-h-screen w-full flex-col ${isDarkMode ? 'dark' : ''}`}>
      <div className="sticky top-0 z-50 bg-white dark:bg-gray-800 bg-opacity-95 backdrop-blur-sm shadow-sm">
        <header className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <ChefHat className="h-8 w-8 text-orange-500" />
            <span className="text-xl font-bold">Koksmat</span>
          </Link>
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="search"
                placeholder={t.search}
                className="pl-8 pr-4 py-2 w-64 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <nav className="flex space-x-6">
              <Link href="#" className="text-gray-600 hover:text-orange-500 transition-colors">{t.docs}</Link>
              <Link href="#" className="text-gray-600 hover:text-orange-500 transition-colors">{t.about}</Link>
              <Link href="#" className="text-gray-600 hover:text-orange-500 transition-colors">{t.blog}</Link>
              <Link href="#" className="text-gray-600 hover:text-orange-500 transition-colors">
                <Github className="h-5 w-5" />
                <span className="sr-only">{t.github}</span>
              </Link>
            </nav>
            <Select onValueChange={(value: string) => setLanguage(value as Language)} defaultValue={language}>
              <SelectTrigger className="w-[100px]">
                <Globe className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="da">Dansk</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="ghost" size="icon" onClick={toggleDarkMode}>
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              <span className="sr-only">Toggle dark mode</span>
            </Button>
          </div>
          <button onClick={toggleMobileMenu} className="md:hidden text-gray-600 hover:text-orange-500 transition-colors">
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </header>
      </div>
      <main className="flex-grow dark:bg-gray-900 dark:text-white">
        <section className="bg-gradient-to-b from-orange-50 to-white dark:from-gray-800 dark:to-gray-900 py-20 md:py-32">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">{t.chefInDigitalKitchen}</h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">{t.koksmatHelps}</p>
            <p className="text-orange-500 dark:text-orange-400 font-semibold mb-8">{t.openSource}</p>
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
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">{t.empoweringDigitalChefs}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card className="p-6 flex flex-col justify-between">
                <div>
                  <Users className="h-12 w-12 text-orange-500 dark:text-orange-400 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{t.devAdmsTitle}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{t.devAdmsDesc}</p>
                </div>
                <button onClick={() => scrollToSection('devadms')} className="text-orange-500 dark:text-orange-400 hover:underline">{t.readMore}</button>
              </Card>
              <Card className="p-6 flex flex-col justify-between">
                <div>
                  <Cog className="h-12 w-12 text-orange-500 dark:text-orange-400 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{t.administratorsTitle}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{t.administratorsDesc}</p>
                </div>
                <button onClick={() => scrollToSection('administrators')} className="text-orange-500 dark:text-orange-400 hover:underline">{t.readMore}</button>
              </Card>
              <Card className="p-6 flex flex-col justify-between">
                <div>
                  <Wand2 className="h-12 w-12 text-orange-500 dark:text-orange-400 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{t.citizenDevelopersTitle}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{t.citizenDevelopersDesc}</p>
                </div>
                <button onClick={() => scrollToSection('citizen-developers')} className="text-orange-500 dark:text-orange-400 hover:underline">{t.readMore}</button>
              </Card>
              <Card className="p-6 flex flex-col justify-between">
                <div>
                  <Lightbulb className="h-12 w-12 text-orange-500 dark:text-orange-400 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{t.teamManagersTitle}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{t.teamManagersDesc}</p>
                </div>
                <button onClick={() => scrollToSection('team-managers')} className="text-orange-500 dark:text-orange-400 hover:underline">{t.readMore}</button>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-20 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-8">{t.whyKoksmat}</h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-12">
                {t.digitalDishesDeserve}
              </p>
              <div className="space-y-6">
                <Card className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{t.devAdmsKeyIngredients}</h3>
                  <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-300">
                    <li>{t.devAdmsScripts}</li>
                    <li>{t.devAdmsCollaboration}</li>
                    <li>{t.devAdmsAutomation}</li>
                  </ul>
                </Card>
                <Card className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{t.administratorsKeyIngredients}</h3>
                  <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-300">
                    <li>{t.administratorsResource}</li>
                    <li>{t.administratorsWorkflow}</li>
                    <li>{t.administratorsReports}</li>
                  </ul>
                </Card>
                <Card className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{t.citizenDevelopersKeyIngredients}</h3>
                  <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-300">
                    <li>{t.citizenDevelopersLowCode}</li>
                    <li>{t.citizenDevelopersIntegration}</li>
                    <li>{t.citizenDevelopersLearning}</li>
                  </ul>
                </Card>
                <Card className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{t.teamManagersKeyIngredients}</h3>
                  <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-300">
                    <li>{t.teamManagersCollaboration}</li>
                    <li>{t.teamManagersPerformance}</li>
                    <li>{t.teamManagersResources}</li>
                  </ul>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 dark:bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm">© 2024 Koksmat. {t.allRightsReserved}</p>
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
  )
}
