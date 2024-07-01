import { type SearchParams } from '@psychplus/utils/url'
import { AddRelationshipWidgetServer } from '@/widgets/add-relationship'
import { Text } from '@radix-ui/themes'

const AddRelationshipWidgetPage = ({
  searchParams,
}: {
  searchParams: SearchParams
}) => {
  const patientId = searchParams.patientId

  if (!patientId) {
    return <Text>Patient ID is required</Text>
  }

  return <AddRelationshipWidgetServer patientId={Number(patientId)} />
}

export default AddRelationshipWidgetPage

