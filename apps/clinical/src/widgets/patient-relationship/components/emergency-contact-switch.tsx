import { useEffect, useState } from 'react'
import { Switch, Text } from '@radix-ui/themes'
import { type PatientRelationship } from '@psychplus/patient'
import { PropsWithRow } from '@psychplus/ui/data-table/data-table-row-actions'
import {
  getPatientRelationships,
  updatePatientRelationship,
} from '../api.client'
import { useStore } from '../store'

const EmergencyContactSwitch = ({
  row: { original: relationship },
}: PropsWithRow<PatientRelationship>) => {
  const [isEmergencyContact, setIsEmergencyContact] = useState<
    boolean | undefined
  >(undefined)
  const setPatientRelationships = useStore(
    (state) => state.setPatientRelationships,
  )

  useEffect(() => {
    setIsEmergencyContact(relationship.isEmergencyContact)
  }, [relationship.isEmergencyContact])

  const updateEmergencyContactStatus = async (checked: boolean) => {
    const patientRelationship = {
      ...relationship,
      isEmergencyContact: checked,
    }
    await updatePatientRelationship({
      patientId: patientRelationship.patientId,
      body: patientRelationship,
      relationshipId: patientRelationship.id,
    })
    setIsEmergencyContact(checked)
    const updatedRelationships = await getPatientRelationships(patientRelationship.patientId as number)
    setPatientRelationships(updatedRelationships)
  }

  return (
    <Text>
      <Switch
        onCheckedChange={updateEmergencyContactStatus}
        checked={isEmergencyContact}
        className='mr-1'
        color="grass"
      />
      {isEmergencyContact ? 'Yes' : 'No'}
    </Text>
  )
}

export { EmergencyContactSwitch }
