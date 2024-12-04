import { BlockLabel, DatePickerInput } from "@/components";
import { Flex } from "@radix-ui/themes";
import { useFormContext } from "react-hook-form";
import { TcmWidgetSchemaType } from "../tcm-widget-schema";
import { ResultBlock } from "./result-block";
import { DISABLING_RESULTS } from "../constants";

const TcmDateBlock = () => {
    const form = useFormContext<TcmWidgetSchemaType>()
    const tcmResult = form.watch('tcmResults')
    const isDisabled = DISABLING_RESULTS.includes(tcmResult);
    return (
        <Flex gap="2">
            <BlockLabel required> Date </BlockLabel>
            <DatePickerInput
                field="tcmDate"
                dateInputClass="h-6 w-[100px]"
                minValue={form.watch('dcDate') ?? undefined}
                className="flex flex-row items-center gap-2"
                isDisabled={isDisabled}
            />
        </Flex>
    )
}
export { TcmDateBlock }
