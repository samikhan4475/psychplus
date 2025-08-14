'use client'

import { useState } from 'react'
import { Box, Button, Flex, TextField } from '@radix-ui/themes'
import useOnclickOutside from 'react-cool-onclickoutside'
import { useDebouncedCallback } from 'use-debounce'
import { FormFieldLabel } from '@/components'
import { SearchButton } from '@/ui/schedule/shared'
import { useStore } from '../../store/store'
import { CvxCodes } from '../../types'
import { CvxTable } from './cvx-table'

interface ImmunizationSearchDropdownProps {
  setFormValue: (value: CvxCodes) => void
  clearFormValue: () => void
}

const ImmunizationSearchDropdown = ({
  setFormValue,
  clearFormValue,
}: ImmunizationSearchDropdownProps) => {
  const { loadingCvxCodes, fetchCvxCodes } = useStore((state) => ({
    fetchCvxCodes: state.fetchCvxCodes,
    loadingCvxCodes: state.loadingCvxCodes,
  }))

  const [showOptions, setShowOptions] = useState(false)
  const [searchValue, setSearchValue] = useState('')

  const ref = useOnclickOutside(() => setShowOptions(false))

  const handleSearch = useDebouncedCallback((value: string) => {
    if (value.length >= 3) {
      fetchCvxCodes(value)
      setShowOptions(true)
    }
  }, 500)

  const handleClear = () => {
    setSearchValue('')
    clearFormValue()
    setShowOptions(false)
  }

  const handleRowSelection = (selectedRow: CvxCodes) => {
    setFormValue(selectedRow)
    setShowOptions(false)
  }

  return (
    <Box
      ref={ref}
      className="rounded-md bg-pp-bg-table-cell relative w-full p-3"
    >
      <FormFieldLabel>Immunization Number</FormFieldLabel>

      <Flex align="center" gap="1">
        <TextField.Root
          size="2"
          placeholder="Search by Immunization Number"
          value={searchValue}
          onChange={(e) => {
            setSearchValue(e.target.value)
            handleSearch(e.target.value)
            setShowOptions(true)
          }}
          className="w-full"
        />
        <SearchButton
          onClick={() => {
            if (searchValue.length >= 3) {
              fetchCvxCodes(searchValue)
              setShowOptions(true)
            }
          }}
          disabled={loadingCvxCodes || searchValue.length < 3}
          size="2"
        />
        <Button
          variant="outline"
          highContrast
          type="button"
          className="h-8 bg-[#EAEEF9]"
          onClick={handleClear}
        >
          Clear
        </Button>
      </Flex>

      {showOptions && (
        <Box className="border-gray-300 bg-white shadow-lg absolute left-0 z-50 mt-1 w-full">
          <CvxTable setFormValue={handleRowSelection} />
        </Box>
      )}
    </Box>
  )
}

export { ImmunizationSearchDropdown }
