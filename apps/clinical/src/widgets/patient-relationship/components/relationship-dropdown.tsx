import { useEffect, useState } from 'react'
import { CODE_NOT_SET } from '@psychplus/codeset'
import { PatientRelationship } from '@psychplus/patient'
import { type PropsWithRow } from '@psychplus/ui/data-table'
import { Select } from '@psychplus/ui/select'
import {
  getPatientRelationships,
  updatePatientRelationship,
} from '../api.client'
import { useGuardianRelationshipsOptions } from '../hooks'
import { useStore } from '../store'
import { useEditModeContext } from '@psychplus/patient-info'

const RelationshipDropdown = ({
  row: { original: relationship },
}: PropsWithRow<PatientRelationship>) => {
  const relationshipOptions = useGuardianRelationshipsOptions()
  const [value, setValue] = useState<string>(
    relationship.guardianRelationshipCode ?? '',
  )
  const setPatientRelationships = useStore(
    (state) => state.setPatientRelationships,
  )
  const { editable } = useEditModeContext()

  useEffect(() => {
    setValue(relationship.guardianRelationshipCode ?? '')
  }, [relationship.guardianRelationshipCode])

  const updateGuardianRelationship = async (value: string) => {
    const patientRelationship = {
      ...relationship,
      guardianRelationshipCode: value,
    }

    await updatePatientRelationship({
      patientId: patientRelationship.patientId,
      body: patientRelationship,
      relationshipId: patientRelationship.id,
    })
    setValue(value)
    const updatedRelationships = await getPatientRelationships(
      patientRelationship.patientId as number,
    )
    setPatientRelationships(updatedRelationships)
  }

  return (
    <Select.Root
      size="2"
      onValueChange={updateGuardianRelationship}
      value={value}
      disabled={!editable}
    >
      <Select.Trigger variant="ghost" className="w-[100%]" />
      <Select.Content>
        {relationshipOptions.map((option) => (
          <Select.Item key={option.value} value={option.value}>
            {option.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  )
}

export { RelationshipDropdown }
