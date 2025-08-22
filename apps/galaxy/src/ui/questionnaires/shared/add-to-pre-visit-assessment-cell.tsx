'use client'

import { useState } from 'react'
import toast from 'react-hot-toast'
import { saveWidgetAction } from '@/actions/save-widget'
import { CheckboxCell } from '@/components'
import { QuickNoteSectionItem } from '@/types'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { QUESTIONS } from '../dashboard-tab/constants'
import { transformIn, transformOut } from './data'
import { QuestionnaireSchemaType } from './questionnaires-schema'

interface DashboardTableProps {
  patientId: string
  questionaireId: string
  data: QuickNoteSectionItem[]
}

const AddToPreVisitAssessmentCell = ({
  patientId,
  data,
  questionaireId,
}: DashboardTableProps) => {
  const initialValue = transformIn(
    data,
    QUESTIONS.length,
    QuickNoteSectionName.QuickNoteSectionDashboard,
    1,
  )
  const [checkedTests, setCheckedTests] =
    useState<QuestionnaireSchemaType>(initialValue)
  const [checked, setChecked] = useState(checkedTests[questionaireId] === 'Yes')

  const updateQuickNotes = async (list: QuestionnaireSchemaType) => {
    setCheckedTests(list)
    const outData = await transformOut(
      patientId,
      QuickNoteSectionName.QuickNoteSectionDashboard,
      '123',
    )(list)

    const result = await saveWidgetAction({ patientId, data: outData })
    if (result.state === 'success') {
      toast.success('Saved!')
    } else {
      toast.error('Failed to save!')
    }
  }

  const handleCheckOneTest = async (id: string, checked: string) => {
    const list = { ...checkedTests, [id]: checked }
    updateQuickNotes(list)
  }

  return (
    <CheckboxCell
      label="Add to Pre-Visit Assessment"
      checked={checked}
      onCheckedChange={(checked) => {
        setChecked(checked)
        handleCheckOneTest('Q19', checked ? 'Yes' : 'No')
      }}
    />
  )
}

export { AddToPreVisitAssessmentCell }
