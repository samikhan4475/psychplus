import { useState } from 'react'
import { ScrollArea } from '@radix-ui/themes'
import { type ColumnDef } from '@tanstack/react-table'
import toast from 'react-hot-toast'
import { saveWidgetAction } from '@/actions/save-widget'
import { CheckboxCell, ColumnHeader, DataTable } from '@/components'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { transformOut } from '../../shared/data'
import { QuestionnaireSchemaType } from '../../shared/questionnaires-schema'
import { QUESTIONS } from '../constants'
import { ActionsCell, AddToPreVisitAssessmentCell, TestNameCell } from './cells'

interface DashboardTableProps {
  patientId: string
  data: QuestionnaireSchemaType
}

const createColumns = (
  handleCheckAllTests: (checked: string) => void,
  handleCheckOneTest: (id: string, checked: string) => void,
  checkedTests: Record<string, string>,
  allChecked: boolean,
): ColumnDef<{ id: string; question: string }>[] => [
  {
    id: 'test-name',
    header: () => <ColumnHeader label="Test Name" />,
    cell: ({ row }) => {
      return <TestNameCell>{row.original.question}</TestNameCell>
    },
  },
  {
    id: 'add-to-pre-visit-assessment',
    header: () => (
      <CheckboxCell
        label="Add to Pre-visit Assessment"
        checked={allChecked}
        onCheckedChange={(checked) =>
          handleCheckAllTests(checked ? 'Yes' : 'No')
        }
        className="px-[9px]"
      />
    ),
    cell: ({ row }) => (
      <AddToPreVisitAssessmentCell
        checked={checkedTests[row.original.id] === 'Yes'}
        className="px-[5px]"
        onCheckedChange={(checked) =>
          handleCheckOneTest(row.original.id, checked ? 'Yes' : 'No')
        }
      />
    ),
  },
  {
    id: 'send-to-patient',
    header: () => <ColumnHeader label="Send to Patient" />,
    cell: ActionsCell,
  },
]

const DashboardTable = ({ patientId, data }: DashboardTableProps) => {
  const [checkedTests, setCheckedTests] = useState<Record<string, string>>(data)

  const updateQuickNotes = async (list: QuestionnaireSchemaType) => {
    setCheckedTests(list)
    const outData = transformOut(
      patientId,
      QuickNoteSectionName.QuickNoteSectionDashboard,
    )(list)

    const result = await saveWidgetAction({ patientId, data: outData })
    if (result.state === 'success') {
      toast.success('Saved!')
    } else {
      toast.error('Failed to save!')
    }
  }

  const handleCheckAllTests = async (checked: string) => {
    const list: Record<string, string> = {}
    Object.keys(data).forEach((key) => {
      list[key] = checked
    })
    updateQuickNotes(list)
  }

  const handleCheckOneTest = async (id: string, checked: string) => {
    const list = { ...checkedTests, [id]: checked }
    updateQuickNotes(list)
  }

  const allChecked = Object.keys(data).every(
    (key) => checkedTests[key] === 'Yes',
  )

  // Pass handlers to the columns
  const columns = createColumns(
    handleCheckAllTests,
    handleCheckOneTest,
    checkedTests,
    allChecked,
  )

  return (
    <ScrollArea>
      <DataTable data={QUESTIONS} columns={columns} disablePagination sticky />
    </ScrollArea>
  )
}

export { DashboardTable }
