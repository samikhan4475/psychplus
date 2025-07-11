import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  SelectInput,
} from '@/components'
import { CODESETS } from '@/constants'
import { VisitMediumEnum } from '@/enum'
import { useCodesetOptions } from '@/hooks'

const VisitMediumSelectField = () => {
  const visitMedium = useCodesetOptions(CODESETS.VisitMedium).filter((item) =>
    [VisitMediumEnum.InPerson, VisitMediumEnum.TeleVisit].includes(
      item.value as VisitMediumEnum,
    ),
  )

  return (
    <FormFieldContainer className="w-full flex-col">
      <FormFieldLabel required>Visit Medium</FormFieldLabel>
      <SelectInput
        field="visitMedium"
        buttonClassName={buttonClassName}
        options={visitMedium}
      />
      <FormFieldError name="visitMedium" />
    </FormFieldContainer>
  )
}

const buttonClassName =
  'border-pp-gray-2 h-6 border border-solid !outline-none [box-shadow:none] w-full'

export default VisitMediumSelectField
