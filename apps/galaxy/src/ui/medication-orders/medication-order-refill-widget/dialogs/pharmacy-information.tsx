'use client'

import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { FormFieldContainer, FormFieldLabel } from '@/components'
import { UpdateMedicationSchema } from './schema'

interface PharmacyInformationProps {
  index: number
}

const PharmacyInformation = ({ index }: PharmacyInformationProps) => {
  const form = useFormContext<UpdateMedicationSchema>()
  const displayString = (): string => {
    const businessAddress = form.watch('pharmacyAddress')
    const pharmacyName = form.watch('pharmacyName')
    const address = `${businessAddress?.street1 ?? ''}, ${
      businessAddress?.city ?? ''
    }, ${businessAddress?.state ?? ''}`

    return `${pharmacyName} | ${address}`
  }
  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel>Pharmacy</FormFieldLabel>
      <TextField.Root
        value={displayString()}
        className=" h-6 w-full "
        size="1"
        disabled
        placeholder="Pharmacy details"
      />
    </FormFieldContainer>
  )
}

export { PharmacyInformation }
