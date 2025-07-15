'use client'

import { Flex } from '@radix-ui/themes'

interface FileViewProps {
  url: string
}
const FileView = ({ url }: FileViewProps) => {
  return (
    <Flex direction="column">
      <iframe
        src={`${url}#toolbar=0`}
        className="h-[calc(80vh)] w-full"
      ></iframe>
    </Flex>
  )
}

export { FileView }
