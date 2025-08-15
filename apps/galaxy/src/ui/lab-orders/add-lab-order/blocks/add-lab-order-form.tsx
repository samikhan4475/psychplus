import { useState } from 'react'
import { Button, Flex, Text } from '@radix-ui/themes'
import { FormContainer, FormSubmitButton } from '@/components'
import { LabOrders } from '@/types'
import { transformIn } from '../data'
import { useLabOrderForm } from '../lab-order-form'
import { BillType } from './bill-type'
import { ConfirmationDialog } from './confirmation-dialog'
import { DiagnosisTable } from './diagnosis-table'
import { FastingOption } from './fasting-option'
import { LabsLocationDropdown } from './lab-location-dropdown'
import { OrderDateTime } from './order-date-time'
import { ProviderDropdown } from './provider-dropdown'
import { SpecimenForm } from './specimen'
import { Status } from './status'
import { TestLabsTable } from './test-labs-table'
import { TestQuestionsView } from './test-questions'
import { RepeatOrderOption } from './repeat-order-option'

const AddLabOrderForm = ({
  labOrderData,
  setOpen,
}: {
  labOrderData?: LabOrders
  setOpen: (value: boolean) => void
}) => {
  const {
    form,
    onSubmit,
    onClickPlaceOrder,
    loadingPlaceOrder,
    loadingSubmit,
    isFormDisabled,
  } = useLabOrderForm(transformIn(labOrderData ?? {}), setOpen)
  const [isOpenConfirmDialog, setIsOpenConfirmDialog] = useState(false)

  const labOrderId = form.getValues('labOrderId')

  const onClickConfirmPlaceOrder = () => setIsOpenConfirmDialog(true)

  return (
    <FormContainer onSubmit={onSubmit} form={form}>
      <Flex direction="column" gap="4" className="flex">
        <LabsLocationDropdown />
        <Flex direction="row">
          <TestLabsTable isFormDisabled={isFormDisabled} />
          <DiagnosisTable isFormDisabled={isFormDisabled} />
        </Flex>
        <Flex direction="row" gap="3">
          <OrderDateTime />
          <Status />
          <ProviderDropdown />
          <BillType />
        </Flex>

        <Flex direction="row" gap="3">
          <FastingOption />
          <RepeatOrderOption/>
        </Flex>
        <TestQuestionsView />

        {labOrderId && <SpecimenForm />}
        <Flex gap="2" justify="end" mt="4">
          <FormSubmitButton
            className={`text-white h-8 rounded-2 px-3 py-1.5 text-1
            ${
              loadingPlaceOrder || isFormDisabled
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-pp-black-1'
            }`}
            form={form}
            loading={loadingSubmit}
            disabled={loadingSubmit || isFormDisabled}
          >
            <Text size="1">Save</Text>
          </FormSubmitButton>
          <Button
            className={`text-white h-8 rounded-2 px-3 py-1.5 text-1
            ${
              loadingPlaceOrder || isFormDisabled
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-pp-black-1'
            }`}
            type="button"
            onClick={onClickConfirmPlaceOrder}
            loading={loadingPlaceOrder}
            disabled={loadingPlaceOrder || isFormDisabled}
          >
            Sign
          </Button>
        </Flex>
        <ConfirmationDialog
          open={isOpenConfirmDialog}
          onClose={setIsOpenConfirmDialog}
          onClick={(e) => {
            setIsOpenConfirmDialog(false)
            onClickPlaceOrder(e)
          }}
        />
      </Flex>
    </FormContainer>
  )
}

export { AddLabOrderForm }
