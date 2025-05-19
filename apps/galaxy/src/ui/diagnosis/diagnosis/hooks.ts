import { useDebouncedCallback } from 'use-debounce'
import { DiagnosisIcd10Code, QuickNoteSectionItem } from '@/types'
import { buildDiagnosisQuickNoteItems } from './utils'

export const useDebouncedDiagnosisQuickNoteSave = (
  patientId: string,
  updateActualNoteWidgetsData: (items: QuickNoteSectionItem[]) => void,
  sectionName: string,
  delayMs = 500,
  appId?: string,
) =>
  useDebouncedCallback((diagnoses: DiagnosisIcd10Code[]) => {
    const items = buildDiagnosisQuickNoteItems(
      patientId,
      sectionName,
      diagnoses,
      appId,
    )
    updateActualNoteWidgetsData(items)
  }, delayMs)
