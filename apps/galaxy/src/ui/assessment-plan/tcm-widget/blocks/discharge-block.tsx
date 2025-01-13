import { Flex } from "@radix-ui/themes"
import { DcDateBlock } from "./dc-date-block"
import { DcHospitalName } from "./dc-hospital-name"
import { DcHospitalServiceType } from "./dc-hospital-service-type"

const DischargeBlock = () => {
    return (
        <Flex style={{ flexDirection: 'row', gap: 25, width: 'w-[auto]' }}>
            <DcDateBlock />
            <DcHospitalName />
            <DcHospitalServiceType />
        </Flex>
    )
}
export { DischargeBlock }