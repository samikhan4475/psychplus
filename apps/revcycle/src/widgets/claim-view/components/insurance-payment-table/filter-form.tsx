import { useState } from 'react'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { Box, Button, Flex, Text, TextField } from '@radix-ui/themes'
import { z } from 'zod'
import { Form, FormSelect, useForm, validate } from '@psychplus/form'
import { DatePicker } from '@psychplus/ui/date-picker'
import { getInsurancePaymentsList } from '../../api.client'
import { useStore } from '../../store'
import { InsurancePaymentsPayload } from '../../types'
import { adjustToUTC } from '../../utils'

const schema = z.object({
  paymentType: validate.anyString.optional(),
  dateType: validate.anyString.optional(),
  checkNumber: validate.anyString.optional(),
  insuranceName: validate.anyString.optional(),
})

const FilterForm = () => {
  const {
    setInsurancePaymentsList,
    paymentSourceTypeCodeSets,
    claimPaymentFiltrationDateType,
  } = useStore((state) => ({
    setInsurancePaymentsList: state.setInsurancePaymentsList,
    paymentSourceTypeCodeSets: state.paymentSourceTypeCodeSets,
    claimPaymentFiltrationDateType: state.claimPaymentFiltrationDateType,
  }))
  const form = useForm({
    schema,
    criteriaMode: 'all',
    defaultValues: {},
  })

  const [fromDate, setFromDate] = useState<Date | undefined>()
  const [toDate, setToDate] = useState<Date | undefined>()

  const clearFilters = async () => {
    form.reset()
    form.setValue('paymentType', '')
    form.setValue('dateType', '')
    setFromDate(undefined) // clear filters
    setToDate(undefined) // clear filters
    try {
      const response = await getInsurancePaymentsList()
      setInsurancePaymentsList(response)
    } catch (error) {
      setInsurancePaymentsList([])
    }
  }

  const onSubmit = async () => {
    try {
      const formData = form.getValues()
      const cleanFilterState: Partial<InsurancePaymentsPayload> =
        Object.entries(formData)
          .filter(([key, value]) => !!value)
          .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {})

      const filterOptions = {
        ...cleanFilterState,
        fromDate: fromDate ? adjustToUTC(fromDate) : fromDate,
        toDate: toDate ? adjustToUTC(toDate) : toDate,
      } as InsurancePaymentsPayload

      const response = await getInsurancePaymentsList(filterOptions)
      setInsurancePaymentsList(response)
    } catch (error) {
      setInsurancePaymentsList([])
    }
  }

  return (
    <Form form={form} onSubmit={onSubmit}>
      <Box my="2">
        <Flex wrap="wrap" direction="row" mb="2" gap="4">
          <Box className="row flex items-center">
            <Text className="mr-2" size="1" weight="bold">
              Payment Type
            </Text>
            <FormSelect
              key={'paymentType'}
              label=""
              size="2"
              placeholder="All"
              required={false}
              {...form.register('paymentType')}
              options={paymentSourceTypeCodeSets}
              buttonClassName="w-[150px]"
            />
          </Box>

          <Box className="row flex items-center">
            <Text className="mr-2" size="1" weight="bold">
              Check Number
            </Text>
            <TextField.Root
              className="h-30 text-sm p-0"
              placeholder="923874"
              {...form.register('checkNumber')}
            />
          </Box>

          <Box className="row flex items-center">
            <Text className="mr-2" size="1" weight="bold">
              Insurance Name
            </Text>
            <TextField.Root
              className="h-30 text-sm p-0"
              placeholder="John Doe"
              {...form.register('insuranceName')}
            />
          </Box>

          <Box className="row flex items-center">
            <Text className="mr-2" size="1" weight="bold">
              Select Date
            </Text>
            <FormSelect
              key={'dateType'}
              label=""
              size="2"
              placeholder="Select"
              required={false}
              {...form.register('dateType')}
              options={claimPaymentFiltrationDateType}
              buttonClassName="w-[150px]"
            />
          </Box>

          <Box className="row flex items-center">
            <Text size="1" className="font-bold">
              Date From
            </Text>
            <Box mx="2">
              <DatePicker
                color="gray"
                dateFormat="MM/dd/yyyy"
                buttonClassName="w-[150px] justify-between text-left font-regular"
                reverse={true}
                date={fromDate}
                onSelect={setFromDate}
              />
            </Box>
          </Box>

          <Box className="row flex items-center">
            <Text size="1" className="font-bold">
              Date To
            </Text>
            <Box mx="2">
              <DatePicker
                color="gray"
                dateFormat="MM/dd/yyyy"
                buttonClassName="w-[150px] justify-between text-left font-regular"
                reverse={true}
                date={toDate}
                onSelect={setToDate}
              />
            </Box>
          </Box>

          <Box className="row flex items-center">
            <Button
              variant="outline"
              highContrast
              className="h-25 mr-n5 bg-[#EAEEF9]"
              onClick={clearFilters}
            >
              Clear
            </Button>
            <Button className="h-25 ml-2 bg-[#151B4A]" type="submit">
              <MagnifyingGlassIcon />
            </Button>
          </Box>
        </Flex>
      </Box>
    </Form>
  )
}

export { FilterForm }
