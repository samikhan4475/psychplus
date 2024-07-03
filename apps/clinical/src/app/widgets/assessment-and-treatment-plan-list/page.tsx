import { Box } from '@radix-ui/themes'
import { type SearchParams } from '@psychplus/utils/url'
import { AssessmentAndTreatmnetPlansListWidgetServer } from '@/widgets/assessment-and-treatment-plan-list'

const ProblemsListWidgetPage = ({
  searchParams,
}: {
  searchParams: SearchParams
}) => {
  if (!searchParams.patientId) {
    return <Box>Patient ID is required</Box>
  }

  if (!searchParams.noteId) {
    return <Box>Note ID is required</Box>
  }

  return (
    <AssessmentAndTreatmnetPlansListWidgetServer
      patientId={Number(searchParams.patientId)}
      noteId={Number(searchParams.noteId)}
    />
  )
}

export default ProblemsListWidgetPage
