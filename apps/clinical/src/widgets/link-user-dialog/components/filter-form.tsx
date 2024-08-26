import { useEffect, useState } from 'react'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { Box, Button, Flex, Text, TextField } from '@radix-ui/themes'
import { format } from 'date-fns'
import { getPatients } from '@psychplus/patient/api.client'
import { DatePicker } from '@psychplus/ui/date-picker'
import { Filters, useStore } from '../store'
import { initialPatientFilterState } from '../store/patient-filter-store'

const DATE_FORMAT = 'yyyy-MM-dd'

const FilterForm = () => {
  const { setPatients } = useStore()
  const [filtersState, setFiltersState] = useState<Filters>(
    initialPatientFilterState,
  )

  useEffect(() => {
    setFiltersState(initialPatientFilterState)
  }, [])

  const handleFilterChange = (
    key: keyof Filters,
    value: string | Date | null,
  ) => {
    setFiltersState((prevState) => ({
      ...prevState,
      [key]: value,
    }))
  }

  const clearFilters = () => {
    setFiltersState(initialPatientFilterState)
    fetchFilteredData(initialPatientFilterState)
  }

  interface CleanFilterState {
    firstNameContains: string
    lastNameContains: string
    dateOfBirth: string
  }

  const fetchFilteredData = (filters: Filters) => {
    const cleanFilterState: CleanFilterState = {
      firstNameContains: '',
      lastNameContains: '',
      dateOfBirth: '',
    }

    Object.entries(filters)
      .filter(([key, value]) => !!value)
      .forEach(([key, value]) => {
        if (key === 'dateOfBirth' && value instanceof Date) {
          cleanFilterState[key as keyof CleanFilterState] = format(
            value,
            DATE_FORMAT,
          )
        } else {
          cleanFilterState[key as keyof CleanFilterState] = value
        }
      })

    getPatients(cleanFilterState)
      .then((patients) => {
        setPatients(patients)
      })
      .catch((err: Error) => {
        alert(err.message)
      })
  }

  return (
    <Box my="2">
      <Flex>
        <FilterField
          label="First Name"
          placeholder="First Name"
          value={filtersState?.firstNameContains}
          onChange={(value) => handleFilterChange('firstNameContains', value)}
        />
        <FilterField
          label="Last Name"
          placeholder="Last Name"
          value={filtersState?.lastNameContains}
          onChange={(value) => handleFilterChange('lastNameContains', value)}
        />
        <FilterField
          label="MRN"
          placeholder="Search by MRN"
          value={filtersState?.mrn}
          onChange={(value) => handleFilterChange('mrn', value)}
        />
        <FilterField
          label="Mobile #"
          placeholder="Search by Mobile"
          value={filtersState?.telephone}
          onChange={(value) => handleFilterChange('telephone', value)}
        />

        <Box mx="2">
          <Flex align="center" justify="between">
            <DatePicker
              buttonClassName="w-[150px] justify-between text-left font-regular"
              color="gray"
              placeholder="DOB"
              date={filtersState?.dateOfBirth as Date}
              reverse={true}
              onSelect={(value) =>
                handleFilterChange('dateOfBirth', value || null)
              }
            />
          </Flex>
        </Box>

        <Button
          className="h-25 mr-n5 bg-[#151B4A]"
          onClick={() => {
            fetchFilteredData(filtersState)
          }}
        >
          <MagnifyingGlassIcon />
        </Button>
        <Button
          variant="outline"
          highContrast
          className="h-25 ml-2 bg-[white] !text-[#151B4A]"
          onClick={clearFilters}
        >
          Clear
        </Button>
      </Flex>
    </Box>
  )
}

const FilterField = ({
  label,
  placeholder,
  value,
  onChange,
}: {
  label: string
  placeholder: string
  value?: string
  onChange: (value: string) => void
}) => (
  <Box mx="2">
    <Flex align="center">
      <Text size="1" mr="1">
        {label}
      </Text>
      <TextField.Root
        className="h-7 placeholder:font-medium"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </Flex>
  </Box>
)

export { FilterForm }
