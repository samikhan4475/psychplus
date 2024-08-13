import { useEffect, useState } from 'react'
import Image from 'next/image'
import { SymbolIcon } from '@radix-ui/react-icons'
import { Box, Button, Flex, Text } from '@radix-ui/themes'
import { type ColumnDef } from '@tanstack/react-table'
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
import { Checkbox } from '@psychplus/ui/checkbox'
import { DataTable, DataTableColumnHeader } from '@psychplus/ui/data-table'
import { DatePicker } from '@psychplus/ui/date-picker'
import { TableCellText } from '@psychplus/ui/table-cell'
import {
  createPayment,
  getPatientDetail,
  getPatientTransactionHistory,
  getUnpaidAppointment,
} from '../../api.client'
import { useStore } from '../../store'
import {
  AmericanExCardTypeSvg,
  MasterCardTypeSvg,
  PayPalCardTypeSvg,
} from '../../svg'
import {
  FormSelectOption,
  PatientInfo,
  PatientTransactionHistory,
  SelectedAppointment,
  UnpaidAppointment,
} from '../../types'
import { calculateAge } from '../../utils'

const columns: ColumnDef<PatientTransactionHistory>[] = [
  {
    id: 'datetime',
    accessorKey: 'datetime',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Date/Time"
        className="text-[#000]"
      />
    ),
    cell: ({ row }) => <TableCellText text={row.original.transactionDate} />,
  },
  {
    id: 'charge',
    accessorKey: 'charge',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Charge"
        className="text-[#000]"
      />
    ),
    cell: ({ row }) => <TableCellText text={`${row.original.charge}`} />,
  },
  {
    id: 'description',
    accessorKey: 'description',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Description"
        className="text-[#000]"
      />
    ),
    cell: ({ row }) => <TableCellText text={row.original.description} />,
  },
  {
    id: 'copay',
    accessorKey: 'copay',
    header: ({ column }) => (
      <>
        <DataTableColumnHeader
          column={column}
          title="Co-Pay"
          className="text-[#000]"
        />
        <Flex direction="row">
          <Box className="flex-1 border-t-[0.5px] border-[#CAD8FD]">
            <Text>Due PP</Text>
          </Box>
          <Box className="flex-1 border-t-[0.5px] border-[#CAD8FD]">
            <Text>Due PT</Text>
          </Box>
          <Box className="flex-1 border-t-[0.5px] border-[#CAD8FD]">
            <Text>Paid</Text>
          </Box>
        </Flex>
      </>
    ),
    cell: ({ row }) => (
      <Flex direction="row">
        <Box className="flex-1 border-t-[0.5px] border-[#CAD8FD]">
          <Text>${row.original.coPayDue}</Text>
        </Box>
        <Box className="flex-1 border-t-[0.5px] border-[#CAD8FD]">
          <Text>$0.00</Text>
        </Box>
        <Box className="flex-1 border-t-[0.5px] border-[#CAD8FD]">
          <Text>${row.original.coPayPaid}</Text>
        </Box>
      </Flex>
    ),
  },
  {
    id: 'coins',
    accessorKey: 'coins',
    header: ({ column }) => (
      <>
        <DataTableColumnHeader
          column={column}
          title="Co-Ins"
          className="text-[#000]"
        />
        <Flex direction="row">
          <Box className="flex-1 border-t-[0.5px] border-[#CAD8FD]">
            <Text>Due PP</Text>
          </Box>
          <Box className="flex-1 border-t-[0.5px] border-[#CAD8FD]">
            <Text>Due PT</Text>
          </Box>
          <Box className="flex-1 border-t-[0.5px] border-[#CAD8FD]">
            <Text>Paid</Text>
          </Box>
        </Flex>
      </>
    ),
    cell: ({ row }) => (
      <Flex direction="row">
        <Box className="flex-1 border-t-[0.5px] border-[#CAD8FD]">
          <Text>${row.original.coInsDue}</Text>
        </Box>
        <Box className="flex-1 border-t-[0.5px] border-[#CAD8FD]">
          <Text>$0.00</Text>
        </Box>
        <Box className="flex-1 border-t-[0.5px] border-[#CAD8FD]">
          <Text>${row.original.coInsPaid}</Text>
        </Box>
      </Flex>
    ),
  },
  {
    id: 'balance',
    accessorKey: 'balance',
    header: ({ column }) => (
      <>
        <DataTableColumnHeader
          column={column}
          title="Balance"
          className="text-[#000]"
        />
        <Flex direction="row">
          <Box className="flex-1 border-t-[0.5px] border-[#CAD8FD]">
            <Text>Due PP</Text>
          </Box>
          <Box className="flex-1 border-t-[0.5px] border-[#CAD8FD]">
            <Text>Due PT</Text>
          </Box>
          <Box className="flex-1 border-t-[0.5px] border-[#CAD8FD]">
            <Text>Paid</Text>
          </Box>
        </Flex>
      </>
    ),
    cell: ({ row }) => (
      <Flex direction="row">
        <Box className="flex-1 border-t-[0.5px] border-[#CAD8FD]">
          <Text>${row.original.balanceDue}</Text>
        </Box>
        <Box className="flex-1 border-t-[0.5px] border-[#CAD8FD]">
          <Text>$0.00</Text>
        </Box>
        <Box className="flex-1 border-t-[0.5px] border-[#CAD8FD]">
          <Text>${row.original.balancePaid}</Text>
        </Box>
      </Flex>
    ),
  },
]

