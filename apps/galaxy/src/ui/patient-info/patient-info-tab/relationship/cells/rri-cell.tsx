'use client'

import { useState } from 'react'
import { Flex, Switch, Text } from '@radix-ui/themes'
import toast from 'react-hot-toast'
import { PropsWithRow } from '@/components'
import { Relationship } from '@/types'
import { updatePatientRelationshipAction } from '../../actions'
import { RRIHistory } from '../rri-history'

const RriCell = ({
  row: { original: relationship },
}: PropsWithRow<Relationship>) => {
  const [isAllowedToReleaseInformation, setIsAllowedToReleaseInformation] =
    useState(relationship?.isAllowedToReleaseInformation)

  const updateRequestToReleaseInformation = async (checked: boolean) => {
    setIsAllowedToReleaseInformation(checked)
    const result = await updatePatientRelationshipAction({
      patientId: relationship?.patientId,
      body: {
        ...relationship,
        isAllowedToReleaseInformation: checked,
      },
      relationshipId: relationship?.id,
    })
    if (result.state === 'success') {
      toast.success('Successfully updated!')
    } else if (result.state === 'error') {
      setIsAllowedToReleaseInformation(!checked)
      toast.error(result.error ?? 'Failed to update RRI status')
    }
  }
  return (
    <Flex gap="1" width="100%" align="center">
      <RRIHistory data={relationship?.releaseInformationHistory ?? []} />
      <Switch
        onCheckedChange={updateRequestToReleaseInformation}
        checked={isAllowedToReleaseInformation}
        color="green"
        size="1"
      />
      <Text size="2">{isAllowedToReleaseInformation ? 'Yes' : 'No'}</Text>
    </Flex>
  )
}

export { RriCell }
