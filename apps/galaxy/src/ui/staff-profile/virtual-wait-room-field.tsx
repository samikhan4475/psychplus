import React from 'react'
import { Flex, Switch, Text } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { FormFieldContainer, FormFieldLabel } from '@/components'
import { SchemaType } from './schema'

const VirtualWaitRoomField = () => {
  const form = useFormContext<SchemaType>()
  const isVirtualRoomLink = form.watch('isVirtualRoomLink')
  return (
    <FormFieldContainer className="bg-pp-focus-bg-2 h-[46px] w-full flex-row items-center justify-between gap-1 rounded-1 p-2">
      <FormFieldLabel>Virtual Wait Room</FormFieldLabel>
      <Text as="label" size="1" weight="medium">
        <Flex gap="1">
          <Switch
            size="1"
            checked={!!isVirtualRoomLink}
            onCheckedChange={(val) => {
              form.setValue('isVirtualRoomLink', val)
              !val && form.setValue('virtualRoomLink', '')
            }}
            highContrast
          />
          {isVirtualRoomLink ? 'Yes' : 'No'}
        </Flex>
      </Text>
    </FormFieldContainer>
  )
}

export { VirtualWaitRoomField }
