import Image from 'next/image'
import { motion } from 'framer-motion'

interface ExcelLogoProps {
  size?: number
  animate?: boolean
}

export function ExcelLogo({ size = 400, animate = false }: ExcelLogoProps) {
  return (
    <motion.div
      animate={animate ? { scale: [1, 1.2, 1] } : {}}
      transition={{ duration: 0.3 }}
    >
      <Image
        src="/excel.png"
        alt="Excel Icon"
        width={size}
        height={size}
      />
    </motion.div>
  )
}

