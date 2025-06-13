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
  TELE_STATES: [
    VISIT_TYPES.InPerson,
    VISIT_TYPES.Either,
    VISIT_MEDIUM_NA,
  ] as const,
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

  const [teleStates, visitMedium, visitTypes, service] = watch([
    'teleStates',
    'visitMedium',
    'visitTypes',
    'serviceOffered',
  ])

  const { hasTeleStates, isUDSService } = useMemo(
    () => ({
      hasTeleStates: Boolean(teleStates?.length),
      isUDSService: service === 'UDS',
    }),
    [teleStates?.length, service],
  )

  const excludeMediums = useMemo(() => {
    if (hasTeleStates) return EXCLUDED_MEDIUMS.TELE_STATES
    if (isUDSService) return EXCLUDED_MEDIUMS.UDS_SERVICE
    return EXCLUDED_MEDIUMS.DEFAULT
  }, [hasTeleStates, isUDSService])

  const handleChangeVisitMedium = useCallback(
    (value: string) => {
      visitTypes?.length && setValue('visitTypes', [])
      setValue('visitMedium', value)
    },
    [setValue, visitTypes?.length],
  )

  // Consolidated auto-correction logic
  useEffect(() => {
    if (
      shouldAutoCorrect(service, visitMedium, hasTeleStates, excludeMediums)
    ) {
      const defaultMedium = getDefaultVisitMedium(service, hasTeleStates)
      if (defaultMedium && defaultMedium !== visitMedium) {
        setValue('visitMedium', defaultMedium)
      }
    }
  }, [service, hasTeleStates])

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

const getDefaultVisitMedium = (
  service: ServiceType,
  hasTeleStates: boolean,
): VisitMediumType => {
  if (service === 'UDS') return VISIT_TYPES.InPerson
  if (hasTeleStates) return VISIT_TYPES.TeleVisit
  return VISIT_MEDIUM_NA
}

const shouldAutoCorrect = (
  service: ServiceType,
  visitMedium: VisitMediumType,
  hasTeleStates: boolean,
  excludedMediums: readonly string[],
): boolean => {
  // UDS service must use InPerson
  if (service === 'UDS' && visitMedium !== VISIT_TYPES.InPerson) {
    return true
  }

  // Tele states cannot use excluded mediums
  if (hasTeleStates && visitMedium && excludedMediums.includes(visitMedium)) {
    return true
  }

  return false
}
