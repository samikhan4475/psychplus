'use client'

import { Flex, Switch } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { AddRelationshipSchemaType } from './schema'

const EmergencyContactSwitch = () => {
  const form = useFormContext<AddRelationshipSchemaType>()

  return (
    <Flex
      flexGrow="1"
      px="1"
      className="border-pp-table-border border-r py-0.5 last:!border-r-0"
    >
      <Switch
        onCheckedChange={(val) => form.setValue('isEmergencyContact', val)}
        defaultChecked={form.watch('isEmergencyContact')}
        size="1"
        color="green"
      />
    </Flex>
  )
}

export { EmergencyContactSwitch }
