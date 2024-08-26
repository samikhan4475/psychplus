import { useEffect, useState } from 'react'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { Box, Button, Flex, Text, TextField } from '@radix-ui/themes'
import { format } from 'date-fns'
import { DatePicker } from 'node_modules/@psychplus/ui/src/date-picker'
import { Select } from '@psychplus/ui/select'
import { PreferredPartnersDialogWidgetClient } from '@/widgets/preferred-partners-dialog/preferred-partners-dialog-widget.client'
import { getPreferredPartners } from '../api'
import { Filters, useStore } from '../store'
import { initialPreferredPartnerFilterState } from '../store/preferred-partner-filter-store'

const DATE_FORMAT = 'yyyy-MM-dd'

const FilterForm = () => {
  const { handleFiltersChange, setPreferredPartners, getDropdowns } = useStore()
  let { filters } = useStore()
  const MembershipType = getDropdowns('MembershipType')
  const [filtersState, setFiltersState] = useState<Filters>(
    initialPreferredPartnerFilterState,
  )

  useEffect(() => {
    setFiltersState(filters)
  }, [filters])

  const clearFilters = () => {
    filters = { ...initialPreferredPartnerFilterState }
    handleFiltersChange(filters)
    fetchFilteredData()
  }

  const fetchFilteredData = () => {
    const cleanFilterState: Partial<Filters> = Object.entries(filters)
      .filter(([key, value]) => !!value)
      .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {})

    if (cleanFilterState.dateFrom) {
      cleanFilterState.dateFrom = format(
        cleanFilterState.dateFrom as Date,
        DATE_FORMAT,
      )
    }
    if (cleanFilterState.dateTo) {
      cleanFilterState.dateTo = format(
        cleanFilterState.dateTo as Date,
        DATE_FORMAT,
      )
    }

    getPreferredPartners({ ...cleanFilterState } as Filters)
      .then((preferredPartners) => {
        setPreferredPartners(preferredPartners)
      })
      .catch((err: Error) => {
        alert(err.message)
      })
  }

  return (
    <>
      <Box p="1">
        <Flex
          p="1"
          justify="between"
          className="border-2 border-[#eaeaea] bg-[#E6E6E6]"
        >
          <Text>Preferred Partners</Text>

          <PreferredPartnersDialogWidgetClient />
        </Flex>
      </Box>

      <Box my="2">
        <Flex>
          <FilterField
            label="PP Name"
            placeholder="Search by PP Name"
            value={filtersState?.name}
            onChange={(value) => handleFiltersChange({ name: value })}
          />
          <FilterField
            label="City"
            placeholder="Search by City"
            value={filtersState?.city}
            onChange={(value) => handleFiltersChange({ city: value })}
          />

          <Box mx="2">
            <Flex align="center">
              <Select.Root
                size="2"
                value={filtersState?.subscriptionStatusList[0]}
                onValueChange={(value) =>
                  handleFiltersChange({ subscriptionStatusList: [value] })
                }
              >
                <Select.Trigger placeholder="PP Status" className="w-[150px]" />
                <Select.Content>
                  {MembershipType?.map((membership) => (
                    <Select.Item
                      key={membership.value}
                      value={membership.value}
                    >
                      {membership.label}
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select.Root>
            </Flex>
          </Box>

          <Box mx="2">
            <Flex align="center">
              <DatePicker
                buttonClassName="w-[200px] justify-between text-left font-regular"
                color="gray"
                placeholder="Date From"
                date={filtersState?.dateFrom as Date}
                reverse={true}
                onSelect={(value) => handleFiltersChange({ dateFrom: value })}
              />
            </Flex>
          </Box>

          <Box mx="2">
            <Flex align="center" justify="between">
              <DatePicker
                buttonClassName="w-[200px] justify-between text-left font-regular"
                color="gray"
                placeholder="Date To"
                date={filtersState?.dateTo as Date}
                reverse={true}
                onSelect={(value) => handleFiltersChange({ dateTo: value })}
              />
            </Flex>
          </Box>

          <Button className="h-25 mr-n5 bg-[#151B4A]">
            <MagnifyingGlassIcon onClick={fetchFilteredData} />
          </Button>
          <Button
            variant="outline"
            highContrast
            className="h-25 ml-2 bg-[#EAEEF9]"
            onClick={clearFilters}
          >
            Clear
          </Button>
        </Flex>
      </Box>
    </>
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
        className="h-30"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </Flex>
  </Box>
)

export { FilterForm }
