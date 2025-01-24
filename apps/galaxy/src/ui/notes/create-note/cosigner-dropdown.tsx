'use client'

import { Flex } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { FormFieldError, FormFieldLabel } from '@/components'
import { Appointment } from '@/types'
import { NotesCosignerDropdown } from '../note-detail/note-cosigner-dropdown'
import { SchemaType } from './create-note-form'

const CosignerDropdown = ({ appointment }: { appointment?: Appointment }) => {
  const form = useFormContext<SchemaType>()
  const updateFormField = (value: string) => {
    form.setValue('cosigner', value)
  }

  return (
    <Flex direction="column" className={'w-full gap-0.5'}>
      <FormFieldLabel className="text-1 leading-[16px]">
        Cosigner
      </FormFieldLabel>
      <NotesCosignerDropdown
        cosigners={appointment?.cosigners}
        setField={updateFormField}
        placeholder="Select Cosigner"
      />
      <FormFieldError name="cosigner" />
    </Flex>
  )
}

const buttonClassName =
  'border-pp-gray-2 w-full h-6 border border-solid !outline-none [box-shadow:none]'
export { CosignerDropdown }
