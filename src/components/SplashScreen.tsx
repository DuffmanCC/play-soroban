import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "motion/react"

export default function SplashScreen() {
  const [open, setOpen] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setOpen(false), 2400)
    return () => clearTimeout(timer)
  }, [])

  if (import.meta.env.MODE === "test") return null

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#F43F5E]"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 12,
              duration: 0.8,
            }}
          >
            <svg
              viewBox="0 0 50 30"
              xmlns="http://www.w3.org/2000/svg"
              className="h-auto w-48"
            >
              <polygon points="18,0 32,0 45,15 5,15" fill="#ffffff" />
              <polygon points="5,15 45,15 32,30 18,30" fill="#fcdae0" />
            </svg>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
