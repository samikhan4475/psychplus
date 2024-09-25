'use client'

import { Switch } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { PropsWithRow } from '@/components'
import { AddRelationshipSchemaType } from '../schema'

const RRICell = ({
  row: {
    original: { isAllowedToReleaseInformation },
  },
}: PropsWithRow<AddRelationshipSchemaType>) => {
  const { setValue } = useFormContext<AddRelationshipSchemaType>()
  return (
    <Switch
      onCheckedChange={(e) => setValue('isAllowedToReleaseInformation', e)}
      defaultChecked={isAllowedToReleaseInformation}
      size="1"
      color="green"
    />
  )
}

export { RRICell }
