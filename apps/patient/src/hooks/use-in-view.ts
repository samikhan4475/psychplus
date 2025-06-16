'use client'

import { useEffect, useRef, useState } from 'react'

export const useInViewOnce = <T extends Element>(
  options?: IntersectionObserverInit,
): [React.RefObject<T>, boolean] => {
  const ref = useRef<T>(null)
  const [hasEnteredView, setHasEnteredView] = useState(false)
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    const observe = () => {
      const node = ref.current
      if (!node || hasEnteredView) return

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setHasEnteredView(true)
            observer.disconnect()
          }
        },
        { threshold: 0.1, ...options },
      )

      observer.observe(node)
      observerRef.current = observer
    }

    const timeoutId = setTimeout(observe, 50)
    observe()

    return () => {
      observerRef.current?.disconnect()
      clearTimeout(timeoutId)
    }
  }, [ref.current, hasEnteredView])

  return [ref, hasEnteredView]
}
