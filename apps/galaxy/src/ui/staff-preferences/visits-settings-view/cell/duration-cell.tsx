'use client'

import { useMemo } from 'react'
import * as RadixRadioGroup from '@radix-ui/react-radio-group'
import { Text } from '@radix-ui/themes'
import { Controller, FieldArrayWithId, useFormContext } from 'react-hook-form'
import { PropsWithRow } from '@/components'
import { cn } from '@/utils'
import { SchemaType } from '../../schema'

const DurationCell = ({
  row,
}: PropsWithRow<FieldArrayWithId<SchemaType, 'visitTypes'>>) => {
  const { control } = useFormContext<SchemaType>()
  const durationOptions = useMemo(() => {
    const options =
      row.original?.visitDurationsInMinutes?.map((m) => `${m}`) || []
    while (options.length < 3) {
      options.push('')
    }
    return options
  }, [row.original?.visitDurationsInMinutes])

  return (
    <Controller
      name={`visitTypes.${row.index}.defaultDuration`}
      control={control}
      defaultValue={row.original?.defaultDuration}
      render={({ field: { value, onChange } }) => (
        <RadixRadioGroup.Root
          onValueChange={onChange}
          value={value}
          className={cn('flex w-full gap-1.5')}
        >
          {durationOptions.map((option, index) => {
            const isSelected = option === value
            const id = `duration-option-${row.index}-${index}`

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
                    'rounded-full flex h-[12px] w-[12px] items-center justify-center border border-gray-9 data-[state=checked]:bg-blue-11',
                    {
                      hidden: !option,
                    },
                  )}
                  value={option}
                  id={id}
                >
                  <RadixRadioGroup.Indicator className="after:bg-white after:rounded-full flex h-full w-full items-center justify-center after:block after:h-[4px] after:w-[4px] after:content-['']" />
                </RadixRadioGroup.Item>
                <Text
                  ml="1"
                  className={cn('cursor-pointer text-[11px]', {
                    'font-medium': isSelected,
                    hidden: !option,
                  })}
                >
                  {option}
                </Text>
              </Text>
            )
          })}
        </RadixRadioGroup.Root>
      )}
    />
  )
}

export { DurationCell }
