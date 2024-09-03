'use client'

import { Flex, Text } from '@radix-ui/themes'
import { FormFieldError, SelectInput } from '@/components'

const VisitTitleDropdown = () => {
  return (
    <Flex direction="column" className={'w-full gap-0.5'}>
      <Text size="1" weight="medium">
        Visit Title
      </Text>

      <SelectInput
        field="visitTitle"
        placeholder="Select Visit Title"
        buttonClassName={buttonClassName}
      />
      <FormFieldError name="visitTitle" />
    </Flex>
  )
}

const buttonClassName =
  'border-pp-gray-2 w-full h-6 border border-solid !outline-none [box-shadow:none]'
export { VisitTitleDropdown }
