import { Flex, TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { FormFieldContainer, SelectableChipDetails, TextAreaInput, YesNoSelect } from '@/components'
import { EctWidgetSchemaType } from '../ect-tab-schema'

const COMPLICATION_ID = 'complication'
const COMPLICATION_LABEL = 'Complications'
const complicationOptions = [
    { label: 'No', value: 'no' },
    { label: 'Yes', value: 'yes' },
]
const ComplicationsBlock = () => {
    const form = useFormContext<EctWidgetSchemaType>()
    const complication = form.watch('ectComplicationsBlock.complication')

    return (
        <FormFieldContainer className="w-auto flex flex-col gap-2">
            <YesNoSelect label={COMPLICATION_LABEL}
                field={`ectComplicationsBlock.${COMPLICATION_ID}`}
                options={complicationOptions}
                required />
            {complication === 'yes' && (
                <TextAreaInput
                    field="ectComplicationsBlock.details"
                    className="w-full h-full"
                    placeHolder='Describe Complications' />
            )}
        </FormFieldContainer>
    )
}

export { ComplicationsBlock }
