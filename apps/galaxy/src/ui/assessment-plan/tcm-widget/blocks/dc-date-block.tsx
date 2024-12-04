import { BlockLabel, DatePickerInput, FormFieldContainer } from "@/components";

const DcDateBlock = () => {
    return (
        <FormFieldContainer className="flex flex-row items-center gap-1">
            <BlockLabel required>DC Date</BlockLabel>
            <DatePickerInput
                field="dcDate"
                dateInputClass="h-6 w-[100px]"
                className="flex flex-row items-center gap-2"
            />
        </FormFieldContainer>
    )
}
export { DcDateBlock }
