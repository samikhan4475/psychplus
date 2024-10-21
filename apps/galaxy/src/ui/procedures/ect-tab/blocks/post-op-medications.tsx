import { Flex, TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { FormFieldContainer, SelectableChipDetails, TextAreaInput, YesNoSelect } from '@/components'
import { EctWidgetSchemaType } from '../ect-tab-schema'

const POST_MEDICATION_OP_ID = 'postMedication'
const POST_MEDICATION_LABEL = 'Post Op Medications'
const postOpMedicationsOptions = [
    { label: 'No', value: 'no' },
    { label: 'Yes', value: 'yes' },
];

const PostOpMedicationsBlock = () => {
    const form = useFormContext<EctWidgetSchemaType>()
    const postOpMedication = form.watch('ectPostOpMedicationBlock.postMedication')

    return (
        <FormFieldContainer className="w-auto flex flex-col gap-2">
            <YesNoSelect 
            label={POST_MEDICATION_LABEL} 
            field={`ectPostOpMedicationBlock.${POST_MEDICATION_OP_ID}`} 
            options={postOpMedicationsOptions} 
            required/>
            {postOpMedication === 'yes' && (
                <TextAreaInput
                    field="ectPostOpMedicationBlock.details"
                    className="w-full h-full"
                    placeHolder='Describe Post op Medications' />

            )}
        </FormFieldContainer>
    )
}

export { PostOpMedicationsBlock }
