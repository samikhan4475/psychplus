import { type PatientRelationship } from '@psychplus/patient'
import { useEditModeContext } from '@psychplus/patient-info'
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
  const { editable } = useEditModeContext()

  const handleDelete = async () => {
    if (relationship.patientId && relationship.id) {
      await deleteRelationship(relationship.patientId, relationship.id)
      const updatedRelationships = await getPatientRelationships(
        relationship.patientId,
      )
      setPatientRelationships(updatedRelationships)
    }
  }

  return (
    <DropdownMenu.Item disabled={!editable} onClick={handleDelete}>
      Delete
    </DropdownMenu.Item>
  )
}

export { RowActionDelete }
