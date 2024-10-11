import { useMemo } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  SelectInput,
} from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetCodes } from '@/hooks'
import { ServiceType, SpecialistType } from '../../../types'
import { SchemaType } from '../../schema'
import { useEditVisitStore } from '../../store'

const ProviderTypeSelect = () => {
  const form = useFormContext<SchemaType>()
  const { services } = useEditVisitStore()
  const codes = useCodesetCodes(CODESETS.SpecialistType)
  const serviceId = useWatch({
    control: form.control,
    name: 'service',
  })

  const options = useMemo(() => {
    const service = services.find((s) => s.id === serviceId)
    if (!service?.serviceOffered) return []

    let filteredOptions
    switch (service?.serviceOffered) {
      case ServiceType.Aba:
        filteredOptions = codes.filter(
          (provider) => provider.value === SpecialistType.Bcba,
        )
        break
      case ServiceType.GroupType:
      case ServiceType.Therapy:
      case ServiceType.CouplesFamilyTherapy:
        filteredOptions = codes.filter((provider) =>
          [SpecialistType.Psychiatrist, SpecialistType.Therapist].includes(
            provider.value as SpecialistType,
          ),
        )
        break
      default:
        filteredOptions = codes.filter((provider) => provider.value !== '3')
        break
    }
    return filteredOptions.map((code) => ({
      value: code.value,
      label: code.display,
    }))
  }, [services, serviceId, codes])

  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel required>Provider Type</FormFieldLabel>
      <SelectInput
        options={options}
        buttonClassName="flex-1 w-full"
        field="providerType"
      />
      <FormFieldError name={'providerType'} />
    </FormFieldContainer>
  )
}

export { ProviderTypeSelect }
