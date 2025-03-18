'use client'

import { useMemo } from 'react'
import * as Accordion from '@radix-ui/react-accordion'
import {
  Box,
  Button,
  ChevronDownIcon,
  Flex,
  ScrollArea,
  Text,
} from '@radix-ui/themes'
import { FEATURE_FLAGS } from '@/constants'
import { useFeatureFlagEnabled } from '@/hooks/use-feature-flag-enabled'
import { cn, getInboxNavLinks } from '@/utils'
import { useStore } from './messages/store'

type InboxNavLinks = {
  label: string
  conditions?: boolean[]
  links: {
    label: string
    tab: string
    unreadCount?: number
  }[]
}[]

const InboxNavigation = () => {
  const { activeTab, setActiveTab, fetchUnreadCount, unreadCount } = useStore(
    (state) => ({
      activeTab: state.activeTab,
      setActiveTab: state.setActiveTab,
      fetchUnreadCount: state.fetchUnreadCount,
      unreadCount: state.unreadCount,
    }),
  )

  const isFeatureFlagEnabled = useFeatureFlagEnabled(
    FEATURE_FLAGS.ehr11786EnableGalaxySecondPhaseFeatures,
  )
  const navLinks: InboxNavLinks = useMemo(
    () =>
      getInboxNavLinks({
        isFeatureFlagEnabled,
        unreadCount,
      }),
    [unreadCount],
  )

  return (
    <Box className="bg-white mb-4 mt-1 w-[160px] rounded-1 shadow-2">
      <ScrollArea>
        <Accordion.Root
          className=" mb-2 rounded-1 p-2"
          type="multiple"
          defaultValue={['Messages', 'Notes']}
        >
          {navLinks.map((widget) => {
            const shouldRender =
              !widget.conditions || widget.conditions.every(Boolean)

            if (!shouldRender) return null

            const isSectionActive = widget.links?.filter((link) => {
              return link?.tab === activeTab
            }).length

            return (
              <Accordion.Item
                className={cn('shadow-sm  mb-1', {
                  'bg-pp-bg-accent border-pp-focus-bg rounded-1 border':
                    isSectionActive,
                  'bg-pp-table-subRows border-pp-focus-bg rounded-1 border':
                    !isSectionActive,
                })}
                value={widget.label}
                key={widget.label}
              >
                <Accordion.AccordionTrigger className="w-[100%]">
                  <Flex
                    direction="row"
                    align="center"
                    justify="between"
                    px="2"
                    py="2"
                    height="24px"
                  >
                    <Text size="1" weight="medium">
                      {widget.label}
                    </Text>
                    <Flex direction="row" align="center" gap="2">
                      <ChevronDownIcon />
                    </Flex>
                  </Flex>
                </Accordion.AccordionTrigger>

                <Accordion.AccordionContent className="bg-white flex max-w-[770px] flex-col gap-2 p-1.5 empty:hidden">
                  {widget.links?.map((link) => (
                    <NavigationLink
                      key={link.label}
                      onClick={() => {
                        setActiveTab(link.tab)
                        fetchUnreadCount()
                      }}
                      isActive={link.tab === activeTab}
                      unreadCount={link.unreadCount ?? 0}
                    >
                      {link.label}
                    </NavigationLink>
                  ))}
                </Accordion.AccordionContent>
              </Accordion.Item>
            )
          })}
        </Accordion.Root>
      </ScrollArea>
    </Box>
  )
}

const NavigationLink = ({
  onClick,
  children,
  isActive,
  unreadCount = 0,
}: React.PropsWithChildren<{
  onClick: () => void
  isActive: boolean
  unreadCount: number
}>) => {
  return (
    <Button
      className={cn(
        'text-pp-text-sub bg-white hover:bg-pp-focus-bg justify-start rounded-1 px-2 py-1 text-left text-[11.5px]',
        {
          'bg-pp-focus-bg text-pp-black-3 px-2 py-5 font-[600]': isActive,
        },
      )}
      style={{ textAlign: 'left' }}
      onClick={onClick}
    >
      {children}
      {unreadCount > 0 && (
        <Box className="inline-block">
          <Box
            as="span"
            className="text-white text-xs bg-pp-states-error rounded-full min-w-6  mx-1 flex items-center justify-center px-1 text-1 font-medium"
          >
            {unreadCount}
          </Box>
        </Box>
      )}
    </Button>
  )
}

export { InboxNavigation }
