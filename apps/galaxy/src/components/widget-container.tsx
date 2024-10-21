'use client'

import { Checkbox, Flex, Text } from '@radix-ui/themes'
import { LoadingPlaceholder } from './loading-placeholder'
import { WidgetBlocksContainer } from './widget-blocks-container'

type WidgetContainerProps = React.PropsWithChildren<{
  title?: string
  loading?: boolean
  error?: string
  contentHeight?: number
  toggleable?: boolean
  headerLeft?: React.ReactNode
  headerRight?: React.ReactNode
}>

const WidgetContainer = ({
  title,
  loading,
  error,
  toggleable,
  contentHeight = 200,
  headerLeft,
  headerRight,
  children,
}: WidgetContainerProps) => {
  return (
    <Flex direction="column" py="3" className="bg-white px-2.5 shadow-2">
      <Flex align="center" justify="between" gap="2" wrap="wrap">
        <Flex align="center" gap="2">
          {toggleable && (
            <Checkbox
              onCheckedChange={() => {}}
              highContrast
              className="cursor-pointer"
            />
          )}
          <Text weight="medium" size="3">
            {title}
          </Text>
          <Flex gap="2">{headerLeft}</Flex>
        </Flex>
        <Flex gap="2">{headerRight}</Flex>
      </Flex>
      {loading && (
        <Flex
          align="center"
          justify="center"
          style={{ height: `${contentHeight}px` }}
        >
          <LoadingPlaceholder />
        </Flex>
      )}
      {error && <Text>{error}</Text>}
      {!loading && !error && (
        <Flex direction="column">
          <WidgetBlocksContainer>{children}</WidgetBlocksContainer>
        </Flex>
      )}
    </Flex>
  )
}

export { WidgetContainer, type WidgetContainerProps }
