'use client'

import { Button, Flex } from '@radix-ui/themes'
import { Upload } from 'lucide-react'

const AttachmentButton = () => {
  return (
    <Flex height="100%" align="end">
      <Button size="1" color="gray" variant="outline" className="w-full">
        <Upload width={16} height={16} />
        Attach documents
      </Button>
    </Flex>
  )
}

export { AttachmentButton }
