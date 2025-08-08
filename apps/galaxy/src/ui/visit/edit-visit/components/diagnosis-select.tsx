import { Flex, ScrollArea, Text } from '@radix-ui/themes'
import { PlusIcon, Trash2Icon } from 'lucide-react'
import { useFormContext } from 'react-hook-form'
import { FormFieldError } from '@/components'
import { cn } from '@/utils'
import { getDiagnosisOptions } from '../../actions'
import {
  SearchItem,
  SearchPopoverInput,
} from '../../add-visit/components/search-popover-input'
import {
  removeCodeFromCommaString,
  transformInCodes,
} from '../../add-visit/util'
import { SchemaType } from '../schema'

const DiagnosisSelect = () => {
  const form = useFormContext<SchemaType>()
  const customDiagnosis = transformInCodes(form.watch('customDiagnosis') ?? '')
  const selectedCodes = customDiagnosis.map((item) => item.code)
  const codeCount = selectedCodes.filter(Boolean).length
  const maxDiagnosisReached = codeCount >= 12
  const onSelect = (item: SearchItem) => {
    if (maxDiagnosisReached) return
    const existingCodes = form.getValues('customDiagnosis')?.trim() || ''
    const separator = existingCodes ? ',' : ''
    const updatedCodes = `${existingCodes}${separator}${item.code}`

    form.setValue('customDiagnosis', updatedCodes, {
      shouldDirty: true,
    })
  }

  const onRemoveDiagnosis = (code: string) => {
    const alreadyExistingCodes = form.getValues('customDiagnosis')

    const updatedCodes = removeCodeFromCommaString(
      alreadyExistingCodes ?? '',
      code,
    )

    form.setValue('customDiagnosis', updatedCodes, { shouldDirty: true })
  }

  return (
    <Flex direction="column" className="shadow-2">
      <Flex justify="between" p="1" className="bg-blue-2">
        <Text size="1" weight="medium">
          Diagnosis
        </Text>
        <SearchPopoverInput
          placeholder="Search Diagnosis"
          api={getDiagnosisOptions}
          onSelectItem={onSelect}
          isItemDisabled={(item) => selectedCodes.includes(item.code ?? '')}
          triggerElement={
            <Flex
              align="center"
              justify="center"
              className={cn(
                'bg-white h-4 w-4 cursor-pointer rounded-2 shadow-2',
                { ['pointer-events-none opacity-50']: maxDiagnosisReached },
              )}
            >
              <PlusIcon height="14" width="14" />
            </Flex>
          }
        />
      </Flex>

      <ScrollArea scrollbars="vertical" className="h-[170px] max-h-[170px]">
        {customDiagnosis.map((code, index) => (
          <Flex
            px="2"
            pr="3"
            py="1"
            className="border-b border-b-gray-3"
            key={code.code}
            align="center"
            justify="between"
          >
            <Text className="!text-[11px]">
              {index + 1}. {code.code}
            </Text>
            <Trash2Icon
              size="15"
              className="cursor-pointer"
              onClick={() => onRemoveDiagnosis(code.code ?? '')}
            />
          </Flex>
        ))}
      </ScrollArea>
      <FormFieldError name="customDiagnosis" />
    </Flex>
  )
}

export { DiagnosisSelect }
