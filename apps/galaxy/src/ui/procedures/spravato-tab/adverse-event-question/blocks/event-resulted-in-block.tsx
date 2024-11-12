import { Flex } from '@radix-ui/themes'
import {
  BlockLabel,
  FormFieldContainer,
  FormFieldError,
  SelectInput,
} from '@/components'

const EVENT_RESULTED_IN = [
  {
    label: 'Hospitalization',
    value: 'Hospitalization',
  },
  {
    label: 'Disability or permanent damage',
    value: 'Disability or permanent damage',
  },
  {
    label: 'Medical Intervention',
    value: 'Medical Intervention',
  },
  {
    label: 'Life threatening',
    value: 'Life threatening',
  },
  {
    label: 'Death',
    value: 'Death',
  },
  {
    label: 'Other',
    value: 'Other',
  },
]

const EventResultedBlock = () => {
  return (
    <FormFieldContainer className="flex-row gap-1 align-middle">
      <BlockLabel required>The Event Resulted In</BlockLabel>
      <SelectInput
        field="eventResultedIn"
        label=""
        options={EVENT_RESULTED_IN}
        buttonClassName="border-pp-gray-2 w-[133px] h-6 border border-solid !outline-none [box-shadow:none]"
      />
      <FormFieldError className="mt-1" name="eventResultedIn" />
    </FormFieldContainer>
  )
}

export { EventResultedBlock }
