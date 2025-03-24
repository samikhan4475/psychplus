import React, { useMemo, useState } from 'react'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import {
  Box,
  Flex,
  Popover,
  ScrollArea,
  Text,
  TextField,
} from '@radix-ui/themes'
import toast from 'react-hot-toast'
import { useDebouncedCallback } from 'use-debounce'
import { DiagnosisIcd10Code } from '@/types'
import { getIcd10Diagnosis } from '@/ui/diagnosis/diagnosis/actions/get-service-diagnosis'
import { cn } from '@/utils'

interface DropdownMenuSearchProps {
  placeholder?: string
  onSelectItem: (selectedItem: DiagnosisIcd10Code) => void
}

const DiagnosisList = ({
  diagnosisDataList,
  onSelectItem,
}: {
  diagnosisDataList: DiagnosisIcd10Code[]
  onSelectItem: (item: DiagnosisIcd10Code) => void
}) => {
  return diagnosisDataList.map((option: DiagnosisIcd10Code) => (
    <Flex
      key={option.id}
      align="center"
      p="1"
      onClick={() => onSelectItem(option)}
      className={cn(
        `hover:bg-pp-bg-accent cursor-pointer rounded-2 opacity-100`,
      )}
    >
      <Text className="w-[85%]">{option.code}</Text>
    </Flex>
  ))
}
const SearchDiagnosisInput = ({
  placeholder,
  onSelectItem,
}: DropdownMenuSearchProps) => {
  const [diagnosisDataList, setDiagnosisDataList] = useState<
    DiagnosisIcd10Code[]
  >([])
  const [loadingDiagnosis, setLoadingDiagnosis] = useState(false)
  const [open, setOpen] = useState(false)

  const handleSearchService = useDebouncedCallback(async (value: string) => {
    if (value.length < 2) return
    setOpen(true)
    setLoadingDiagnosis(true)
    const response = await getIcd10Diagnosis({
      CodeOrDescription: value,
    })
    if (response.state === 'success') {
      setDiagnosisDataList(response.data || [])
      setLoadingDiagnosis(false)
      return
    }
    setDiagnosisDataList([])
    setLoadingDiagnosis(false)
    toast('Error fetching diagnosis data')
  }, 500)

  // const ref = useOnclickOutside(() => setOpen(false))

  const handleSelectItem = (item: DiagnosisIcd10Code) => {
    setOpen(false)
    onSelectItem(item)
  }

  const memoizedDiagnosisList = useMemo(() => {
    if (loadingDiagnosis) {
      return <Text>Loading...</Text>
    }
    if (diagnosisDataList.length === 0) {
      return <Text>No data found</Text>
    }
    return (
      <DiagnosisList
        diagnosisDataList={diagnosisDataList}
        onSelectItem={handleSelectItem}
      />
    )
  }, [diagnosisDataList, loadingDiagnosis])

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Box>
        <Flex
          className="w-full cursor-text flex-wrap overflow-y-auto rounded-2 border border-gray-7"
          align="center"
          gap="1"
          pl="1"
          onClick={() => setOpen(true)}
        >
          <TextField.Root
            size="1"
            className="min-w-14 !outline-white w-[500px] flex-1 flex-row-reverse [box-shadow:none]"
            placeholder={placeholder}
            onChange={(e) => handleSearchService(e.target.value)}
            onFocus={() => setOpen(true)}
          >
            <TextField.Slot>
              <MagnifyingGlassIcon height="16" width="16" />
            </TextField.Slot>
          </TextField.Root>
        </Flex>
        <Popover.Trigger>
          <Flex className=" h-0 w-full" />
        </Popover.Trigger>
      </Box>

      <Popover.Content align="start" sideOffset={5} className="z-[9999]">
        <ScrollArea className=" max-h-40 ">{memoizedDiagnosisList}</ScrollArea>
      </Popover.Content>
    </Popover.Root>
  )
}

export { SearchDiagnosisInput }
