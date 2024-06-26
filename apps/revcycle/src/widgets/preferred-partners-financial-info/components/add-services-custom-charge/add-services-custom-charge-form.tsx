import { useState } from 'react'
import { Box, Flex, Text } from '@radix-ui/themes'
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

const schema = z.object({
  charge: validate.requiredString,
  description: validate.requiredString,
  visit: validate.requiredString,
  copay_duept: validate.nullOrString,
  coins_duepaid: validate.numberOnly,
  copay_duepp: validate.numberOnly,
  copay_paid: validate.numberOnly,
  coins_duept: validate.nullOrNumber,
  coins_duepp: validate.numberOnly,
  balance_duept: validate.nullOrNumber,
  balance_duepp: validate.numberOnly,
  balance_duepaid: validate.numberOnly,
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
  const [time, setTime] = useState<string>('')

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
    try {
      const apiPayload = {
        chargeDate: `${date} ${time}`,
        transactionNumber: `${data.visit}`,
        type: data.charge,
        description: data.description,
        appointmentId: data.visit,
        visitNumber: data.visit,
        coPayDue: data.copay_duept ?? '',
        coPayPaid: data.copay_paid,
        coInsuranceDue: data.coins_duepp,
        coInsurancePaid: data.coins_duepaid,
        balanceDue: data.balance_duepp,
        balancePaid: data.balance_duepaid,
        preferredPartnerId: preferredPartnerId,
        isPreferredPartnerTransaction: true,
        patientId: 2118, //TODO: for testing purpose
      }

      await createCustomCharge(apiPayload)
      setIsDialogOpen(false)
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
      window.location.replace(`/widgets/preferred-partners-financial-info`)
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
            </Box>
            <Box className="flex-1">
              <Text className="font-bold">Time</Text>
              <Flex>
                <input
                  type="time"
                  placeholder="00:00"
                  className="border-gray rounded h-[29px] w-[100%] border-[1px] border-solid p-[5px]"
                  onChange={(e) => setTime(e.target.value)}
                />
              </Flex>
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

        <Flex direction={'column'}>
          <Flex gap="4" className="p-1">
            <Box className="flex-1">Co-Pay</Box>
            <Box className="flex-1">
              <Flex>
                <Box className="flex-1">Due PT</Box>
                <Box className="flex-1">
                  <FormTextInput
                    type="text"
                    size="1"
                    label=""
                    placeholder="$0.00"
                    disabled={true}
                    {...form.register('copay_duept')}
                  />
                </Box>
              </Flex>
            </Box>
            <Box className="flex-1">
              <Flex>
                <Box className="pr-[5px]">Due PP</Box>
                <Box>
                  <FormTextInput
                    type="text"
                    size="1"
                    label=""
                    placeholder="$0.00"
                    {...form.register('copay_duepp')}
                  />
                </Box>
              </Flex>
            </Box>
            <Box className="flex-1">
              <Flex>
                <Box className="pr-[5px] text-[#34A432]">Paid</Box>
                <Box>
                  <FormTextInput
                    type="text"
                    label=""
                    placeholder="$0.00"
                    {...form.register('copay_paid')}
                    size="1"
                  />
                </Box>
              </Flex>
            </Box>
          </Flex>
        </Flex>

        <Flex direction={'column'}>
          <Flex gap="4" className="p-1">
            <Box className="flex-1">Co-Ins</Box>
            <Box className="flex-1">
              <Flex>
                <Box className="flex-1">Due PT</Box>
                <Box className="flex-1">
                  <FormTextInput
                    disabled={true}
                    type="text"
                    label=""
                    placeholder="$0.00"
                    {...form.register('coins_duept')}
                    size="1"
                    required={false}
                  />
                </Box>
              </Flex>
            </Box>
            <Box className="flex-1">
              <Flex>
                <Box className="pr-[5px]">Due PP</Box>
                <Box>
                  <FormTextInput
                    type="text"
                    label=""
                    placeholder="$0.00"
                    {...form.register('coins_duepp')}
                    size="1"
                  />
                </Box>
              </Flex>
            </Box>
            <Box className="flex-1">
              <Flex>
                <Box className="pr-[5px] text-[#34A432]">Paid</Box>
                <Box>
                  <FormTextInput
                    type="text"
                    label=""
                    placeholder="$0.00"
                    {...form.register('coins_duepaid')}
                    size="1"
                  />
                </Box>
              </Flex>
            </Box>
          </Flex>
        </Flex>

        <Flex direction={'column'}>
          <Flex gap="4" className="p-1">
            <Box className="flex-1">Balance</Box>
            <Box className="flex-1">
              <Flex>
                <Box className="flex-1">Due PT</Box>
                <Box className="flex-1">
                  <FormTextInput
                    disabled={true}
                    type="text"
                    label=""
                    placeholder="$0.00"
                    {...form.register('balance_duept')}
                    size="1"
                    required={false}
                  />
                </Box>
              </Flex>
            </Box>
            <Box className="flex-1">
              <Flex>
                <Box className="pr-[5px]">Due PP</Box>
                <Box>
                  <FormTextInput
                    type="text"
                    label=""
                    placeholder="$0.00"
                    {...form.register('balance_duepp')}
                    size="1"
                  />
                </Box>
              </Flex>
            </Box>
            <Box className="flex-1">
              <Flex>
                <Box className="pr-[5px] text-[#34A432]">Paid</Box>
                <Box>
                  <FormTextInput
                    type="text"
                    label=""
                    placeholder="$0.00"
                    {...form.register('balance_duepaid')}
                    size="1"
                  />
                </Box>
              </Flex>
            </Box>
          </Flex>
        </Flex>
      </Flex>

      <Flex gap="3">
        <Box className="flex-1">
          <FormSubmitButton size="2" className="w-[100%] bg-[#101D46]">
            Save Charges
          </FormSubmitButton>
        </Box>
      </Flex>
    </Form>
  )
}

export { AddServicesCustomChargeForm }
