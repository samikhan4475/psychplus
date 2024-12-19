'use client'

import { Checkbox, Flex, Text } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { cn } from '@/utils'
import { LoadingPlaceholder } from './loading-placeholder'
import { WidgetBlocksContainer } from './widget-blocks-container'

type WidgetContainerProps = React.PropsWithChildren<{
  title?: string
  loading?: boolean
  error?: string
  contentHeight?: number
  toggleable?: boolean //This is linked with checkbox field named "displayWidgetCheckbox" values are 'show' and 'hide'
  headerLeft?: React.ReactNode
  headerRight?: React.ReactNode
  topHeader?: React.ReactNode
  sticky?: boolean
  className?: string
}>

const WidgetContainerCheckboxField = 'widgetContainerCheckboxField'

const WidgetContainer = ({
  title,
  loading,
  error,
  toggleable,
  contentHeight = 200,
  headerLeft,
  headerRight,
  topHeader,
  children,
  sticky = false,
  className,
}: WidgetContainerProps) => {
  const form = useFormContext() ?? null
  const checked =
    form && WidgetContainerCheckboxField
      ? form.watch(WidgetContainerCheckboxField) === 'show'
      : false

  const handleCheckedChange = (newChecked: boolean) => {
    if (form && WidgetContainerCheckboxField) {
      form.setValue(WidgetContainerCheckboxField, newChecked ? 'show' : 'hide')
    }
  }
  return (
    <>
      {topHeader && <>{topHeader}</>}
      <Flex
        direction="column"
        py="3"
        gap="2"
        mt="1"
        className={cn('bg-white px-2.5 shadow-2', className)}
      >
        <Flex
          align="center"
          justify="between"
          gap="2"
          wrap="wrap"
          className={cn({ 'bg-white sticky top-0 z-10 py-2': sticky })}
        >
          <Flex align="center" gap="2">
            {toggleable && (
              <Checkbox
                checked={checked}
                onCheckedChange={handleCheckedChange}
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
    </>
  )
}

export {
  WidgetContainer,
  type WidgetContainerProps,
  WidgetContainerCheckboxField,
}
