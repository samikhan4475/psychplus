'use client'

import { Flex, Select, Text } from '@radix-ui/themes'
import { PlusCircleIcon } from 'lucide-react'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { SearchButton } from '@/ui/schedule/shared'
import { cn } from '@/utils'
import { useStore } from '../../store'
import { OPTIONS } from '../constants'

interface SearchDiagnosisProps {
  patientId: string
  px?: string
}

const SearchDiagnosis = ({ px = '', patientId }: SearchDiagnosisProps) => {
  const { workingDiagnosisData, updateWorkingDiagnosisData } = useStore()
  const handleValueChange = async (value: string) => {
    const data = [
      ...workingDiagnosisData,
      {
        pid: Number(patientId),
        sectionName: QuickNoteSectionName.QuickNoteSectionDiagnosis,
        sectionItem: value,
        sectionItemValue: value,
      },
    ]
    updateWorkingDiagnosisData(patientId, data)
  }

  return (
    <Flex px={px} gap="2" justify="between" align="center" width="40%">
      <Select.Root value="" onValueChange={handleValueChange}>
        <Select.Trigger
          placeholder="Search Practice"
          className={`border-pp-gray-2 h-6 w-full border border-solid p-4 !outline-none [box-shadow:none]`}
        />
        <Select.Content
          position="popper"
          align="center"
          variant="soft"
          className="w-full"
        >
          {OPTIONS.map((option) => {
            const isDisabled = workingDiagnosisData?.some(
              (item) => item.sectionItemValue === option.value,
            )

            return (
              <Flex
                key={option.value}
                className="hover:bg-pp-bg-accent rounded-2"
                justify="between"
                align="center"
              >
                <Text
                  className={cn(
                    `pl-1 ${isDisabled ? 'opacity-30' : 'opacity-100'}`,
                  )}
                >
                  {option.label}
                </Text>
                <Select.Item
                  value={option.value}
                  disabled={isDisabled}
                  className="hover:bg-pp-bg-accent bg-transparent"
                >
                  <PlusCircleIcon
                    stroke="#194595"
                    strokeWidth="2"
                    className={isDisabled ? 'opacity-30' : 'opacity-100'}
                  />
                </Select.Item>
              </Flex>
            )
          })}
        </Select.Content>
      </Select.Root>

      <SearchButton />
    </Flex>
  )
}

export { SearchDiagnosis }
