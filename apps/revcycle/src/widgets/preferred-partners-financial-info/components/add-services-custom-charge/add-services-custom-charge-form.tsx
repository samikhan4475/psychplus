import { useState } from 'react'
import { Box, Flex, Grid, Text } from '@radix-ui/themes'
import { type SubmitHandler } from 'react-hook-form'
import { z } from 'zod'
import {
  Form,
  FormSelect,
  FormSubmitButton,
  FormTextInput,
  useForm,
  validate,
} from '@psychplus/form'
import { DatePicker } from '@psychplus/ui/date-picker'
import { createCustomCharge } from '../../api.client'
import { useStore } from '../../store'
import { PatientTransactions } from '../../types'
import { FinancialFields } from './financial-fields'

const schema = z.object({
  charge: validate.requiredString,
  description: validate.requiredString,
  visit: validate.anyString,
  time: validate.requiredString,
  coins_duepaid: validate.requiredString,
  copay_duepp: validate.requiredString,
  copay_paid: validate.requiredString,
  coins_duepp: validate.requiredString,
  balance_duepp: validate.requiredString,
  balance_duepaid: validate.requiredString,
})

type SchemaType = z.infer<typeof schema>

const AddServicesCustomChargeForm = ({
  setIsDialogOpen,
}: {
  setIsDialogOpen: (value: boolean) => void
}) => {
  const preferredPartnerId = useStore((state) => state.preferredPartnerId)
  const servicesHistoryEditTransaction: PatientTransactions | null = useStore(
    (state) => state.servicesHistoryEditTransaction,
  )
  const [date, setDate] = useState<Date | undefined>()
  const [dateRequiredError, setDateRequiredError] = useState<boolean>(false)

  const form = useForm({
    schema,
    criteriaMode: 'all',
    defaultValues: {
      charge: servicesHistoryEditTransaction?.method,
      description: servicesHistoryEditTransaction?.description,
      visit: servicesHistoryEditTransaction?.visitNumber,
    },
  })

  const onSubmit: SubmitHandler<SchemaType> = async (data) => {
    let isoString = ''
    if (date) {
      const [hours, minutes] = data.time.split(':').map(Number)
      date.setHours(hours, minutes)
      isoString = date.toISOString().toString()
      setDateRequiredError(false)
    } else {
      setDateRequiredError(true)
    }

    try {
      const apiPayload = {
        chargeDate: isoString,
        transactionNumber:
          data.visit !== 'undefined' ? `${data.visit}` : 'string',
        type: data.charge,
        description: data.description,
        appointmentId: data.visit !== 'undefined' ? parseInt(data.visit) : 0,
        visitNumber: data.visit !== 'undefined' ? data.visit : 'string',
        coPayDue: parseFloat(data.copay_duepp),
        coPayPaid: parseFloat(data.copay_paid),
        coInsuranceDue: parseFloat(data.coins_duepp),
        coInsurancePaid: parseFloat(data.coins_duepaid),
        balanceDue: parseFloat(data.balance_duepp),
        balancePaid: parseFloat(data.balance_duepaid),
        preferredPartnerId: preferredPartnerId,
        isPreferredPartnerTransaction: true,
        patientId: 2118, //TODO: for testing purpose
        is_active: true,
      }

      await createCustomCharge(apiPayload)
      alert('Custom charge has been successfully created!')
    } catch (error) {
      let message = ''
      if (typeof error === 'string') {
        message = error
      } else if (error instanceof Error) {
        message = error.message
      } else {
        message = JSON.stringify(error)
      }
      alert(`ERROR: ${message}`)
    } finally {
      setIsDialogOpen(false)
    }
  }

  return (
    <Form form={form} onSubmit={onSubmit}>
      <Flex direction="column" gap="4" mb="4">
        <Flex direction={'column'}>
          <Flex gap="4" className="p-1">
            <Box className="flex-1">
              <Text className="font-bold">Visit #</Text>{' '}
              {servicesHistoryEditTransaction?.visitNumber}
            </Box>
            <Box className="flex-1 text-right">
              <Text className="font-bold">Unapplied Balance:</Text> $0.00
            </Box>
          </Flex>
        </Flex>
        <Flex direction={'column'}>
          <Flex gap="4" className="p-1">
            <Box className="flex-1">
              <FormSelect
                size="2"
                label="Charge"
                placeholder="Please Select"
                options={[
                  { value: 'Letter', label: 'Letter' },
                  { value: 'Records', label: 'Records' },
                  { value: 'Custom', label: 'Custom' },
                ]}
                {...form.register('charge')}
              />
            </Box>
            <Box className="flex-1">
              <Text className="font-bold">Date</Text>
              <Flex>
                <DatePicker
                  date={date}
                  onSelect={setDate}
                  buttonClassName="w-[100%] justify-between text-left font-regular"
                  reverse={true}
                  color="gray"
                />
              </Flex>
              {dateRequiredError && !date && (
                <Text className="text-[13px] text-[#d03035]">Required</Text>
              )}
            </Box>
            <Box className="flex-1">
              <FormTextInput
                type="time"
                size="2"
                label="Time"
                placeholder="00:00"
                className="w-[100%]"
                {...form.register('time')}
              />
            </Box>
          </Flex>
        </Flex>
        <Flex direction={'column'}>
          <Flex gap="4" className="p-1">
            <Box className="flex-1">
              <FormTextInput
                type="text"
                size="2"
                label="Description"
                placeholder="Description"
                {...form.register('description')}
              />
            </Box>
          </Flex>
        </Flex>
        <Grid columns="4" className="col-span-1 flex">
          <FinancialFields name="Co-Pay">
            <Flex className="col-span-1 flex-1">
              <Text className="pr-[5px] pt-[5px] text-[#194595]">Due PP</Text>
              <Box>
                <FormTextInput
                  type="text"
                  size="1"
                  label=""
                  placeholder="$0.00"
                  {...form.register('copay_duepp')}
                  className="h-[30px] w-[60px] text-[14px]"
                />
              </Box>
            </Flex>
            <Flex className="col-span-1 flex-1">
              <Text className="pr-[5px] pt-[5px] text-[#34A432]">Paid</Text>
              <Box className="flex">
                <FormTextInput
                  type="text"
                  label=""
                  placeholder="$0.00"
                  {...form.register('copay_paid')}
                  size="1"
                  className="h-[30px] w-[60px] text-[14px]"
                />
              </Box>
            </Flex>
          </FinancialFields>
        </Grid>
        <Grid columns="4" className="col-span-1 flex">
          <FinancialFields name="Co-Ins">
            <Flex className="col-span-1 flex-1">
              <Text className="pr-[5px] pt-[5px] text-[#194595]">Due PP</Text>
              <Box className="justify-end">
                <FormTextInput
                  type="text"
                  label=""
                  placeholder="$0.00"
                  {...form.register('coins_duepp')}
                  size="1"
                  className="h-[30px] w-[60px] text-[14px]"
                />
              </Box>
            </Flex>
            <Flex className="col-span-1 flex-1">
              <Text className="pr-[5px] pt-[5px] text-[#34A432]">Paid</Text>
              <Box className="flex">
                <FormTextInput
                  type="text"
                  label=""
                  placeholder="$0.00"
                  {...form.register('coins_duepaid')}
                  size="1"
                  className="h-[30px] w-[60px] text-[14px]"
                />
              </Box>
            </Flex>
          </FinancialFields>
        </Grid>
        <Grid columns="4" className="col-span-1 flex">
          <FinancialFields name="Balance">
            <Flex className="col-span-1 flex-1">
              <Text className="pr-[5px] pt-[5px] text-[#194595]">Due PP</Text>
              <Box className="justify-end">
                <FormTextInput
                  type="text"
                  label=""
                  placeholder="$0.00"
                  {...form.register('balance_duepp')}
                  size="1"
                  className="h-[30px] w-[60px] text-[14px]"
                />
              </Box>
            </Flex>
            <Flex className="col-span-1 flex-1">
              <Text className="pr-[5px] pt-[5px] text-[#34A432]">Paid</Text>
              <Box className="flex">
                <FormTextInput
                  type="text"
                  label=""
                  placeholder="$0.00"
                  {...form.register('balance_duepaid')}
                  size="1"
                  className="h-[30px] w-[60px] text-[14px]"
                />
              </Box>
            </Flex>
          </FinancialFields>
        </Grid>
      </Flex>
      <Flex gap="3">
        <Box className="flex-1">
          <FormSubmitButton
            size="3"
            className="w-[100%] cursor-pointer bg-[#101D46]"
          >
            Save Charges
          </FormSubmitButton>
        </Box>
      </Flex>
    </Form>
  )
}

export { AddServicesCustomChargeForm, type SchemaType }
