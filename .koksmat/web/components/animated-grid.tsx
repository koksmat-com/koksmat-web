import Image from 'next/image'
import { motion } from 'framer-motion'
import { HoverCard, HoverCardContent, HoverCardTrigger } from './ui/hover-card'
import { idea } from 'react-syntax-highlighter/dist/cjs/styles/hljs'
const texts = [
  {
    "title": "Strategic Alignment",
    "body": "How does this solution align with our business strategy and objectives for the next 3-5 years?"
  },
  {
    "title": "ROI and Value",
    "body": "What is the expected return on investment (ROI), and how quickly will it be realized?"
  },
  {
    "title": "Scalability",
    "body": "Can this solution scale with our growth, and what are the limitations or thresholds we should be aware of?"
  },
  {
    "title": "Innovation Potential",
    "body": "How does this approach give us a competitive edge or support innovation in our industry?"
  },
  {
    "title": "Risk Management",
    "body": "What are the primary risks associated with this initiative, and how are they being mitigated?"
  },
  {
    "title": "Customer Impact",
    "body": "How will this improve the customer experience, and what measurable outcomes should we expect?"
  },
  {
    "title": "Cost Efficiency",
    "body": "What is the total cost of ownership (TCO), and how does it compare to alternatives?"
  },
  {
    "title": "Cybersecurity and Compliance",
    "body": "How does this ensure data protection, cybersecurity, and compliance with industry regulations?"
  },
  {
    "title": "Integration",
    "body": "How well does this integrate with our existing technology stack and operational workflows?"
  },
  {
    "title": "Talent and Training",
    "body": "What skills are needed to adopt and maintain this, and how will we upskill our team?"
  },
  {
    "title": "Performance Metrics",
    "body": "What key performance indicators (KPIs) will be tracked to measure the success of this initiative?"
  },
  {
    "title": "Sustainability",
    "body": "How does this contribute to our environmental, social, and governance (ESG) goals?"
  }
]


export function AnimatedGrid() {
  const gridItems = texts

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="grid grid-cols-3 gap-4"
    >
      {gridItems.map((item, id) => (
        <motion.div
          key={id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: id * 0.1 }}
        >
          <HoverCard>
            <HoverCardTrigger asChild>
              <Image alt="icon" src="/placeholder.svg" className='cursor-pointer' height={64} width={64} />
            </HoverCardTrigger>
            <HoverCardContent className="w-80">
              <div className="flex flex-col space-y-2">
                <h4 className="text-sm font-semibold">{item.title}</h4>
                <p className="text-sm">{item.body}</p>
              </div>
            </HoverCardContent>
          </HoverCard>

        </motion.div>
      ))}
    </motion.div>
  )
}

