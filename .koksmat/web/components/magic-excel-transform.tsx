"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, useAnimation } from "framer-motion"
import { Wand2, Pause, Play, RotateCcw } from 'lucide-react'
import { ExcelLogo } from './excel-logo'
import { AISimulationOverlay } from './ai-simulation-overlay'
import { AnimatedGrid } from './animated-grid'
import { Button } from "@/components/ui/button"

export default function MagicExcelTransform() {
  const [stage, setStage] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const wandControls = useAnimation()
  const excelControls = useAnimation()

  const runAnimation = useCallback(async () => {
    setStage(1)

    await wandControls.start({
      x: 0,
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    })

    await excelControls.start({ scale: [1, 1.2, 1], transition: { duration: 0.3 } })

    setStage(2)

    await new Promise(resolve => {
      const timer = setTimeout(resolve, 4000)
      return () => clearTimeout(timer)
    })

    if (!isPaused) {
      setStage(3)
    }
  }, [wandControls, excelControls, isPaused])

  useEffect(() => {
    if (!isPaused) {
      runAnimation()
    }
  }, [runAnimation, isPaused])

  const handlePauseResume = () => {
    setIsPaused(!isPaused)
  }

  const handleRestart = () => {
    setStage(0)
    setIsPaused(false)
    wandControls.set({ x: 100, y: 100, opacity: 0 })
    excelControls.set({ scale: 1 })
    runAnimation()
  }

  return (
    <div className="flex flex-col items-center justify-center w-full h-full bg-gradient-to-br from-blue-100 to-purple-100">
      <div className="relative w-[400px] h-[400px] flex items-center justify-center mb-4 p-8 ">
        {/* <motion.div animate={excelControls}> */}
        {stage < 3 && (
          <ExcelLogo size={400} />
        )}
        {/* </motion.div> */}

        {stage >= 1 && stage < 3 && (
          <motion.div
            initial={{ x: 100, y: 100, opacity: 0 }}
            animate={wandControls}
            className="absolute bottom-1/3 right-1/3"
          >
            <Wand2 size={32} className="text-purple-600" />
          </motion.div>
        )}

        {stage === 2 && <AISimulationOverlay isPaused={isPaused} />}

        {stage === 3 && (
          <div className="absolute inset-0 flex items-center justify-center">
            <AnimatedGrid />
          </div>
        )}
      </div>
      <div className="flex space-x-4">

        <Button onClick={handleRestart} variant="ghost">
          <RotateCcw className="mr-2 h-4 w-4" />

        </Button>
      </div>
    </div>
  )
}

