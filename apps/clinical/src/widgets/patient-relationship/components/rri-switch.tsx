import { useEffect, useState } from 'react'
import { Switch, Text } from '@radix-ui/themes'
import type { PatientRelationship } from '@psychplus/patient'
import { PropsWithRow } from '@psychplus/ui/data-table/data-table-row-actions'
import {
  getPatientRelationships,
  updatePatientRelationship,
} from '../api.client'
import { useStore } from '../store'
import { useEditModeContext } from '@psychplus/patient-info'

const RriSwitch = ({
  row: { original: relationship },
}: PropsWithRow<PatientRelationship>) => {
  const [isAllowedToReleaseInformation, setIsAllowedToReleaseInformation] =
    useState<boolean | undefined>(undefined)
  const setPatientRelationships = useStore(
    (state) => state.setPatientRelationships,
  )
  const { editable } = useEditModeContext()

  useEffect(() => {
    setIsAllowedToReleaseInformation(relationship.isAllowedToReleaseInformation)
  }, [relationship.isAllowedToReleaseInformation])

  const updateRequestToReleaseInformation = async (checked: boolean) => {
    const patientRelationship = {
      ...relationship,
      isAllowedToReleaseInformation: checked,
    }
    await updatePatientRelationship({
      patientId: patientRelationship.patientId,
      body: patientRelationship,
      relationshipId: patientRelationship.id,
    })
    setIsAllowedToReleaseInformation(checked)
    const updatedRelationships = await getPatientRelationships(
      patientRelationship.patientId as number,
    )
    setPatientRelationships(updatedRelationships)
  }

  return (
    <Text>
      <Switch
        onCheckedChange={updateRequestToReleaseInformation}
        checked={isAllowedToReleaseInformation}
        disabled={!editable}
        className='mr-1'
        color="grass"
      />
      {isAllowedToReleaseInformation ? 'Yes' : 'No'}
    </Text>
  )
}

export { RriSwitch }
