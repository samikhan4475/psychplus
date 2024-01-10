'use client'

import { Flex, Text } from '@radix-ui/themes'
import { usePublishError } from '../hooks'

interface WidgetErrorProps {
  name: string
}

const WidgetError = ({ name }: WidgetErrorProps) => {
  usePublishError(name)
  return <WidgetErrorView />
}

const WidgetErrorView = () => (
  <Flex
    align="center"
    justify="center"
    width="100%"
    className="min-h-full rounded-3 shadow-3"
  >
    <Text size="2" className="italic text-gray-9">
      Something went wrong!
    </Text>
  </Flex>
)

export { WidgetError, WidgetErrorView }
