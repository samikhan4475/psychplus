'use client'

import { Link2Icon, LinkBreak2Icon } from '@radix-ui/react-icons'
import { Flex, IconButton, Tooltip } from '@radix-ui/themes'
import { PropsWithRow } from '@/components'
import { Patient } from '../types'

const LinkReferral = ({
  row: { original: patient },
}: PropsWithRow<Patient>) => {
  const Icon = patient?.isLinked ? LinkBreak2Icon : Link2Icon

  return (
    <Flex onClick={(e) => e.stopPropagation()}>
      <Tooltip content={patient?.isLinked ? 'Unlink' : 'Link'}>
        <IconButton variant="outline" size="1" className="h-4 w-4" color="gray">
          <Icon height={12} width={12} />
        </IconButton>
      </Tooltip>
    </Flex>
  )
}

export { LinkReferral }
