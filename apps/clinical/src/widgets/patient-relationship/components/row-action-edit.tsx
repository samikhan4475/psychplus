import { type PropsWithRow } from '@psychplus/ui/data-table'
import { DropdownMenu } from '@psychplus/ui/dropdown-menu'
import { type PatientRelationship } from '@psychplus/patient'
import { usePubsub } from '@psychplus/utils/event'
import { ADD_RELATIONSHIP_WIDGET } from '@psychplus/widgets'
import { EventType } from '@psychplus/widgets/events'

const RowActionEdit = ({
  row: { original: relationship },
}: PropsWithRow<PatientRelationship>) => {
  const { publish } = usePubsub()

  return (
    <DropdownMenu.Item
      onClick={() => {
        if (relationship.contactDetails) relationship.contactDetails.isMailingAddressSameAsPrimary = true
        publish(`${ADD_RELATIONSHIP_WIDGET}:${EventType.Opened}`, relationship)
      }}
    >
      Edit
    </DropdownMenu.Item>
  )
}

export { RowActionEdit }
