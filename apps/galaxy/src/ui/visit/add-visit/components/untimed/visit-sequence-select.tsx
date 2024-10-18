import { useEffect, useState } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'
import toast from 'react-hot-toast'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  SelectInput,
} from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetCodes } from '@/hooks'
import { SelectOptionType, Service } from '@/types'
import { getLocationServices } from '@/ui/visit/actions'
import { SchemaType } from '../../schema'

const VisitSequenceSelect = () => {
  const form = useFormContext<SchemaType>()
  const [service, setService] = useState<Service>()
  const [options, setOptions] = useState<SelectOptionType[]>()
  const codes = useCodesetCodes(CODESETS.VisitSequenceType)
  const providerCodes = useCodesetCodes(CODESETS.ProviderType)
  const [visitType, serviceId, providerType, facilityAdmissionId] = useWatch({
    control: form.control,
    name: ['visitType', 'service', 'providerType', 'facilityAdmissionId'],
  })

  useEffect(() => {
    if (!serviceId) return
    getLocationServices({ serviceIds: [serviceId] }).then((res) => {
      if (res.state === 'error') {
        setService(undefined)
        return toast.error(res.error)
      }
      setService(res.data[0])
    })
  }, [serviceId])

  useEffect(() => {
    if (!service || !providerCodes.length) return

    if (serviceId && providerType && service && providerCodes) {
      const isPrimaryProviderType = service.primaryProviderType === providerType
      const isNewFacilityAdmissionId = facilityAdmissionId === 'createNew'
      const filteredOptions = codes.filter((code) => {
        if (!isPrimaryProviderType) {
          return code.value !== 'Discharge' && code.value !== 'InitialDischarge'
        }
        if (!isNewFacilityAdmissionId) {
          return code.value !== 'Initial' && code.value !== 'New'
        }
        if (isNewFacilityAdmissionId) {
          return code.value === 'Initial' || code.value === 'InitialDischarge'
        }
        return code.value !== 'Initial'
      })
      setOptions(
        filteredOptions
          .filter((attr) =>
            attr.attributes?.find(
              (attr) =>
                attr.name === 'Group' && attr.value === 'NonTimedServices',
            ),
          )
          .map((option) => ({
            label: option.display,
            value: option.value,
          })),
      )
    }
  }, [service, providerType, providerCodes, facilityAdmissionId])

  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel required>Visit Sequence</FormFieldLabel>
      <SelectInput
        field="visitSequence"
        options={options}
        buttonClassName="h-6 w-full"
        disabled={!visitType && !facilityAdmissionId}
      />
      <FormFieldError name={'visitSequence'} />
    </FormFieldContainer>
  )
}

export { VisitSequenceSelect }
