import { useEffect } from 'react'
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

const VISIT_MEDIUM_NA = 'NA'

const excludedMediumsWhenTeleStates = [
  VISIT_TYPES.InPerson,
  VISIT_TYPES.Either,
  VISIT_MEDIUM_NA,
]
const VisitMediumSelect = () => {
  const { watch, setValue } = useFormContext<SchemaType>()
  const teleStates = watch('teleStates')
  const visitMedium = watch('visitMedium')
  const disableInPersonMedium = teleStates?.length > 0

  useEffect(() => {
    if (
      teleStates?.length &&
      excludedMediumsWhenTeleStates.find((el) => el === visitMedium)
    )
      setValue('visitMedium', VISIT_TYPES.TeleVisit)
  }, [teleStates, setValue, visitMedium])

  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel required className="text-[12px]">
        Visit Medium for Primary State
      </FormFieldLabel>
      <CodesetSelect
        codeset={CODESETS.VisitMedium}
        exclude={
          disableInPersonMedium
            ? excludedMediumsWhenTeleStates
            : [VISIT_MEDIUM_NA]
        }
        size="1"
        name="visitMedium"
      />
      <FormFieldError name="visitMedium" />
    </FormFieldContainer>
  )
}

export { VisitMediumSelect }
