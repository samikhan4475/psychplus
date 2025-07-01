import React, { useEffect, useState } from 'react'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { Box, Flex, ScrollArea, Text, TextField } from '@radix-ui/themes'
import { PlusCircleIcon } from 'lucide-react'
import useOnclickOutside from 'react-cool-onclickoutside'
import toast from 'react-hot-toast'
import { useDebouncedCallback } from 'use-debounce'
import { LoadingPlaceholder } from '@/components'
import { SelectOptionType } from '@/types'
import { sanitizeFormData } from '@/utils'
import { getPracticeIdsAction } from './actions'
import { useStore } from './institutional-practices/store'

interface SearchAddPracticeSelectProps {
  onOptionClicked: (option: SelectOptionType) => void
}

interface RowOptionProps {
  option: SelectOptionType
  onOptionClick: (option: SelectOptionType) => void
}
const RowOption = ({ option, onOptionClick }: RowOptionProps) => (
  <Flex
    justify="between"
    align="center"
    p="1"
    onClick={() => onOptionClick(option)}
    className="hover:bg-pp-bg-accent cursor-default rounded-2"
  >
    <Text className="w-[85%] text-[11px]">{option.label}</Text>
    <PlusCircleIcon stroke="#194595" strokeWidth="2" height="15" width="15" />
  </Flex>
)

const AsyncSearchLocationPracticeSelect = ({
  onOptionClicked,
}: SearchAddPracticeSelectProps) => {
  const { data, dataLoading } = useStore((state) => ({
    data: state.data,
    dataLoading: state.loading,
  }))
  const [showOptions, setShowOptions] = useState(false)
  const [loading, setLoading] = useState(true)
  const [options, setOptions] = useState<SelectOptionType[]>()
  const [selectedOptions, setSelectedOptions] = useState<SelectOptionType[]>([])

  const debouncedFetch = useDebouncedCallback(async (value: string) => {
    initData(value)
  }, 500)

  const initData = async (value: string) => {
    setLoading(true)
    if (dataLoading) return
    const payload = {
      partialShortName: value,
    }
    const sanitized = sanitizeFormData(payload)
    const result = await getPracticeIdsAction({
      payload: sanitized,
    })
    if (result?.state === 'success') {
      const filtered = result.data.filter((item) => {
        return !data?.locations?.find(
          (option) => option.practice.id === item.value,
        )
      })
      setOptions(filtered)
    } else if (result?.state === 'error') {
      toast.error(result.error)
    }
    setLoading(false)
  }

  useEffect(() => {
    initData('')
  }, [data?.locations])

  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setLoading(true)
    setShowOptions(true)
    debouncedFetch(value)
  }

  const onOptionClick = (option: SelectOptionType) => {
    setSelectedOptions((prev) => [...prev, option])
    onOptionClicked(option)
  }

  const ref = useOnclickOutside(() => {
    setSelectedOptions([])
    setShowOptions(false)
  })

  return (
    <Box ref={ref} className="z-20">
      <Flex
        className="relative w-full flex-wrap overflow-y-auto"
        align="center"
      >
        <MagnifyingGlassIcon
          className="text-pp-gray-1 absolute left-1 top-1/2 -translate-y-1/2 bg-[white]"
          height="16"
          width="16"
        />
        <TextField.Root
          className="border-pp-gray-2 h-6 w-[300px] border border-solid bg-[white] pl-5 !outline-none [box-shadow:none] disabled:bg-gray-3 disabled:text-gray-11"
          placeholder="Search"
          onChange={onChange}
          onClick={() => setShowOptions(true)}
        />
      </Flex>

      {showOptions && (
        <Box
          className={`bg-white !fixed mx-auto flex h-auto max-h-48 w-[300px] flex-col  rounded-3 shadow-3  ${
            loading ?? 'min-h-28'
          }`}
        >
          {loading && <LoadingPlaceholder className="mt-5" />}

          {!loading && options?.length === 0 && (
            <Text className="text-center text-1 font-medium">
              No Data Found
            </Text>
          )}
          <ScrollArea className="h-auto max-h-32 w-full px-2">
            {options?.length !== 0 &&
              !loading &&
              options?.map((option, index) => (
                <Box
                  className={`${
                    selectedOptions.includes(option) &&
                    'pointer-events-none opacity-40'
                  }`}
                  key={`${option.label}-${index}`}
                >
                  <RowOption onOptionClick={onOptionClick} option={option} />
                </Box>
              ))}
          </ScrollArea>
        </Box>
      )}
    </Box>
  )
}

export { AsyncSearchLocationPracticeSelect }
