"use client"

import * as React from "react"
import { sidebarData } from '@/app/sidebar-data'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { SupportedLanguage } from "@/components/lib/types-sidebar-data"
import { Sun, Moon, ChevronsUpDown, Plus, ChevronRight } from 'lucide-react'
import { Icon } from "./icon"


interface ApplicationRootProps {
  children: React.ReactNode
  hideTopNav?: boolean
  hideBreadcrumb?: boolean
  hideSidebar?: boolean
}

const translations = {
  en: {
    teams: "Teams",
    addTeam: "Add team",
    platform: "Platform",
    projects: "Projects",
    more: "More",
    buildingYourApplication: "Building Your Application",
    dataFetching: "Data Fetching",
    language: "Language",
    darkMode: "Dark Mode",
    lightMode: "Light Mode",
  },
  da: {
    teams: "Hold",
    addTeam: "Tilføj hold",
    platform: "Platform",
    projects: "Projekter",
    more: "Mere",
    buildingYourApplication: "Byg din applikation",
    dataFetching: "Datahentning",
    language: "Sprog",
    darkMode: "Mørk tilstand",
    lightMode: "Lys tilstand",
  },
}

const TopNavigation: React.FC<{
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  currentLanguage: SupportedLanguage;
  changeLanguage: (lang: SupportedLanguage) => void;
  t: typeof translations[SupportedLanguage];
}> = ({ isDarkMode, toggleDarkMode, currentLanguage, changeLanguage, t }) => (
  <div className="flex items-center space-x-4">
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleDarkMode}
      aria-label={isDarkMode ? t.lightMode : t.darkMode}
    >
      {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </Button>
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">
          {t.language}
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => changeLanguage('en')}>English</DropdownMenuItem>
        <DropdownMenuItem onClick={() => changeLanguage('da')}>Dansk</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
)

