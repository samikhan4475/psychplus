'use client'

import { Switch } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { PropsWithRow } from '@/components'
import { AddRelationshipSchemaType } from '../schema'

const GuardianCell = ({
  row: {
    original: { isGuardian },
  },
}: PropsWithRow<AddRelationshipSchemaType>) => {
  const { setValue } = useFormContext<AddRelationshipSchemaType>()
  return (
    <Switch
      onCheckedChange={(e) => setValue('isGuardian', e)}
      defaultChecked={isGuardian}
      size="1"
      color="green"
    />
  )
}

export { GuardianCell }
