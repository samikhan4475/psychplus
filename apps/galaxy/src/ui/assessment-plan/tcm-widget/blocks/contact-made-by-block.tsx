import { BlockLabel, FormFieldError, TextAreaInput, TextInput } from '@/components'
import { Flex } from '@radix-ui/themes'
import {  useFormContext } from 'react-hook-form'
import { TcmWidgetSchemaType } from '../tcm-widget-schema'
import { DISABLING_RESULTS } from '../constants'

const TcmContactMadeBy = () => {
    const form = useFormContext<TcmWidgetSchemaType>()
    const tcmResult = form.watch('tcmResults') 
    const isDisabled = DISABLING_RESULTS.includes(tcmResult);
       return (
        <Flex gap="2" direction={'row'}>
           <BlockLabel required={!isDisabled}>Contact Made By</BlockLabel>
            <TextInput
                field="dcContactMadeBy"
                placeHolder="Add Name"
                className="w-[100%]"
                disabled={isDisabled}
            />
             {!isDisabled && <FormFieldError name="dcContactMadeBy" />}
        </Flex>
    )
}

export { TcmContactMadeBy }