export const ApplicationRoot: React.FC<ApplicationRootProps> = ({
  children,
  hideTopNav = false,
  hideBreadcrumb = false,
  hideSidebar = false
}) => {
  const [isDarkMode, setIsDarkMode] = React.useState(false)
  const [currentLanguage, setCurrentLanguage] = React.useState<SupportedLanguage>(sidebarData.language)
  const [activeTeam, setActiveTeam] = React.useState(sidebarData.teams[0])

  const t = translations[currentLanguage]

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    document.documentElement.classList.toggle('dark')
  }

  const changeLanguage = (lang: SupportedLanguage) => {
    setCurrentLanguage(lang)
  }

  return (
    <div className={`flex h-screen ${isDarkMode ? 'dark' : ''} bg-background text-foreground`}>
      {!hideTopNav && (
        <div className="absolute top-0 right-0 p-4 z-50">
          <TopNavigation
            isDarkMode={isDarkMode}
            toggleDarkMode={toggleDarkMode}
            currentLanguage={currentLanguage}
            changeLanguage={changeLanguage}
            t={t}
          />
        </div>
      )}
      <SidebarProvider>
        {!hideSidebar && (
          <Sidebar collapsible="icon">
            <SidebarHeader>
              <SidebarMenu>
                <SidebarMenuItem>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <SidebarMenuButton
                        size="lg"
                        className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                      >
                        <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                          {activeTeam.logo}
                        </div>
                        <div className="grid flex-1 text-left text-sm leading-tight">
                          <span className="truncate font-semibold">
                            {activeTeam.name[currentLanguage]}
                          </span>
                          <span className="truncate text-xs">
                            {activeTeam.plan[currentLanguage]}
                          </span>
                        </div>
                        <ChevronsUpDown className="ml-auto" />
                      </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                      align="start"
                      side="bottom"
                      sideOffset={4}
                    >
                      <DropdownMenuLabel className="text-xs text-muted-foreground">
                        {t.teams}
                      </DropdownMenuLabel>
                      {sidebarData.teams.map((team, index) => (
                        <DropdownMenuItem
                          key={team.name.en}
                          onClick={() => setActiveTeam(team)}
                          className="gap-2 p-2"
                        >
                          <div className="flex size-6 items-center justify-center rounded-sm border">
                            <Icon iconName={team.logo} />
                          </div>
                          {team.name[currentLanguage]}
                          <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
                        </DropdownMenuItem>
                      ))}
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="gap-2 p-2">
                        <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                          <Plus className="size-4" />
                        </div>
                        <div className="font-medium text-muted-foreground">
                          {t.addTeam}
                        </div>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupLabel>{t.platform}</SidebarGroupLabel>
                <SidebarMenu>
                  {sidebarData.navMain.map((item) => (
                    <Collapsible
                      key={item.title.en}
                      asChild
                      defaultOpen={item.isActive}
                      className="group/collapsible"
                    >
                      <SidebarMenuItem>
                        <CollapsibleTrigger asChild>
                          <SidebarMenuButton tooltip={item.title[currentLanguage]}>
                            <Icon iconName={item.icon} className="size-5" />
                            <span>{item.title[currentLanguage]}</span>
                            <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                          </SidebarMenuButton>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <SidebarMenuSub>
                            {item.items?.map((subItem) => (
                              <SidebarMenuSubItem key={subItem.title.en}>
                                <SidebarMenuSubButton asChild>
                                  <a href={subItem.url}>
                                    <span>{subItem.title[currentLanguage]}</span>
                                  </a>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            ))}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      </SidebarMenuItem>
                    </Collapsible>
                  ))}
                </SidebarMenu>
              </SidebarGroup>
              <SidebarGroup className="group-data-[collapsible=icon]:hidden">
                <SidebarGroupLabel>{t.projects}</SidebarGroupLabel>
                <SidebarMenu>
                  {sidebarData.projects.map((item) => (
                    <SidebarMenuItem key={item.name.en}>
                      <SidebarMenuButton asChild>
                        <a href={item.url}>
                          <Icon iconName={item.icon} className="size-5" />
                          <span>{item.name[currentLanguage]}</span>
                        </a>
                      </SidebarMenuButton>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <SidebarMenuAction showOnHover>
                            <Icon iconName={item.moreIcon} className="size-5" />
                            <span className="sr-only">{t.more}</span>
                          </SidebarMenuAction>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          className="w-48 rounded-lg"
                          side="bottom"
                          align="end"
                        >
                          {item.actions.map((action) => (
                            <DropdownMenuItem key={action.label.en}>
                              <Icon iconName={action.icon} className="size-5" />
                              <span>{action.label[currentLanguage]}</span>
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </SidebarMenuItem>
                  ))}
                  <SidebarMenuItem>
                    <SidebarMenuButton className="text-sidebar-foreground/70">
                      {sidebarData.moreProjectsIcon}
                      <span>{t.more}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
              <SidebarMenu>
                <SidebarMenuItem>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <SidebarMenuButton
                        size="lg"
                        className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                      >
                        <Avatar className="h-8 w-8 rounded-lg">
                          <AvatarImage
                            src={sidebarData.user.avatar}
                            alt={sidebarData.user.name}
                          />
                          <AvatarFallback className="rounded-lg">
                            {sidebarData.user.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className="grid flex-1 text-left text-sm leading-tight">
                          <span className="truncate font-semibold">
                            {sidebarData.user.name}
                          </span>
                          <span className="truncate text-xs">
                            {sidebarData.user.email}
                          </span>
                        </div>
                        <ChevronsUpDown className="ml-auto size-4" />
                      </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                      side="bottom"
                      align="end"
                      sideOffset={4}
                    >
                      <DropdownMenuLabel className="p-0 font-normal">
                        <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                          <Avatar className="h-8 w-8 rounded-lg">
                            <AvatarImage
                              src={sidebarData.user.avatar}
                              alt={sidebarData.user.name}
                            />
                            <AvatarFallback className="rounded-lg">
                              {sidebarData.user.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div className="grid flex-1 text-left text-sm leading-tight">
                            <span className="truncate font-semibold">
                              {sidebarData.user.name}
                            </span>
                            <span className="truncate text-xs">
                              {sidebarData.user.email}
                            </span>
                          </div>
                        </div>
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuGroup>
                        {sidebarData.userMenuItems.map((item) => (
                          <DropdownMenuItem key={item.label.en}>
                            <Icon iconName={item.icon} className="size-5" />
                            {item.label[currentLanguage]}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarFooter>
            <SidebarRail />
          </Sidebar>
        )}
        <SidebarInset>
          {!hideBreadcrumb && (
            <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
              <div className="flex items-center gap-2 px-4">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 h-4" />
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem className="hidden md:block">
                      <BreadcrumbLink href="#">
                        {t.buildingYourApplication}
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="hidden md:block" />
                    <BreadcrumbItem>
                      <BreadcrumbPage>{t.dataFetching}</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </div>
            </header>
          )}
          <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <div className="min-h-[100vh] flex-1 rounded-xl md:min-h-min w-full">
              {children}
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  )
}