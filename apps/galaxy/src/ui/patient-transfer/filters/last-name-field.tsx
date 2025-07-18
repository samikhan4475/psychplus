'use client'

import { FormFieldContainer, FormFieldLabel } from '@/components/form'
import { TextField } from '@radix-ui/themes'

import { useFormContext } from 'react-hook-form'
import { PatientTransferSchemaType } from '../pateint-transfer-filter-form'


const LastNameField = () => {
      const form = useFormContext<PatientTransferSchemaType>()
    
  return (
    <FormFieldContainer className="flex-row items-center gap-2">
      <FormFieldLabel className="!text-1">Last Name</FormFieldLabel>
       <TextField.Root
              placeholder="Last Name"
              size="1"
              {...form.register('lastName')}
              className='flex-1'
            />
    </FormFieldContainer>
  )
}

export { LastNameField }
