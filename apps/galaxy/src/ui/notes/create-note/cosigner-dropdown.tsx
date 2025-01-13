'use client'

import { Flex, Text } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { FormFieldError, FormFieldLabel } from '@/components'
import { Appointment } from '@/types'
import { cn } from '@/utils/cn'
import { NotesCosignerDropdown } from '../note-detail/note-cosigner-dropdown'
import { useStore } from '../store'
import { SchemaType } from './create-note-form'

const CosignerDropdown = ({ appointment }: { appointment?: Appointment }) => {
  const { setIsCosigner } = useStore((state) => ({
    setIsCosigner: state.setIsCosigner,
  }))
  const form = useFormContext<SchemaType>()
  const updateFormField = (value: string) => {
    form.setValue('cosigner', value)
    setIsCosigner(false)
  }
  const { isCosigner } = useStore((state) => ({
    isCosigner: state.isCosigner,
  }))

  return (
    <Flex direction="column" className={'w-full gap-0.5'}>
      <FormFieldLabel className="text-1 leading-[16px]" required={isCosigner}>
        Cosigner
      </FormFieldLabel>
      <NotesCosignerDropdown
        cosigners={appointment?.cosigners}
        setField={updateFormField}
        placeholder="Select Cosigner"
      />
      <FormFieldError name="cosigner" />
      {isCosigner && (
        <Text className={cn('text-[12px] text-tomato-11')}>{'Required'}</Text>
      )}
    </Flex>
  )
}

const buttonClassName =
  'border-pp-gray-2 w-full h-6 border border-solid !outline-none [box-shadow:none]'
export { CosignerDropdown }
