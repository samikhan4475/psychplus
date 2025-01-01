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
import { ProviderType, ServiceType } from '../../types'
import { SchemaType } from '../schema'
import { useEditVisitStore } from '../store'

const ProviderTypeSelect = ({
  isPsychiatristVisitTypeSequence,
}: {
  isPsychiatristVisitTypeSequence?: boolean
}) => {
  const form = useFormContext<SchemaType>()
  const { services } = useEditVisitStore()
  const codes = useCodesetCodes(CODESETS.ProviderType)
  const [serviceId, isServiceTimeDependent] = useWatch({
    control: form.control,
    name: ['service', 'isServiceTimeDependent'],
  })

  const options = useMemo(() => {
    const service = services.find((s) => s.id === serviceId)
    if (!service?.serviceOffered) return []

    const filteredOptions = codes.filter((providerType) => {
      if (
        [
          ProviderType.NotSet,
          ProviderType.FamilyMedicine,
          ProviderType.InternalMedicine,
          ProviderType.Anesthesiology,
        ].includes(providerType.value as ProviderType)
      )
        return false
      switch (service?.serviceOffered) {
        case ServiceType.Aba:
          return providerType.value === ProviderType.Bcba
        case ServiceType.Therapy:
        case ServiceType.CouplesFamilyTherapy:
        case ServiceType.GroupTherapy:
          return (
            providerType.value === ProviderType.Therapist ||
            providerType.value === ProviderType.Psychiatrist
          )
        default:
          return ![ProviderType.Bcba, ProviderType.Therapist].includes(
            providerType.value as ProviderType,
          )
      }
    })

    return filteredOptions.map((code) => ({
      label: code.display,
      value: code.value,
    }))
  }, [codes, serviceId, services])
  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel required>Provider Type</FormFieldLabel>
      <SelectInput
        options={options}
        buttonClassName="h-6 w-full"
        field="providerType"
        disabled={
          (!serviceId || !isServiceTimeDependent) &&
          !isPsychiatristVisitTypeSequence
        }
      />
      <FormFieldError name={'providerType'} />
    </FormFieldContainer>
  )
}

export { ProviderTypeSelect }
