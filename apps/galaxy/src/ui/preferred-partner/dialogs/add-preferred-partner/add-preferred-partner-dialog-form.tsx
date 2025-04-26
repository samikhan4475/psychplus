import { Button, Flex, Grid, RadioGroup, TextField } from '@radix-ui/themes'
import { useForm } from 'react-hook-form'
import {
  AddressFieldsGroup,
  DatePickerInput,
  FormContainer,
  FormFieldContainer,
  FormFieldLabel,
} from '@/components'

interface AddPreferredPartnerDialogFormProps {
  onClose: (open: boolean) => void
}

const textFieldClass =
  'border-pp-gray-2 w-full border border-solid !outline-none [box-shadow:none]'
  
const AddPreferredPartnerDialogForm = ({
  onClose,
}: AddPreferredPartnerDialogFormProps) => {
  const form = useForm({
    mode: 'onChange',
    defaultValues: {},
  })
  const onSubmit = async () => {
    // API Implementation will be done here
  }

  return (
    <FormContainer form={form} className="gap-2" onSubmit={onSubmit}>
      <Grid columns="4" gap="3">
        <FormFieldContainer>
          <FormFieldLabel>PP Name</FormFieldLabel>
          <TextField.Root size="1" className={textFieldClass} />
        </FormFieldContainer>
        <FormFieldContainer>
          <FormFieldLabel>ID (internal ID)</FormFieldLabel>
          <TextField.Root size="1" className={textFieldClass} />
        </FormFieldContainer>
        <FormFieldContainer>
          <FormFieldLabel required>Total Users</FormFieldLabel>
          <TextField.Root size="1" className={textFieldClass} />
        </FormFieldContainer>
        <FormFieldContainer>
          <FormFieldLabel required>Total Users IDs</FormFieldLabel>
          <TextField.Root size="1" className={textFieldClass} />
        </FormFieldContainer>

        <FormFieldContainer>
          <FormFieldLabel className="mb-2" required>
            PP Status
          </FormFieldLabel>
          <RadioGroup.Root className="flex-row gap-2" size="1" highContrast>
            <RadioGroup.Item value="Basic">Basic</RadioGroup.Item>
            <RadioGroup.Item value="Plus">Plus</RadioGroup.Item>
          </RadioGroup.Root>
        </FormFieldContainer>
        <FormFieldContainer className="col-span-3">
          <FormFieldLabel className="mb-2" required>
            -PP Payer Status
          </FormFieldLabel>
          <RadioGroup.Root className="flex-row gap-2" size="1" highContrast>
            <RadioGroup.Item value="Self-pay">Self-Pay</RadioGroup.Item>
            <RadioGroup.Item value="Insurance">Insurance</RadioGroup.Item>
            <RadioGroup.Item value="Custom">Custom</RadioGroup.Item>
          </RadioGroup.Root>
        </FormFieldContainer>
      </Grid>
      <Grid columns="3" gap="2">
        <FormFieldContainer className="bg-gray-2 px-1 py-2">
          <FormFieldLabel required className="mb-1">
            Individual
          </FormFieldLabel>
          <Flex gap="2">
            <FormFieldContainer>
              <FormFieldLabel>Number</FormFieldLabel>
              <TextField.Root size="1" className={textFieldClass} />
            </FormFieldContainer>
            <FormFieldContainer>
              <FormFieldLabel>Rate</FormFieldLabel>
              <TextField.Root size="1" className={textFieldClass} />
            </FormFieldContainer>
          </Flex>
        </FormFieldContainer>
        <FormFieldContainer className="bg-gray-2 px-1 py-2">
          <FormFieldLabel required className="mb-1">
            Couple
          </FormFieldLabel>
          <Flex gap="2">
            <FormFieldContainer>
              <FormFieldLabel>Number</FormFieldLabel>
              <TextField.Root size="1" className={textFieldClass} />
            </FormFieldContainer>
            <FormFieldContainer>
              <FormFieldLabel>Rate</FormFieldLabel>
              <TextField.Root size="1" className={textFieldClass} />
            </FormFieldContainer>
          </Flex>
        </FormFieldContainer>
        <FormFieldContainer className="bg-gray-2 px-1 py-2">
          <FormFieldLabel required className="mb-1">
            Family
          </FormFieldLabel>
          <Flex gap="2">
            <FormFieldContainer>
              <FormFieldLabel>Number</FormFieldLabel>
              <TextField.Root size="1" className={textFieldClass} />
            </FormFieldContainer>
            <FormFieldContainer>
              <FormFieldLabel>Rate</FormFieldLabel>
              <TextField.Root size="1" className={textFieldClass} />
            </FormFieldContainer>
          </Flex>
        </FormFieldContainer>
      </Grid>
      <Grid columns="3" gap="3">
        <FormFieldContainer>
          <FormFieldLabel required>Total Charge Amount Plus</FormFieldLabel>
          <TextField.Root size="1" className={textFieldClass} />
        </FormFieldContainer>
        <FormFieldContainer>
          <FormFieldLabel required>Total Charge Amount Service</FormFieldLabel>
          <TextField.Root size="1" className={textFieldClass} />
        </FormFieldContainer>
        <FormFieldContainer>
          <FormFieldLabel className="mb-2" required>
            Billing Frequency
          </FormFieldLabel>
          <RadioGroup.Root className="flex-row gap-2 " size="1" highContrast>
            <RadioGroup.Item value="Monthly">Monthly</RadioGroup.Item>
            <RadioGroup.Item value="Annual">Annual</RadioGroup.Item>
          </RadioGroup.Root>
        </FormFieldContainer>
        <FormFieldContainer>
          <FormFieldLabel>Start Date</FormFieldLabel>
          <DatePickerInput field="startDate" />
        </FormFieldContainer>
        <FormFieldContainer>
          <FormFieldLabel>Next Payment</FormFieldLabel>
          <DatePickerInput field="endDate" />
        </FormFieldContainer>
      </Grid>
      <FormFieldContainer>
        <FormFieldLabel required className="mb-1">
          Primary Address
        </FormFieldLabel>
        <AddressFieldsGroup />
      </FormFieldContainer>
      <FormFieldContainer className="w-fit flex-row gap-3 bg-[#f0f4ff] px-2 py-1">
        <FormFieldLabel>
          Does your Mailing Address is the Same as Primary Address
        </FormFieldLabel>
        <RadioGroup.Root className="flex-row gap-2" size="1" highContrast>
          <RadioGroup.Item value="Yes">Yes</RadioGroup.Item>
          <RadioGroup.Item value="No">No</RadioGroup.Item>
        </RadioGroup.Root>
      </FormFieldContainer>
      <AddressFieldsGroup />
      <Button
        type="submit"
        size="2"
        className="ml-auto w-fit"
        highContrast
        variant="solid"
      >
        Save
      </Button>
    </FormContainer>
  )
}

export { AddPreferredPartnerDialogForm }
