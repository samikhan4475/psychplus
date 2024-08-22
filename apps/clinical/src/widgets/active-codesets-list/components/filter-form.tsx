import React, { useState } from 'react'
import { CaretDownIcon, MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { Button, Flex, Text, TextField } from '@radix-ui/themes'
import { type ActiveCode } from '@psychplus/codeset'
import { DropdownMenu } from '@psychplus/ui/dropdown-menu'
import { useStore } from '../store'

const FilterForm = () => {
  const {
    codeSet,
    codeSets,
    setCodeSet,
    setCodeErrors,
    setNewCode,
    setEditableCode,
  } = useStore((state) => ({
    codeSet: state.codeSet,
    codeSets: state.codeSets,
    setCodeSet: state.setCodeSet,
    setCodeErrors: state.setCodeErrors,
    setNewCode: state.setNewCode,
    setEditableCode: state.setEditableCode,
  }))
  const [filter, setFilter] = useState<string>('')
  const [allCodes, setAllCodes] = useState<ActiveCode[]>(codeSet?.codes || [])

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value.toLowerCase()
    setFilter(inputValue)
    filterCodesetCodes(inputValue)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const inputValue = (e.target as HTMLInputElement).value.toLowerCase()
      filterCodesetCodes(inputValue)
    }
  }

  const filterCodesetCodes = (inputValue: string) => {
    const filteredCodesetCodes = allCodes?.filter((code) =>
      code?.displayName?.toLowerCase()?.includes(inputValue),
    )
    setCodeSet({ ...codeSet, codes: filteredCodesetCodes })
  }

  return (
    <>
      <TextField.Root className="w-80">
        <TextField.Input
          placeholder="Filter by description"
          value={filter}
          name="Filter"
          onChange={handleFilterChange}
          onKeyDown={handleKeyDown}
        />
        <TextField.Slot>
          <MagnifyingGlassIcon />
        </TextField.Slot>
      </TextField.Root>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger className="ms-4">
          <Button variant="outline" highContrast>
            {codeSet ? codeSet.displayName : 'Select Codeset'}
            <CaretDownIcon />
          </Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content className="mx-6 w-full">
          {codeSets.map((item) => (
            <React.Fragment key={item.displayName}>
              <DropdownMenu.Item
                className="hover:bg-[#151B4A]"
                onClick={() => {
                  setAllCodes(item.codes || [])
                  setCodeSet(item)
                  setCodeErrors({})
                  setNewCode(null)
                  setEditableCode(null)
                }}
              >
                <Flex className="hover:text-[white]" align="center" gap="5">
                  <Text
                    size="3"
                    className="max-w-xs overflow-hidden truncate whitespace-nowrap"
                  >
                    {item?.codeSystemName}
                  </Text>
                </Flex>
              </DropdownMenu.Item>
            </React.Fragment>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </>
  )
}
export { FilterForm }
