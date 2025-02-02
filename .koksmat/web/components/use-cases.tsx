'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp, Globe, List, Search, Users, Shield, Star, Zap, Compass, Github } from 'lucide-react'
import Link from 'next/link'
import { ComponentDoc } from './component-documentation-hub'

/**
 * UseCases
 * 
 * A component that displays the use cases for the Magic Links platform
 * in an interactive card-based layout. Each use case includes a link to a GitHub issue.
 */

interface UseCase {
  id: number
  title: string
  description: string
  icon: React.ReactNode
  githubIssueUrl: string
}

const useCases: UseCase[] = [
  {
    id: 1,
    title: "Multi-lingual and Multi-platform",
    description: "The application will be multi-lingual, embedded in SharePoint pages and Teams, accessible from both desktop and mobile views, ensuring seamless visibility and access.",
    icon: <Globe className="h-6 w-6" />,
    githubIssueUrl: "https://github.com/orgs/nexi-intra/projects/15?pane=issue&itemId=83071023&issue=nexi-intra%7Cnexi-toolsv2%7C3"
  },
  {
    id: 2,
    title: "Consolidated Tool List",
    description: "There will be a consolidated list comprising all tools grouped along with their respective countries and business purposes, enhancing organization and access.",
    icon: <List className="h-6 w-6" />,
    githubIssueUrl: "https://github.com/orgs/nexi-intra/projects/15?pane=issue&itemId=83071024&issue=nexi-intra%7Cnexi-toolsv2%7C5"
  },
  {
    id: 3,
    title: "Efficient Search Functionality",
    description: "A search box equipped with autocomplete will be integrated into the platform, which will expedite the tool searching process while making it more efficient.",
    icon: <Search className="h-6 w-6" />,
    githubIssueUrl: "https://github.com/orgs/nexi-intra/projects/15?pane=issue&itemId=83071031&issue=nexi-intra%7Cnexi-toolsv2%7C6"
  },
  {
    id: 4,
    title: "Targeted Tool Sets",
    description: "Every user will be presented with a targeted set of tools based on their country, role, and access rights.",
    icon: <Users className="h-6 w-6" />,
    githubIssueUrl: "https://github.com/orgs/nexi-intra/projects/15?pane=issue&itemId=83071030&issue=nexi-intra%7Cnexi-toolsv2%7C7"
  },
  {
    id: 5,
    title: "Admin Control for Mandatory Signage",
    description: "Admins will have the capability to designate mandatory tools for certain user groups and individuals as per requirements.",
    icon: <Shield className="h-6 w-6" />,
    githubIssueUrl: "https://github.com/orgs/nexi-intra/projects/15?pane=issue&itemId=83071029&issue=nexi-intra%7Cnexi-toolsv2%7C8"
  },
  {
    id: 6,
    title: "User Personalization",
    description: "Users will have the autonomy to mark their preferred tools, allowing for a personalized and interactive user experience.",
    icon: <Star className="h-6 w-6" />,
    githubIssueUrl: "https://github.com/orgs/nexi-intra/projects/15?pane=issue&itemId=83071028&issue=nexi-intra%7Cnexi-toolsv2%7C9"
  },
  {
    id: 7,
    title: "Tool Highlighting",
    description: "Both mandatory and preferred tools will be prominently highlighted to the users for easy identification and access.",
    icon: <Zap className="h-6 w-6" />,
    githubIssueUrl: "https://github.com/orgs/nexi-intra/projects/15?pane=issue&itemId=83071027&issue=nexi-intra%7Cnexi-toolsv2%7C10"
  },
  {
    id: 8,
    title: "Exploratory Environment",
    description: "Users will have the freedom to browse and search for tools not within their set target, fostering an exploratory environment and user flexibility.",
    icon: <Compass className="h-6 w-6" />,
    githubIssueUrl: "https://github.com/orgs/nexi-intra/projects/15?pane=issue&itemId=83071025&issue=nexi-intra%7Cnexi-toolsv2%7C11"
  },
]

interface UseCasesProps {
  className?: string
}

export default function UseCases({ className = '' }: UseCasesProps) {
  const [openStates, setOpenStates] = useState<{ [key: number]: boolean }>({})

  const toggleOpen = (id: number) => {
    setOpenStates(prev => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <div className={`container mx-auto p-4 ${className}`}>
      <h1 className="text-3xl font-bold mb-6 text-center">Magic Links Use Cases</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {useCases.map((useCase) => (
          <Card key={useCase.id} className="flex flex-col">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {useCase.icon}
                <span>{useCase.title}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <Collapsible open={openStates[useCase.id]} onOpenChange={() => toggleOpen(useCase.id)}>
                <CardDescription className="mb-2">
                  {useCase.description.slice(0, 100)}
                  {useCase.description.length > 100 && '...'}
                </CardDescription>
                <CollapsibleContent>
                  <CardDescription>
                    {useCase.description.slice(100)}
                  </CardDescription>
                </CollapsibleContent>
                {useCase.description.length > 100 && (
                  <CollapsibleTrigger asChild>
                    <Button variant="ghost" size="sm" className="p-0 h-auto">
                      {openStates[useCase.id] ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                      <span className="sr-only">Toggle use case description</span>
                    </Button>
                  </CollapsibleTrigger>
                )}
              </Collapsible>
            </CardContent>
            <CardFooter>
              <Link href={useCase.githubIssueUrl} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="sm" className="w-full">
                  <Github className="mr-2 h-4 w-4" />
                  View GitHub Issue
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

export const examplesUseCases: ComponentDoc[] = [
  {
    id: 'UseCases',
    name: 'UseCases',
    description: 'A component that displays the use cases for the Magic Links platform in an interactive card-based layout. Each use case includes a link to a GitHub issue.',
    usage: `
import UseCases from './UseCases'

function App() {
  return (
    <UseCases className="my-custom-class" />
  )
}
`,
    example: (
      <UseCases className="max-w-4xl" />
    ),
  }
]