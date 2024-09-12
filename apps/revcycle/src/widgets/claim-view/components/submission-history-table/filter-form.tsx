import { useState } from 'react'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { Box, Button, Flex, Text, TextField } from '@radix-ui/themes'
import { z } from 'zod'
import { Form, FormSelect, useForm, validate } from '@psychplus/form'
import { DatePicker } from '@psychplus/ui/date-picker'
import { getClaimSubmissionHistoryList } from '../../api.client'
import { ClaimSubmissionHistoryFilters, useStore } from '../../store'
import { adjustToUTC } from '../../utils'

const schema = z.object({
  batchName: validate.anyString.optional(),
  batchId: validate.anyString.optional(),
  insurancePolicyPriority: validate.anyString.optional(),
  submittedDate: z.date().optional(),
})

const FilterForm = () => {
  const [date, setDate] = useState<Date | undefined>()
  const form = useForm({
    schema,
    criteriaMode: 'all',
    defaultValues: {},
  })

  const { setClaimSubmissionHistoryList } = useStore()

  const clearFilters = async () => {
    form.reset()
    setDate(undefined)
    form.setValue('insurancePolicyPriority', '')
    try {
      const response = await getClaimSubmissionHistoryList({})
      setClaimSubmissionHistoryList(response)
    } catch (error) {
      setClaimSubmissionHistoryList([])
    }
  }

  const onSubmit = async () => {
    try {
      const formData = form.getValues()
      const cleanFilterState: Partial<ClaimSubmissionHistoryFilters> =
        Object.entries(formData)
          .filter(([key, value]) => !!value)
          .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {})

      const response = await getClaimSubmissionHistoryList(cleanFilterState)
      setClaimSubmissionHistoryList(response)
    } catch (error) {
      setClaimSubmissionHistoryList([])
    }
  }

  const insuranceTypeOptions = [
    { value: 'Primary', label: 'Primary' },
    { value: 'Secondary', label: 'Secondary' },
    { value: 'Tertiary', label: 'Tertiary' },
  ]

  const onDateChange = (date: Date | undefined) => {
    setDate(date)
    const submitDate = date ? adjustToUTC(date) : undefined
    form.setValue('submittedDate', submitDate)
  }

  return (
    <Form form={form} onSubmit={onSubmit}>
      <Box my="2">
        <Flex wrap="wrap" direction="row" mb="2" gap="4">
          <Box className="row flex items-center">
            <Text className="mr-2" size="1" weight="bold">
              Batch #
            </Text>
            <TextField.Root
              className="h-30 text-sm p-0"
              placeholder="123123"
              {...form.register('batchId')}
            />
          </Box>

          <Box className="row flex items-center">
            <Text className="mr-2" size="1" weight="bold">
              Batch Name
            </Text>
            <TextField.Root
              className="h-30 text-sm p-0"
              placeholder="example"
              {...form.register('batchName')}
            />
          </Box>

          <Box className="row flex items-center">
            <Text className="mr-2" size="1" weight="bold">
              Submit Date
            </Text>
            <DatePicker
              color="gray"
              dateFormat="MM/dd/yyyy"
              buttonClassName="w-[150px] justify-between text-left font-regular"
              reverse={true}
              date={date}
              onSelect={(value) => onDateChange(value)}
            />
          </Box>

          <Box className="row flex items-center">
            <Text className="mr-2" size="1" weight="bold">
              Insurance Type
            </Text>
            <FormSelect
              key={'insurancePolicyPriority'}
              label=""
              size="2"
              placeholder="Select"
              required={false}
              {...form.register('insurancePolicyPriority')}
              options={insuranceTypeOptions}
              buttonClassName="w-[150px]"
            />
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
