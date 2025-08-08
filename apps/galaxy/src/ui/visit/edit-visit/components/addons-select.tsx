import React from 'react'
import { Flex, ScrollArea, Text } from '@radix-ui/themes'
import { PlusIcon, Trash2Icon } from 'lucide-react'
import { useFormContext } from 'react-hook-form'
import { getCptCodeOptions } from '../../actions'
import {
  SearchItem,
  SearchPopoverInput,
} from '../../add-visit/components/search-popover-input'
import {
  removeCodeFromCommaString,
  transformInCodes,
} from '../../add-visit/util'
import { SchemaType } from '../schema'

const AddonsSelect = () => {
  const form = useFormContext<SchemaType>()
  const onSelect = (item: SearchItem) => {
    const existingCodes = form.getValues('customAddons')?.trim() || ''
    const separator = existingCodes ? ',' : ''
    const updatedCodes = `${existingCodes}${separator}${item.code}`

    form.setValue('customAddons', updatedCodes, {
      shouldDirty: true,
    })
  }
  const onRemoveAddonCode = (code: string) => {
    const alreadyExistingCodes = form.getValues('customAddons')

    const updatedCodes = removeCodeFromCommaString(
      alreadyExistingCodes ?? '',
      code,
    )

    form.setValue('customAddons', updatedCodes, {
      shouldDirty: true,
    })
  }
  const customAddons = transformInCodes(form.watch('customAddons') ?? '')
  const disabledCodes = customAddons.concat(
    transformInCodes(form.watch('customCptCodes') ?? ''),
  )
  return (
    <Flex direction="column" className="shadow-2">
      <Flex justify="between" p="1" className="bg-blue-2">
        <Text size="1" weight="medium">
          Addons
        </Text>
        <SearchPopoverInput
          placeholder="Search Addon"
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
        {customAddons.map((code, index) => (
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
              onClick={() => onRemoveAddonCode(code.code ?? '')}
            />
          </Flex>
        ))}
      </ScrollArea>
    </Flex>
  )
}

export { AddonsSelect }
