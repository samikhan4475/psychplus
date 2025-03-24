import React from 'react'
import Image from 'next/image'
import { Dialog, Flex, Tooltip } from '@radix-ui/themes'
import { CloseDialogIcon } from '@/components-v2'
import ViewIcon from '@/components-v2/icons/view-icon'

const PreCheckinViewImage = () => {
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <button>
          <Tooltip content="View picture" delayDuration={250}>
            <Flex align="center" justify="center" className="cursor-pointer">
              <ViewIcon />
            </Flex>
          </Tooltip>
        </button>
      </Dialog.Trigger>
      <Dialog.Content className="max-w-[450px]">
        <Flex align={'center'} justify={'center'}>
          <Image
            src="/api/patients/self/profileimage"
            alt="Profile picture"
            width={380}
            height={380}
            loader={() => '/api/patients/self/profileimage'}
            loading="lazy"
            className="rounded-4 object-cover"
          />
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  )
}

export default PreCheckinViewImage
