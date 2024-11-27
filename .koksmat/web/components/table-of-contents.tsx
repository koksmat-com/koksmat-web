import React from 'react'
import { z } from 'zod'
import { ZeroTrust } from '@/components/zero-trust'

const TableOfContentsSchema = z.object({
  sections: z.array(
    z.object({
      id: z.string(),
      title: z.string(),
    })
  ),
  activeSection: z.string(),
})

type TableOfContentsProps = z.infer<typeof TableOfContentsSchema>

const TableOfContents: React.FC<TableOfContentsProps> = ({ sections, activeSection }) => {
  return (
    <>
      <ZeroTrust
        schema={TableOfContentsSchema}
        props={{ sections, activeSection }}
        actionLevel="error"
        componentName="TableOfContents"
      />
      <nav className="lg:w-64 bg-white p-6 shadow-md">
        <h2 className="text-2xl font-semibold text-indigo-800 mb-4">Contents</h2>
        <ul>
          {sections.map((section) => (
            <li key={section.id} className="mb-2">
              <a
                href={`#${section.id}`}
                className={`text-lg ${
                  activeSection === section.id ? 'text-indigo-600 font-semibold' : 'text-gray-600 hover:text-indigo-600'
                }`}
              >
                {section.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </>
  )
}

export default TableOfContents

