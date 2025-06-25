import { useCallback, useEffect, useMemo } from 'react'
import { useFormContext } from 'react-hook-form'
import {
  CodesetSelect,
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components'
import { CODESETS } from '@/constants'
import { VISIT_TYPES } from '@/ui/clinic-schedule/constants'
import { SchemaType } from '../schema'

const VISIT_MEDIUM_NA = 'NA' as const

const EXCLUDED_MEDIUMS = {
  UDS_SERVICE: [
    VISIT_TYPES.TeleVisit,
    VISIT_TYPES.Either,
    VISIT_MEDIUM_NA,
  ] as const,
  DEFAULT: [VISIT_MEDIUM_NA] as const,
} as const

type ServiceType = SchemaType['serviceOffered']
type VisitMediumType = SchemaType['visitMedium']

const VisitMediumSelect = () => {
  const { watch, setValue } = useFormContext<SchemaType>()

  const [visitMedium, visitTypes, service] = watch([
    'visitMedium',
    'visitTypes',
    'serviceOffered',
  ])

  const isUDSService = useMemo(() => service === 'UDS', [service])

  const excludeMediums = useMemo(() => {
    if (isUDSService) return EXCLUDED_MEDIUMS.UDS_SERVICE
    return EXCLUDED_MEDIUMS.DEFAULT
  }, [isUDSService])

  const handleChangeVisitMedium = useCallback(
    (value: string) => {
      visitTypes?.length && setValue('visitTypes', [])
      setValue('visitMedium', value)
    },
    [setValue, visitTypes?.length],
  )

  // Consolidated auto-correction logic
  useEffect(() => {
    if (shouldAutoCorrect(service, visitMedium)) {
      const defaultMedium = getDefaultVisitMedium(service)
      if (defaultMedium && defaultMedium !== visitMedium) {
        setValue('visitMedium', defaultMedium)
      }
    }
  }, [service])

  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel required className="text-[12px]">
        Visit Medium for Primary State
      </FormFieldLabel>
      <CodesetSelect
        codeset={CODESETS.VisitMedium}
        exclude={[...excludeMediums]}
        size="1"
        name="visitMedium"
        onValueChange={handleChangeVisitMedium}
      />
      <FormFieldError name="visitMedium" />
    </FormFieldContainer>
  )
}

export { VisitMediumSelect }

const getDefaultVisitMedium = (service: ServiceType): VisitMediumType => {
  if (service === 'UDS') return VISIT_TYPES.InPerson
  return VISIT_MEDIUM_NA
}

const shouldAutoCorrect = (
  service: ServiceType,
  visitMedium: VisitMediumType,
): boolean => {
  // UDS service must use InPerson
  if (service === 'UDS' && visitMedium !== VISIT_TYPES.InPerson) {
    return true
  }

  return false
}
