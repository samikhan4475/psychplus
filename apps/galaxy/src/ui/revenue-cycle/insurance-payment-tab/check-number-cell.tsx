import { Flex, Text } from '@radix-ui/themes'
import { InsurancePayment } from '../types'
import { useStore } from '../store'
interface CheckNumberCellProps {
    row: {
        original: InsurancePayment
    },
}

const CheckNumberCell = ({
    row,
    children
}: React.PropsWithChildren<CheckNumberCellProps>) => {
    const setActiveTab = useStore((state) => state.setActiveTab)
    const openPaymentDetail = () => {
        setActiveTab('Check# ' + row.original.id)
    }
    return (
        <Flex height="100%" align="center" onClick={openPaymentDetail}>
            <Text
                className={'text-pp-black-3'}
                weight="regular"
                size="1"
            >
                {children}
            </Text>
        </Flex>
    )
}

export { CheckNumberCell }
