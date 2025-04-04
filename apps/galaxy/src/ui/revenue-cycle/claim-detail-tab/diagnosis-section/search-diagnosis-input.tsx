import React, { useMemo, useState } from 'react'
import {
  Box,
  Flex,
  IconButton,
  ScrollArea,
  Text,
  TextField,
} from '@radix-ui/themes'
import { PlusCircleIcon, SearchIcon } from 'lucide-react'
import useOnclickOutside from 'react-cool-onclickoutside'
import toast from 'react-hot-toast'
import { useDebouncedCallback } from 'use-debounce'
import { LoadingPlaceholder } from '@/components'
import { ClaimDiagnosis, DiagnosisIcd10Code } from '@/types'
import { getIcd10Diagnosis } from '@/ui/diagnosis/diagnosis/actions/get-service-diagnosis'
import { cn } from '@/utils'

interface DropdownMenuSearchProps {
  placeholder?: string
  onSelectItem: (selectedItem: DiagnosisIcd10Code) => void
  claimDiagnosis: ClaimDiagnosis[]
}

const ServiceDiagnosisList = ({
  diagnosisDataList,
  handleSelectItem,
  loadingDiagnosis,
  selectedclaimDiagnosis,
}: {
  diagnosisDataList: DiagnosisIcd10Code[]
  handleSelectItem: (item: DiagnosisIcd10Code) => void
  loadingDiagnosis: boolean
  selectedclaimDiagnosis: ClaimDiagnosis[]
}) => {
  const selectedOptions = useMemo(() => {
    return selectedclaimDiagnosis.map((item) => item.diagnosisCode)
  }, [selectedclaimDiagnosis])

  if (loadingDiagnosis) {
    return <LoadingPlaceholder className="mt-5" />
  }
  if (diagnosisDataList.length === 0) {
    return (
      <Text weight="medium" className="text-[12px]">
        No data found
      </Text>
    )
  }

  return diagnosisDataList.map((option: DiagnosisIcd10Code, index: number) => {
    const isDisabled = selectedOptions.includes(option.code)
    return (
      <Flex
        key={option.code + index}
        justify="between"
        align="center"
        p="1"
        onClick={() => (isDisabled ? null : handleSelectItem(option))}
        className={cn(
          `hover:bg-pp-bg-accent rounded-2 ${
            isDisabled
              ? 'cursor-not-allowed opacity-30'
              : 'cursor-pointer opacity-100'
          }`,
        )}
      >
        <Text className="w-[85%] text-[11px]">{`${option.code} ${option.description}`}</Text>
        <PlusCircleIcon
          stroke="#194595"
          strokeWidth="2"
          height="15"
          width="15"
        />
      </Flex>
    )
  })
}
const SearchDiagnosisInput = ({
  placeholder,
  onSelectItem,
  claimDiagnosis,
}: DropdownMenuSearchProps) => {
  const [showOptions, setShowOptions] = useState(false)
  const [loadingDiagnosis, setLoadingDiagnosis] = useState(false)
  const [diagnosisDataList, setDiagnosisDataList] = useState<
    DiagnosisIcd10Code[]
  >([])
  const ref = useOnclickOutside(() => setShowOptions(false))
  const handleSearchService = useDebouncedCallback(async (value: string) => {
    if (value.length < 2) return
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
    toast.error('Error fetching diagnosis data')
  }, 500)

  const handleSelectItem = (item: DiagnosisIcd10Code) => {
    onSelectItem(item)
  }
  return (
    <Flex align="center" gap="2">
      <Box ref={ref} className="relative">
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
            className="min-w-14 !outline-white w-[500px] flex-1 [box-shadow:none]"
            placeholder={placeholder}
            onChange={(e) => handleSearchService(e.target.value)}
            onFocus={() => {
              setShowOptions(true)
            }}
          />
        </Flex>

        {showOptions && (
          <ScrollArea
            className={cn(
              `bg-white !absolute z-50 mx-auto w-full !overflow-visible rounded-[25px] p-2 shadow-3`,
              loadingDiagnosis ? 'min-h-25' : '',
              diagnosisDataList.length === 0 ? 'h-auto' : 'h-[9rem]',
            )}
          >
            <ServiceDiagnosisList
              loadingDiagnosis={loadingDiagnosis}
              diagnosisDataList={diagnosisDataList}
              handleSelectItem={handleSelectItem}
              selectedclaimDiagnosis={claimDiagnosis}
            />
          </ScrollArea>
        )}
      </Box>
      <IconButton size="1" highContrast type="submit" disabled={false}>
        <SearchIcon width={14} height={14} strokeWidth={2} />
      </IconButton>
    </Flex>
  )
}
export { SearchDiagnosisInput }
