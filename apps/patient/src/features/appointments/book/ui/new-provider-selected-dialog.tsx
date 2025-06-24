'use client';

import { useState } from 'react';
import { getNewProviderTypeLabel } from '@psychplus-v2/utils';
import { Button, Dialog, Flex } from '@radix-ui/themes';
import { CloseDialogIcon } from '@/components-v2';
import { changePrimaryProviderCareTeamAction } from '@/features/appointments/book/actions';
import { NewProviderSelectedProps } from '@/features/appointments/book/types';
import { useToast } from '@/providers';


const NewProviderSelectedDialog = ({
  open,
  setOpen,
  onClose,
  specialistStaffId,
  newProviderType
}: NewProviderSelectedProps) => {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)

  const onChangePrimarycard = async () => {
    setLoading(true)

    const result = await changePrimaryProviderCareTeamAction({
      specialistStaffId,
      specialistType: getNewProviderTypeLabel(newProviderType || ''),
    })

    if (result.state === 'error') {
      toast({
        type: 'error',
        title: result.error,
      })
    } else {
      toast({
        type: 'success',
        title: 'Primary Provider Changed',
      })
    }


    setOpen(false)
    onClose(true)
    setLoading(false)
  }

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(IsOpen) => {
        if (!IsOpen) {
          setOpen(false)
          onClose(true)
        }
      }}
    >
      <Dialog.Content className="relative">
        <CloseDialogIcon />
        <Dialog.Title className="font-sans -tracking-[0.25px]">
          New provider selected
        </Dialog.Title>
        <Dialog.Description size="3">
          You&apos;ve chosen an appointment with a new provider. Would you like
          to:
        </Dialog.Description>
        <Flex gap="3" mt="4" justify="end" direction={{initial:'column', md:'row'}}>
          <Button
            variant="outline"
            color="gray"
            highContrast
            onClick={onChangePrimarycard}
            disabled={loading}
          >
            Change primary provider
          </Button>

          <Dialog.Close>
            <Button className="bg-[#24366B]">
              Keep current primary provider
            </Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { NewProviderSelectedDialog }