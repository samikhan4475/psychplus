import { useState } from 'react'
import { Flex, Switch, Text } from '@radix-ui/themes'
import toast from 'react-hot-toast'
import { PropsWithRow } from '@/components'
import { Relationship } from '@/types'
import { updatePatientRelationshipAction } from '../../actions'

const GuardianCell = ({
  row: { original: relationship },
}: PropsWithRow<Relationship>) => {
  const [isGuardian, setIsGuardian] = useState(relationship?.isGuardian)

  const udpateGuardianStatus = async (checked: boolean) => {
    setIsGuardian(checked)
    const result = await updatePatientRelationshipAction({
      patientId: relationship.patientId,
      body: {
        ...relationship,
        isGuardian: checked,
      },
      relationshipId: relationship?.id,
    })
    if (result.state === 'success') {
      toast.success('Successfully updated!')
    } else if (result.state === 'error') {
      setIsGuardian(!checked)
      toast.error(result.error ?? 'Failed to update emergency contact status')
    }
  }

  return (
    <Flex gap="1" width="100%" align="center">
      <Switch
        onCheckedChange={udpateGuardianStatus}
        checked={isGuardian}
        color="green"
        size="1"
      />
      <Text size="2">{isGuardian ? 'Yes' : 'No'}</Text>
    </Flex>
  )
}

export { GuardianCell }
