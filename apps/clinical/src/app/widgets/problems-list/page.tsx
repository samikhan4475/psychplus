import { type SearchParams } from '@psychplus/utils/url'
import { ProblemsListWidgetServer } from '@/widgets/problems-list'

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
    <ProblemsListWidgetServer
      patientId={Number(searchParams.patientId)}
      noteId={Number(searchParams.noteId)}
    />
  )
}

export default ProblemsListWidgetPage
