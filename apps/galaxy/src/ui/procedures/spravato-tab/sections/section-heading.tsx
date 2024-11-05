import { Flex, Text } from '@radix-ui/themes'

interface SectionHeadingProps {
  title: string
}
const SectionHeading = ({ title }: SectionHeadingProps) => {
  return (
    <Flex align="center" justify="between" gap="2" wrap="wrap">
      <Text weight="medium" size="3">
        {title}
      </Text>
    </Flex>
  )
}

export { SectionHeading }
