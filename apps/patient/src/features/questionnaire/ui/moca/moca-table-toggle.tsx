import React from 'react'
import { cn } from '@psychplus-v2/utils'
import { Box, Flex, Switch, Text } from '@radix-ui/themes'
import { Controller, useFormContext } from 'react-hook-form'

type Data = {
  id: string
  value: number
}

interface QuestionnaireTableProps {
  data: Data[]
  title: string
  labels?: string[]
  disabled?: boolean
  heading: string
  headingLabels?: string[]
}

const MocaTableToggle = ({
  data,
  title,
  labels = [],
  disabled = false,
  heading,
  headingLabels,
}: QuestionnaireTableProps) => {
  const { control, setValue } = useFormContext()
  const isSingleColumn = data.length <= 5

  const renderSwitch = (id: string) => (
    <Controller
      name={id}
      control={control}
      render={({ field: { value, onChange } }) => (
        <Flex mx="2" my="1" gap="2" align="center">
          <Switch
            color="indigo"
            size="1"
            checked={value === '1'}
            disabled={disabled}
            onCheckedChange={(checked) => {
              const newValue = checked ? '1' : '0'
              setValue(id, newValue, { shouldValidate: true })
              onChange(newValue)
            }}
          />
          <Text className="text-[13px]">{value === '1' ? 'Yes' : 'No'}</Text>
        </Flex>
      )}
    />
  )

  return (
    <Box className="w-full">
      <Flex
        my="2"
        className="w-full rounded-1 bg-[#EEF2F6] px-2 py-1"
        align="center"
      >
        <Text className="text-[13px] font-medium">{title}</Text>
      </Flex>

      <Flex my="2" px="2" gap="2" direction="column">
        <Text className="text-[13px] font-medium">{heading}</Text>
      </Flex>

      {headingLabels && headingLabels?.length > 0 && (
        <Flex
          className={cn(
            isSingleColumn ? 'w-full sm:w-[43%]' : 'w-full sm:w-[75%]',
            'rounded-t-1 border border-b-0 border-[#DDDDE3] bg-[#F0F4FF]',
          )}
        >
          <Box
            className={cn(
              isSingleColumn ? 'w-1/3 sm:w-[43%]' : 'w-1/3 sm:w-[15%]',
              'border-r border-[#DDDDE3] px-2',
            )}
          />
          {headingLabels?.map((label) => (
            <Flex
              key={label}
              className="flex-[0.85] border-r border-[#DDDDE3] px-2 last:border-r-0"
            >
              <Text weight="medium" className="text-[13px]" my="1">
                {label}
              </Text>
            </Flex>
          ))}
        </Flex>
      )}

      {labels.map((label, rowIndex) => (
        <Flex
          key={label}
          className={cn(
            isSingleColumn ? 'w-full sm:w-[43%]' : 'w-full sm:w-[75%]',
            'flex border border-b-0 border-[#DDDDE3] last:rounded-b-1 last:border-b',
            !headingLabels && rowIndex === 0 && 'rounded-t-1',
          )}
        >
          <Flex
            className={cn(
              !headingLabels && 'bg-[#F0F4FF]',
              isSingleColumn ? 'w-1/3 sm:w-[43%]' : 'w-1/3 sm:w-[15%]',
              'border-r border-[#DDDDE3] text-left',
            )}
          >
            <Text mx="2" my="1" className="text-[13px]">
              {label}
            </Text>
          </Flex>
          {data[rowIndex] && (
            <Flex className="flex flex-[0.85] gap-2 border-r border-[#DDDDE3] last:border-r-0">
              {renderSwitch(data[rowIndex].id)}
            </Flex>
          )}
          {!isSingleColumn && data[rowIndex + labels.length] && (
            <Flex className="flex flex-[0.85] gap-2 border-r border-[#DDDDE3] last:border-r-0">
              {renderSwitch(data[rowIndex + labels.length].id)}
            </Flex>
          )}
        </Flex>
      ))}
    </Box>
  )
}

export { MocaTableToggle }
