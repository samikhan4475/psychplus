import { useEffect, useState } from 'react'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { Box, Button, Flex, Text, TextFieldInput } from '@radix-ui/themes'
import { useGooglePlacesContext } from '@/providers'
import { PlacesAutocomplete } from '../../clearing-house-receiver-dialog/components/places-autocomplete'
import { getClearingHouseReceiverList } from '../api.client'
import { Filters, useStore } from '../store'
import { initialClearingHouseReceiverFilterState } from '../store/clearing-house-receiver-filter-store'

const FilterForm = () => {
  const { loaded } = useGooglePlacesContext()
  const { handleFiltersChange, setClearingHouseReceivers } = useStore()
  let { filters } = useStore()
  const [filtersState, setFiltersState] = useState<Filters>(
    initialClearingHouseReceiverFilterState,
  )

  useEffect(() => {
    setFiltersState(filters)
  }, [filters])

  const clearFilters = () => {
    filters = { ...initialClearingHouseReceiverFilterState }
    handleFiltersChange(filters)
    fetchFilteredData()
  }

  const fetchFilteredData = () => {
    const cleanFilterState: Partial<Filters> = Object.entries(filters)
      .filter(([key, value]) => !!value)
      .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {})

    getClearingHouseReceiverList({ ...cleanFilterState } as Filters)
      .then((receivers) => {
        setClearingHouseReceivers(receivers)
      })
      .catch((err: Error) => {
        alert(err.message)
      })
  }

  const setAddressValues = (
    address:
      | {
          street?: string
          street1?: string
          city?: string
          state?: string
          postalCode?: string
        }
      | undefined,
  ) => {
    if (address) {
      handleFiltersChange({
        address1: address.street,
        address2: address.street1,
        city: address.city,
        state: address.state,
        zip: address.postalCode,
      })
    }
  }

  return (
    <Box my="2">
      <Flex>
        <div className="col-span-1 grid grid-cols-6">
          <Box className="col-span-1 flex-1">
            <FilterField
              label="Name"
              placeholder="Search by Name"
              value={filtersState?.clearingHouseName}
              onChange={(value) =>
                handleFiltersChange({ clearingHouseName: value })
              }
            />
          </Box>

          <Box className="col-span-1 flex-1">
            {loaded && (
              <PlacesAutocomplete
                name={'address'}
                callbackAddress={setAddressValues}
                isFilter
              />
            )}
          </Box>

          <Box className="col-span-1 flex-1">
            <FilterField
              label="Address 2"
              placeholder="Search by address"
              value={filtersState?.address2}
              onChange={(value) => handleFiltersChange({ address2: value })}
            />
          </Box>

          <Box className="col-span-1 flex-1">
            <FilterField
              label="Zip"
              placeholder=""
              value={filtersState?.zip}
              onChange={(value) => handleFiltersChange({ zip: value })}
            />
          </Box>
          <Box className="col-span-1 flex-1">
            <FilterField
              label="Phone"
              placeholder=""
              value={filtersState?.phone}
              onChange={(value) => handleFiltersChange({ phone: value })}
            />
          </Box>
        </div>
      </Flex>
      <Flex>
        <div className="col-span-1 grid grid-cols-7 pt-1">
          <Box className="col-span-1 flex-1">
            <FilterField
              label="Fax"
              placeholder=""
              value={filtersState?.fax}
              onChange={(value) => handleFiltersChange({ fax: value })}
            />
          </Box>
          <Box className="col-span-1 flex-1">
            <FilterField
              label="Email"
              placeholder=""
              value={filtersState?.email}
              onChange={(value) => handleFiltersChange({ email: value })}
            />
          </Box>
          <Box className="col-span-1 flex-1">
            <FilterField
              label="Rec. ID"
              placeholder=""
              value={filtersState?.receiverId}
              onChange={(value) => handleFiltersChange({ receiverId: value })}
            />
          </Box>
          <Box className="col-span-1 flex-1">
            <FilterField
              label="Rec. Name"
              placeholder=""
              value={filtersState?.receiverName}
              onChange={(value) => handleFiltersChange({ receiverName: value })}
            />
          </Box>

          <Box className="col-span-1 flex-1">
            <Button
              variant="outline"
              highContrast
              className="h-25 ml-2 mr-1 w-[60px] bg-[#EAEEF9]"
              onClick={clearFilters}
            >
              Clear
            </Button>
            <Button className="h-25 mr-n5 w-[50px] bg-[#151B4A]">
              <MagnifyingGlassIcon onClick={fetchFilteredData} />
            </Button>
          </Box>
        </div>
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
