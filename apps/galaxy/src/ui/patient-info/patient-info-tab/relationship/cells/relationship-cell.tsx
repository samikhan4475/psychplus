import { useState } from 'react'
import toast from 'react-hot-toast'
import { CodesetSelectCell, PropsWithRow } from '@/components'
import { CODESETS } from '@/constants'
import { Relationship } from '@/types'
import { updatePatientRelationshipAction } from '../../actions'

const RelationshipCell = ({
  row: { original: relationship },
}: PropsWithRow<Relationship>) => {
  const [selectedValue, setSelectedValue] = useState(
    relationship?.guardianRelationshipCode,
  )

  const updateGuardianRelationship = async (value: string) => {
    setSelectedValue(value)
    const result = await updatePatientRelationshipAction({
      patientId: relationship.patientId,
      body: {
        ...relationship,
        guardianRelationshipCode: value,
      },
      relationshipId: relationship?.id,
    })
    if (result.state === 'success') {
      toast.success('Successfully updated!')
    } else if (result.state === 'error') {
      setSelectedValue(relationship?.guardianRelationshipCode)
      toast.error(result.error ?? 'Failed to update!')
    }
  }

  return (
    <CodesetSelectCell
      onValueChange={updateGuardianRelationship}
      codeset={CODESETS.PatientRelationship}
      value={selectedValue}
    />
  )
}

export { RelationshipCell }
