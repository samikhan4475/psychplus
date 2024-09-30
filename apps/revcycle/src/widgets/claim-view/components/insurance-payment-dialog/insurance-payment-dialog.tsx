import { Cross2Icon, PlusIcon } from '@radix-ui/react-icons'
import { Button, Dialog } from '@radix-ui/themes'
import { useStore } from '../../store'
import { InsurancePayment } from '../../types'
import { InsurancePaymentForm } from './components/insurance-payment-form'

const InsurancePaymentDialog = ({ data }: { data?: InsurancePayment }) => {
  const {
    insurancePaymentEditData,
    insurancePaymentModalOpen,
    setInsurancePaymentEditData,
  } = useStore((state) => ({
    setInsurancePaymentEditData: state.setInsurancePaymentEditData,
    insurancePaymentEditData: state.insurancePaymentEditData,
    insurancePaymentModalOpen: state.insurancePaymentModalOpen,
  }))
  const setInsurancePaymentModalOpen = useStore(
    (state) => state.setInsurancePaymentModalOpen,
  )

  const openModal = () => {
    setInsurancePaymentModalOpen(true)
  }

  const closeModal = () => {
    setInsurancePaymentEditData(null)
    setInsurancePaymentModalOpen(false)
  }

  return (
    <Dialog.Root open={insurancePaymentModalOpen}>
      <Dialog.Trigger>
        <Button className="bg-[#151B4A]" size="1" onClick={openModal}>
          {data ? (
            'Edit'
          ) : (
            <>
              <PlusIcon />
              Add
            </>
          )}
        </Button>
      </Dialog.Trigger>
      <Dialog.Content className="relative max-w-[600px] rounded-6 p-6 font-bold text-[#151B4A]">
        <Dialog.Close
          className="absolute right-4 top-4 cursor-pointer"
          onClick={closeModal}
        >
          <Cross2Icon />
        </Dialog.Close>
        <Dialog.Title size="5">
          {insurancePaymentEditData
            ? 'Edit Insurance Payment'
            : 'Add Insurance Payment'}
        </Dialog.Title>
        <InsurancePaymentForm isEdit={true} data={insurancePaymentEditData} />
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { InsurancePaymentDialog }
