'use client'

import { Flex, Select, Text, Tooltip } from '@radix-ui/themes'
import { Appointment } from '@/types'

interface AfterVisitVHeaderViewProps {
  appointment: Appointment
  title: string
  value?: string
  type?: 'date' | 'time'
}

const formatValue = (
  appointment: Appointment,
  type?: 'date' | 'time',
): string => {
  if (!appointment.startDate) return ''
  
  const date = new Date(appointment.startDate)
  
  if (type === 'date') {
    return date.toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: '2-digit'
    })
  } else if (type === 'time') {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    })
  }
  return ''
}

const AfterVisitVHeaderView = ({
  appointment,
  title,
  value,
  type,
}: AfterVisitVHeaderViewProps) => {
  const formattedValue = type ? formatValue(appointment, type) : value

  return (
    <Flex gap="1" align={'center'}>
      <Text size="1" weight="medium">
        {title}
      </Text>
      <Select.Root size="1" value={formattedValue} disabled>
        {formattedValue ? (
          <Tooltip content={formattedValue}>
            <Select.Trigger className="max-w-[125px]" />
          </Tooltip>
        ) : (
          <Select.Trigger className="max-w-[125px]" />
        )}
        <Select.Content
          highContrast
          onCloseAutoFocus={(e) => e.preventDefault()}
        >
          {formattedValue && (
            <Select.Item value={formattedValue}>{formattedValue}</Select.Item>
          )}
        </Select.Content>
      </Select.Root>
    </Flex>
  )
}

export { AfterVisitVHeaderView }
