'use client'

import { useState } from 'react'
import { Button, DropdownMenu, Flex } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { CloseIcon, QuestionIcon, TickIcon } from '@/components/icons'
import { CODESETS } from '@/constants'
import { useCodesetOptions } from '@/hooks'
import { PermissionAlert } from '@/ui/schedule/shared'
import { cn } from '@/utils'
import { useResetVerificationStatus } from '../../use-reset-status'
import { InsurancePermissionMessages } from '../constants'
import { useInsurancePermissions } from '../hooks/use-insurance-permissions'
import { InsuranceSchemaType } from './schema'

const icons: Record<string, JSX.Element> = {
  Pending: <QuestionIcon />,
  Verified: <TickIcon />,
  Unverifiable: <CloseIcon />,
}
const StatusDropdown = () => {
  const form = useFormContext<InsuranceSchemaType>()
  const status = form.watch('verificationStatus')
  const options = useCodesetOptions(CODESETS.VerificationStatus)
  const { canChangeVerificationStatusInsurance } = useInsurancePermissions()
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const { isSubmitting } = form.formState

  const getLabelFromValue = (value: string) => {
    const option = options.find((option) => option.value === value)
    return option ? option.label : 'Select'
  }

  useResetVerificationStatus()

  return (
    <>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Button
            variant="outline"
            color="gray"
            size="1"
            type="button"
            className="text-black min-w-[97px] justify-between capitalize"
            disabled={isSubmitting}
          >
            <Flex justify="start" gap="1">
              {icons[status]}
              {getLabelFromValue(status)}
            </Flex>
            <DropdownMenu.TriggerIcon />
          </Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content className="p-0 shadow-3" color="gray">
          {options?.map(({ label, value }) => (
            <DropdownMenu.Item
              onSelect={() => {
                if (!canChangeVerificationStatusInsurance) {
                  setIsOpen(true)
                } else {
                  form.setValue('verificationStatus', value)
                  form.trigger('verificationStatus')
                }
              }}
              className={cn(
                'hover:bg-pp-gray-2 text-black h-6 px-2 !text-1 font-medium',
                {
                  'text-red-9': value === 'no',
                },
              )}
              key={label}
            >
              {icons[value]} {label}
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Root>
      <PermissionAlert
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        message={InsurancePermissionMessages.changeVerificationStatus}
      />
    </>
  )
}
export default StatusDropdown
