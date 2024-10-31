import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  TextAreaInput,
  YesNoSelect,
} from '@/components'
import { EctWidgetSchemaType } from '../ect-tab-schema'

const POST_MEDICATION_OP_ID = 'ectPostOpMedicationBlock'
const POST_MEDICATION_LABEL = 'Post Op Medications'
const postOpMedicationsOptions = [
  { label: 'No', value: 'no' },
  { label: 'Yes', value: 'yes' },
]

const PostOpMedicationsBlock = () => {
  const form = useFormContext<EctWidgetSchemaType>()
  const postOpMedication = form.watch(POST_MEDICATION_OP_ID)

  return (
    <FormFieldContainer className="flex w-auto flex-col gap-2">
      <YesNoSelect
        label={POST_MEDICATION_LABEL}
        field={POST_MEDICATION_OP_ID}
        options={postOpMedicationsOptions}
        required
      />
      <FormFieldError name={POST_MEDICATION_OP_ID} />
      {postOpMedication === 'yes' && (
        <TextAreaInput
          field="ectPostOpMedicationBlockDetails"
          className="h-full w-full"
          placeHolder="Describe Post op Medications"
        />
      )}
    </FormFieldContainer>
  )
}

export { PostOpMedicationsBlock }
