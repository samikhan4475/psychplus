import { type PatientRelationship } from '@psychplus/patient'
import { type PropsWithRow } from '@psychplus/ui/data-table'
import { DropdownMenu } from '@psychplus/ui/dropdown-menu'
import { deleteRelationship, getPatientRelationships } from '../api.client'
import { useStore } from '../store'

const RowActionDelete = ({
  row: { original: relationship },
}: PropsWithRow<PatientRelationship>) => {
  const setPatientRelationships = useStore(
    (state) => state.setPatientRelationships,
  )

  const handleDelete = async () => {
    if (relationship.patientId && relationship.id) {
      await deleteRelationship(relationship.patientId, relationship.id)
      const updatedRelationships = await getPatientRelationships(
        relationship.patientId,
      )
      setPatientRelationships(updatedRelationships)
    }
  }

  return <DropdownMenu.Item onClick={handleDelete}>Delete</DropdownMenu.Item>
}

export { RowActionDelete }
