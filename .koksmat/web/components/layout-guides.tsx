"use client"
import React from 'react'
import { useIsInIframe } from './use-isiniframe'
import GlobalBreadcrumb from './global-breadcrumb'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import { ActionType } from './action-selector'
import { TreeEditor } from './tree-editor'
import { nanoid } from 'nanoid'
import { EditorData } from './tree-editor-components'

import { ScrollArea } from "@/components/ui/scroll-area"
export default function LayoutGuides({ children }: { children: React.ReactNode }) {
  const isInIframe = useIsInIframe()
  const [leftPanelSize, setLeftPanelSize] = React.useState(20)

  const handleResize = React.useCallback((sizes: number[]) => {
    setLeftPanelSize(sizes[0])
  }, [])

  // Example actions (you should replace these with your actual actions)
  const exampleActions: ActionType[] = [
    {
      id: 'action1',

      title: 'Action 1',
      description: 'This is action 1',
      actionType: 'type1',
      properties: {},

    },
    {
      id: 'action2',

      title: 'Action 2',
      description: 'This is action 2',
      actionType: 'type2',
      properties: {},

    }
  ]
  const exampleData: EditorData = [
    {
      id: "1",
      text: 'Our Group',
      icon: 'Folder',
      children: [
        {
          id: "2",
          text: 'About us',
          icon: 'File',
          children: [
            {
              id: "3",
              text: 'Strategic positioning, ambition & purpose',
              icon: 'FileText',
              children: []
            },
            {
              id: "4",
              text: 'Facts & Figures',
              icon: 'FileText',
              children: []
            },
            {
              id: "5",
              text: 'Values & Behaviours',
              icon: 'FileText',
              children: []
            }
          ]
        },
        {
          id: "6",
          text: 'New@Nexi: Onboarding Guides',
          icon: 'File',
          children: []
        }
      ]
    },
    {
      id: "7",
      text: 'Our Organisation',
      icon: 'Folder',
      children: [
        {
          id: "8",
          text: 'Brand Identity',
          icon: 'File',
          children: [
            {
              id: "9",
              text: 'Logos & Rules',
              icon: 'FileText',
              children: []
            },
            {
              id: "10",
              text: 'Web & Social Media',
              icon: 'FileText',
              children: []
            },
            {
              id: "11",
              text: 'Brand materials & templates',
              icon: 'FileText',
              children: []
            }
          ]
        },
        {
          id: "12",
          text: 'DEI',
          icon: 'File',
          children: []
        },
        {
          id: "13",
          text: 'ESG',
          icon: 'File',
          children: []
        }
      ]
    },
    {
      id: "14",
      text: 'Countries',
      icon: 'Folder',
      children: [
        {
          id: nanoid(),
          text: 'DACH',
          icon: 'File',
          children: []
        }
      ]
    }
  ]

  return (

    <div className="h-screen w-full bg-background text-foreground">


      <ResizablePanelGroup
        direction="horizontal"
        className="h-screen w-full rounded-lg border"
        onLayout={handleResize}
      >
        <ResizablePanel defaultSize={20} minSize={10}>
          <div className="h-full w-full bg-gray-10 p-3">
            <ScrollArea className="h-full w-full rounded-md border">
              <TreeEditor
                initialData={exampleData}
                mode="edit"
                onChange={(data) => console.log('Structure updated:', data)}
                actions={exampleActions}
              />
            </ScrollArea>
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel minSize={20} >
          <div className="h-full w-full bg-gray-10 p-3">
            {!isInIframe && <GlobalBreadcrumb />}
            {children}
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}
