import { Box, Flex, Text } from '@radix-ui/themes'
import { ErrorIcon } from '@/components/icons'
import { ParsedResponse } from './utils'

const UploadExcelErrorDialogView = ({ failures, summary }: ParsedResponse) => {
  return (
    <Flex direction="column" gapY="2" className="text-sm max-h-[60vh] overflow-y-auto">
      <Flex direction="row" gap="2">
        <Box>
          <ErrorIcon />
        </Box>
        <Box>
          <Text mx="1" size="2" weight="bold">
            Upload completed with errors.
          </Text>
        </Box>
      </Flex>

      <Box ml="6">
        <Text size="2">
          <Text weight="bold">Summary:</Text> Added {summary.added}, Updated{' '}
          {summary.updated}, Total {summary.totalFound}, Successful{' '}
          {summary.successful}, Skipped {summary.skipped}, Failed{' '}
          {summary.failed}
        </Text>
      </Box>

      {failures.map((failure) => (
        <Flex key={failure.line} direction="row" gap="2" ml="6">
          <Box>
            <ErrorIcon />
          </Box>
          <Box>
            <Text size="2">
              <Text weight="bold">Line {failure.line}</Text>: {failure.message}
            </Text>
          </Box>
        </Flex>
      ))}
    </Flex>
  )
}

export { UploadExcelErrorDialogView }
