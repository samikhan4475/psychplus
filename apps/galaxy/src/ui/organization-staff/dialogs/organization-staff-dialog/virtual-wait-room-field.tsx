'use client'

import { TextInput } from '@/components'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components/form'

const VirtualWaitRoomField = () => {
  return (
    <FormFieldContainer className="flex-1 gap-0">
      <FormFieldLabel className="pb-[3px]">Virtual Wait Room</FormFieldLabel>
      <TextInput field="virtualRoomLink" className="h-6 w-full" />
    </FormFieldContainer>
  )
}

export { VirtualWaitRoomField }
