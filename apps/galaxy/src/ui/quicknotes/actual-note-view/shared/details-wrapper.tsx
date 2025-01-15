'use client'

import { PropsWithChildren, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { QuickNoteSectionName } from '../../constants'
import { useWidgetSaveListener } from '../hooks'

type Props = {
  sectionName: QuickNoteSectionName
}

const ActualNoteDetailsWrapper = ({
  sectionName,
  children,
}: PropsWithChildren<Props>) => {
  const router = useRouter()

  const refetch = useCallback(async () => {
    // router.refresh()
  }, [router])

  useWidgetSaveListener(refetch, sectionName)

  return children
}

export { ActualNoteDetailsWrapper }
