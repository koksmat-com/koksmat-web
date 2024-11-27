import React from 'react'
import { z } from 'zod'
import { ZeroTrust } from '@/components/zero-trust'

const SectionSchema = z.object({
  id: z.string(),
  title: z.string(),
  content: z.string(),
})

type SectionProps = z.infer<typeof SectionSchema>

const Section: React.FC<SectionProps> = ({ id, title, content }) => {
  return (
    <>
      <ZeroTrust
        schema={SectionSchema}
        props={{ id, title, content }}
        actionLevel="error"
        componentName="Section"
      />
      <section id={id} className="mb-12">
        <h2 className="text-3xl font-semibold text-indigo-700 mb-4">{title}</h2>
        <p className="text-lg text-gray-700">{content}</p>
      </section>
    </>
  )
}

export default Section

