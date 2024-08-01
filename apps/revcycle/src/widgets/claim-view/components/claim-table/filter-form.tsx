import { useEffect, useState } from 'react'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { Box, Button, Flex, Text, TextFieldInput } from '@radix-ui/themes'
import { DatePicker } from '@psychplus/ui/date-picker'
import { Select } from '@psychplus/ui/select'
import { getClaimList } from '../../api.client'
import { Filters, useStore } from '../../store'
import { initialClaimListFilterState } from '../../store/claim-list-filter-store'

const FilterForm = () => {
  const { handleFiltersChange, setClaimList } = useStore()
  let { filters } = useStore()
  const [filtersState, setFiltersState] = useState<Filters>(
    initialClaimListFilterState,
  )

  useEffect(() => {
    setFiltersState(filters)
  }, [filters])

  const clearFilters = () => {
    filters = { ...initialClaimListFilterState }
    handleFiltersChange(filters)
    fetchFilteredData()
  }

  const fetchFilteredData = async () => {
    try {
      const cleanFilterState: Partial<Filters> = Object.entries(filters)
        .filter(([key, value]) => !!value)
        .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {})

      const response = await getClaimList({ ...cleanFilterState } as Filters)
      setClaimList(response)
    } catch (error) {
      alert(error)
    }
  }

  return (
    <Box my="2">
      <Flex>
        <Text size="1" className="pt-2 font-bold">
          Claim #
        </Text>
        <FilterField
          label=""
          placeholder="12345636"
          value={filtersState?.claimId}
          onChange={(value) => handleFiltersChange({ claimId: value })}
        />
        <Text size="1" className="pt-2 font-bold">
          Patient
        </Text>
        <FilterField
          label=""
          placeholder="Robert Samntha"
          value={filtersState?.patientId.toString()}
          onChange={(value) =>
            handleFiltersChange({ patientId: parseInt(value) })
          }
        />

        <Text size="1" className="pt-2 font-bold">
          Insurance
        </Text>
        <FilterField
          label=""
          placeholder="Medcare"
          value={filtersState?.insuranceId}
          onChange={(value) => handleFiltersChange({ insuranceId: value })}
        />

        <Text size="1" className="pt-2 font-bold">
          Location
        </Text>
        <Box mx="2">
          <Select.Root
            size="2"
            defaultValue="Willow Brook"
            onValueChange={(value) =>
              handleFiltersChange({ locationId: value })
            }
          >
            <Select.Trigger />
            <Select.Content>
              <Select.Group>
                <Select.Label>Willow Brook</Select.Label>
                <Select.Item value="Willow Brook">Willow Brook</Select.Item>
                <Select.Item value="Willow Brook2">Willow Brook</Select.Item>
              </Select.Group>
            </Select.Content>
          </Select.Root>
        </Box>

        <Text size="1" className="pt-2 font-bold">
          Date Type
        </Text>
        <Box mx="2">
          <Select.Root
            size="2"
            defaultValue="DOS"
            onValueChange={(value) => handleFiltersChange({ dateType: value })}
          >
            <Select.Trigger />
            <Select.Content>
              <Select.Group>
                <Select.Label>DOS</Select.Label>
                <Select.Item value="DOS">DOS</Select.Item>
                <Select.Item value="DOS2">DOS</Select.Item>
              </Select.Group>
            </Select.Content>
          </Select.Root>
        </Box>

        <Text size="1" className="pt-2 font-bold">
          From
        </Text>
        <Box mx="2">
          <DatePicker
            color="gray"
            buttonClassName="w-[150px] justify-between text-left font-regular"
            reverse={true}
            date={filtersState?.fromDate}
            onSelect={(value) => handleFiltersChange({ fromDate: value })}
          />
        </Box>

        <Text size="1" className="pt-2 font-bold">
          To
        </Text>
        <Box mx="2">
          <DatePicker
            color="gray"
            buttonClassName="w-[150px] justify-between text-left font-regular"
            reverse={true}
            date={filtersState?.toDate}
            onSelect={(value) => handleFiltersChange({ toDate: value })}
          />
        </Box>

        <Button
          variant="outline"
          highContrast
          className="h-25 mr-n5 bg-[#EAEEF9]"
          onClick={clearFilters}
        >
          Clear
        </Button>
        <Button className="h-25 ml-2 bg-[#151B4A]">
          <MagnifyingGlassIcon onClick={fetchFilteredData} />
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
      <Text size="1" mr="1" className="font-bold">
        {label}
      </Text>
      <TextFieldInput
        className="h-30"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </Flex>
  </Box>
)

export { FilterForm }
