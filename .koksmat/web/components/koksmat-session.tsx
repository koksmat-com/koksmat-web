'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { z } from 'zod'
import { ZeroTrust } from '@/components/zero-trust'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { createSession, deleteSession, listSessions } from './actions/session-manager'
import { ComponentDoc } from './component-documentation-hub'


// AI-friendly component description:
// KoksmatSession is a React component that manages session creation, deletion, and reuse.
// It interacts with server-side functions to handle session operations and displays the current session state.

const KoksmatSessionSchema = z.object({
  className: z.string().optional(),
})

type KoksmatSessionProps = z.infer<typeof KoksmatSessionSchema>

export function KoksmatSessionComponent({ className = '' }: KoksmatSessionProps) {
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const sessionIdFromUrl = searchParams.get('koksmat-sessionid')
    if (sessionIdFromUrl) {
      setSessionId(sessionIdFromUrl)
      checkSession(sessionIdFromUrl)
    } else {
      createNewSession()
    }
  }, [searchParams])

  const checkSession = async (id: string) => {
    setIsLoading(true)
    try {
      const sessions = await listSessions("")
      if (sessions.includes(id)) {
        setSessionId(id)
      } else {
        setError('Session not found')
      }
    } catch (err) {
      setError('Failed to check session')
    } finally {
      setIsLoading(false)
    }
  }

  const createNewSession = async () => {
    setIsLoading(true)
    try {
      const newSessionPath = await createSession({
        prefix: 'koksmat',
        correlationId: ''
      })
      const newSessionId = newSessionPath.split('/').pop() || ''
      setSessionId(newSessionId)
      router.push(`?koksmat-sessionid=${newSessionId}`)
    } catch (err) {
      setError('Failed to create new session')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteAndRecreate = async () => {
    if (sessionId) {
      try {
        await deleteSession({
          sessionId,
          correlationId: ''
        })
        createNewSession()
      } catch (err) {
        setError('Failed to delete and recreate session')
      }
    }
  }

  return (
    <>
      <ZeroTrust
        schema={KoksmatSessionSchema}
        props={{ className }}
        actionLevel="error"
        componentName="KoksmatSession"
      />
      <Card className={`w-full max-w-md ${className}`}>
        <CardHeader>
          <CardTitle>Koksmat Session</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <p>Loading session...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <>
              <p>Current Session ID: {sessionId}</p>
              <div className="mt-4 space-x-2">
                <Button onClick={() => router.push(`?koksmat-sessionid=${sessionId}`)}>
                  Reuse Session
                </Button>
                <Button onClick={handleDeleteAndRecreate}>Delete and Recreate</Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </>
  )
}

export const examplesKoksmatSession: ComponentDoc[] = [
  {
    id: 'KoksmatSession',
    name: 'KoksmatSession',
    description: 'A component for managing Koksmat sessions.',
    usage: `
      <KoksmatSession />
    `,
    example: <KoksmatSessionComponent />,
  },
]