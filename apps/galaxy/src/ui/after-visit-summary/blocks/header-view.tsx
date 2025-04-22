'use client'

import { Flex, Select, Text, Tooltip } from '@radix-ui/themes'
import { Appointment } from '@/types'
import { formatDateCell, formatTimeCell } from '@/ui/schedule/utils'

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
  if (type === 'date') {
    return formatDateCell(
      appointment.appointmentDate,
      appointment.locationTimezoneId,
    )
  } else if (type === 'time') {
    return formatTimeCell(
      appointment.appointmentDate,
      appointment.locationTimezoneId,
    )
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