const schema = z.object({
  nameOnCard: z.string().min(1).max(30),
  copayAppointment: validate.anyString.optional(),
  copayValue: validate.anyString.optional(),
  coInsuranceAppointment: validate.anyString.optional(),
  coInsuranceValue: validate.anyString.optional(),
  remainingBalance: validate.anyString.optional(),
  customAmount: validate.anyString.optional(),
  monthlyPayment: validate.anyString.optional(),
  note: validate.anyString.optional(),
  paymentMethod: validate.anyString.optional(),
  copay_due: validate.anyString.optional(),
  copay_paid: validate.anyString.optional(),
  coins_due: validate.anyString.optional(),
  coins_paid: validate.anyString.optional(),
  balance_due: validate.anyString.optional(),
  balance_paid: validate.anyString.optional(),
  cmd_transaction_no: validate.anyString.optional(),
  cheque_number: validate.anyString.optional(),
  remaining_deduction_balance: validate.anyString.optional(),
  verification: validate.anyString.optional(),
  date: validate.anyString.optional(),
})

type SchemaType = z.infer<typeof schema>

const AddServicesPaymentForm = () => {
  const patientId = 2118 // TODO: we are using this hard coded patient id because this flow isn't decided yet.
  const preferredPartnerId = useStore((state) => state.preferredPartnerId)
  const selectedCard = useStore((state) => state.selectedCard)
  const [patientData, setPatientData] = useState<PatientInfo>()
  const { setSelectCardDialogOpen } = useStore((state) => ({
    setSelectCardDialogOpen: state.setSelectCardDialogOpen,
  }))
  const [paymentMethod, setPaymentMethod] = useState('card')
  const [remainingBalanceCheck, setRemainingBalanceCheck] =
    useState<boolean>(false)
  const [customPayCheck, setCustomPayCheck] = useState<boolean>(false)
  const [monthlyPaymentCheck, setMonthlyPaymentCheck] = useState<boolean>(false)
  const [copay, setCopay] = useState<boolean>(false)
  const [copayList, setCopayList] = useState<FormSelectOption[]>([])
  const [coInsurance, setCoInsurance] = useState<boolean>(false)
  const [coInsuranceList, setCoInsuranceList] = useState<FormSelectOption[]>([])
  const [paymentHistory, setPaymentHistory] = useState<
    PatientTransactionHistory[]
  >([])
  const [paymentDate, setPaymentDate] = useState<Date | undefined>()
  const [selectedAppointments, setSelectedAppointments] = useState<
    SelectedAppointment[]
  >([])

  useEffect(() => {
    init()
  }, [])

  const init = async () => {
    const history: PatientTransactionHistory[] =
      await getPatientTransactionHistory(patientId)
    setPaymentHistory(history)

    const data: PatientInfo = await getPatientDetail(patientId)
    setPatientData(data)
    const coPayResponse: UnpaidAppointment[] = await getUnpaidAppointment({
      paymentType: 'CoPay',
      patientId,
    })

    const compiled = coPayResponse.map((element) => ({
      value: `${element.app_id}`,
      label: element.appointmentDateTime,
    }))

    setCopayList(compiled)

    const coInsuranceResponse: UnpaidAppointment[] = await getUnpaidAppointment(
      {
        paymentType: 'CoInsurance',
        patientId,
      },
    )

    const insCompiled = coInsuranceResponse.map((element) => ({
      value: `${element.app_id}`,
      label: element.appointmentDateTime,
    }))
    setCoInsuranceList(insCompiled)
  }

  const form = useForm({
    schema,
    criteriaMode: 'all',
  })

  const changePaymentMethod = (value: string) => {
    setPaymentMethod(value)
  }

  const onSubmit: SubmitHandler<SchemaType> = async (data) => {
    const apiPayload = selectedAppointments.map((element) => ({
      patientId: patientId,
      appointmentId: element.appointmentId,
      paymentType: element.paymentType,
      paymentDateTime: `${paymentDate}`,
      cardId: selectedCard?.id ? `${selectedCard?.id}` : '',
      cardKey: selectedCard?.cardKey ?? '',
      paymentMethod: paymentMethod,
      paymentDescription: data.note,
      preferredPartnerId: preferredPartnerId,
      isPreferredPartnerPayment: true,
    }))

    try {
      await createPayment(apiPayload, preferredPartnerId)
      window.location.replace(`/widgets/preferred-partners-financial-info`)
    } catch (error) {
      window.location.replace(`/widgets/preferred-partners-financial-info`)
    }
  }

  const onChangeCard = () => {
    setSelectCardDialogOpen(true)
  }

  const onCoPayChange = () => {
    setCopay(!copay)
  }

  const onRemainingBalanceChange = () => {
    setRemainingBalanceCheck(!remainingBalanceCheck)
  }

  const onCustomPayChange = () => {
    setCustomPayCheck(!customPayCheck)
  }

  const onMonthlyPaymentChange = () => {
    setMonthlyPaymentCheck(!monthlyPaymentCheck)
  }

  const onCoInsuranceChange = () => {
    setCoInsurance(!coInsurance)
  }

  const onSelectAppointment = (appointmentId: string, paymentType: string) => {
    setSelectedAppointments((prevAppointments) => [
      ...prevAppointments,
      {
        paymentType,
        appointmentId: parseInt(appointmentId),
      },
    ])
  }

  return (
    <Form form={form} onSubmit={onSubmit}>
      <Flex direction="column" gap="4" mb="4">
        <Flex direction={'column'} className="rounded-[4px] border-[#F3F3F3]">
          <Flex direction="column" gap="4" mb="4" className="bg-[#EEF2F6] p-1">
            <Text as="label" size="2" weight="bold">
              Patient Information
            </Text>
          </Flex>

          <Flex gap="4" className="p-1">
            <Box className="flex-1">
              <Flex direction="column">
                <Flex align="center">
                  <Box className="flex-1">
                    <Text weight="bold">Patient Name </Text>
                    <Text>{patientData?.legalName.firstName}</Text>
                  </Box>
                  <Box className="flex-1">
                    <Text weight="bold">Sex </Text>
                    <Text>{patientData?.gender}</Text>
                  </Box>
                  <Box className="flex-1">
                    <Text weight="bold">DOB </Text>
                    <Text>{patientData?.birthdate}</Text>
                  </Box>
                  <Box className="flex-1">
                    <Text weight="bold">Age</Text>
                    <Text> {calculateAge(patientData?.birthdate)} yrs</Text>
                  </Box>
                </Flex>
              </Flex>
            </Box>
          </Flex>

          <Flex direction="column" gap="4" mb="4" className="bg-[#EEF2F6] p-1">
            <Text as="label" size="2" weight="bold">
              Visit Information
            </Text>
          </Flex>

          <Flex gap="4" className="p-1">
            <Box className="flex-1">
              <Flex direction="column">
                <Flex align="center" gap="4">
                  <Box className="flex-1">
                    <Text className="font-bold">Deductible not met as of</Text>
                    <DatePicker
                      date={paymentDate}
                      onSelect={setPaymentDate}
                      buttonClassName="w-[200px] justify-between text-left font-regular"
                      reverse={true}
                      color="gray"
                    />
                  </Box>
                  <Box className="flex-1">
                    <FormTextInput
                      type="text"
                      label="Remaining Deduction Balance "
                      size="2"
                      placeholder="$0.00"
                      {...form.register('remaining_deduction_balance')}
                    />
                  </Box>
                  <Box className="flex-1">
                    <FormSelect
                      label="Verification"
                      size="2"
                      placeholder="Please Select"
                      options={[
                        { value: 'yes', label: 'Yes' },
                        { value: 'auth_complete', label: 'Auth Complete' },
                        {
                          value: 'referral_complete',
                          label: 'Referral Complete',
                        },
                        { value: 'no_benefits', label: 'No Benefits' },
                        { value: 'invalid', label: 'Invalid' },
                        { value: 'termed', label: 'Termed' },
                        { value: 'auth_req', label: 'Auth Req' },
                        { value: 'ref_req', label: 'Ref Req' },
                        { value: 'pending', label: 'Pending' },
                      ]}
                      {...form.register('verification')}
                    />
                  </Box>

                  <Box className="flex-1">
                    <Button
                      disabled={true}
                      className="textColor-[#151B4A] bg-white mt-[20px] border-s-[#151B4A]"
                    >
                      <SymbolIcon /> Check Eligibility
                    </Button>
                  </Box>
                </Flex>
              </Flex>
            </Box>
          </Flex>

          <Flex gap="4" p="3">
            <Box className="flex-1">
              <Flex direction="row" gap="4">
                <Box className="flex-1">
                  <Text>Co-Pay</Text>
                </Box>
                <Box className="flex-1">
                  <Text>Co-Ins</Text>
                </Box>
                <Box className="flex-1">
                  <Text>Balance</Text>
                </Box>
              </Flex>
              <Flex direction="row" gap="4">
                <Box className="flex-1">
                  <FormTextInput
                    type="text"
                    label="Due"
                    size="2"
                    placeholder="$0.00"
                    {...form.register('copay_due')}
                  />
                </Box>
                <Box className="flex-1">
                  <FormTextInput
                    type="text"
                    label="Paid"
                    size="2"
                    placeholder="$0.00"
                    {...form.register('copay_paid')}
                  />
                </Box>
                <Box className="flex-1">
                  <FormTextInput
                    type="text"
                    label="Due"
                    size="2"
                    placeholder="$0.00"
                    {...form.register('coins_due')}
                  />
                </Box>
                <Box className="flex-1">
                  <FormTextInput
                    type="text"
                    label="Paid"
                    size="2"
                    placeholder="$0.00"
                    {...form.register('coins_paid')}
                  />
                </Box>
                <Box className="flex-1">
                  <FormTextInput
                    type="text"
                    label="Due"
                    size="2"
                    placeholder="$0.00"
                    {...form.register('balance_due')}
                  />
                </Box>
                <Box className="flex-1">
                  <FormTextInput
                    type="text"
                    label="Paid"
                    size="2"
                    placeholder="$0.00"
                    {...form.register('balance_paid')}
                  />
                </Box>
              </Flex>
            </Box>
          </Flex>

          <Flex gap="4" mb="4" className="bg-[#EEF2F6] p-1">
            <Box className="flex-1">
              <Text as="label" size="2" weight="bold">
                Select Payment Option
              </Text>
            </Box>
            <Box className="flex-1">
              <Text as="label" size="2" className="text-right">
                Remaining Balance $0.00
              </Text>
            </Box>
          </Flex>

          <Flex direction="column" justify="between" className="p-1">
            <Flex>
              <Box className="flex-3">
                <Checkbox
                  size="3"
                  defaultChecked={copay}
                  onClick={onCoPayChange}
                />
                <Text className="p-[5px]">Pay Copay for visit on</Text>
              </Box>
              <Box className="flex-1">
                <Flex className="flex justify-end gap-x-1.5">
                  <Box>
                    <FormSelect
                      label=""
                      size="2"
                      placeholder="Please Select"
                      buttonClassName="w-[200px]"
                      options={copayList}
                      onValueChange={(value: string) =>
                        onSelectAppointment(value, 'CoPay')
                      }
                      {...form.register('copayAppointment')}
                    />
                  </Box>
                  <Box>
                    <FormTextInput
                      type="text"
                      label=""
                      size="2"
                      placeholder="$0.00"
                      className="w-[100px]"
                      disabled={true}
                      {...form.register('copayValue')}
                    />
                  </Box>
                </Flex>
              </Box>
            </Flex>
            <Flex>
              <Box className="flex-3">
                <Checkbox
                  size="3"
                  onClick={onCoInsuranceChange}
                  defaultChecked={coInsurance}
                />
                <Text className="p-[5px]">Pay Coinsurance for visit on</Text>
              </Box>
              <Box className="flex-1">
                <Flex className="flex justify-end gap-x-1.5">
                  <Box>
                    <FormSelect
                      label=""
                      size="2"
                      placeholder="Please Select"
                      buttonClassName="w-[200px]"
                      options={coInsuranceList}
                      {...form.register('coInsuranceAppointment')}
                      onValueChange={(value: string) =>
                        onSelectAppointment(value, 'CoInsurance')
                      }
                    />
                  </Box>
                  <Box>
                    <FormTextInput
                      type="text"
                      label=""
                      size="2"
                      placeholder="$0.00"
                      className="w-[100px]"
                      disabled={true}
                      {...form.register('coInsuranceValue')}
                    />
                  </Box>
                </Flex>
              </Box>
            </Flex>
            <Flex>
              <Box style={{ flex: 7.8 }}>
                <Checkbox size="3" onClick={onRemainingBalanceChange} />
                <Text className="p-[5px]">Pay Remaining Due (Balance)</Text>
              </Box>
              <Box className="flex-1">
                <FormTextInput
                  type="text"
                  label=""
                  size="2"
                  placeholder="$0.00"
                  className="w-[100px]"
                  disabled={!remainingBalanceCheck}
                  {...form.register('remainingBalance')}
                />
              </Box>
            </Flex>
            <Flex>
              <Box style={{ flex: 7.8 }}>
                <Checkbox size="3" onClick={onCustomPayChange} />
                <Text className="p-[5px]">Pay Custom Amount</Text>
              </Box>
              <Box className="flex-1">
                <FormTextInput
                  type="text"
                  label=""
                  size="2"
                  placeholder="$0.00"
                  className="w-[100px]"
                  disabled={!customPayCheck}
                  {...form.register('customAmount')}
                />
              </Box>
            </Flex>
            <Flex>
              <Box style={{ flex: 7.8 }}>
                <Checkbox size="3" onClick={onMonthlyPaymentChange} />
                <Text className="p-[5px]">
                  Start Monthly Payment plan:{' '}
                  <span className="text-[#8C8C8C]">
                    minimum payment is $25/month
                  </span>
                </Text>
              </Box>
              <Box className="flex-1">
                <FormTextInput
                  type="text"
                  label=""
                  size="2"
                  placeholder="$0.00"
                  className="w-[100px]"
                  disabled={!monthlyPaymentCheck}
                  {...form.register('monthlyPayment')}
                />
              </Box>
            </Flex>
            <Flex className="bg-[#F8F8F8] p-[5px] font-bold">
              <Box style={{ flex: 7.8 }}>
                <Text>Payment Total</Text>
              </Box>
              <Box className="flex-1">
                <Text>$0.00</Text>
              </Box>
            </Flex>
          </Flex>

          <Flex direction="column" gap="4" mb="4" className="bg-[#EEF2F6] p-1">
            <Text as="label" size="2" weight="bold" htmlFor="note">
              Note
            </Text>
          </Flex>
          <Flex gap="4" className="p-1">
            <Box className="flex-1">
              <Flex direction="column">
                <Flex align="center" id="note">
                  <Box className="flex-1">
                    <FormTextInput
                      size="2"
                      type="text"
                      label=""
                      placeholder="Write note..."
                      {...form.register('note')}
                    />
                  </Box>
                </Flex>
              </Flex>
            </Box>
          </Flex>

          <Flex gap="4" mb="4" className="bg-[#EEF2F6] p-1">
            <Box className="flex-1">
              <Text as="label" size="2" weight="bold" htmlFor="paymentMethod">
                Payment Details
              </Text>
            </Box>
            <Box className="flex-1">
              <Text
                as="label"
                size="2"
                htmlFor="paymentMethod"
                className="float-right cursor-pointer text-right"
                onClick={onChangeCard}
              >
                Add Card/Change Card
              </Text>
            </Box>
          </Flex>

          <Flex direction="row" justify="between">
            <Box className="flex-1">
              <Text>Select Payment Method</Text>
            </Box>
            <Box className="flex-1">
              <Flex className="flex justify-end">
                <FormSelect
                  label=""
                  size="2"
                  placeholder="Credit/Debit Card"
                  onValueChange={changePaymentMethod}
                  buttonClassName="w-[200px]"
                  options={[
                    { value: 'card', label: 'Credit/Debit Card' },
                    { value: 'cash', label: 'Cash' },
                    { value: 'cmd', label: 'CMD' },
                    { value: 'cheque', label: 'Cheque' },
                  ]}
                  {...form.register('paymentMethod')}
                />
              </Flex>
            </Box>
          </Flex>

          <Flex mb="4" className="p-1">
            {paymentMethod === 'card' && (
              <>
                {selectedCard ? (
                  <Box className="flex-1 border-[#95AAD1] bg-[#F5FAFF] p-[5px]">
                    <Flex direction="row">
                      <Box className="flex-1"></Box>
                      <Box className="flex-1">
                        <Text weight="bold">Card Type</Text>
                      </Box>
                      <Box className="flex-1">
                        <Text weight="bold">Card no.</Text>
                      </Box>
                      <Box className="flex-1">
                        <Text weight="bold">Name</Text>
                      </Box>
                      <Box className="flex-1">
                        <Text weight="bold">Expiry Date</Text>
                      </Box>
                    </Flex>
                    <Flex direction="row">
                      <Box className="flex-1 ">
                        {selectedCard.cardType === 'Visa' && (
                          <Image
                            src="/revcycle/images/card-type-icon.png"
                            width="200"
                            height="36"
                            alt=""
                          />
                        )}
                        {selectedCard.cardType === 'AmericanExpress' && (
                          <AmericanExCardTypeSvg />
                        )}
                        {selectedCard.cardType === 'MasterCard' && (
                          <MasterCardTypeSvg />
                        )}
                        {selectedCard.cardType === 'PayPal' && (
                          <PayPalCardTypeSvg />
                        )}
                      </Box>
                      <Box className="flex-1">{selectedCard.cardType}</Box>
                      <Box className="flex-1">{`***********${selectedCard.numberLastFour}`}</Box>
                      <Box className="flex-1">{selectedCard.name}</Box>
                      <Box className="flex-1">{`${selectedCard.expireMonth}/${selectedCard.expireYear}`}</Box>
                    </Flex>
                  </Box>
                ) : (
                  <>Please select card</>
                )}
              </>
            )}

            {paymentMethod === 'cmd' && (
              <FormTextInput
                size="2"
                type="text"
                label="Transaction NO."
                placeholder="123456789"
                {...form.register('cmd_transaction_no')}
              />
            )}

            {paymentMethod === 'cheque' && (
              <FormTextInput
                size="2"
                type="text"
                label="Cheque Number"
                placeholder="123456789"
                {...form.register('cheque_number')}
              />
            )}
          </Flex>

          <Flex direction="column" gap="4" mb="4" className="mg-[#EEF2F6] p-1">
            <Text as="label" size="2" weight="bold">
              Payment History
            </Text>
          </Flex>
          <Flex direction="column" gap="4" mb="4" className="p-1">
            <DataTable
              data={paymentHistory} //
              columns={columns}
              tableClass="border border-solid border-[lightgray] "
              tHeadClass="bg-[#EBF3FC]"
              thClass="border-b border-r border-solid border-[#C1E2FF] text-center"
              isRowPan={true}
              toBodyClass="border-[lightgray]; border-b border-solid"
              columnCellClass="border border-solid border-[#F2F2F2] w-50"
              isPreferredPartnerTable={true}
            />
          </Flex>
        </Flex>
      </Flex>

      <Flex gap="3" justify="end">
        <Button size="3" variant="outline" className="cursor-pointer">
          Save & Close
        </Button>
        <FormSubmitButton size="3" className="cursor-pointer bg-[#101D46]">
          Make Payment
        </FormSubmitButton>
      </Flex>
    </Form>
  )
}

export { AddServicesPaymentForm }
