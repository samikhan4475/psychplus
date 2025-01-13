import { BlockLabel, FormFieldContainer, FormFieldError, TextInput } from '@/components';

const DcHospitalName = () => {
    return (
        <FormFieldContainer className="flex-row items-center gap-2">
            <BlockLabel required>DC Hospital Name</BlockLabel>
            <TextInput
                field="dcHospitalName"
                placeHolder="Add Name"
                className="w-[200px]"
            />
            <FormFieldError name="dcHospitalName" />
        </FormFieldContainer>
    );
};

export { DcHospitalName };
