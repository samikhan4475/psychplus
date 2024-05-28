import { useEffect, useState } from 'react'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import {
  Box,
  Button,
  Flex,
  Select,
  Text,
  TextFieldInput,
} from '@radix-ui/themes'
import { format } from 'date-fns'
import {
  fetchPreferredPartnerPatient,
  fetchPreferredPartnerUserWorklist,
} from '@psychplus/preferred-partners/api.client'
import { DatePicker } from '@psychplus/ui/date-picker'
import { useStore } from '../store'
import { PreferredPartnerPatientFilterState } from '../types'

const DATE_FORMAT = 'yyyy-MM-dd'
const initialPreferredPartnerPatientState = {
  partnerIds: [],
  name: '',
  mrnList: [],
  dateFrom: '',
  dateTo: '',
  userStatusList: [],
}

const FilterForm = ({ filterOf }: { filterOf: 'active' | 'worklist' }) => {
  const preferredPartnerId = useStore((state) => state.preferredPartnerId)
  const {
    getDropdowns,
    setPreferredPartnerPatient,
    setPreferredPartnerWorklist,
  } = useStore()
  const UserStatus = getDropdowns('PreferredPartnerUserStatus')
  const [filtersState, setFiltersState] =
    useState<PreferredPartnerPatientFilterState>(
      initialPreferredPartnerPatientState,
    )

  useEffect(() => {
    setFiltersState(initialPreferredPartnerPatientState)
  }, [])

  const handleFilterChange = (
    key: keyof PreferredPartnerPatientFilterState,
    value: string | Date | null | string[],
  ) => {
    setFiltersState((prevState) => ({
      ...prevState,
      [key]: value,
    }))
  }

  const clearFilters = () => {
    setFiltersState(initialPreferredPartnerPatientState)
    fetchFilteredData(initialPreferredPartnerPatientState)
  }

  const fetchFilteredData = (filters: PreferredPartnerPatientFilterState) => {
    const cleanFilterState = Object.fromEntries(
      Object.entries(filters)
        .filter(([key, value]) => !!value)
        .map(([key, value]) => {
          if (
            (key === 'dateTo' && value instanceof Date) ||
            (key === 'dateFrom' && value instanceof Date)
          ) {
            return [key, format(value, DATE_FORMAT)]
          }
          return [key, value]
        }),
    )
    filterOf === 'active'
      ? fetchPreferredPartnerPatient(preferredPartnerId, {
          ...cleanFilterState,
        }).then((data) => setPreferredPartnerPatient(data))
      : fetchPreferredPartnerUserWorklist(preferredPartnerId, {
          firstName: cleanFilterState.name,
          ...cleanFilterState,
        }).then((data) => setPreferredPartnerWorklist(data))
  }

  return (
    <Box className="bg-[#fff] p-[5px] shadow-[0_0_4px_4px_rgba(0,0,0,0.08)]">
      <Flex align="center" gap="2">
        <FilterField
          label="PP ID"
          placeholder="Search by PP ID"
          value={filtersState?.partnerIds[0]}
          onChange={(value) => handleFilterChange('partnerIds', [value])}
        />

        <FilterField
          label="User Name"
          placeholder="Search by User Name"
          value={filtersState?.name}
          onChange={(value) => handleFilterChange('name', value)}
        />

        <FilterField
          label="MRN"
          placeholder="Search by MRN"
          value={filtersState?.mrnList[0]}
          onChange={(value) => handleFilterChange('mrnList', [value])}
        />

        <Select.Root
          size="2"
          onValueChange={(value) =>
            handleFilterChange('userStatusList', [value])
          }
        >
          <Select.Trigger placeholder="PP Status" className="w-[150px]" />
          <Select.Content>
            {UserStatus?.map((status) => (
              <Select.Item key={status.value} value={status.value}>
                {status.label}
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Root>

        <DatePicker
          buttonClassName="w-[150px] justify-between text-left font-regular"
          color="gray"
          placeholder="Date From"
          date={filtersState?.dateFrom as Date}
          reverse={true}
          onSelect={(value) => handleFilterChange('dateFrom', value || null)}
        />

        <DatePicker
          buttonClassName="w-[150px] justify-between text-left font-regular"
          color="gray"
          placeholder="Date To"
          date={filtersState?.dateTo as Date}
          reverse={true}
          onSelect={(value) => handleFilterChange('dateTo', value || null)}
        />

        <Button className="h-25 mr-n5 bg-[#151B4A]">
          <MagnifyingGlassIcon
            onClick={() => {
              fetchFilteredData(filtersState)
            }}
          />
        </Button>
        <Button
          variant="outline"
          highContrast
          className="h-25 ml-2 cursor-pointer border-[#9E9898] text-[#000]"
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
  <Box>
    <Flex align="center" className="gap-1.5">
      <Text className="text-xs">{label}</Text>
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
