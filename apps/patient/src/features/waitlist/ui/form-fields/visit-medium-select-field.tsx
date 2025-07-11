import { AppointmentType, CODESETS } from '@psychplus-v2/constants'
import {
  CodesetFormSelect,
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components-v2'
import { useCodesetCodes } from '@/providers'

const VisitMediumSelectField = () => {
  const visitMedium = useCodesetCodes(CODESETS.AppointmentType).filter((item) =>
    [AppointmentType.InPerson, AppointmentType.Virtual].includes(
      item.value as AppointmentType,
    ),
  )

  return (
    <FormFieldContainer className="w-full">
      <FormFieldLabel required>Visit Medium</FormFieldLabel>
      <CodesetFormSelect size="3" name="visitMedium" options={visitMedium} />
      <FormFieldError name="visitMedium" />
    </FormFieldContainer>
  )
}

export { VisitMediumSelectField }
