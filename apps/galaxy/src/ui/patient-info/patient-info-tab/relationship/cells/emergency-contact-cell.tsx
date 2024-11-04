import { useState } from 'react'
import { Flex, Switch, Text } from '@radix-ui/themes'
import toast from 'react-hot-toast'
import { PropsWithRow } from '@/components'
import { Relationship } from '@/types'
import { updatePatientRelationshipAction } from '../../actions'

const EmergencyContactCell = ({
  row: { original: relationship },
}: PropsWithRow<Relationship>) => {
  const [isEmergencyContact, setIsEmergencyContact] = useState(
    relationship?.isEmergencyContact,
  )

  const updateEmergencyContactStatus = async (checked: boolean) => {
    setIsEmergencyContact(checked)
    const result = await updatePatientRelationshipAction({
      patientId: relationship.patientId,
      body: {
        ...relationship,
        isEmergencyContact: checked,
      },
      relationshipId: relationship?.id,
    })
    if (result.state === 'success') {
      toast.success('Successfully updated!')
    } else if (result.state === 'error') {
      setIsEmergencyContact(!checked)
      toast.error(result.error ?? 'Failed to update emergency contact status')
    }
  }

  return (
    <Flex gap="1" width="100%" align="center">
      <Switch
        onCheckedChange={updateEmergencyContactStatus}
        checked={isEmergencyContact}
        color="green"
        size="1"
      />
      <Text size="2">{isEmergencyContact ? 'Yes' : 'No'}</Text>
    </Flex>
  )
}

export { EmergencyContactCell }
