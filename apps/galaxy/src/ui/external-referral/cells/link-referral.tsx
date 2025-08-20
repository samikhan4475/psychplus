'use client'

import { useState } from 'react'
import { Link2Icon } from '@radix-ui/react-icons'
import { Flex, IconButton, Tooltip } from '@radix-ui/themes'
import { PropsWithRow } from '@/components'
import { LinkDuplicateExternalReferrals } from '../link-duplicate-external-referrals'
import { Patient } from '../types'

const LinkReferral = ({
  row: { original: patient },
}: PropsWithRow<Patient>) => {
  const [isOpen, setIsOpen] = useState(false)
  const matchStatus = patient?.matchStatus
  const isNew = matchStatus === 'New'

  const handleButtonClick = () => {
    setIsOpen(true)
  }

  const handleClose = () => {
    setIsOpen(false)
  }

  return (
    <Flex onClick={(e) => e.stopPropagation()}>
      <Tooltip content="Link">
        <IconButton
          variant="outline"
          size="1"
          className="h-4 w-4"
          color="gray"
          disabled={isNew}
          onClick={handleButtonClick}
        >
          <Link2Icon height={14} width={14} color="black" />
        </IconButton>
      </Tooltip>
      {isOpen && (
        <LinkDuplicateExternalReferrals
          open={isOpen}
          onClose={handleClose}
          patient={patient}
        />
      )}
    </Flex>
  )
}

export { LinkReferral }
