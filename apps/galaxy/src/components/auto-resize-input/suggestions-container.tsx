import React, { PropsWithChildren } from 'react'
import {
  Button,
  Flex,
  Popover,
  ScrollArea,
  Separator,
  Spinner,
} from '@radix-ui/themes'
import { cn } from '@/utils'
import { useAutoTextSuggestions } from './hooks'

const SuggestionsContainer = ({
  children,
  offset,
  loading,
  focused,
  suggestions,
  showSuggestions,
  handleInsetSuggestion,
}: PropsWithChildren<
  Partial<ReturnType<typeof useAutoTextSuggestions>> & {
    focused: boolean
  }
>) => {
  return (
    <Popover.Root open={showSuggestions} modal={false}>
      {children}
      <Popover.Content
        onOpenAutoFocus={(e) => e.preventDefault()}
        className="!rounded-1 !p-1"
        width="250px"
        maxWidth="250px"
        minWidth="0"
        size="1"
        side="top"
        alignOffset={offset?.x && offset?.x > 0 ? offset?.x : 0}
        sideOffset={-(offset?.y ?? 0)}
      >
        <Button
          variant="ghost"
          className="pointer-events-none font-bold"
          size="1"
          highContrast
        >
          Suggestions
          <Spinner loading={loading} size="1" />
        </Button>
        <Separator orientation="horizontal" className="w-full" />
        <ScrollArea className="group max-h-[250px]" scrollbars="vertical">
          <Flex
            direction="column"
            gap="1"
            className={cn({
              '[&>button:first-of-type]:text-white group-hover:[&_button]:text-black group-hover:[&_button]:bg-white [&>button:first-of-type]:bg-indigo-12':
                focused,
            })}
          >
            {suggestions?.map((suggestion, idx) => (
              <Button
                key={`${suggestion?.label}-${idx}`}
                variant="ghost"
                color="gray"
                radius="none"
                size="1"
                highContrast
                tabIndex={0}
                type="button"
                className="hover:!text-white !m-0 cursor-pointer flex-wrap justify-start gap-y-0 truncate border-b border-b-gray-5 p-1 last:border-b-0 hover:!bg-indigo-12"
                onClick={() => {
                  handleInsetSuggestion?.(suggestion?.value)
                }}
              >
                {suggestion?.label}
              </Button>
            ))}
            {!suggestions?.length && !loading && (
              <Button
                size="1"
                className="pointer-events-none w-full justify-center text-center"
                variant="ghost"
                highContrast
              >
                No data found
              </Button>
            )}
          </Flex>
        </ScrollArea>
      </Popover.Content>
    </Popover.Root>
  )
}

export { SuggestionsContainer }
