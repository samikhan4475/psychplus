import React from 'react'
import { Flex, ScrollArea, Text } from '@radix-ui/themes'
import { PlusIcon, Trash2Icon } from 'lucide-react'
import { useFormContext } from 'react-hook-form'
import { FormFieldError } from '@/components'
import { getCptCodeOptions } from '../../actions'
import { SchemaType } from '../schema'
import { removeCodeFromCommaString, transformInCodes } from '../util'
import { SearchItem, SearchPopoverInput } from './search-popover-input'

const CptCodeSelect = () => {
  const form = useFormContext<SchemaType>()
  const onSelect = (item: SearchItem) => {
    const existingCodes = form.getValues('cptCodes')?.trim() || ''
    const separator = existingCodes ? ',' : ''
    const updatedCodes = `${existingCodes}${separator}${item.code}`

    form.setValue('cptCodes', updatedCodes)
  }
  const onRemoveCptCode = (code: string) => {
    const alreadyExistingCodes = form.getValues('cptCodes')

    const updatedCodes = removeCodeFromCommaString(
      alreadyExistingCodes ?? '',
      code,
    )

    form.setValue('cptCodes', updatedCodes)
  }
  const cptCodes = transformInCodes(form.watch('cptCodes') ?? '')
  const disabledCodes = cptCodes.concat(
    transformInCodes(form.watch('addOnCodes') ?? ''),
  )
  return (
    <Flex direction="column" className="shadow-2">
      <Flex justify="between" p="1" className="bg-blue-2">
        <Text size="1" weight="medium">
          CPT Codes
        </Text>
        <SearchPopoverInput
          placeholder="Search CPT"
          api={getCptCodeOptions}
          onSelectItem={onSelect}
          isItemDisabled={(item) =>
            disabledCodes.some((code) => code.code === item.code)
          }
          triggerElement={
            <Flex
              align="center"
              justify="center"
              className="bg-white h-4 w-4 cursor-pointer rounded-2 shadow-2"
            >
              <PlusIcon height="14" width="14" />
            </Flex>
          }
        />
      </Flex>
      <ScrollArea scrollbars="vertical" className="h-[170px] max-h-[170px]">
        {cptCodes.map((code, index) => (
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
              onClick={() => onRemoveCptCode(code.code ?? '')}
            />
          </Flex>
        ))}
      </ScrollArea>
      <FormFieldError name="cptCodes" />
    </Flex>
  )
}

export { CptCodeSelect }
