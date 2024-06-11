'use client'

import { useRef } from 'react'

interface PreloaderProps {
  isLoadingOn: boolean
}

const Preloader = ({ isLoadingOn }: PreloaderProps) => {
  const loaded = useRef(isLoadingOn)

  if (!loaded.current) {
    loaded.current = true
  }

  return null
}

export { Preloader }
