import { useFormContext, useWatch } from 'react-hook-form'
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

const VisitMediumSelect = () => {
  const form = useFormContext<SchemaType>()
  const { groupedVisitTypes } = useAddVisitStore()
  const [patient, state, location, service, dateOfAdmission, visitType] =
    useWatch({
      control: form.control,
      name: [
        'patient',
        'state',
        'location',
        'service',
        'dateOfAdmission',
        'visitType',
      ],
    })
  const codes = useCodesetCodes(CODESETS.VisitMedium)

  const isDisabled =
    !patient ||
    !state ||
    !location ||
    !service ||
    !dateOfAdmission ||
    !visitType

  const options = codes
    .filter(
      (attr) =>
        attr.value !== 'Either' &&
        groupedVisitTypes?.[visitType]?.find(
          (vt) => vt.visitMedium === attr.value,
        ),
    )
    .map((option) => {
      return {
        label: option.display,
        value: option.value,
      }
    })

  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel required>Visit Medium</FormFieldLabel>
      <SelectInput
        field="visitMedium"
        options={options}
        buttonClassName="h-6 w-full"
        disabled={isDisabled}
      />
      <FormFieldError name={'visitMedium'} />
    </FormFieldContainer>
  )
}

export { VisitMediumSelect }
