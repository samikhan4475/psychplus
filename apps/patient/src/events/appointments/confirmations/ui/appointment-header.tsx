'use client'

import { cn } from '@psychplus-v2/utils'
import { Flex, Text } from '@radix-ui/themes'

interface AppointmentHeaderProps {
  icon: React.ReactNode
  title: string
  subtitle?: string | React.ReactNode
  textClass?: string
}

const AppointmentHeader = ({
  icon,
  title,
  subtitle,
  textClass,
}: AppointmentHeaderProps) => (
  <Flex direction="column" align="center" gap="3" className="text-center">
    {icon}
    <Flex direction="column" align="center" gap="1">
      <Text size={{ initial: '5', sm: '6', md: '7' }} className="font-[600]">
        {title}
      </Text>
      {subtitle && (
        <Text
          size={{ initial: '2', sm: '3' }}
          className={cn('text-pp-blue-3 font-[400]', textClass)}
          align="center"
        >
          {subtitle}
        </Text>
      )}
    </Flex>
  </Flex>
)

export { AppointmentHeader }
