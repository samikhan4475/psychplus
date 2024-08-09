import { type PatientRelationship } from '@psychplus/patient'
import { useEditModeContext } from '@psychplus/patient-info'
import { type PropsWithRow } from '@psychplus/ui/data-table'
import { DropdownMenu } from '@psychplus/ui/dropdown-menu'
import { usePubsub } from '@psychplus/utils/event'
import { ADD_RELATIONSHIP_WIDGET } from '@psychplus/widgets'
import { EventType } from '@psychplus/widgets/events'

const RowActionEdit = ({
  row: { original: relationship },
}: PropsWithRow<PatientRelationship>) => {
  const { publish } = usePubsub()
  const { editable } = useEditModeContext()

  return (
    <DropdownMenu.Item
      onClick={() => {
        if (relationship.contactDetails)
          relationship.contactDetails.isMailingAddressSameAsPrimary = true
        publish(`${ADD_RELATIONSHIP_WIDGET}:${EventType.Opened}`, relationship)
      }}
      disabled={!editable}
    >
      Edit
    </DropdownMenu.Item>
  )
}

export { RowActionEdit }
