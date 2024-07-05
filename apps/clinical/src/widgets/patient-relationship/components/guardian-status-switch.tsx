import { useEffect, useState } from 'react'
import { Switch, Text } from '@radix-ui/themes'
import { type PatientRelationship } from '@psychplus/patient'
import { PropsWithRow } from '@psychplus/ui/data-table/data-table-row-actions'
import {
  getPatientRelationships,
  updatePatientRelationship,
} from '../api.client'
import { useStore } from '../store'

const GuardianStatusSwitch = ({
  row: { original: relationship },
}: PropsWithRow<PatientRelationship>) => {
  const [isGuardian, setIsGuardian] = useState<boolean | undefined>(undefined)
  const setPatientRelationships = useStore(
    (state) => state.setPatientRelationships,
  )

  useEffect(() => {
    setIsGuardian(relationship.isGuardian)
  }, [relationship.isGuardian])

  const udpateGuardianStatus = async (checked: boolean) => {
    const patientRelationship = {
      ...relationship,
      isGuardian: checked,
    }
    await updatePatientRelationship({
      patientId: patientRelationship.patientId,
      body: patientRelationship,
      relationshipId: patientRelationship.id,
    })
      setIsGuardian(checked)
      const updatedRelationships = await getPatientRelationships(patientRelationship.patientId as number)
      setPatientRelationships(updatedRelationships)
  }

  return (
    <Text>
      <Switch
        onCheckedChange={udpateGuardianStatus}
        checked={isGuardian}
        className='mr-1'
        color="grass"
      />
      {isGuardian ? 'Yes' : 'No'}
    </Text>
  )
}

export { GuardianStatusSwitch }
