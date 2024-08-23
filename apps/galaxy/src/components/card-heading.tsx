import { Flex, Text } from '@radix-ui/themes'

interface CardHeadingProps {
  title: string
}

const CardHeading = ({
  title,
  children,
}: React.PropsWithChildren<CardHeadingProps>) => (
  <Flex align="center" px="2" py="1" className="bg-gray-3">
    <Text weight="medium" className="text-[14px]">
      {title}
    </Text>
    {children}
  </Flex>
)

export { CardHeading }
