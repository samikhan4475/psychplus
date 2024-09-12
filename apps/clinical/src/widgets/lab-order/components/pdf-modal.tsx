import { Cross2Icon } from '@radix-ui/react-icons'
import { Box, Dialog, Flex, Text } from '@radix-ui/themes'
import { LabOrderPdf, PdfModalProps } from '../types'

const PdfModal = ({ pdfTypeUrl, active, handlerClose }: PdfModalProps) => {
  const { resultsPdf, requisitionPdf } = LabOrderPdf
  let displayName = ''
  if (pdfTypeUrl.type === resultsPdf) {
    displayName = 'Result Pdf View'
  } else if (pdfTypeUrl.type === requisitionPdf) {
    displayName = 'Requisition Pdf View'
  }
  return (
    <Dialog.Root open={active}>
      <Dialog.Content className={`relative h-full max-w-full rounded-3 p-3`}>
        <Dialog.Close
          onClick={handlerClose}
          className="absolute right-4 top-4 cursor-pointer"
        >
          <Cross2Icon />
        </Dialog.Close>
        <Box className="h-full p-4 pt-0">
          <Flex justify="start" py="3">
            <Text size="4" weight="medium">
              {displayName}
            </Text>
          </Flex>
          <iframe
            src={pdfTypeUrl.url}
            title="PDF Viewer"
            className="h-full w-full"
            frameBorder="0"
            scrolling="auto"
          ></iframe>
        </Box>
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { PdfModal }
