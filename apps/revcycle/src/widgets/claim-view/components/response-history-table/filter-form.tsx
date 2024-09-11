import { Form, useForm, validate } from '@psychplus/form'
import { DatePicker } from '@psychplus/ui/date-picker'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { Box, Button, Flex, Text } from '@radix-ui/themes'
import { useEffect, useState } from 'react'
import { z } from 'zod'
import { getResponseHistoryList } from '../../api.client'
import { ResponseHistoryFilters, useStore } from '../../store'
import { initialResponseHistoryListFilterState } from '../../store/response-history-list-filter-store'
import { adjustToUTC } from '../../utils'
import ReceiverSearch from './receiver-search'

const schema = z.object({
  receiverId: validate.anyString.optional(),
  createdOn: validate.anyString.optional(),
})

const FilterForm = () => {
  const form = useForm({
    schema,
    criteriaMode: 'all',
    defaultValues: {
      receiverId : '',
      createdOn: '',
    },
  })

  const { handleResponseHistoryFiltersChange, setResponseHistoryList } = useStore()
  const { responseHistoryFilters } = useStore()
  const [filtersState, setFiltersState] = useState<ResponseHistoryFilters>(
    initialResponseHistoryListFilterState,
  )
  const [patientReset, setPatientReset] = useState(false)

  useEffect(() => {
    setFiltersState(responseHistoryFilters)
  }, [responseHistoryFilters])

  const clearFilters = async () => {
    form.reset()
    setPatientReset(true)
    setFiltersState(initialResponseHistoryListFilterState);
    handleResponseHistoryFiltersChange({ ...initialResponseHistoryListFilterState });
  
    try {
      const response = await getResponseHistoryList({...initialResponseHistoryListFilterState})
      setResponseHistoryList(response)
    } catch (error) {
      setResponseHistoryList([])
    }
  }

  const onSubmit = async () => {
    setPatientReset(false)
    try {
      const formData = form.getValues()
      const cleanFilterState: Partial<ResponseHistoryFilters> = Object.entries(formData)
      .filter(([_, value]) => value !== undefined && value !== '')
      .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});

    const filterOptions: ResponseHistoryFilters = {
      ...cleanFilterState,
      createdOn: filtersState.createdOn
        ? adjustToUTC(filtersState.createdOn)
        : undefined,
    };

      const response = await getResponseHistoryList(filterOptions)
      setResponseHistoryList(response)
    } catch (error) {
      setResponseHistoryList([])
    }
  }

  return (
    <Form form={form} onSubmit={onSubmit}>
      <Box my="2">
        <Flex wrap="wrap" direction="row" mb="2" gap="4">
          <Box className="row flex items-center">
            <Text className="w-[130px]" size="1" weight="bold">
              Receiver Name
            </Text>
            <ReceiverSearch
              onReceiverSelect={(patientId) =>
                form.setValue('receiverId', patientId)
              }
              reset={patientReset}
            />
          </Box>

          <Box className="row flex items-center">
            <Text size="1" className="font-bold">
              Created On
            </Text>
            <Box mx="2">
              <DatePicker
                color="gray"
                dateFormat="mm/dd/yyyy"
                buttonClassName="w-[150px] justify-between text-left font-regular italic"
                reverse={true}
                date={filtersState?.createdOn}
                onSelect={(value) => handleResponseHistoryFiltersChange({ createdOn: value })}
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
