import { type SearchParams } from '@psychplus/utils/url'
import { FunctionalCognitiveListWidgetServer } from '@/widgets/functional-cognitive-list'

const ProblemsListWidgetPage = ({
  searchParams,
}: {
  searchParams: SearchParams
}) => {
  const { patientId, noteId } = searchParams

  if (!patientId || isNaN(Number(patientId))) {
    return <div>Valid Patient ID is required</div>
  }

  if (!noteId || isNaN(Number(noteId))) {
    return <div>Valid Note ID is required</div>
  }

  return (
    <FunctionalCognitiveListWidgetServer
      patientId={Number(patientId)}
      noteId={Number(noteId)}
    />
  )
}

export default ProblemsListWidgetPage
