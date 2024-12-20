'use client'

import { Flex, Switch } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { AddRelationshipSchemaType } from './schema'

const GuardianSwitch = () => {
  const form = useFormContext<AddRelationshipSchemaType>()

  return (
    <Flex
      flexGrow="1"
      px="1"
      className="border-pp-table-border border-r py-0.5 last:!border-r-0"
    >
      <Switch
        onCheckedChange={(val) => form.setValue('isGuardian', val)}
        defaultChecked={form.watch('isGuardian')}
        size="1"
        color="green"
      />
    </Flex>
  )
}

export { GuardianSwitch }
