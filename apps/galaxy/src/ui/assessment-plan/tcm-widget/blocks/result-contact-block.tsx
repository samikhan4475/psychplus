import { Flex } from "@radix-ui/themes"
import { TcmContactMadeBy } from "./contact-made-by-block"
import { TcmDateBlock } from "./tcm-date-block"
import { ResultBlock } from "./result-block"

const ResultContactBlock = () => {
    return (
    <Flex direction="column" py="3" gap={'2'} className="bg-white mt-2 px-2.5 shadow-2"  width={'85%'} >
        <Flex style={{ flexDirection: 'row', gap: 25, width: 'w-[auto]' }}>
            <TcmContactMadeBy />
            <TcmDateBlock />
        </Flex>
        <ResultBlock />
    </Flex>
    )
}
export { ResultContactBlock }