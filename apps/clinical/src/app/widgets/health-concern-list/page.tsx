import { type SearchParams } from '@psychplus/utils/url'
import { HealthConcernListWidgetServer } from '@/widgets/health-concern-list'

const HealthConcernListWidgetPage = ({
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
    <HealthConcernListWidgetServer
      patientId={Number(searchParams.patientId)}
      noteId={Number(searchParams.noteId)}
    />
  )
}

export default HealthConcernListWidgetPage
