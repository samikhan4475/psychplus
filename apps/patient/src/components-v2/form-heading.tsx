'use client'

import { Flex, Text } from '@radix-ui/themes'

interface FormHeadingProps {
  title: string
  className?: string
}

const FormHeading = ({ title, className }: FormHeadingProps) => (
  <Flex className="w-full  rounded-t-1 bg-[#F0F4FF]" px="2" py="2">
    <Text size="2" weight="medium">
      {title}
    </Text>
  </Flex>
)

export { FormHeading }
