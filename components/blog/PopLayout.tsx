"use client"
import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'

function PopLayout({children}: {children: React.ReactNode}) {
  return (
    
    <AnimatePresence mode="popLayout">
      {children}
    </AnimatePresence>
  
  )
}

export default PopLayout