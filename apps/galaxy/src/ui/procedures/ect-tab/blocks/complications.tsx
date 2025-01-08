import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  TextAreaInput,
  YesNoSelect,
} from '@/components'
import { EctWidgetSchemaType } from '../ect-tab-schema'

const COMPLICATION_ID = 'ectComplicationsBlock'
const COMPLICATION_LABEL = 'Complications'
const complicationOptions = [
  { label: 'No', value: 'No' },
  { label: 'Yes', value: 'Yes' },
]
const ComplicationsBlock = () => {
  const form = useFormContext<EctWidgetSchemaType>()
  const complication = form.watch(COMPLICATION_ID)

  return (
    <FormFieldContainer className="flex w-auto flex-col gap-2">
      <YesNoSelect
        label={COMPLICATION_LABEL}
        field={COMPLICATION_ID}
        options={complicationOptions}
        required
      />
      <FormFieldError name={COMPLICATION_ID} />
      {complication === 'Yes' && (
        <TextAreaInput
          field="ectComplicationsBlockDetails"
          className="h-full w-full"
          placeHolder="Describe Complications"
        />
      )}
    </FormFieldContainer>
  )
}

export { ComplicationsBlock }
