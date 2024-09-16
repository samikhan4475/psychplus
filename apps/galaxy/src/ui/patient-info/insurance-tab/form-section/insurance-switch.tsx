'use client'

import { Flex, Switch, Text } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { FormFieldContainer } from '@/components'
import type { InsuranceSchemaType } from './schema'

const InsuranceSwitch = () => {
  const form = useFormContext<InsuranceSchemaType>()

  return (
    <FormFieldContainer className="col-span-full flex-row gap-1.5">
      <Text size="1" weight="medium">
        Insurance Active
      </Text>
      <Text as="label" size="1">
        <Flex className="gap-1.5">
          <Switch
            size="1"
            color="green"
            checked={form.getValues('insuranceActive')}
            onCheckedChange={(check) => {
              form.setValue('insuranceActive', check)
              form.trigger('insuranceActive')
            }}
          />
          Yes
        </Flex>
      </Text>
    </FormFieldContainer>
  )
}

export default InsuranceSwitch
