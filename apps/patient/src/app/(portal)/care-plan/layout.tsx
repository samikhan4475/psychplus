'use client'

import { Flex } from '@radix-ui/themes'
import { ListChecksIcon, NotebookTextIcon, StethoscopeIcon } from 'lucide-react'
import { NavigationSideMenu, ViewContainer } from '@/components-v2'

const NAV_LINKS = [
  {
    href: '/care-plan/action-items',
    label: 'Action Items',
    Icon: ListChecksIcon,
  },
  {
    href: '/care-plan/care-team',
    label: 'Care Team',
    Icon: StethoscopeIcon,
  },
  {
    href: '/care-plan/visit-notes',
    label: 'Visit Notes',
    Icon: NotebookTextIcon,
  },
]

const CarePlanLayout = ({ children }: React.PropsWithChildren) => (
  <ViewContainer className="max-w-[var(--container-3)] xs:px-5">
    <Flex gap="5" className="">
      <NavigationSideMenu heading="Care Plan" links={NAV_LINKS} />
      <Flex direction="column" className="flex-1">
        {children}
      </Flex>
    </Flex>
  </ViewContainer>
)

export default CarePlanLayout
