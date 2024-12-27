import { LabOrders } from '@/types'
import { AddLabOrderPopup } from './blocks'

const AddLabOrderView = ({
  isEdit = false,
  labOrderData,
}: {
  isEdit?: boolean
  labOrderData?: LabOrders
}) => {
  return <AddLabOrderPopup isEdit={isEdit} labOrderData={labOrderData} />
}

export { AddLabOrderView }
