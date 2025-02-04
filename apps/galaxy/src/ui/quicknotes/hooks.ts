'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import { useStore } from './store'
import { useHasPermission } from '@/hooks'

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
