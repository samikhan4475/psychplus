import { type SearchParams } from '@psychplus/utils/url'
import { CarePlansListWidgetServer } from '@/widgets/care-plans'

const ProblemsListWidgetPage = ({
  searchParams,
}: {
  searchParams: SearchParams
}) => {
  if (!searchParams.patientId) {
    return <div>Patient ID is required</div>
  }

  if (!searchParams.noteId) {
    return <div>Note ID is required</div>
  }

  return (
    <CarePlansListWidgetServer
      patientId={Number(searchParams.patientId)}
      noteId={Number(searchParams.noteId)}
    />
  )
}

export default ProblemsListWidgetPage
