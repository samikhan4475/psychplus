'use client'

import { Switch } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { PropsWithRow } from '@/components'
import { AddRelationshipSchemaType } from '../schema'

const EmergencyContactCell = ({
  row: {
    original: { isEmergencyContact },
  },
}: PropsWithRow<AddRelationshipSchemaType>) => {
  const { setValue } = useFormContext<AddRelationshipSchemaType>()
  return (
    <Switch
      onCheckedChange={(e) => setValue('isEmergencyContact', e)}
      defaultChecked={isEmergencyContact}
      size="1"
      color="green"
    />
  )
}

export { EmergencyContactCell }
