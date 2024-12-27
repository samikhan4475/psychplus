import { Button, Flex, Text } from '@radix-ui/themes'
import { FormContainer, FormSubmitButton } from '@/components'
import { LabOrders } from '@/types'
import { transformIn } from '../data'
import { useLabOrderForm } from '../lab-order-form'
import { BillType } from './bill-type'
import { DiagnosisTable } from './diagnosis-table'
import { LabsLocationDropdown } from './lab-location-dropdown'
import { LabRadioOptions } from './lab-radio-options'
import { OrderDateTime } from './order-date-time'
import { ProviderDropdown } from './provider-dropdown'
import { SpecimenForm } from './specimen'
import { Status } from './status'
import { TestLabsTable } from './test-labs-table'
import { TestQuestionsView } from './test-questions'

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
  } = useLabOrderForm(transformIn(labOrderData ?? {}), setOpen)

  const labOrderId = form.getValues('labOrderId')
  const labLocationData = form.watch('labLocationData')

  return (
    <FormContainer
      onSubmit={onSubmit}
      onError={(error) => console.log(error)}
      form={form}
    >
      <Flex direction="column" gap="4" className="flex">
        <Flex direction="row">
          <TestLabsTable />
          <DiagnosisTable />
        </Flex>
        <Flex direction="row" gap="3">
          <OrderDateTime />
          <LabsLocationDropdown />
          <Status />
          <ProviderDropdown />
        </Flex>

        <Flex direction="row" gap="3">
          <BillType />
          <LabRadioOptions field="isFasting" title="Fasting" />
          <LabRadioOptions field="isPSCHold" title="PSC Hold" />
        </Flex>

        <TestQuestionsView />

        {labOrderId && <SpecimenForm />}
        <Flex gap="2" justify="end" mt="4">
          <FormSubmitButton
            className="bg-pp-black-1 text-white relative ml-auto cursor-pointer px-3 py-1.5"
            form={form}
            loading={loadingSubmit}
            disabled={loadingSubmit}
          >
            <Text size="1">Save</Text>
          </FormSubmitButton>
          {labLocationData?.name === 'Quest' && (
            <Button
              className="bg-pp-black-1 h-8 rounded-2 px-3 py-1.5 text-1 text-[white]"
              type="button"
              onClick={onClickPlaceOrder}
              loading={loadingPlaceOrder}
            >
              Place Order
            </Button>
          )}
        </Flex>
      </Flex>
    </FormContainer>
  )
}

export { AddLabOrderForm }
