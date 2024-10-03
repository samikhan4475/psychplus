'use client'

import { Flex, Switch, Text } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { FormFieldContainer } from '@/components'
import { InsuranceSchemaType } from './schema'

const InsuranceHolderSwitch = () => {
  const form = useFormContext<InsuranceSchemaType>()

  const onCheckedChange = (isPolicyHolder: boolean) => {
    form.setValue('isPatientPolicyHolder', isPolicyHolder, {
      shouldValidate: true,
      shouldDirty: true,
    })
  }
  return (
    <FormFieldContainer className="flex-row gap-1.5">
      <Text size="1" weight="medium">
        Patient is insurance holder?
      </Text>
      <Text as="label" size="1">
        <Flex className="gap-1.5">
          <Switch
            size="1"
            color="green"
            checked={form.getValues('isPatientPolicyHolder')}
            onCheckedChange={onCheckedChange}
          />
          Yes
        </Flex>
      </Text>
    </FormFieldContainer>
  )
}

export default InsuranceHolderSwitch
