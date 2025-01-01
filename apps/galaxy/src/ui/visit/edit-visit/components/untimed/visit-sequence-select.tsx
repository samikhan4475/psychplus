import { useEffect, useMemo, useState } from 'react'
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
import { Appointment, SelectOptionType, Service } from '@/types'
import { getLocationServices } from '@/ui/visit/actions'
import { SchemaType } from '../../schema'
import { useEditVisitStore } from '../../store'

const VisitSequenceSelect = ({
  visitDetails,
  isPsychiatristVisitTypeSequence,
}: {
  visitDetails: Appointment
  isPsychiatristVisitTypeSequence?: boolean
}) => {
  const form = useFormContext<SchemaType>()
  const [service, setService] = useState<Service>()
  const [loading, setLoading] = useState<boolean>(false)
  const [options, setOptions] = useState<SelectOptionType[]>()
  const codes = useCodesetCodes(CODESETS.VisitSequenceType)
  const visitStatusCodes = useCodesetCodes(CODESETS.AppointmentStatus)
  const providerCodes = useCodesetCodes(CODESETS.ProviderType)
  const { groupedVisitTypes } = useEditVisitStore()
  const [serviceId, providerType, facilityAdmissionId, visitType, visitMedium] =
    useWatch({
      control: form.control,
      name: [
        'service',
        'providerType',
        'facilityAdmissionId',
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
        return toast.error(res.error || 'Failed to fetch services')
      }
      setService(res.data[0])
    })
  }, [serviceId])

  const isNonActiveVisitStatus = useMemo(() => {
    return visitStatusCodes
      .find((code) => code.value === visitDetails.visitStatus)
      ?.attributes?.find(
        (attr) => attr.name === 'Group' && attr.value === 'Inactive',
      )
  }, [visitDetails.visitStatus, visitStatusCodes])

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

  useEffect(() => {
    if (!service || !providerCodes.length) return
    if (serviceId && providerType && service && providerCodes) {
      const isPrimaryProviderType = service.primaryProviderType === providerType
      const filteredOptions = visitSequenceCodes.filter((code) => {
        if (visitDetails.visitSequence === code.value) {
          return true
        }
        if (
          visitDetails.visitSequence === 'Subsequent' &&
          isNonActiveVisitStatus
        ) {
          return ['Initial', 'Discharge'].includes(code.value)
        }
        if (!isPrimaryProviderType) {
          return !['Discharge', 'InitialDischarge'].includes(code.value)
        }
        return !['Initial', 'New'].includes(code.value)
      })
      setOptions(
        filteredOptions
          .filter(
            (code) =>
              code.attributes?.some(
                (attr) =>
                  attr.name === 'Group' && attr.value === 'NonTimedServices',
              ) || visitDetails.visitSequence === code.value,
          )
          .map((option) => ({
            value: option.value,
            label: option.display,
            disabled: option.value === visitDetails.visitSequence,
          })),
      )
    }
  }, [service, providerType, providerCodes, facilityAdmissionId])

  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel required>Visit Sequence</FormFieldLabel>
      <SelectInput
        field="visitSequence"
        disabled={isPsychiatristVisitTypeSequence}
        buttonClassName="h-6 w-full"
        options={options}
        loading={loading}
      />
      <FormFieldError name={'visitSequence'} />
    </FormFieldContainer>
  )
}

export { VisitSequenceSelect }
