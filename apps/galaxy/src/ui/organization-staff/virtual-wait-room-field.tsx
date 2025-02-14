'use client'

import { FormFieldContainer, FormFieldLabel, TextInput } from '@/components'

const VirtualWaitRoomField = () => {
  return (
    <FormFieldContainer className="flex-row items-center gap-2">
      <FormFieldLabel className="!text-1">Virtual Wait Room</FormFieldLabel>
      <TextInput field="virtualWaitRoom" className="w-full" />
    </FormFieldContainer>
  )
}

export { VirtualWaitRoomField }
