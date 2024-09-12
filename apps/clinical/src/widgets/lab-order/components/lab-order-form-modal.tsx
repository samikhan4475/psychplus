import { Cross2Icon } from '@radix-ui/react-icons'
import { Dialog } from '@radix-ui/themes'
import { ToastProvider } from '@/providers'
import { LabOrderFormModalProps } from '../types'
import { LabOrderForm } from './lab-order-form'

const LabOrderFormModal = ({
  appointmentId,
  orderId,
  labBillingType,
  labOrderStatus,
  patientId,
  active,
  handlerClose,
  labOrderData,
  isEdit,
  labTestId,
  testsData,
}: LabOrderFormModalProps) => {
  return (
    <Dialog.Root open={active}>
      <Dialog.Content
        className={`relative  max-w-[662px] rounded-[4px] p-[24px]`}
      >
        <Dialog.Close
          onClick={handlerClose}
          className="absolute right-8 top-8 h-[12px] w-[12px] cursor-pointer"
        >
          <Cross2Icon />
        </Dialog.Close>
        <ToastProvider>
          <LabOrderForm
            appointmentId={appointmentId}
            orderId={orderId}
            labBillingType={labBillingType}
            labOrderStatus={labOrderStatus}
            patientId={patientId}
            labOrderData={labOrderData}
            isEdit={isEdit}
            labTestId={labTestId}
            testsData={testsData}
          />
        </ToastProvider>
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { LabOrderFormModal }
