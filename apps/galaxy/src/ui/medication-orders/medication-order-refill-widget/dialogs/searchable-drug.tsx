'use client'

import { useState } from 'react'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { Box, Flex, ScrollArea, Text, TextField } from '@radix-ui/themes'
import { PlusCircleIcon } from 'lucide-react'
import useOnclickOutside from 'react-cool-onclickoutside'
import toast from 'react-hot-toast'
import { useDebouncedCallback } from 'use-debounce'
import { LoadingPlaceholder } from '@/components'
import { DrugInfo } from '@/types'
import { fetchDrugs } from '@/ui/medications/patient-medications-widget/actions'
import { cn } from '@/utils'

interface SearchableDrugProps {
  onSelectItem: (selectedItem: DrugInfo) => void
  selectedDrugList: DrugInfo[]
}

const SearchableDrug = ({
  onSelectItem,
  selectedDrugList,
}: SearchableDrugProps) => {
  const [showOptions, setShowOptions] = useState(false)
  const [drugDataList, setDrugDataList] = useState<DrugInfo[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const ref = useOnclickOutside(() => setShowOptions(false))

  const handleSearchService = useDebouncedCallback(async (value: string) => {
    if (value.length < 3) return
    setIsLoading(true)
    const response = await fetchDrugs(value)
    if (response.state === 'error') {
      toast.error('Failed to fetch drugs ')
      return
    }
    setDrugDataList(response.data)
    setIsLoading(false)
  }, 500)

  const handleSelectItem = (item: DrugInfo) => {
    onSelectItem(item)
  }
  return (
    <Flex align="center" gap="2" className="w-full">
      <Box ref={ref} className="relative w-full">
        <Flex
          className={cn(
            'w-full flex-wrap overflow-y-auto rounded-2 border border-gray-7',
          )}
          align="center"
          gap="1"
          pl="1"
        >
          <TextField.Root
            style={
              {
                '--text-field-border-width': '0px',
              } as React.CSSProperties
            }
            size="1"
            className="!outline-white w-full [box-shadow:none]"
            placeholder="Search Drugs"
            onChange={(e) => handleSearchService(e.target.value)}
            onFocus={() => setShowOptions(true)}
          >
            <TextField.Slot>
              <MagnifyingGlassIcon height="16" width="16" />
            </TextField.Slot>
          </TextField.Root>
        </Flex>

        {showOptions && (
          <ScrollArea
            className={cn(
              `bg-white !absolute z-50 mx-auto h-auto max-h-40 w-full rounded-[25px] p-2 shadow-3  ${
                isLoading ?? 'min-h-28'
              }`,
            )}
          >
            {isLoading ? (
              <LoadingPlaceholder className="mt-5" />
            ) : (
              <Box>
                {drugDataList?.map((option: DrugInfo, index: number) => {
                  const isDisabled = selectedDrugList.find(
                    (item) =>
                      item.prescribableDrugDesc === option.prescribableDrugDesc,
                  )
                  const deaDesc =
                    option.representativeErxPackagedDrug
                      ?.federalDeaClassCodeDesc ?? ''

                  const showDeaDesc =
                    deaDesc &&
                    !deaDesc.toLowerCase().includes('no dea class code')

                  return (
                    <Flex
                      key={option.prescribableDrugDesc + index}
                      justify="between"
                      align="center"
                      p="1"
                      onMouseDown={(e) => {
                        e.stopPropagation()
                        if (!isDisabled) handleSelectItem(option)
                      }}
                      className={cn(
                        `hover:bg-pp-bg-accent rounded-2 ${
                          isDisabled
                            ? 'cursor-not-allowed opacity-30'
                            : 'cursor-pointer opacity-100'
                        }`,
                      )}
                    >
                      <Text className="w-[85%] text-[11px]">
                        {option.prescribableDrugDesc}
                        {showDeaDesc && (
                          <span className="ml-1 text-pp-red">
                            {deaDesc.toUpperCase()}
                          </span>
                        )}
                      </Text>
                      <PlusCircleIcon
                        stroke="#194595"
                        strokeWidth="2"
                        height="15"
                        width="15"
                      />
                    </Flex>
                  )
                })}
              </Box>
            )}
          </ScrollArea>
        )}
      </Box>
    </Flex>
  )
}

export { SearchableDrug }
