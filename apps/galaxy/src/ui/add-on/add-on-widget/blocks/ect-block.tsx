import React from 'react'
import { Flex, Text } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { CheckboxInput } from '@/components'
import { ECTView } from '@/ui/procedures/ect-tab/ect-view'

const ECTBlock = () => {
  const form = useFormContext()
  const ectChecked = form.watch('ect')
  return (
    <Flex
      direction="column"
      pt="1"
      pb="2"
      px="2"
      gap={'1'}
      className="rounded-3 border border-gray-7"
    >
      <Flex align="center" gap="2">
        <CheckboxInput field="ect" checked={ectChecked} />
        <Text className="cursor-default" weight="medium">
          ECT
        </Text>
      </Flex>
      {ectChecked && <ECTView />}
    </Flex>
  )
}

export { ECTBlock }
