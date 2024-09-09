'use client'

import { Cross1Icon } from '@radix-ui/react-icons'
import { Button, Dialog, Flex } from '@radix-ui/themes'
import { cn } from '@psychplus/ui/cn'
import { BillingIcon, TreatmentAlertTable, TreatmentIcon } from './components'
import { alertType, TreatmentAlertDialogDialogProps } from './types'

const TreatmentAlertDialogWidgetClient = ({
  isOpen,
  closeDialog,
  type,
}: TreatmentAlertDialogDialogProps) => {
  return (
    <Dialog.Root open={isOpen} onOpenChange={closeDialog}>
      <Dialog.Content
        className={cn('relative max-w-[857px] rounded-[9px] p-0', {
          'bg-[#FFE5E5]': type === alertType.Treatment,
        })}
      >
        <Flex
          align={'center'}
          justify={'start'}
          mb={'2'}
          className="gap-[10px] px-[20px] py-3 text-[16px] font-medium text-[#1C2024]"
        >
          {type === alertType.Billing ? (
            <>
              <BillingIcon />
              Billing Alert!
            </>
          ) : (
            <>
              <TreatmentIcon />
              Treatment Alert!
            </>
          )}
        </Flex>
        <Dialog.Close>
          <Cross1Icon
            height={18.36}
            width={18.36}
            className="absolute right-4 top-[20px] cursor-pointer text-[#60646C] transition-colors hover:text-gray-11"
          />
        </Dialog.Close>
        <TreatmentAlertTable type={type} />
        <Flex
          className="w-full px-[20px] py-3"
          justify={'center'}
          align={'center'}
        >
          <Button
            className="min-w-[124px] bg-[#194595]"
            color="blue"
            highContrast
          >
            Ok
          </Button>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { TreatmentAlertDialogWidgetClient }
