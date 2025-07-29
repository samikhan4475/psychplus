'use client'

import { useEffect } from 'react'
import { Checkbox, Flex, Text } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { cn } from '@/utils'
import { LoadingPlaceholder } from './loading-placeholder'
import { WidgetBlocksContainer } from './widget-blocks-container'

type WidgetContainerProps = React.PropsWithChildren<{
  title?: string
  titleIcon?: React.ReactNode
  loading?: boolean
  error?: string
  contentHeight?: number
  toggleable?: boolean //This is linked with checkbox field named "displayWidgetCheckbox" values are 'show' and 'hide'
  toggleableChecked?: boolean
  toggleableDiabled?: boolean
  headerLeft?: React.ReactNode
  headerRight?: React.ReactNode
  topHeader?: React.ReactNode
  sticky?: boolean
  className?: string
  resetCounter?: number
}>

const WidgetContainerCheckboxField = 'widgetContainerCheckboxField'

const WidgetContainer = ({
  title,
  loading,
  error,
  toggleable,
  toggleableChecked,
  toggleableDiabled,
  contentHeight = 200,
  headerLeft,
  headerRight,
  topHeader,
  children,
  sticky = false,
  className,
  titleIcon,
  resetCounter,
}: WidgetContainerProps) => {
  const form = useFormContext()
  const widgetContainerCheckbox = form?.watch('widgetContainerCheckboxField')
  const checked = (form && widgetContainerCheckbox === 'show') ?? false

  const handleCheckedChange = (newChecked: boolean) => {
    if (form && WidgetContainerCheckboxField) {
      form.setValue(WidgetContainerCheckboxField, newChecked ? 'show' : 'hide')
    }
  }

  useEffect(() => {
    setTimeout(() => {
      if (toggleableChecked !== undefined) {
        form?.reset({
          ...form.getValues(),
          widgetContainerCheckboxField: toggleableChecked ? 'show' : 'hide',
        })
      }
    }, 100)
  }, [toggleableChecked, resetCounter])

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
                checked={
                  toggleableChecked !== undefined ? toggleableChecked : checked
                }
                onCheckedChange={handleCheckedChange}
                highContrast
                className={cn(
                  toggleableDiabled ? 'cursor-not-allowed' : 'cursor-pointer',
                )}
                disabled={toggleableDiabled}
              />
            )}
            {titleIcon && (
              <Flex align="center" justify="center" className="h-5 w-5">
                {titleIcon}
              </Flex>
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
