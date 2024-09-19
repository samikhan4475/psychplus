import { useMemo } from 'react'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  SelectInput,
} from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetCodes } from '@/hooks'
import { SchemaType } from '../../schema'
import { useAddVisitStore } from '../../store'
import { ServiceType, SpecialistType } from '../../types'

const ProviderTypeDropdown = () => {
  const form = useFormContext<SchemaType>()
  const codes = useCodesetCodes(CODESETS.SpecialistType)
  const { services } = useAddVisitStore()

  const serviceId = form.watch('service')

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
      case ServiceType.Therapy:
      case ServiceType.CouplesFamilyTherapy:
      case ServiceType.GroupType:
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
      label: code.display,
      value: code.value,
    }))
  }, [codes, serviceId])

  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel required>Provider Type</FormFieldLabel>
      <SelectInput
        field="providerType"
        options={options}
        buttonClassName="flex-1"
        disabled={!serviceId}
      />
      <FormFieldError name={'providerType'} />
    </FormFieldContainer>
  )
}

export { ProviderTypeDropdown }
