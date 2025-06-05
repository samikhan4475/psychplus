'use client'

import { Flex, Text } from '@radix-ui/themes'
import { FormFieldLabel } from '@/components/form'
import { PracticeSettingsFields } from './practice-settings-fields'

const PracticeSettings = () => {
  return (
    <Flex direction="column" flexGrow="1" pt="2">
      <Flex className="flex-row items-center justify-between">
        <FormFieldLabel className="pb-2 text-[14px]">
          <Text>Practice Setting</Text>
        </FormFieldLabel>
      </Flex>
      <PracticeSettingsFields />
    </Flex>
  )
}

export { PracticeSettings }
