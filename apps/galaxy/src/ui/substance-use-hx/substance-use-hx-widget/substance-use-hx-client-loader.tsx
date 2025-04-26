'use client'

import { dequal } from 'dequal'
import { QuickNoteSectionItem } from '@/types'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { useStore } from '@/ui/quicknotes/store'
import { transformIn } from './data'
import { SubstanceUseHxWidget } from './substance-use-widget'

interface SubstanceUseHxWidgetLoaderProps {
  patientId: string
  data?: QuickNoteSectionItem[]
}

const SubstanceUseHxClientLoader = ({
  patientId,
  data,
}: SubstanceUseHxWidgetLoaderProps) => {
  const { diagnosis, workingDischargeDiagnosis } = useStore(
    (state) => ({
      workingDischargeDiagnosis:
        state.actualNotewidgetsData[
          QuickNoteSectionName.QuicknoteSectionWorkingDischargeDiagnosis
        ],
      diagnosis:
        state.actualNotewidgetsData[
          QuickNoteSectionName.QuickNoteSectionDiagnosis
        ],
    }),
    dequal,
  )
  const initialValue = transformIn(data ?? [])

  return (
    <SubstanceUseHxWidget
      patientId={patientId}
      initialValue={initialValue}
      diagnosisData={diagnosis}
      workingDiagnosisData={workingDischargeDiagnosis}
    />
  )
}

export { SubstanceUseHxClientLoader }
