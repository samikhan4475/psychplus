import React from 'react'
import { Box } from '@radix-ui/themes'
import { FileUplaodCard } from '.'
import { AttachmentsProps } from '../../types'

const Attachments = ({ attachments, handleDeleteFile }: AttachmentsProps) => {
  return (
    <>
      {attachments.length > 0 && (
        <Box className="bg-white flex flex-wrap gap-2 rounded-4 p-4 pt-4">
          {attachments.map((attachment, index) => (
            <FileUplaodCard
              key={`${attachment.name}-${index}`}
              attachment={attachment}
              handleDeleteFile={() => handleDeleteFile(index)}
            />
          ))}
        </Box>
      )}
    </>
  )
}

export { Attachments }
