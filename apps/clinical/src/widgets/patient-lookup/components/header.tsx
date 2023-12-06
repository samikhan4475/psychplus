import { Box, Heading, Text } from '@radix-ui/themes'

const PageHeader = ({
  title,
  description,
}: {
  title: string
  description: string
}) => (
  <Box mb="6">
    <Heading size="8" mb="1">
      {title}
    </Heading>
    <Text size="4">{description}</Text>
  </Box>
)

export { PageHeader }
