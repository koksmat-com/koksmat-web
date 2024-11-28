import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

const stages = ["Analyzing", "Splitting", "Optimizing", "Deploying"]

export function AISimulationOverlay(props: { isPaused: boolean }) {
  const [currentStage, setCurrentStage] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStage((prev) => (prev + 1) % stages.length)
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStage}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <p className="text-lg font-bold text-purple-700">{stages[currentStage]}</p>
          <motion.div
            className="h-1 bg-purple-500 mt-2 rounded-full"
            style={{ width: `${((currentStage + 1) / stages.length) * 100}%` }}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

