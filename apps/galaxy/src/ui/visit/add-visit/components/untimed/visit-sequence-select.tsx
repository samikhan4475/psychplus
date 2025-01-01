import { useEffect, useMemo, useState } from 'react'
import { isSameDay } from '@internationalized/date'
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
import { Service } from '@/types'
import { getLocationServices } from '@/ui/visit/actions'
import { SchemaType } from '../../schema'
import { useAddVisitStore } from '../../store'

const VisitSequenceSelect = () => {
  const form = useFormContext<SchemaType>()
  const [loading, setLoading] = useState<boolean>(false)
  const [service, setService] = useState<Service>()
  const codes = useCodesetCodes(CODESETS.VisitSequenceType)
  const providerCodes = useCodesetCodes(CODESETS.ProviderType)
  const { groupedVisitTypes } = useAddVisitStore()
  const [
    serviceId,
    providerType,
    facilityAdmissionId,
    dateOfAdmission,
    dischargeDate,
    visitType,
    visitMedium,
  ] = useWatch({
    control: form.control,
    name: [
      'service',
      'providerType',
      'facilityAdmissionId',
      'dateOfAdmission',
      'dischargeDate',
      'visitType',
      'visitMedium',
    ],
  })

  useEffect(() => {
    if (!serviceId) return
    setLoading(true)
    getLocationServices({ locationServiceIds: [serviceId] }).then((res) => {
      setLoading(false)
      if (res.state === 'error') {
        setService(undefined)
        return toast.error(res.error || 'Failed to fetch service')
      }
      setService(res.data[0])
    })
  }, [serviceId])

  useEffect(() => {
    if (!service || !providerCodes.length) return

    if (serviceId && providerType && service && providerCodes) {
      const isPrimaryProviderType = service.primaryProviderType === providerType
      form.setValue('isPrimaryProviderType', isPrimaryProviderType)
      // @Todo: following code will be used in the next phase
      // const isNewFacilityAdmissionId = facilityAdmissionId === 'createNew'
      // const filteredOptions = codes.filter((code) => {
      //   if (!isPrimaryProviderType) {
      //     return code.value !== 'Discharge' && code.value !== 'InitialDischarge'
      //   }
      //   else if (!isNewFacilityAdmissionId) {
      //     return code.value !== 'Initial' && code.value !== 'New'
      //   }
      //   else if (isNewFacilityAdmissionId) {
      //     return code.value === 'Initial' || code.value === 'InitialDischarge'
      //   }
      //   return code.value !== 'Initial'
      // })
    }
  }, [service, providerType, providerCodes, facilityAdmissionId])

  const visitSequenceCodes = useMemo(
    () =>
      codes.filter((code) =>
        groupedVisitTypes?.[visitType]?.find(
          (vt) =>
            vt.visitSequence === code.value && vt.visitMedium === visitMedium,
        ),
      ),
    [codes, visitType, visitMedium, groupedVisitTypes],
  )
  const options = useMemo(() => {
    const isSameDate =
      dateOfAdmission && dischargeDate
        ? isSameDay(dateOfAdmission, dischargeDate)
        : false
    return visitSequenceCodes.some((code) =>
      ['Initial', 'InitialDischarge'].includes(code.value),
    )
      ? visitSequenceCodes
          .filter((code) => {
            return (
              (code.value === 'InitialDischarge' && isSameDate) ||
              (['Initial', 'InitialDischarge'].includes(code.value) &&
                !isSameDate)
            )
          })
          .map((option) => ({
            label: option.display,
            value: option.value,
          }))
      : visitSequenceCodes.map((option) => ({
          label: option.display,
          value: option.value,
        }))
  }, [dateOfAdmission, dischargeDate, visitSequenceCodes])

  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel required>Visit Sequence</FormFieldLabel>
      <SelectInput
        field="visitSequence"
        options={options}
        buttonClassName="h-6 w-full"
        disabled={!visitMedium}
        loading={loading}
      />
      <FormFieldError name={'visitSequence'} />
    </FormFieldContainer>
  )
}

export { VisitSequenceSelect }
