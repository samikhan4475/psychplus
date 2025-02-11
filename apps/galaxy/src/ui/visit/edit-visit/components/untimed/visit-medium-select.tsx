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
import { useEditVisitStore } from '../../store'

const VisitMediumSelect = () => {
  const form = useFormContext<SchemaType>()
  const { groupedVisitTypes } = useEditVisitStore()
  const codes = useCodesetCodes(CODESETS.VisitMedium)
  const visitType = useWatch({
    control: form.control,
    name: 'visitType',
  })

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
        value: option.value,
        label: option.display,
      }
    })

  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel required>Visit Medium</FormFieldLabel>
      <SelectInput
        options={options}
        field="visitMedium"
        buttonClassName="h-6 w-full"
      />
      <FormFieldError name={'visitMedium'} />
    </FormFieldContainer>
  )
}

export { VisitMediumSelect }
