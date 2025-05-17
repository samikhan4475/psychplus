'use client'

import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { FormFieldContainer, FormFieldLabel } from '@/components'
import { UpdateMedicationSchema } from './schema'

interface PrescriberInformationProps {
  index: number
}

const PrescriberInformation = ({ index }: PrescriberInformationProps) => {
  const form = useFormContext<UpdateMedicationSchema>()
  const getStaffDisplayString = (): string => {
    const staff = form.watch('staff')
    const name = `${staff?.legalName?.firstName ?? ''} ${
      staff?.legalName?.lastName ?? ''
    }`.trim()

    const businessAddress = staff?.contactInfo?.addresses?.find(
      (addr) => addr.type === 'Business',
    )

    const address = `${businessAddress?.street1 ?? ''}, ${
      businessAddress?.city ?? ''
    }, ${businessAddress?.state ?? ''} ${businessAddress?.postalCode ?? ''}`

    return `${name} | ${address}`
  }
  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel>Provider</FormFieldLabel>
      <TextField.Root
        value={getStaffDisplayString()}
        className=" h-6 w-full "
        size="1"
        disabled
        placeholder="Provider details"
      />
    </FormFieldContainer>
  )
}

export { PrescriberInformation }
