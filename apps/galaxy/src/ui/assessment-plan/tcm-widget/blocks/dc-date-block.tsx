import { BlockLabel, DatePickerInput, FormFieldContainer } from "@/components";
import { DISABLING_RESULTS } from "../constants";
import { useFormContext } from "react-hook-form";
import { TcmWidgetSchemaType } from "../tcm-widget-schema";

const DcDateBlock = () => {
    const form = useFormContext<TcmWidgetSchemaType>()
    const tcmResult = form.watch('tcmResults') 
    const isDisabled = DISABLING_RESULTS.includes(tcmResult);

    return (
        <FormFieldContainer className="flex flex-row items-center gap-1">
            <BlockLabel required={isDisabled}>DC Date</BlockLabel>
            <DatePickerInput
                field="dcDate"
                dateInputClass="h-6 w-[100px]"
                className="flex flex-row items-center gap-2"
            />
        </FormFieldContainer>
    )
}
export { DcDateBlock }
