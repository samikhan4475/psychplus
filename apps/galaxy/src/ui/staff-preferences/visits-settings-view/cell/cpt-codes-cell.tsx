'use client'

import { useMemo } from 'react'
import * as RadixRadioGroup from '@radix-ui/react-radio-group'
import { Text } from '@radix-ui/themes'
import { Controller, FieldArrayWithId, useFormContext } from 'react-hook-form'
import { PropsWithRow } from '@/components'
import { CPTPrimaryCode } from '@/types'
import { cn } from '@/utils'
import { SchemaType } from '../../schema'

const CPTCodesCell = ({
  row,
}: PropsWithRow<FieldArrayWithId<SchemaType, 'visitTypes'>>) => {
  const { control } = useFormContext<SchemaType>()

  const options = useMemo(() => {
    const { cptPrimaryCodes = [] } = row.original
    const options = [...cptPrimaryCodes]
    while (options.length < 4) {
      options.push({} as CPTPrimaryCode)
    }
    return options
  }, [row.original.cptPrimaryCodes])

  return (
    <Controller
      name={`visitTypes.${row.index}.selectedCPTCode`}
      control={control}
      defaultValue={row.original?.defaultCPTCode}
      render={({ field: { value, onChange } }) => {
        return (
          <RadixRadioGroup.Root
            onValueChange={onChange}
            value={value}
            className={cn('flex w-full gap-1.5')}
          >
            {options?.map((option, index) => {
              const id = `cpt-radio-option-${row.index}-${index}`
              return (
                <Text
                  key={id}
                  as="label"
                  htmlFor={id}
                  className={cn(
                    'border-pp-table-border flex h-[var(--chip-height)] flex-1 cursor-pointer items-center border px-1',
                    'rounded-none ml-2 border-b-0 border-l-0 border-r border-t-0',
                  )}
                >
                  <RadixRadioGroup.Item
                    className={cn(
                      'rounded-full data-[disabled]:bg-pp-states-disabled data-[state=checked]:data-[disabled]:bg-pp-gray-5 data-[disabled]:border-pp-gray-5 flex h-[12px] w-[12px] items-center justify-center border border-gray-9 data-[state=checked]:bg-blue-11',
                      {
                        hidden: !option.code,
                      },
                    )}
                    value={option.code}
                    id={id}
                    disabled={option.isDisabled}
                  >
                    <RadixRadioGroup.Indicator
                      className={cn(
                        "after:bg-white after:rounded-full flex h-full w-full items-center justify-center after:block after:h-[5px] after:w-[5px] after:content-['']",
                      )}
                    />
                  </RadixRadioGroup.Item>
                  <Text
                    ml="1"
                    className={cn('cursor-pointer text-[11px]', {
                      'text-pp-gray-5 cursor-not-allowed': option.isDisabled,
                      hidden: !option.code,
                    })}
                  >
                    {option.code ?? ''}
                  </Text>
                </Text>
              )
            })}
          </RadixRadioGroup.Root>
        )
      }}
    />
  )
}

export { CPTCodesCell }
