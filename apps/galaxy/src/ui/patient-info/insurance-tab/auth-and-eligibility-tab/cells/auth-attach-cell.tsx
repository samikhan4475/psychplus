'use client'

import { Flex, Text } from '@radix-ui/themes'
import { Trash2, Upload } from 'lucide-react'
import { PropsWithRow } from '@/components'
import { AuthTable } from '../../types'

const AuthAttachCell = ({
  row: {
    original: { attach },
  },
}: PropsWithRow<AuthTable>) => {
  return (
    <>
      {attach ? (
        <Flex gap="1" align="center" className="px-1 py-0.5">
          <Trash2 width={14} height={14} />
          <Text className="text-1 text-blue-11">{attach}</Text>
        </Flex>
      ) : (
        <Flex gap="1" align="center" className="px-1 py-0.5">
          <Upload width={14} height={14} />
          <Text className="text-1">Upload</Text>
        </Flex>
      )}
    </>
  )
}

export { AuthAttachCell }
