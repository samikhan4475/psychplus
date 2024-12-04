import { BlockLabel, FormFieldContainer, FormFieldError, TextAreaInput, TextInput } from '@/components'
import { Flex } from '@radix-ui/themes'

const DcHospitalName = () => {

    return (
        <FormFieldContainer className="w-full flex-row">
            <BlockLabel> DC Hospital Name </BlockLabel>
            <TextInput
                field="dcHospitalName"
                placeHolder="Add Name"
                className="w-[100%]"
            />
        </FormFieldContainer>
    )
}

export { DcHospitalName }
