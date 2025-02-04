'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import { useShallow } from 'zustand/react/shallow'
import { QuickNoteSectionItem, UpdateCptCodes } from '@/types'
import { useStore } from './store'
import { useHasPermission } from '@/hooks'

const useQuickNoteUpdate = <T extends QuickNoteSectionItem>(): {
  updateWidgetsData: (data: T[]) => void
  updateActualNoteWidgetsData: (data: T[]) => void
  isQuickNoteView: boolean
  updateCptCodes?: UpdateCptCodes
} => {
  const { setWidgetsData, setActualNoteWidgetsData, updateCptCodes } = useStore(
    useShallow((state) => ({
      setActualNoteWidgetsData: state.setActualNoteWidgetsData,
      setWidgetsData: state.setWidgetsData,
      updateCptCodes: state.updateCptCodes,
    })),
  )
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const appoinmentId = searchParams.get('id') ?? ''
  const isQuickNoteView = Boolean(
    appoinmentId && pathname.includes('quicknotes'),
  )

  if (!isQuickNoteView) {
    return {
      updateWidgetsData: () => {},
      updateActualNoteWidgetsData: () => {},
      isQuickNoteView,
      updateCptCodes: undefined,
    }
  }

  return {
    updateWidgetsData: setWidgetsData,
    updateActualNoteWidgetsData: setActualNoteWidgetsData,
    updateCptCodes,
    isQuickNoteView,
  }
}

const useQuickNotesPermissions = () => {
  const canCopyPreviousButtonQuickNotePage = useHasPermission('copyPreviousButtonQuickNotePage')
  const canPrintButtonVisitViewQuickNote = useHasPermission('printButtonVisitViewQuickNote')
  const canCopyMyPreviousButtonQuickNotePage = useHasPermission('copyMyPreviousButtonQuickNotePage')
  const canClearButtonQuickNotePage = useHasPermission('clearButtonQuickNotePage')
  const canSaveButtonQuickNotePage = useHasPermission('saveButtonQuickNotePage')
  const canUploadButtonQuickNotePage = useHasPermission('uploadButtonQuickNotePage')
  const canSignButtonQuickNotePage = useHasPermission('signButtonQuickNotePage')
  const canSendToSignatureButtonQuickNotePage = useHasPermission('sendToSignatureButtonQuickNotePage')
  const canChangeCosignerQuickNotePage = useHasPermission('changeCosignerQuickNotePage')
  const canSelectCosignerDisabledQuickNotePage = useHasPermission('selectCosignerDisabledQuickNotePage')
  const canSelectProviderNonTimeDependentVisitQuickNotePage = useHasPermission('selectProviderNonTimeDependentVisitQuickNotePage')
  const canSelectOtherProviderNonTimeDependentVisitQuickNotePage = useHasPermission('selectOtherProviderNonTimeDependentVisitQuickNotePage')

  return {
    canCopyPreviousButtonQuickNotePage,
    canPrintButtonVisitViewQuickNote,
    canCopyMyPreviousButtonQuickNotePage,
    canClearButtonQuickNotePage,
    canSaveButtonQuickNotePage,
    canUploadButtonQuickNotePage,
    canSignButtonQuickNotePage,
    canSendToSignatureButtonQuickNotePage,
    canChangeCosignerQuickNotePage,
    canSelectCosignerDisabledQuickNotePage,
    canSelectProviderNonTimeDependentVisitQuickNotePage,
    canSelectOtherProviderNonTimeDependentVisitQuickNotePage,
  }
}

export { useQuickNoteUpdate, useQuickNotesPermissions }
