'use client'

import { Box, Button, Flex, Text } from '@radix-ui/themes'

const PreviewFile = ({
  previewFile,
  closePreview,
  textContent,
}: {
  previewFile: File
  closePreview: () => void
  textContent?: string
}) => {
  return (
    <Flex
      className="bg-black fixed inset-0 z-50 rounded-2 border bg-opacity-50"
      justify="center"
      align="center"
    >
      <Box className="bg-white shadow-lg max-h-[100%] max-w-[100%] overflow-auto rounded-6 p-4">
        <Flex justify="between" align="center" className="mb-4">
          <Text weight="bold" size="2">
            File Preview
          </Text>
          <Button
            variant="ghost"
            color="red"
            onClick={closePreview}
            className="text-red-600"
          >
            Close
          </Button>
        </Flex>

        {previewFile.type.startsWith('image/') && (
          <img
            src={URL.createObjectURL(previewFile)}
            alt={previewFile.name}
            className="rounded h-[500px] w-[500px] object-contain"
          />
        )}
        {previewFile.type === 'application/pdf' && (
          <iframe
            src={URL.createObjectURL(previewFile)}
            title={previewFile.name}
            className="rounded h-[500px] w-[500px]"
            style={{ border: 'none' }}
          />
        )}
        {previewFile.type === 'text/plain' && textContent && (
          <pre className="text-sm bg-gray-100 rounded h-[500px] w-[500px] whitespace-pre-wrap p-2">
            {textContent}
          </pre>
        )}
        {!['image/', 'application/pdf', 'text/plain'].some((type) =>
          previewFile.type.startsWith(type),
        ) && (
          <Text size="1" className="text-center">
            Preview not available for this file type.
          </Text>
        )}

        <Text weight="bold" size="1" className="mt-4">
          {previewFile.name}
        </Text>
      </Box>
    </Flex>
  )
}

export { PreviewFile }
