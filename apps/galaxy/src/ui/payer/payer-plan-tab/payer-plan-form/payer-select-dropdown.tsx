import { Text } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import {
  AsyncSelect,
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components'
import { getPayersListAction } from '../../actions/get-payers'
import { SchemaType } from '../schema'

interface PayerSelectProps {
  isEditMode: boolean
  addingNewPayer: boolean
}

const PayerSelect = ({ isEditMode, addingNewPayer }: PayerSelectProps) => {
  const form = useFormContext<SchemaType>()
  const handleChange = async (value: string) => {
    const payerListResponse = await getPayersListAction()
    if (payerListResponse.state === 'success') {
      const findSelectedPayer = payerListResponse.data.find(
        (payer) => payer.value === value,
      )
      form.setValue('payerName', findSelectedPayer?.label)
      form.setValue('payerId', findSelectedPayer?.value ?? '')
    }
  }

  return (
    <FormFieldContainer className="flex-1 gap-0">
      <FormFieldLabel required={true}>Payer</FormFieldLabel>
      {addingNewPayer ? (
        <Text>Loading...</Text>
      ) : (
        <AsyncSelect
          disabled={isEditMode}
          field="payerId"
          placeholder="Select"
          fetchOptions={getPayersListAction}
          buttonClassName="w-full h-6"
          className="h-full flex-1"
          onValueChange={handleChange}
        />
      )}
      <FormFieldError name="payerId" />
    </FormFieldContainer>
  )
}

export { PayerSelect }
