'use client'

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
  const diagnosisData = useStore(
    (state) =>
      state.actualNotewidgetsData[
        QuickNoteSectionName.QuickNoteSectionDiagnosis
      ],
  )
  const initialValue = transformIn(data ?? [])

  return (
    <SubstanceUseHxWidget
      patientId={patientId}
      initialValue={initialValue}
      diagnosisData={diagnosisData}
    />
  )
}

export { SubstanceUseHxClientLoader }
