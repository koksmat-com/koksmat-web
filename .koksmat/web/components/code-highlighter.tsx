'use client'

import React from 'react'
import { Highlight, themes, Language, PrismTheme } from "prism-react-renderer"
import { z } from 'zod'
import { ZeroTrust } from '@/components/zero-trust'
import { ComponentDoc } from './component-documentation-hub'

// Define the allowed themes
const allowedThemes = Object.keys(themes) as [keyof typeof themes, ...Array<keyof typeof themes>]

// Zod schema for props
const CodeHighlighterSchema = z.object({
  language: z.string(),
  theme: z.enum(allowedThemes),
  className: z.string().optional(),
})

// Infer the props type from the schema
type CodeHighlighterProps = z.infer<typeof CodeHighlighterSchema> & {
  children: string
}

/**
 * CodeHighlighter Component
 * 
 * This component provides syntax highlighting for code snippets using prism-react-renderer.
 * It supports various languages and themes, and allows for custom styling via className.
 *
 * @param {string} language - The programming language of the code snippet
 * @param {keyof typeof themes} theme - The color theme for syntax highlighting
 * @param {string} className - Additional CSS classes for styling (optional)
 * @param {string} children - The code snippet to be highlighted
 */
export function CodeHighlighterComponent({ language, theme, className, children }: CodeHighlighterProps) {
  return (
    <>
      <ZeroTrust
        schema={CodeHighlighterSchema}
        props={{ language, theme, className }}
        actionLevel="error"
        componentName="CodeHighlighter"
      />
      <Highlight theme={themes[theme]} code={children} language={language as Language}>
        {({ className: highlightClassName, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={`${highlightClassName} ${className || ''} p-4 rounded overflow-auto`} style={style}>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line, key: i })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token, key })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </>
  )
}

// Example usage documentation
export const examplesCodeHighlighter: ComponentDoc[] = [
  {
    id: 'CodeHighlighter',
    name: 'CodeHighlighter',
    description: 'A component for syntax highlighting code snippets with various themes.',
    usage: `
import CodeHighlighter from './CodeHighlighter'
import { themes } from "prism-react-renderer"

<CodeHighlighter language="javascript" theme="dracula">
  const greeting = 'Hello, World!';
  console.log(greeting);
</CodeHighlighter>
    `,
    example: (
      <CodeHighlighterComponent language="javascript" theme="dracula">
        {`const greeting = 'Hello, World!';
console.log(greeting);`}
      </CodeHighlighterComponent>
    ),
  },
  {
    id: 'CodeHighlighterCustomTheme',
    name: 'CodeHighlighter with Custom Theme',
    description: 'Using CodeHighlighter with a different theme.',
    usage: `
<CodeHighlighter language="python" theme="vsDark" className="my-4">
  def greet(name):
      return f"Hello, {name}!"
  
  print(greet("Alice"))
</CodeHighlighter>
    `,
    example: (
      <CodeHighlighterComponent language="python" theme="vsDark" className="my-4">
        {`def greet(name):
    return f"Hello, {name}!"

print(greet("Alice"))`}
      </CodeHighlighterComponent>
    ),
  },
]