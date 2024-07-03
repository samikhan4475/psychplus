import { Text } from '@radix-ui/themes'
import { type SearchParams } from '@psychplus/utils/url'
import { AssessmentAndTreatmnetPlansDetailWidgetServer } from '@/widgets/assessment-and-treatment-plan-detail'

const ProblemsListWidgetPage = ({
  searchParams,
}: {
  searchParams: SearchParams
}) => {
  if (!searchParams.patientId) {
    return <Text>Patient ID is required</Text>
  }

  if (!searchParams.noteId) {
    return <Text>Note ID is required</Text>
  }
  if (!searchParams.rowId) {
    return <Text>Record ID is required</Text>
  }
  return (
    <AssessmentAndTreatmnetPlansDetailWidgetServer
      patientId={Number(searchParams.patientId)}
      noteId={Number(searchParams.noteId)}
      rowId={searchParams.rowId}
    />
  )
}

export default ProblemsListWidgetPage
