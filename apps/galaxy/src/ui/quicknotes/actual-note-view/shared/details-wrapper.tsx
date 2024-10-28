'use client'

import { PropsWithChildren, useCallback, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { QuickNoteSectionName } from '../../constants'
import { useStore } from '../../quicknotes-store'
import { useWidgetSaveListener } from '../hooks'

type Props = {
  sectionName: QuickNoteSectionName
}

const ActualNoteDetailsWrapper = ({
  sectionName,
  children,
}: PropsWithChildren<Props>) => {
  const showActualNoteView = useStore((state) => state.showActualNoteView)

  const router = useRouter()

  const refetch = useCallback(async () => {
    router.refresh()
  }, [router])

  useEffect(() => {
    refetch()
  }, [showActualNoteView, refetch])

  useWidgetSaveListener(refetch, sectionName)

  return children
}

export { ActualNoteDetailsWrapper }
