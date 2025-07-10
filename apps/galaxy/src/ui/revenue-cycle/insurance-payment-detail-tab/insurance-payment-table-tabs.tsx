import { Flex } from '@radix-ui/themes'
import { InsPaymentTabButton } from './insurance-payment-table-tab-button'
import { PaymentListTypes } from './types'


interface InsurancePaymentTableTabsProps {
  paymentListType: PaymentListTypes
  setPaymentListType: (paymentListType: PaymentListTypes) => void
}
const InsurancePaymentTableTabs = ({ ...props }: InsurancePaymentTableTabsProps) => {
  return (
    <Flex className="mb-2 w-fit rounded-l-3 rounded-r-3 bg-gray-2 p-1">
      <InsPaymentTabButton {...props} value={PaymentListTypes.All} />
      <InsPaymentTabButton {...props} value={PaymentListTypes.Posted} />
      <InsPaymentTabButton {...props} value={PaymentListTypes.Unposted} label='Unposted' />
      <InsPaymentTabButton {...props} value={PaymentListTypes.Unlinked} />
    </Flex>
  )
}

export { InsurancePaymentTableTabs, type InsurancePaymentTableTabsProps }
