import React, { useMemo, useState } from 'react'
import { Box, Flex, ScrollArea, Text, TextField } from '@radix-ui/themes'
import useOnclickOutside from 'react-cool-onclickoutside'
import toast from 'react-hot-toast'
import { useDebouncedCallback } from 'use-debounce'
import { ICD10Code } from '@/types'
import { getServiceDiagnosis } from '@/ui/diagnosis/diagnosis/actions/get-service-diagnosis'
import { SearchButton } from '@/ui/schedule/shared'
import { cn } from '@/utils'

interface DropdownMenuSearchProps<T> {
  placeholder?: string
  onSelectItem: (selectedItem: ICD10Code) => void
}

const DiagnosisList = ({
  diagnosisDataList,
  onSelectItem,
}: {
  diagnosisDataList: ICD10Code[]
  onSelectItem: (item: ICD10Code) => void
}) => {
  return diagnosisDataList.map((option: ICD10Code, index: number) => (
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
const SearchDiagnosisInput = <T extends ICD10Code>({
  placeholder,
  onSelectItem,
}: DropdownMenuSearchProps<T>) => {
  const [diagnosisDataList, setDiagnosisDataList] = useState<ICD10Code[]>([])
  const [loadingDiagnosis, setLoadingDiagnosis] = useState(false)
  const [open, setOpen] = useState(false)

  const handleSearchService = useDebouncedCallback(async (value: string) => {
    if (value.length < 2) return
    setLoadingDiagnosis(true)
    const response = await getServiceDiagnosis(value)
    if (response.state === 'success') {
      setDiagnosisDataList(response.data.serviceDiagnosisData || [])
      setLoadingDiagnosis(false)
    } else {
      setDiagnosisDataList([])
      setLoadingDiagnosis(false)
      toast('Error fetching diagnosis data')
    }
  }, 500)

  const ref = useOnclickOutside(() => setOpen(false))

  const handleSelectItem = (item: ICD10Code) => {
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
    <>
      <Box ref={ref}>
        <Flex
          className={cn(
            'w-full flex-wrap overflow-y-auto rounded-2 border border-gray-7',
          )}
          align="center"
          gap="1"
          pl="1"
        >
          <TextField.Root
            size="1"
            className="min-w-14 !outline-white w-[500px] flex-1 [box-shadow:none]"
            placeholder={placeholder}
            onChange={(e) => handleSearchService(e.target.value)}
            onFocus={() => setOpen(true)}
          />
        </Flex>

        {open && (
          <Box position="relative">
            <ScrollArea
              className={
                'bg-white !absolute z-50 mx-auto h-auto max-h-40 w-[500px] rounded-[25px] p-2 shadow-3'
              }
            >
              {memoizedDiagnosisList}
            </ScrollArea>
          </Box>
        )}
      </Box>
      <SearchButton />
    </>
  )
}

export { SearchDiagnosisInput }
