import { useEffect, useState } from 'react'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { Box, Button, Flex, Text, TextFieldInput } from '@radix-ui/themes'
import { z } from 'zod'
import { Form, FormSelect, useForm, validate } from '@psychplus/form'
import { DatePicker } from '@psychplus/ui/date-picker'
import { getClaimList } from '../../api.client'
import { Filters, useStore } from '../../store'
import { initialClaimListFilterState } from '../../store/claim-list-filter-store'
import { adjustToUTC } from '../../utils'

const schema = z.object({
  locationId: validate.anyString.optional(),
  dateType: validate.anyString.optional(),
  claimId: validate.anyString.optional(),
  insuranceId: validate.anyString.optional(),
  patientId: validate.anyString.optional(),
})

const FilterForm = () => {
  const locations = useStore((state) => state.locations)
  const dateTypes = useStore((state) => state.dateTypes)
  const insurancePayersList = useStore((state) => state.insurancePayersList)
  const form = useForm({
    schema,
    criteriaMode: 'all',
    defaultValues: {},
  })

  const { handleFiltersChange, setClaimList } = useStore()
  const { filters } = useStore()
  const [filtersState, setFiltersState] = useState<Filters>(
    initialClaimListFilterState,
  )

  useEffect(() => {
    setFiltersState(filters)
  }, [filters])

  const clearFilters = async () => {
    form.reset()
    form.setValue('locationId', '')
    form.setValue('dateType', '')
    form.setValue('insuranceId', '')
    handleFiltersChange({ ...initialClaimListFilterState })
    try {
      const response = await getClaimList({
        isIncludePatientInsurancePlan: false,
      })
      setClaimList(response)
    } catch (error) {
      setClaimList([])
    }
  }

  const onSubmit = async () => {
    try {
      const formData = form.getValues()
      const cleanFilterState: Partial<Filters> = Object.entries(formData)
        .filter(([key, value]) => !!value)
        .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {})

      const filterOptions = {
        ...cleanFilterState,
        dateType: cleanFilterState.dateType
          ? cleanFilterState.dateType
          : 'DateOfService',
        isIncludePatientInsurancePlan: formData.insuranceId !== '',
        fromDate: filtersState.fromDate
          ? adjustToUTC(filtersState.fromDate)
          : filtersState.fromDate,
        toDate: filtersState.toDate
          ? adjustToUTC(filtersState.toDate)
          : filtersState.toDate,
      } as Filters

      const response = await getClaimList(filterOptions)
      setClaimList(response)
    } catch (error) {
      setClaimList([])
    }
  }

  return (
    <Form form={form} onSubmit={onSubmit}>
      <Box my="2">
        <Flex wrap="wrap" direction="row" mb="2" gap="4">
          <Box className="row flex items-center">
            <Text className="mr-2" size="1" weight="bold">
              Claim #
            </Text>
            <TextFieldInput
              className="h-30 text-sm p-0"
              placeholder="3fasf5fde4-5dr17-4562-b3fc-2c963fa6"
              {...form.register('claimId')}
            />
          </Box>

          <Box className="row flex items-center">
            <Text className="mr-2" size="1" weight="bold">
              Patient Id
            </Text>
            <TextFieldInput
              className="h-30 text-sm p-0"
              placeholder="Patient Id"
              {...form.register('patientId')}
            />
          </Box>

          <Box className="row flex items-center">
            <Text className="mr-2" size="1" weight="bold">
              Insurance
            </Text>
            <FormSelect
              key={'insuranceId'}
              label=""
              size="2"
              placeholder="Select"
              required={false}
              {...form.register('insuranceId')}
              options={insurancePayersList}
              buttonClassName="w-[150px]"
            />
          </Box>

          <Box className="row flex items-center">
            <Text className="mr-2" size="1" weight="bold">
              Location
            </Text>
            <FormSelect
              key={'locationId'}
              label=""
              size="2"
              placeholder="Select"
              required={false}
              {...form.register('locationId')}
              options={locations}
              buttonClassName="w-[150px]"
            />
          </Box>

          <Box className="row flex items-center">
            <Text className="mr-2" size="1" weight="bold">
              Date Type
            </Text>
            <FormSelect
              key={'dateType'}
              label=""
              size="2"
              placeholder="Select"
              required={false}
              {...form.register('dateType')}
              options={dateTypes}
              buttonClassName="w-[150px]"
            />
          </Box>

          <Box className="row flex items-center">
            <Text size="1" className="font-bold">
              From
            </Text>
            <Box mx="2">
              <DatePicker
                color="gray"
                dateFormat="MM/dd/yyyy"
                buttonClassName="w-[150px] justify-between text-left font-regular"
                reverse={true}
                date={filtersState?.fromDate}
                onSelect={(value) => handleFiltersChange({ fromDate: value })}
              />
            </Box>
          </Box>

          <Box className="row flex items-center">
            <Text size="1" className="font-bold">
              To
            </Text>
            <Box mx="2">
              <DatePicker
                color="gray"
                dateFormat="MM/dd/yyyy"
                buttonClassName="w-[150px] justify-between text-left font-regular"
                reverse={true}
                date={filtersState?.toDate}
                onSelect={(value) => handleFiltersChange({ toDate: value })}
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
