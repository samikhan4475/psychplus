'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import { useStore } from './store'

const useQuickNoteUpdate = () => {
  const { setWidgetsData } = useStore((state) => ({
    setWidgetsData: state.setWidgetsData,
  }))
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const appoinmentId = searchParams.get('id') ?? ''
  const isQuickNoteView = appoinmentId && pathname.includes('quicknotes')

  if (!isQuickNoteView) {
    return { updateWidgetsData: () => {}, isQuickNoteView }
  }

  return { updateWidgetsData: setWidgetsData, isQuickNoteView }
}

export { useQuickNoteUpdate }
