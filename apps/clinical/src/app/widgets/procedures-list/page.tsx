import { Text } from '@radix-ui/themes'
import { type SearchParams } from '@psychplus/utils/url'
import { ProceduresListWidgetServer } from '@/widgets/procedures-list'

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

  return (
    <ProceduresListWidgetServer
      patientId={Number(searchParams.patientId)}
      noteId={Number(searchParams.noteId)}
    />
  )
}

export default ProblemsListWidgetPage
