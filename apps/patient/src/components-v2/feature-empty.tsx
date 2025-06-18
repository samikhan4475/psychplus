import { FC } from 'react'
import { Box, Flex, Text } from '@radix-ui/themes'
import { type LucideIcon } from 'lucide-react'

interface FeatureEmptyProps {
  title?: string
  description?: React.ReactNode
  action?: React.ReactNode
  Icon?: LucideIcon | FC
}

const FeatureEmpty = ({
  title,
  description,
  action,
  Icon,
}: FeatureEmptyProps) => (
  <Flex
    direction="column"
    height="100%"
    width="100%"
    align="center"
    justify="center"
    py="7"
    px="5"
  >
    {Icon && (
      <Flex
        align="center"
        justify="center"
        className="rounded-full h-[65px] w-[65px] bg-[#EEF2F6]"
      >
        <Icon
          width={30}
          height={30}
          strokeWidth={1}
          fill="white"
          className="text-accent-12"
        />
      </Flex>
    )}

    <Flex
      direction="column"
      mt="2"
      className="w-full"
      align="center"
      justify="center"
    >
      <Text className="font-serif text-[24px] font-[600] -tracking-[1.5px] text-accent-12">
        {title}
      </Text>
      {description ? (
        <Text weight="light" mb="1" className="text-[15px] text-gray-11">
          {description}
        </Text>
      ) : null}
    </Flex>
    <Box className="w-full" mt="1">
      {action ?? null}
    </Box>
  </Flex>
)

export { FeatureEmpty }
