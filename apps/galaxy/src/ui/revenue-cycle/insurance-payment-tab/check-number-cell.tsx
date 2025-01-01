import { Flex, Text } from '@radix-ui/themes'
import { useStore } from '../store'
import { InsurancePayment } from '../types'

interface CheckNumberCellProps {
  row: {
    original: InsurancePayment
  }
}

const CheckNumberCell = ({
  row,
  children,
}: React.PropsWithChildren<CheckNumberCellProps>) => {
  const { setActiveTab, setSelectedPayment } = useStore((state) => ({
    setActiveTab: state.setActiveTab,
    setSelectedPayment: state.setSelectedPayment,
  }))
  const openPaymentDetail = () => {
    const { id, checkNumber } = row.original
    setSelectedPayment(id, `Check# ${checkNumber}`)
    setActiveTab(`Check# ${checkNumber}`)
  }
  return (
    <Flex height="100%" align="center" onClick={openPaymentDetail}>
      <Text
        className={'text-pp-black-3 cursor-pointer'}
        weight="regular"
        size="1"
      >
        {children}
      </Text>
    </Flex>
  )
}

export { CheckNumberCell }
