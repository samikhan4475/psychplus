import { PropsWithChildren, useState } from 'react'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import {
  Flex,
  IconButton,
  Popover,
  ScrollArea,
  Separator,
  Text,
  TextField,
  Tooltip,
} from '@radix-ui/themes'
import { Plus, PlusCircleIcon } from 'lucide-react'
import { cn } from '@/utils'

const Item = ({
  disabled,
  onSelect,
  display,
}: {
  display: string
  disabled: boolean
  onSelect?: () => void
}) => {
  return (
    <Flex
      onClick={onSelect}
      className={cn('cursor-pointer gap-x-44 px-3.5 py-2 opacity-100', {
        'cursor-not-allowed opacity-30': disabled,
      })}
      align="center"
      justify="between"
    >
      <Tooltip content={display} className="z-10">
        <Text className="line-clamp-1 max-w-[180px] overflow-ellipsis text-[14px]">
          {display}
        </Text>
      </Tooltip>
      <PlusCircleIcon
        strokeWidth="2"
        height="20"
        width="20"
        className="text-pp-black-1"
      />
    </Flex>
  )
}

const SearchBar = ({ onSearch }: { onSearch: (val: string) => void }) => {
  const [value, setValue] = useState<string>('')
  return (
    <Flex direction="column">
      <TextField.Root
        placeholder="Search"
        className="sticky top-0 border-none text-[12px] outline-none [box-shadow:none] px-1"
        value={value}
        onChange={(e) => {
          onSearch(e.target.value)
          setValue(e.target.value)
        }}
      >
        <TextField.Slot>
          <MagnifyingGlassIcon width={18} height={18} />
        </TextField.Slot>
      </TextField.Root>
      <Separator className="w-full" />
    </Flex>
  )
}

const List = ({ children }: PropsWithChildren) => {
  return (
    <ScrollArea scrollbars="vertical" className="relative max-h-[250px]">
      {children}
    </ScrollArea>
  )
}

const Placeholder = ({ children }: PropsWithChildren) => {
  return (
    <Text className="text-pp-gray-3 px-3.5 py-1 text-[12px]">{children}</Text>
  )
}

const Root = ({ children }: PropsWithChildren) => {
  return (
    <Popover.Root>
      <Popover.Trigger>
        <IconButton
          variant="outline"
          size="1"
          className="bg-white shadow-ss-focus h-4 w-4"
          type="button"
        >
          <Plus color="black" />
        </IconButton>
      </Popover.Trigger>
      <Popover.Content className="z-10 min-w-[400px] flex-col px-0 py-1">
        {children}
      </Popover.Content>
    </Popover.Root>
  )
}

export { Root, Item, SearchBar, List, Placeholder }
