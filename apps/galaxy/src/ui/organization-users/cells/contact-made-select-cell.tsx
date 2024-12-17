'use client'

import { CodesetSelectCell, PropsWithRow } from '@/components'
import { CODESETS } from '@/constants'
import { Flex } from '@radix-ui/themes'
import { Users } from '../types'

const ContactMadeSelectCell = ({
  row: { original: patient },
}: PropsWithRow<Users>) => {
  return (
    <Flex
      width="100%"
      height="100%"
      align="center"
      onClick={(e) => e.stopPropagation()}
    >
      <CodesetSelectCell
        codeset={CODESETS.ContactMadeStatus}
        className="border-pp-gray-2 h-4 w-full border border-solid !outline-none [box-shadow:none]"
      />
    </Flex>
  )
}

export { ContactMadeSelectCell }
