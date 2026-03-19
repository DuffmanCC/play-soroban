import { AnimatePresence, motion } from "motion/react"
import { type ReactNode } from "react"

type AnimatedModalProps = {
  open: boolean
  onClose?: () => void
  children: ReactNode
  bounce?: boolean
}

export default function AnimatedModal({
  open,
  onClose,
  children,
  bounce = false,
}: AnimatedModalProps) {
  const scaleAnimation = bounce ? { scale: [0.9, 1.05, 1] } : { scale: 1 }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={scaleAnimation}
            exit={{ scale: 0.95 }}
            transition={
              bounce ? { duration: 0.25, ease: "easeOut" } : { duration: 0.15 }
            }
            onClick={(e) => e.stopPropagation()}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
