'use client'

import { Select } from '@radix-ui/themes'
import { SelectOptionType } from '@/types'
import { cn } from '@/utils'

type Variant = 'success' | 'warning' | 'info' | 'error' | 'secondary'
interface StatusSelectProps {
  value?: string
  onValueChange?: (value: string) => void
  className?: string
  disabled?: boolean
  options?: SelectOptionType[]
}

const StatusSelect = ({
  value,
  onValueChange,
  className,
  disabled,
  options,
}: StatusSelectProps) => {
  return (
    <Select.Root size="1" value={value} onValueChange={onValueChange}>
      <Select.Trigger
        placeholder="Select"
        className={cn(
          'border-pp-gray-2 h-5 w-full rounded-2 border border-solid text-1 !outline-none [box-shadow:none]',
          { [variants?.[value as keyof typeof variants]]: value },
          { 'pointer-events-none': disabled },
          className,
        )}
        disabled={disabled}
      />
      <Select.Content position="popper">
        {options?.map(({ label, value, disabled }, idx) => (
          <Select.Item
            key={`${value}-${idx}`}
            value={value}
            className={cn(
              'bg-white text-black hover:!bg-pp-gray-4 hover:text-black my-0.5',
              {
                [variants?.[value as keyof typeof variants]]: value,
                'cursor-not-allowed opacity-50': disabled,
              },
            )}
            disabled={disabled}
          >
            {label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  )
}

const classes: Record<Variant, string> = {
  success: '!bg-pp-success-bg !text-pp-success-text',
  error: '!bg-pp-red-100 !text-pp-red-1',
  info: '!bg-pp-blue-100 !text-blue-10',
  secondary: '!bg-pp-states-disabled !text-pp-icon-sub',
  warning: '!bg-pp-warning-bg !text-pp-warning-text',
}

const variants = {
  Complete: classes.success,
  Completed: classes.success,
  Pending: classes.warning,
  PendingRegistration: classes.warning,
  PendingQuestionnaires: classes.warning,
  Scheduled: classes.warning,
  Admitted: classes.info,
  AuthInProcess: classes.info,
  Waitlist: classes.info,
  AttemptedContact: classes.info,
  SecondAttempt: classes.info,
  ThirdAttempt: classes.info,
  Incomplete: classes.secondary,
  Unresponsive: classes.secondary,
  NotSet: classes.secondary,
  NotAccepted: classes.error,
  NotCovered: classes.error,
  Refused: classes.error,
  Error: classes.error,
  Delete: classes.error,
  Deleted: classes.error,
  Cancelled: classes.error,
}

export { StatusSelect }
